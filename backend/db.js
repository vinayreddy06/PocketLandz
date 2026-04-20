import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect("mongodb+srv://pocketlandzadmin:YKMG4Ba3OTv5BP91@cluster0.8kjojgb.mongodb.net/pocketlandz?retryWrites=true&w=majority&appName=Cluster0");
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("DB Error:", err);
    process.exit(1);
  }
}
