import {
  addConsultation,
  getAll,
  getConsultationsDatesByDoctorID,
  getDoctorConsultationByDateRange,
} from "../../consultation/dao/consultation.dao.js";
import { findUserByEmail, update } from "../dao/user.dao.js";
import { v2 } from "cloudinary";
import { Types } from "mongoose";

export async function getAllConsultations(request, response) {
  try {
    const userEmail = request.auth.email;
    const patient = findUserByEmail(userEmail);
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
    const { dateOfBirth, address, gender } = request.body;
    const email = request.auth.email;
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

export const updateUserProfileImage = async (request, response) => {
  try {
    const email = request.auth.email;
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
      const duration = parseInt(consultation.duration);
      accumulatedDurations[dateKey] =
        (accumulatedDurations[dateKey] || 0) + duration;
    });
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
    const { doctorId } = request.query;
    const date = new Date(request.query.date);
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    const bookedTimes = await getDoctorConsultationByDateRange(
      doctorId,
      endOfDay,
      startOfDay
    );
    console.log(bookedTimes);
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
    const consultation = { ...request.body };
    const user = await findUserByEmail(request.auth.email);
    consultation.patient = new Types.ObjectId(user._id);
    consultation.doctor = new Types.ObjectId(consultation.doctor);
    consultation.state = "Waiting to see doctor";
    const createdConsultations = await addConsultation(consultation)._doc;
    return response.status(200).json({ createdConsultations });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: "An internal server error has ocuured" });
  }
};
