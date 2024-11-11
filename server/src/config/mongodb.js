import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("connection established");
  });
  await mongoose.connect(`${process.env.VITE_MONGODB_URI}/sportify`);
};
export default connectDB;
