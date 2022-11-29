import mongoose from "mongoose";
import { exit } from "process";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGODB_URL) {
  console.error("MONGODB_URL is not defined in .env file");
  exit();
}

// connect to database
const db = process.env.MONGODB_URL;
mongoose.connect(db);

const postSchema = {
  location: {
    type: String,
    required: "Fill in this",
  },
  description: {
    type: String,
    required: "Fill in this",
  }
};

const PostModel = mongoose.model("Post", postSchema);

export default PostModel;