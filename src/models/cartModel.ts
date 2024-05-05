import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please provide a user id"],
      ref: "users",
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: [true, "Please provide a product id"],
          ref: "products",
        },
        quantity: {
          type: Number,
          required: [true, "Please provide a quantity"],
          min: 1,
        },
        size: {
          type: String,
          required: [true, "Please provide a size"],
        },
      },
    ],
  },
  { timestamps: true }
);

const CartModel =
  mongoose.models.carts || mongoose.model("carts", cartSchema, "carts");

export default CartModel;
