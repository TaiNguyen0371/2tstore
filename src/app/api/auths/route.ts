import UserModel from "@/models/userModel";
import { connect } from "@/database/config";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { IUser } from "@/types";
import { verifySession } from "@/actions/auth";

connect();

export async function GET(req: NextRequest) {
  try {
    const session = await verifySession();
    if (!session.isAuth) return Response.json({ message: "No session found" });
    const userInfo = session?.session?.userInfor as IUser;
    if (userInfo.role !== "admin")
      return Response.json({ message: "Not admin" });
    const users = await UserModel.find();
    return Response.json({ message: "success", data: users });
  } catch (err: any) {
    return Response.json(
      { message: "Could not get user", error: err.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const authHeader = req.headers.get("Authorization");
    const session = authHeader && authHeader.split(" ")[1];
    if (!session) return Response.json({ message: "No session found" });
    const decoded = await decrypt(session);
    
    const userInfo = decoded?.userInfo as IUser;
    console.log("api:" , userInfo);
    
    const updatedUser = await UserModel.findByIdAndUpdate(
      userInfo?._id,
      reqBody,
      { new: true }
    );
    return Response.json({ message: "success", data: updatedUser });
  } catch (err: any) {
    return Response.json(
      { message: "Could not update user", error: err.message },
      { status: 500 }
    );
  }
}
