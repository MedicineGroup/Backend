
import { model, Schema } from "mongoose";


const PdfDetailsSchema = new Schema(
  {
    pdf: String,
    title: String,
    type: String,
    patient: {
        type: Schema.Types.ObjectId,
        ref:"User"
    },
  },
  { collection: "PdfDetails" }
);
const PdfDetails=model("PdfDetails", PdfDetailsSchema);
export default PdfDetails;
