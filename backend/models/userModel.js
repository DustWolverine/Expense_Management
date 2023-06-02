import mongoose from "mongoose";

//schema design
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "name is requried"],
    },
    email: {
      type: String,
      require: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "password is required"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
