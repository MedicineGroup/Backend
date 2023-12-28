import { findUserByEmail, addUser } from "../../user/dao/user.dao.js";
import {
  findAssistantByEmail,
  addAssistant,
} from "../../assistant/dao/assistant.dao.js";
import { hashPassword } from "../../utils/auth.utils.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { findDoctorByEmail } from "../../doctor/dao/doctor.dao.js";

export async function signupAction(request, response) {
  try {
    const userWithSameEmail = await findUserByEmail(request.body.email);
    if (userWithSameEmail) {
      return response.status(401).json({
        message: "A user with the same email or username already exists",
      });
    }
    const user = { ...request.body };
    user.password = await hashPassword(user.password);
    const createdUser = await addUser(user);
    const { password, _id, __v, ...payload } = createdUser._doc;
    const token = jwt.sign(payload, process.env.SECRET || "Bearer");
    return response.status(201).json({ user: payload, token });
  } catch (error) {
    console.log(error);
    return response.status(500).json("An error occured in the server");
  }
}

export async function signupAssistantAction(request, response) {
  try {
    const assistantWithSameEmail = await findAssistantByEmail(
      request.body.email
    );
    if (assistantWithSameEmail) {
      return response.status(401).json({
        message: "A user with the same email or username already exists",
      });
    }
    const assistant = { ...request.body };
    assistant.password = await hashPassword(assistant.password);
    const createdAssistant = await addAssistant(assistant);
    const { password, _id, __v, ...payload } = createdAssistant._doc;
    const token = jwt.sign(payload, process.env.SECRET || "Bearer");
    return response.status(201).json({ user: payload, token });
  } catch (error) {
    console.log(error);
    return response.status(500).json("An error occured in the server");
  }
}

export async function loginAction(request, response) {
  try {
    const user = await findUserByEmail(request.body.email);

    const { compareSync } = bcrypt;
    if (!user || !compareSync(request.body.password, user.password)) {
      return response.status(401).json({ message: "Wrong credentials" });
    }

    const { password, _id, __v, ...payload } = user._doc;

    const token = jwt.sign(payload, process.env.SECRET || "Bearer");
    return response.status(200).json({ user: payload, token });
  } catch (error) {
    console.log(error);

    response
      .status(500)
      .json({ message: "An internal server error has occured" });
  }
}

export async function loginDoctor(request, response) {
  try {
    const doctor = await findDoctorByEmail(request.body.email);

    const { compareSync } = bcrypt;
    if (!doctor || !compareSync(request.body.password, doctor.password)) {
      return response.status(401).json({ message: "Wrong credentials" });
    }

    const { password, _id, __v, ...payload } = doctor._doc;

    const token = jwt.sign(payload, process.env.SECRET || "Bearer");
    return response.status(200).json({ doctor: payload, token });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: "An internal server error has occured" });
  }
}

export async function logoutAction(request, response) {
  return response.status(200).json({ message: "You are logged out" });
}


// Fonction asynchrone pour gérer l'action de connexion Assistant
export async function loginAssistant(request, response) {
  try {
    //verifier s'il y'a des erreurs dans les donnees envoyees
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() });
    }
    // Recherche de l'utilisateur par son adresse e-mail
    const assistant = await findAssistantByEmail(request.body.email);

    // Vérifie si l'utilisateur existe ou si le mot de passe ne correspond pas
    const { compareSync } = bcrypt;
    if (!assistant || !compareSync(request.body.password, assistant.password)) {
      // Retourne une réponse avec un statut 401 (Non autorisé) et un message d'erreur
      return response.status(401).json({ message: "Wrong credentials" });
    }

    // Prépare les données à inclure dans le token JWT en excluant le mot de passe
    const { password, _id, __v, ...payload } = assistant._doc;

    // Génère un token JWT avec les données de l'utilisateur
    const token = jwt.sign(payload, process.env.SECRET || 'Bearer');
    // Retourne une réponse avec un statut 200 (OK) et le token généré
    return response.status(200).json({ assistant: payload, token });
  } catch (error) {
    // En cas d'erreur, affiche l'erreur dans la console
    console.log(error);

    // Retourne une réponse avec un statut 500 (Erreur interne du serveur) et un message d'erreur
    response
      .status(500)
      .json({ message: "An internal server error has occured" });
  }
}

