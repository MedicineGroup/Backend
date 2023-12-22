import Assistant from "../models/assistant.model.js";

export const addAssistant = async (newAssistant) => {
    try {
      const assistant = new Assistant({ ...newAssistant });
      return await assistant.save();
    } catch (error) {
      console.log("Error in assistant DAO: addAssistant: ", error);
      throw new Error(error);
    }
};
export const findAssistantByEmail = async (email) => {
    try {
      return await Assistant.findOne({ email });
    } catch (error) {
      console.log("Error in Assistant DAO: findAssistantByEmail: ", error.message);
      throw new Error(error);
    }
};