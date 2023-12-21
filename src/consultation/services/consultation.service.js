import multer from "multer";
import PdfDetails from "../../pdfDetails.js";
import { findUserByEmail } from "../../user/dao/user.dao.js";

export const addAnalyse = async (req, res) => {
  const email = req.auth.email;
  try {
    const user = await findUserByEmail(email);
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
      try {
        const pdfDetails = await PdfDetails.create({ title, pdf: fileName, patient: user._id });
        res.send({ status: "ok", pdfDetails });
      } catch (error) {
        res.json({ status: error.message });
      }
    });
  } catch (error) {
    res.status(500).json({ status: error.message });
  }
};

export const getFiles = async (req, res) => {
    try {
      PdfDetails.find({}).then((data) => {
        res.send({ status: "ok", data: data });
      });
    } catch (error) {}
  }