import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
