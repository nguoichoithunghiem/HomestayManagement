import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://haole01202:gamerbeta541@cluster0.bnzey.mongodb.net/HomeStayDatabase').then(() => console.log("DB connected"));
}