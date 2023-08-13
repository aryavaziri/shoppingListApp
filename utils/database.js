import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("Mongoose is already connected");
    return;
  }
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      isConnected = true;
      console.log("Mongoose connected");
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
    });
};
