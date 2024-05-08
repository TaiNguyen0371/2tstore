import UserModel from "@/models/userModel";
import { connect } from "@/database/config";
import bcrypt from "bcrypt";

connect();

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    const { firstName, lastName, email, password } = reqBody;
    const existsUser = await UserModel.findOne({ email });
    if (existsUser) {
      return Response.json({ message: "User already exists" });
    } else {
      const hasedPassword = await bcrypt.hash(password, 10);
      const data = await UserModel.create({
        firstName,
        lastName,
        email,
        password: hasedPassword,
      });
      const user = await UserModel.findById(data._id).select("-password");
      return Response.json({ message: "User created", data: user });
    }
  } catch (error: any) {
    return Response.json(
      { message: "Could not create user", error: error.message },
      { status: 500 }
    );
  }
}
