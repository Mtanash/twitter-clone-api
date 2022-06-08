import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connectToDatabase = async () => {
  return await mongoose.connect(process.env.MONGODB_URL as string);
};

export default connectToDatabase;
