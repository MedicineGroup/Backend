import { findAllConsultationsAssitant } from "../../consultation/dao/consultation.dao.js";
import { findAssistantByEmail } from "../dao/assistant.dao.js";
import {Types} from "mongoose"
import multer from "multer";
import PdfDetails from "../../pdfDetails.js";

export const getAssistantByEmail = async (req, res) => {
    try {
      const { email } = req.query; // Assurez-vous que doctorEmail est passé en tant que paramètre dans votre route
      const assistant = await findAssistantByEmail(email);
      res.status(200).json({ assistant });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export async function getAllConsultationsAssistant(request, response) {
    try {
      const userEmail = request.auth.email;
      const assistant = await findAssistantByEmail(userEmail);
      const consultations = await findAllConsultationsAssitant(new Types.ObjectId(assistant.doctor));
      return response.status(200).json({ consultations });
    } catch (error) {
      console.log(error);
      response.status(500).send({
        message: "An internal Server error has occured",
      });
    }
  }

  export const addAnalyseAssistant = async (req, res) => {
    const email = req.auth.email;
    try {
      const user = await findAssistantByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "No user with this email was found" });
      }
  
      const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, "./files");
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now();
          cb(null, uniqueSuffix + file.originalname);
        },
      });
  
      const upload = multer({ storage: storage });
      upload.single("file")(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: err.message });
        }
  
        console.log(req.file);
        const title = req.body.title;
        const fileName = req.file.filename;
        const type = req.body.type;
        const patient = req.body.patient;
        try {
          const pdfDetails = await PdfDetails.create({ title, pdf: fileName, patient: patient, type });
          res.send({ status: "ok", pdfDetails });
        } catch (error) {
          res.json({ status: error.message });
        }
      });
    } catch (error) {
      res.status(500).json({ status: error.message });
    }
  };