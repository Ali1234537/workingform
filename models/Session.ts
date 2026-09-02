import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    sessionId: String,
    userId: String,
    expiresAt: Date,
  }
);

const Session =
  mongoose.models.Session ||
  mongoose.model("Session", sessionSchema);

export default Session;

//This is like telling which user is logged in currently.