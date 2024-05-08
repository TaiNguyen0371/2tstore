import UserModel from "@/models/userModel";
import { connect } from "@/database/config";
import bcrypt from "bcrypt";
import { createSession } from "@/lib/session";

connect();

export async function POST(req: Request) {
  const reqBody = await req.json();
  const { email, password } = reqBody;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return Response.json({ message: "Incorrect password" }, { status: 401 });
  }
  return Response.json({ message: "User logged in", data: user });
}
