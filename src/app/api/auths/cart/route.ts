import UserModel from "@/models/userModel";
import CartModel from "@/models/cartModel";
import ProductCard from "@/components/ProductCard";
import CategoryModel from "@/models/categoryModel";
import FileModel from "@/models/fileModel";
import { connect } from "@/database/config";
import { NextRequest } from "next/server";
import { decrypt } from "@/lib/session";
import { IUser } from "@/types";
import ProductModel from "@/models/productModel";

connect();

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    const session = authHeader && authHeader.split(" ")[1];
    if (!session) return Response.json({ message: "No session found" });
    const decoded = await decrypt(session);
    const userInfo = decoded?.userInfo as IUser;
    const userCart = await CartModel.findOne({ user: userInfo._id })
      .populate({
        path: "user",
        model: UserModel,
      })
      .populate({
        path: "items",
        populate: {
          path: "product",
          model: ProductModel,
          populate: [
            { path: "category", model: CategoryModel },
            { path: "images", model: FileModel },
          ],
        },
      });
    if (!userCart) {
      return Response.json({ message: "success", data: null });
    }
    return Response.json({ message: "success", data: userCart });
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    const session = authHeader && authHeader.split(" ")[1];
    if (!session) return Response.json({ message: "No session found" });
    const decoded = await decrypt(session);
    const userInfo = decoded?.userInfo as IUser;
    const reqBody = await req.json();
    console.log(reqBody);
    const { product, quantity, size } = reqBody;
    const existedCart = await CartModel.findOne({ user: userInfo._id });
    if (existedCart) {
      const existingProductIndex = existedCart.products.findIndex(
        (p: any) => p.product.toString() === product
      );
      if (existingProductIndex !== -1) {
        existedCart.products[existingProductIndex].quantity += quantity;
      } else {
        existedCart.products.push({ product, quantity });
      }
      await existedCart.save();
      return Response.json({ message: "success", data: existedCart });
    } else {
      const cart = await CartModel.create({
        user: userInfo._id,
        items: [{ product: product, quantity, size }],
      });
      console.log(cart);
      return Response.json({ message: "success", data: cart });
    }
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
