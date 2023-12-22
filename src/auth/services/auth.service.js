import { validationResult } from "express-validator";
import { findUserByEmail, addUser } from "../../user/dao/user.dao.js";
import {findAssistantByEmail, addAssistant} from "../../assistant/dao/assistant.dao.js";
import { hashPassword } from "../../utils/auth.utils.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { findDoctorByEmail } from "../../doctor/dao/doctor.dao.js";
//fonction pour effectuter le signup d'un nouveau utilisateur
export async function signupAction(request, response) {
  try {
    const errors = validationResult(request);
    //verifier s'il y'a des erreurs dans les donnees envoyer par le frontend.
    if (!errors.isEmpty()) {
      //si oui on renvoie un les erreurs trouvees.
      return response.status(422).json({ message: errors.array() });
    }
    const userWithSameEmail = await findUserByEmail(request.body.email);
    //verifier s'il existe un utilisteur avec le meme email ou username
    if (userWithSameEmail) {
      //si oui on envoie une erreur
      return response.status(401).json({
        message: "A user with the same email or username already exists",
      });
    }
    //si tous les verification passent on continue
    //recuperer les infos dans la requete
    const user = { ...request.body };
    //encrypter le mot de passe
    user.password = await hashPassword(user.password);
    //enregistrer l'utilisateur dans la base de donnees.
    const createdUser = await addUser(user);
    //creer un jwt pour l'utilisateur
    const { password, _id, __v, ...payload } = createdUser._doc;
    const token = jwt.sign(payload, process.env.SECRET || 'Bearer');
    //envoyer une reponse avec les infos de l'utilisateur
    return response.status(201).json({ user: payload, token });
  } catch (error) {
    console.log(error);
    //en cas d'erreur on envoie un message d'erreur du code 500
    return response.status(500).json("An error occured in the server");
  }
}

//fonction pour effectuter le signup d'un nouveau assistamt
export async function signupAssistantAction(request, response) {
  try {
    const errors = validationResult(request);
    //verifier s'il y'a des erreurs dans les donnees envoyer par le frontend.
    if (!errors.isEmpty()) {
      //si oui on renvoie un les erreurs trouvees.
      return response.status(422).json({ message: errors.array() });
    }
    const assistantWithSameEmail = await findAssistantByEmail(request.body.email);
    //verifier s'il existe un utilisteur avec le meme email ou username
    if (assistantWithSameEmail) {
      //si oui on envoie une erreur
      return response.status(401).json({
        message: "A user with the same email or username already exists",
      });
    }
    //si tous les verification passent on continue
    //recuperer les infos dans la requete
    const assistant = { ...request.body };
    //encrypter le mot de passe
    assistant.password = await hashPassword(assistant.password);
    //enregistrer l'utilisateur dans la base de donnees.
    const createdAssistant = await addAssistant(assistant);
    //creer un jwt pour l'utilisateur
    const { password, _id, __v, ...payload } = createdAssistant._doc;
    const token = jwt.sign(payload, process.env.SECRET || 'Bearer');
    //envoyer une reponse avec les infos de l'utilisateur
    return response.status(201).json({ user: payload, token });
  } catch (error) {
    console.log(error);
    //en cas d'erreur on envoie un message d'erreur du code 500
    return response.status(500).json("An error occured in the server");
  }
}


// Fonction asynchrone pour gérer l'action de connexion
export async function loginAction(request, response) {
  try {
    //verifier s'il y'a des erreurs dans les donnees envoyees
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() });
    }
    // Recherche de l'utilisateur par son adresse e-mail
    const user = await findUserByEmail(request.body.email);

    // Vérifie si l'utilisateur existe ou si le mot de passe ne correspond pas
    const { compareSync } = bcrypt;
    if (!user || !compareSync(request.body.password, user.password)) {
      // Retourne une réponse avec un statut 401 (Non autorisé) et un message d'erreur
      return response.status(401).json({ message: "Wrong credentials" });
    }

    // Prépare les données à inclure dans le token JWT en excluant le mot de passe
    const { password, _id, __v, ...payload } = user._doc;

    // Génère un token JWT avec les données de l'utilisateur
    const token = jwt.sign(payload, process.env.SECRET || 'Bearer');
    // Retourne une réponse avec un statut 200 (OK) et le token généré
    return response.status(200).json({ user: payload, token });
  } catch (error) {
    // En cas d'erreur, affiche l'erreur dans la console
    console.log(error);

    // Retourne une réponse avec un statut 500 (Erreur interne du serveur) et un message d'erreur
    response
      .status(500)
      .json({ message: "An internal server error has occured" });
  }
}

// Fonction asynchrone pour gérer l'action de connexion
export async function loginDoctor(request, response) {
  try {
    //verifier s'il y'a des erreurs dans les donnees envoyees
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() });
    }
    // Recherche de l'utilisateur par son adresse e-mail
    const doctor = await findDoctorByEmail(request.body.email);

    // Vérifie si l'utilisateur existe ou si le mot de passe ne correspond pas
    const { compareSync } = bcrypt;
    if (!doctor || !compareSync(request.body.password, doctor.password)) {
      // Retourne une réponse avec un statut 401 (Non autorisé) et un message d'erreur
      return response.status(401).json({ message: "Wrong credentials" });
    }

    // Prépare les données à inclure dans le token JWT en excluant le mot de passe
    const { password, _id, __v, ...payload } = doctor._doc;

    // Génère un token JWT avec les données de l'utilisateur
    const token = jwt.sign(payload, process.env.SECRET || 'Bearer');
    // Retourne une réponse avec un statut 200 (OK) et le token généré
    return response.status(200).json({ doctor: payload, token });
  } catch (error) {
    // En cas d'erreur, affiche l'erreur dans la console
    console.log(error);

    // Retourne une réponse avec un statut 500 (Erreur interne du serveur) et un message d'erreur
    response
      .status(500)
      .json({ message: "An internal server error has occured" });
  }
}

// Fonction asynchrone pour gérer l'action de déconnexion
export async function logoutAction(request, response) {
  // Retourne une réponse avec un statut 200 (OK) et un message de succès
  return response.status(200).json({ message: "You are logged out" });
}
