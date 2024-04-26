import { connect } from "@/database/config";
import ProductModel from "@/models/productModel";
import CategoryModel from "@/models/categoryModel";
import FileModel from "@/models/fileModel";
import { NextRequest } from "next/server";
connect();

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const filter = searchParams.get("filter");
    const limit = searchParams.get("limit");
    let product = null;
    switch (filter) {
      case "hot":
        product = await ProductModel.find({ isBanner: true })
          .sort({ createdAt: -1 })
          .limit(Number(limit) || 1000000)
          .populate({ path: "category", model: CategoryModel })
          .populate({ path: "images", model: FileModel });
        break;
      case "new":
        product = await ProductModel.find()
          .sort({ createdAt: -1 })
          .limit(Number(limit) || 1000000)
          .populate({ path: "category", model: CategoryModel })
          .populate({ path: "images", model: FileModel });
        break;
      default:
        product = await ProductModel.find()
          .populate({ path: "category", model: CategoryModel })
          .populate({ path: "images", model: FileModel });
        break;
    }
    return Response.json({ message: "Success", data: product });
  } catch (error: any) {
    return Response.json(
      { message: "Could not find product", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { name, category, price, description, images, sizes, discount } =
      reqBody;
    const data = await ProductModel.create({
      name,
      category,
      price,
      description,
      images,
      sizes,
      discount,
    });

    const product = await ProductModel.findById(data._id)
      .populate({ path: "category", model: CategoryModel })
      .populate({ path: "images", model: FileModel });
    return Response.json({ message: "Create product success", data: product });
  } catch (error: any) {
    return Response.json(
      { message: "Could not create product", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const update = await req.json();
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      update,
      { new: true }
    );
    return Response.json({
      message: "Update product success",
      data: updatedProduct,
    });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return Response.json(
        {
          message: "Validation error",
          errors: error.errors,
        },
        { status: 400 }
      );
    }
    return Response.json(
      { message: "Could not update product", error: error.message },
      { status: 500 }
    );
  }
}

