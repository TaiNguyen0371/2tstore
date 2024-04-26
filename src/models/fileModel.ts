import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    url: { type: String, require: true },
    secure_url: { type: String, require: true },
    public_id: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const FileModel = mongoose.models.files ||  mongoose.model("files", fileSchema, "files");
export default FileModel;
