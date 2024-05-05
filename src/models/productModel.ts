import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: { type: String, require: [true, "Please provide a name"] },
    slug: {
      type: String,
      unique: true,
      require: [true, "Please provide a slug"],
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "categories",
      require: [true, "Please provide a category id"],
    },
    price: { type: Number, require: [true, "Please provide provide a price"] },
    description: {
      type: String,
      require: [true, "Please provide a description"],
    },
    sizes: [
      {
        size: { type: String, require: [true, "Please provide a size"] },
        quantity: {
          type: Number,
          require: [true, "Please provide a quantity"],
        },
      },
    ],
    images: [
      {
        type: mongoose.Types.ObjectId,
        ref: "files",
        require: [true, "Please provide a image"],
      },
    ],
    isBanner: { type: Boolean, default: false },
    ambassador: {
      name: { type: String, require: [true, "Please provide ambassador name"] },
      image: {
        type: mongoose.Types.ObjectId,
        ref: "files",
        require: [true, "Please provide ambassador image"],
      },
    },
    discount: {
      type: {
        type: String,
        require: [true, "Please provide a type"],
        enum: ["value", "percentage"],
      },
      value: {
        type: String,
        require: [true, "Please provide a value"],
      },
      startDate: { type: Date, require: [true, "Please provide a start date"] },
      endDate: { type: Date, require: [true, "Please provide a end date"] },
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel =
  mongoose.models.products ||
  mongoose.model("products", productSchema, "products");

export default ProductModel;
