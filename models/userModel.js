import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

if (!process.env.MONGODB_URL) {
  console.error("MONGODB_URL is not defined in .env file /userModel");
  exit();
}

const db = process.env.MONGODB_URL;
mongoose.connect(db);

const addUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: "Add a username",
    lowercase: true,
    unique: true,
    match: [/^[a-zA-Z0-9]+$/, "is invalid"],
  },
  password: {
    type: String,
    required: "Add a password",
    minLength: 4,
    maxLength: 50,
  },
}, {
  collection: "users"
});

addUserSchema.pre("save", function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    this.password = bcrypt.hashSync(this.password, 10);

    next();
  } catch (err) {
    throw new Error("Incorrect password / userModel", err);
  }
});

addUserSchema.methods.comparePassword = async function (plainTextPassword, hashedPassword) {
  try {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  } catch (err) {
    console.log("Password error / userModel");
  }
}

const addUserModel = mongoose.model("users", addUserSchema);

export default addUserModel;