import {getAll} from "../../consultation/dao/consultation.dao.js";
import { validationResult } from "express-validator";
import { findUserByEmail, update } from "../dao/user.dao.js";
import { v2 } from "cloudinary";

export async function findAll(req, res) {
  const userEmail = req.query.email;
    
    // Recherche de l'utilisateur par son adresse e-mail
    const patient = await findUserByEmail(userEmail);
    if (!patient ) {
      // Retourne une réponse avec un statut 401 (Non autorisé) et un message d'erreur
      return response.status(404).json({ message: "User doesn't found" });
    }
    getAll(patient)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving consultations",
        });
      });
};


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
