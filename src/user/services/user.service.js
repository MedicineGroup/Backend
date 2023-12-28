import {
  addConsultation,
  getAll,
  getConsultationsDatesByDoctorID,
  getDoctorConsultationByDateRange,
  getOngoingPatientConsultation,
  getPatientConsultationByDateAndTime,
} from "../../consultation/dao/consultation.dao.js";
import {
  addDoctor,
  findUserByEmail,
  getDoctorsByUserEmail,
  update,
} from "../dao/user.dao.js";
import { v2 } from "cloudinary";
import { Types } from "mongoose";
import { CONSULTATION_STATE } from "../../utils/constantes.js";
import { addPatient } from "../../doctor/dao/doctor.dao.js";

export async function getAllConsultations(request, response) {
  try {
    const userEmail = request.auth.email;
    const patient = await findUserByEmail(userEmail);
    const consultations = await getAll(new Types.ObjectId(patient._id));
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
    const { startOfDay, endOfDay } = getDateRange(date);
    const bookedTimes = await getDoctorConsultationByDateRange(
      doctorId,
      endOfDay,
      startOfDay
    );
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
    const patientId = new Types.ObjectId(user._id);
    const doctorId = new Types.ObjectId(consultation.doctor);
    const { startOfDay, endOfDay } = getDateRange(consultation.date);
    const bookedConsultation = await getPatientConsultationByDateAndTime(
      patientId,
      consultation.startTime,
      startOfDay,
      endOfDay
    );
    if (bookedConsultation) {
      const year = new Date(bookedConsultation.date).getFullYear();
      const month = new Date(bookedConsultation.date).getMonth() + 1;
      const day = new Date(bookedConsultation.date).getDate();
      return response.status(400).json({
        message: `You already have a consultation with ${bookedConsultation.doctor.nom} in ${bookedConsultation.doctor.service} service, the ${day}/${month}/${year} at ${bookedConsultation.startTime} `,
      });
    }
    const ongoingConsultation = await getOngoingPatientConsultation(
      patientId,
      doctorId
    );
    if (ongoingConsultation) {
      return response
        .status(400)
        .json({
          message: "You still have an ongoing consultation with this doctor",
        });
    }
    consultation.patient = patientId;
    consultation.doctor = doctorId;
    consultation.state = CONSULTATION_STATE.WATING_DOCTOR;
    const createdConsultations = await addConsultation(consultation)._doc;
    await addDoctor(patientId, doctorId);
    await addPatient(doctorId, patientId);
    return response.status(201).json({ createdConsultations });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: "An internal server error has ocuured" });
  }
};

const getDateRange = (date) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  return { startOfDay, endOfDay };
};

export const getUserDoctor = async (request, response) => {
  try {
    const { email } = request.auth;
    const { doctors } = await getDoctorsByUserEmail(email);
    return response.status(200).json({ doctors });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: "An internal server error has ocuured" });
  }
};
