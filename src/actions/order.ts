"use server";
import { cookies } from "next/headers";

export const toggleProductInOrder = async (payload: any) => {
  const cookie = cookies().get("orders")?.value;
  if (!cookie) {
    cookies().set("orders", JSON.stringify([payload]), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  } else {
    const orders = JSON.parse(cookie);
    const existedOrderIndex = orders.findIndex(
      (order: any) => order.product._id === payload.product._id
    );
    if (existedOrderIndex !== -1) {
      orders.splice(existedOrderIndex, 1);
      cookies().set("orders", JSON.stringify(orders), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
    } else {
      orders.push(payload);
      cookies().set("orders", JSON.stringify(orders), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
    }
  }
};

export const getProductInOrder = async () => {
  const cookie = cookies().get("orders")?.value;
  if (!cookie) {
    return [];
  } else {
    console.log(cookie.length);

    const parsedCookie = JSON.parse(cookie); // Refetch and parse
    console.log("cookie", parsedCookie);
    return parsedCookie;
  }
};
