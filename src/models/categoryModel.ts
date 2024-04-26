import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, require: [true, "Please provide a name"] },
  },
  {
    timestamps: true,
  }
);

const CategoryModel =
  mongoose.models.cateogries ||
  mongoose.model("cateogries", categorySchema, "categories");

export default CategoryModel;
