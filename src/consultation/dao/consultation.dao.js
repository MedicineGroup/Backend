import Consultation from "../models/consulation.model.js";
export const getAll= async(patient)=>{
 try{
  return Consultation.find({patient: patient._doc._id})
 }catch(err){
  console.log(err);
  throw new Error(err)
 }
}