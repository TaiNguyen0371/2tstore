import { connect } from "@/database/config";
import ProductModel from "@/models/productModel";
import CategoryModel from "@/models/categoryModel";
import FileModel from "@/models/fileModel";
connect();

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const product = await ProductModel.findOne({ slug: slug })
      .populate({ path: "category", model: CategoryModel })
      .populate({ path: "images", model: FileModel });
    return Response.json({ message: "Success", data: product });
  } catch (error: any) {
    return Response.json(
      { message: "Could not get product", error: error.message },
      { status: 500 }
    );
  }
}
