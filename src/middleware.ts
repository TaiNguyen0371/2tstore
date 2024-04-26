import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { IUser } from "./types";

// 1. Specify protected and public routes
const protectedRoutes = ["/admin", "/cart"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  // 3. Decrypt the session from the cookie

  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  const userInfo = session?.userInfo as IUser;
  console.log("mdw: ", userInfo);

  // 5. Redirect to /login if the user is not authenticated
  // Note: Can't not redirect to private routes
  if (isProtectedRoute && !session?.userInfo) {
    return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
  }

  // 6. Redirect to /dashboard if the user is authenticated

  if (
    isProtectedRoute &&
    userInfo &&
    req.nextUrl.pathname.startsWith("/admin")
  ) {
    console.log("check role: ", userInfo.role === "admin");

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

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
