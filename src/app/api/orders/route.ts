import ProductModel from "@/models/productModel";
import OrderModel from "@/models/orderModel";
import { connect } from "@/database/config";
import { decrypt } from "@/lib/session";
import { IUser } from "@/types";
import UserModel from "@/models/userModel";

connect();

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    const session = authHeader && authHeader.split(" ")[1];
    if (!session) return Response.json({ message: "No session found" });
    const decoded = await decrypt(session);
    const userInfo = decoded?.userInfo as IUser;
    const reqBody = await req.json();
    const { products } = reqBody; // { product, quantity, price }

    const existedCart = await OrderModel.findOne({ userId: userInfo._id });
    if (existedCart) {
    }
    const totalPrice = products.reduce(
      (acc: number, product: any) => acc + product.price * product.quantity
    );
    const order = await OrderModel.create({
      userId: userInfo._id,
      products,
      totalPrice,
    });
    return Response.json({ message: "success", data: order });
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
