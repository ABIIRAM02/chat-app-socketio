import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", false);

  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }

  try {
    mongoose
      .connect(process.env.MONGODB_URI, {
        dbName: "chat-dood",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        isConnected = true;
        console.log("MongoDB connected");
      });
  } catch (error) {
    console.log(error);
  }
};
