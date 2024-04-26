import { connect } from "@/database/config";
import CategoryModel from "@/models/categoryModel";

connect();

export async function GET() {
  try {
    const categories = await CategoryModel.find();
    return Response.json({ message: "success", data: categories });
  } catch (error: any) {
    return Response.json(
      {
        message: "Could not get categories",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
