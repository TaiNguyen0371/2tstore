import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { IUser } from "./types";
import { verifySession } from "./actions/auth";

// 1. Specify protected and public routes
const protectedRoutes = ["/admin", "/cart", "/auth"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  const session = await verifySession();
  // console.log("ss: ", session);

  if (!isProtectedRoute) return NextResponse.next();
  if (!session)
    return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
  const userInfo = session.session?.userInfo as IUser;

  if (userInfo && req.nextUrl.pathname.startsWith("/admin")) {
    if (userInfo.role === "admin") {
      return NextResponse.redirect(new URL("/admin", req.nextUrl));
    } else {
      return NextResponse.redirect(new URL("/forbiden", req.nextUrl));
    }
  }

  if (path.includes("/signin") || path.includes("/signup")) {
    if (userInfo) {
      return NextResponse.redirect(new URL("/auth", req.nextUrl));
    } else {
      return NextResponse.next();
    }
  }
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
