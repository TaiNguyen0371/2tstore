import ProductModel from "@/models/productModel";
import CategoryModel from "@/models/categoryModel";
import FileModel from "@/models/fileModel";
import { connect } from "@/database/config";

connect();
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;
    const reqBody = await req.json();
    const { size, quantity } = reqBody;
    const product = await ProductModel.findById(productId)
      .populate({ path: "category", model: CategoryModel })
      .populate({ path: "images", model: FileModel });
    if (!product) {
      return Response.json(
        {
          message: "Could not get product",
        },
        { status: 404 }
      );
    }

    const sizeIndex = product.sizes.findIndex((s: any) => s.size === size);
    if (sizeIndex === -1) {
      return Response.json(
        {
          message: "Size not found in product",
        },
        { status: 404 }
      );
    }

    product.sizes[sizeIndex].quantity = quantity;
    await product.save();
    return Response.json({ message: "Success", data: product });
  } catch (error: any) {
    return Response.json({
      message: "Could not get product",
      error: error.message,
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;
    const reqBody = await req.json();
    const { size } = reqBody;
    const product = await ProductModel.findById(productId)
      .populate({ path: "category", model: CategoryModel })
      .populate({ path: "images", model: FileModel });
    if (!product) {
      return Response.json(
        {
          message: "Could not get product",
        },
        { status: 404 }
      );
    }

    const sizeIndex = product.sizes.findIndex((s: any) => s.size === size);
    if (sizeIndex === -1) {
      return Response.json(
        {
          message: "Size not found in product",
        },
        { status: 404 }
      );
    }

    product.sizes.splice(sizeIndex, 1);
    await product.save();
    return Response.json({ message: "Success", data: product });
  } catch (error: any) {
    return Response.json({
      message: "Could not get product",
      error: error.message,
    });
  }
}
