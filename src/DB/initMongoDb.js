import { getEnvVar } from "../utils/getEnvVar.js"
import mongoose from "mongoose";

export const initMongoDb = async () => {
    try {
        const user = getEnvVar("DB_USER") 
        const pwd = getEnvVar("DB_PWD")
        const  url = getEnvVar("DB_URL") 
        const folder = getEnvVar("DB_FOLDER")

        await mongoose.connect(`mongodb+srv://${user}:${pwd}@${url}/${folder}?retryWrites=true&w=majority`);
console.log('Mongo connection successfully established!');
    } catch(err) {
console.log("Error while setting up mongo connection", err);
throw err;
    }
};