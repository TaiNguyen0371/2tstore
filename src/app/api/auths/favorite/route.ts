import UserModel from "@/models/userModel";
import FavoriteModel from "@/models/favoriteModel";

import { connect } from "@/database/config";
import { NextRequest } from "next/server";
import { decrypt } from "@/lib/session";
import { IUser } from "@/types";
import ProductModel from "@/models/productModel";
import { populate } from "dotenv";
import CategoryModel from "@/models/categoryModel";
import path from "path";
import FileModel from "@/models/fileModel";
connect();

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    const session = authHeader && authHeader.split(" ")[1];
    if (!session) return Response.json({ message: "No session found" });
    const decoded = await decrypt(session);
    const userInfo = decoded?.userInfo as IUser;
    const userFavoriteList = await FavoriteModel.findOne({
      userId: userInfo._id,
    })
      .populate({ path: "userId", model: UserModel })
      .populate({
        path: "favoriteProducts",
        populate: {
          path: "product",
          model: ProductModel,
          populate: [
            { path: "category", model: CategoryModel },
            { path: "images", model: FileModel },
          ],
        },
      });
    if (!userFavoriteList)
      return Response.json({ message: "success", data: [] });
    return Response.json({ message: "success", data: userFavoriteList });
  } catch (err: any) {
    return Response.json(
      { message: "Could not get user", error: err.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const authHeader = req.headers.get("Authorization");
    const session = authHeader && authHeader.split(" ")[1];
    if (!session) return Response.json({ message: "No session found" });
    const decoded = await decrypt(session);
    const userInfo = decoded?.userInfo as IUser;
    const { productId } = reqBody;
    const userFavoriteList = await FavoriteModel.findOne({
      userId: userInfo._id,
    });

    if (!userFavoriteList) {
      const data = await FavoriteModel.create({
        userId: userInfo._id,
        favoriteProducts: [
          {
            product: productId,
          },
        ],
      });

      return Response.json({ message: "success", data });
    }
    const existingProductIndex = userFavoriteList.favoriteProducts.findIndex(
      (p: any) => p.product.toString() === productId
    );
    if (existingProductIndex !== -1) {
      userFavoriteList.favoriteProducts.splice(existingProductIndex, 1);
      // console.log("remove: ", userFavoriteList);
      await userFavoriteList.save();
      return Response.json({ message: "success", data: userFavoriteList });
    }
    userFavoriteList.favoriteProducts.push({ product: productId });
    // console.log("add: ", userFavoriteList);
    await userFavoriteList.save();
    return Response.json({ message: "success", data: userFavoriteList });
  } catch (err: any) {
    return Response.json(
      { message: "Could not update user", error: err.message },
      { status: 500 }
    );
  }
}
