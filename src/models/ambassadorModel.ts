import mongoose from "mongoose";

const ambassadorSchema = new mongoose.Schema({
  name: { type: String, require: [true, "Please provide a name"] },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    require: [true, "Please provide a image"],
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    require: [true, "Please provide a product"],
    ref: "products",
  },
},{
  timestamps: true,
});

const AmbassadorModel =
  mongoose.models.ambassadors ||
  mongoose.model("ambassadors", ambassadorSchema, "ambassadors");
export default AmbassadorModel;
