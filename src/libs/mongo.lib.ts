import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;
export const connectToMongo = async () => {

  if (MONGODB_URI) {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log("Connected to mongodb database");

    } catch (err) {
      console.error("Unable to connect to database", err);

    }
  } else {
    console.log("MongoDB URL not found");
  }
}
