import {
  addConsultation,
  getAll,
} from "../../consultation/dao/consultation.dao.js";
import { validationResult } from "express-validator";
import { findUserByEmail, update } from "../dao/user.dao.js";
import { v2 } from "cloudinary";
import {
  getConsultationsDatesByDoctorID,
  getBookedTimesByDoctorAndDate,
} from "../../doctor/dao/doctor.dao.js";

export async function getAllConsultations(request, response) {
  try {
    const userEmail = request.auth.email;

    // Recherche de l'utilisateur par son adresse e-mail
    const patient = await findUserByEmail(userEmail);
    if (!patient) {
      // Retourne une réponse avec un statut 401 (Non autorisé) et un message d'erreur
      return response.status(404).json({ message: "User doesn't found" });
    }
    const consultations = await getAll(patient);
    return response.status(200).json({ consultations });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      message: "An internal Server error has occured",
    });
  }
}

export const updateUserInfos = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() });
    }
    const { dateOfBirth, address, gender } = request.body;
    const email = request.auth.email;
    const user = await findUserByEmail(email);
    if (!user) {
      return response
        .status(404)
        .json({ message: "No user with the given email was found" });
    }
    const userInfos = { address, dateOfBirth, gender };
    const { password, _id, __v, ...updatedUser } = await update(
      email,
      userInfos
    );
    return response.status(200).json({ user: updatedUser });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: "An internal server error has occured" });
  }
};

export const getUserInfos = async (request, response) => {
  try {
    const email = request.auth.email;
    const user = await findUserByEmail(email);
    if (!user) {
      return response
        .status(404)
        .status({ message: `No User with the email ${email} was found` });
    }

    const { password, _id, __v, ...userInfos } = user._doc;
    return response.status(200).json({ user: userInfos });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: "An internal server error has occured" });
  }
};

export const updateUserProfileImage = async (request, response) => {
  try {
    const email = request.auth.email;
    const user = findUserByEmail(email);
    if (!user) {
      return response
        .status(404)
        .json({ message: "No user with this email was found" });
    }
    const cloudinaryResponse = await v2.uploader.upload(request.file.path);
    const userInfos = { profileImage: cloudinaryResponse.secure_url };
    const { password, _id, __v, ...updatedUser } = await update(
      email,
      userInfos
    );
    return response.status(200).json({ user: updatedUser });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: "An internal server error has occured" });
  }
};

export const getFullBookedDatesByDoctorId = async (request, response) => {
  try {
    const email = request.auth.email;
    const user = await findUserByEmail(email);
    if (!user) {
      return response
        .status(404)
        .json({ message: "No user with this email was found" });
    }
    const doctorId = request.query.doctorId;
    const consultationsDatesOfDoctor = await getConsultationsDatesByDoctorID(
      doctorId
    );
    if (
      !consultationsDatesOfDoctor ||
      consultationsDatesOfDoctor.length === 0
    ) {
      return response.status(200).json({ fullyBookedDates: [] });
    }
    const accumulatedDurations = {};
    consultationsDatesOfDoctor.forEach((consultation) => {
      const dateKey = consultation.date.toISOString().split("T")[0];
      const duration = consultation.duration;
      accumulatedDurations[dateKey] =
        (accumulatedDurations[dateKey] || 0) + duration;
    });

    // Filter out dates where the accumulated duration is 6 hours (360 minutes)
    const fullyBookedDates = Object.keys(accumulatedDurations).filter(
      (date) => accumulatedDurations[date] === 3600
    );

    return response.status(200).json({ fullyBookedDates });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: "An internal server error has ocuured" });
  }
};

export const bookedTimesByDoctorAndDate = async (request, response) => {
  try {
    const email = request.auth.email;
    const user = await findUserByEmail(email);
    if (!user) {
      return response
        .status(404)
        .json({ message: "No user with this email was found" });
    }
    const { doctorId, date } = request.query;
    const bookedTimes = await getBookedTimesByDoctorAndDate(doctorId, date);
    return response.status(200).json({ bookedTimes });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: "An internal server error has ocuured" });
  }
};

export const bookConsultation = async (request, response) => {
  try {
    const email = request.auth.email;
    const user = await findUserByEmail(email);
    if (!user) {
      return response
        .status(404)
        .json({ message: "No user with this email was found" });
    }
    const consultation = { ...request.body };
    consultation.patient = user._id;
    const createdConsultations = await addConsultation(consultation)._doc;
    return response.status(200).json({ createdConsultations });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: "An internal server error has ocuured" });
  }
};
