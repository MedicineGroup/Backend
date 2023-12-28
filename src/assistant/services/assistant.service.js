import { findAssistantByEmail } from "../dao/assistant.dao.js";

export const getAssistantByEmail = async (req, res) => {
    try {
      const { email } = req.query; // Assurez-vous que doctorEmail est passé en tant que paramètre dans votre route
      const assistant = await findAssistantByEmail(email);
      res.status(200).json({ assistant });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };