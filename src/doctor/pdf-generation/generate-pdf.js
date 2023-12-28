import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const stylingPDF = (date, patientName) => {
  const document = new PDFDocument({
    layout: "portrait",
    size: "A4",
  });
  const distanceMargin = 18;
  document
    .fillAndStroke("#0e8cc3")
    .lineWidth(20)
    .lineJoin("round")
    .rect(
      distanceMargin,
      distanceMargin,
      document.page.width - distanceMargin * 2,
      document.page.height - distanceMargin * 2
    )
    .stroke();
  const maxWidth = 140;
  const maxHeight = 70;
  document.image(
    "src/assets/logo.png",
    document.page.width / 2 - maxWidth / 2,
    60,
    {
      fit: [maxWidth, maxHeight],
      align: "center",
    }
  );

  jumpLine(document, 2);
  addTextToDocument(document, `Date: ${date}`, { align: "left", fontSize: 16 });

  jumpLine(document, 3);
  addTextToDocument(document, patientName, { align: "center", fontSize: 20 });
  jumpLine(document, 4);
  return document;
};

function jumpLine(doc, lines) {
  for (let index = 0; index < lines; index++) {
    doc.moveDown();
  }
}

const addTextToDocument = (document, text, textStyles) => {
  document
    .font("src/assets/fonts/Roboto-Light.ttf")
    .fontSize(textStyles.fontSize)
    .fill("#021c27")
    .text(text, {
      align: textStyles.align,
    });
};

export const generateTreatmentPrescriptionPDF = async (
  medecines,
  patientName
) => {
  try {
    const date = `${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}`;
    const document = stylingPDF(date, patientName);
    medecines.forEach((medecine) => {
      const text = `${medecine.name} ${medecine.times}/day ${medecine.when}`;
      addTextToDocument(document, text, { align: "center", fontSize: 18 });
      jumpLine(document, 2);
    });
    const filename = `${patientName.replace(" ", "")}-${uuidv4()}.pdf`;
    const filePath = `src/doctor/generated-pdfs/${filename}`; // Use path.join for clarity
    const directoryPath = path.dirname(filePath);

    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }
    await new Promise((resolve, reject) => {
      document
        .pipe(fs.createWriteStream(filePath))
        .on("finish", resolve)
        .on("error", reject);
      document.end();
    });
    return filename;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const generateAnalysisAndRadiologiePrescription = async (
  patientName,
  analysis
) => {
  try {
    const date = `${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}`;
    const document = stylingPDF(date, patientName);
    analysis.forEach((analysis) => {
      const text = `${analysis.type} for ${analysis.organ}`;
      addTextToDocument(document, text, { align: "center", fontSize: 18 });
      jumpLine(document, 2);
    });
    const filename = `${patientName.replace(" ", "")}-${uuidv4()}.pdf`;
    const filePath = `src/doctor/generated-pdfs/${filename}`; // Use path.join for clarity
    const directoryPath = path.dirname(filePath);

    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }
    await new Promise((resolve, reject) => {
      document
        .pipe(fs.createWriteStream(filePath))
        .on("finish", resolve)
        .on("error", reject);
      document.end();
    });
    return filename;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
