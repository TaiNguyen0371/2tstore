import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      require: [true, "Please provide a user id"],
    },
    favoriteProducts: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          require: [true, "Please provide a product id"],
        },
        addedAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const FavoriteModel =
  mongoose.models.favorites ||
  mongoose.model("favorites", favoriteSchema, "favorites");

export default FavoriteModel;
