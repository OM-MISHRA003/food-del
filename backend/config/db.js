import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    // Use local MongoDB
    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/food-del";
    
    try {
        await mongoose.connect(uri);
        console.log("DB Connected to MongoDB");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
}

// MongoDB URI is now loaded from .env file for better security.


