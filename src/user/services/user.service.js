import {getAll} from "../../consultation/dao/consultation.dao.js";
import { findUserByEmail } from "../dao/user.dao.js";
export async function findAll(req, res) {
    const userEmail = req.query.email;
    //let condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
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