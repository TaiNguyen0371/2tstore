import AmbassadorModel from "@/models/ambassadorModel";
import FileModel from "@/models/fileModel";
import ProductModel from "@/models/productModel";
import { connect } from "@/database/config";
import CategoryModel from "@/models/categoryModel";

connect();
export async function GET() {
  try {
    const ambassador = await AmbassadorModel.find()
      .populate({
        path: "product",
        populate: [
          { path: "images", model: FileModel },
          { path: "category", model: CategoryModel },
        ],
        model: ProductModel,
      })
      .populate({ path: "image", model: FileModel });
    return Response.json({ message: "Success", data: ambassador });
  } catch (error: any) {
    return Response.json(
      { message: "Could not get ambassador", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    const { name, image, product } = reqBody;
    const ambassador = await AmbassadorModel.create({
      name,
      image,
      product,
    });
    return Response.json({ message: "Success", data: ambassador });
  } catch (error: any) {
    return Response.json(
      { message: "Could not create ambassador", error: error.message },
      { status: 500 }
    );
  }
}
