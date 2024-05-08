import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      require: [true, "Please provide a user id"],
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          require: [true, "Please provide a product id"],
        },
        quantity: {
          type: Number,
          require: [true, "Please provide a quantity"],
        },
        price: {
          type: Number,
          require: [true, "Please provide a price"],
        },
      },
    ],
    totalPrice: {
      type: Number,
      require: [true, "Please provide a total price"],
    },
    status: {
      type: String,
      require: [true, "Please provide a status"],
      default: "pending",
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel =
  mongoose.models.orders || mongoose.model("orders", OrderSchema, "orders");
export default OrderModel;
