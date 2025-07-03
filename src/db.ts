// src/db.ts
import mongoose from "mongoose";
import dotenv from "dotenv";

// ✅ Load .env file
dotenv.config();

const connectToDB = async () => {
  try {
    // ✅ Use env variable
    await mongoose.connect(process.env.DATABASE_URL as string);

    console.log("Connected to database (library-management)");
  } catch (error) {
    console.log("Failed to connect to DB:", error);
  }
};

export default connectToDB;
