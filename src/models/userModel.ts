import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, require: [true, "Please provide a email"] },
    password: { type: String, required: [true, "Please provide a password"] },
    firstName: { type: String, require: [true, "Please provide a full name"] },
    lastName: { type: String, require: [true, "Please provide a last name"] },
    role: {
      type: String,
      require: [true, "Please provide a role"],
      default: "customer",
      enum: ["admin", "customer"],
    },
    phone: { type: String, default: null },
    specific_address: { type: String, default: null },
    city: { type: String, default: null },
    district: { type: String, default: null },
    ward: { type: String, default: null },
    avatar: { type: mongoose.Schema.Types.ObjectId, ref: "files" },
  },
  {
    timestamps: true,
  }
);

const UserModel =
  mongoose.models.users || mongoose.model("users", UserSchema, "users");

export default UserModel;
