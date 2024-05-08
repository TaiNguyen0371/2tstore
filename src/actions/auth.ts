"use server";
import { createSession, decrypt, deleteSession } from "@/lib/session";
import { IUser } from "@/types";
import { cookies } from "next/headers";
import { Jwt, JwtPayload, decode } from "jsonwebtoken";
import { redirect } from "next/navigation";
export const signUp = async (formData: any) => {
  const res = await fetch(process.env.URL + "/api/auths/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  if (res.status === 200) {
    await createSession(data.data);
    redirect("/");
  }
  return data;
};

export const signIn = async (formData: any) => {
  const res = await fetch(process.env.URL + "/api/auths/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  if (res.status === 200) {
    await createSession(data.data);
    redirect("/");
  }
  return data;
};

export const verifySession = async () => {
  const cookie = cookies().get("session")?.value;
  // console.log("cookie", cookie);

  const session = await decrypt(cookie);
  const userInfo = session?.userInfo as IUser;
  if (!session || !userInfo) return { isAuth: false, session: null };
  return { isAuth: true, session: session };
};

export const signOut = async () => {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);
  const userInfo = session?.userInfo as IUser;
  if (!session || !userInfo) return null;
  await deleteSession();
  redirect("/auth/signin");
};

export const getProfile = async () => {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);
  const userInfo = session?.userInfo as IUser;
  if (!session || !userInfo) return null;
  return userInfo;
};

export const updateProfile = async (formData: any) => {
  const res = await fetch(process.env.URL + "/api/auths", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("session")?.value}`,
    },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  await createSession(data.data);
  return data;
};

export const refreshToken = async (token: string) => {
  const decoded = decode(token, { complete: true }) as Jwt;
  const payload = decoded.payload as JwtPayload;
  // Check if token is valid (not expired)
  if (!decoded || !payload.exp || Date.now() >= payload.exp * 1000) {
    await createSession(payload.userInfo as IUser);
  }
};

export const setFavoriteProduct = async (productId: string) => {
  const res = await fetch(process.env.URL + "/api/auths/favorite", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("session")?.value}`,
    },
    body: JSON.stringify({ productId: productId }),
  });
  // const data = await res.json();
  // return data;
};

export const getFavoriteProducts = async () => {
  const res = await fetch(process.env.URL + "/api/auths/favorite", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("session")?.value}`,
    },
  });
  const data = await res.json();
  if (data) return data;
  return null;
};

export const getCart = async () => {
  const res = await fetch(process.env.URL + "/api/auths/cart", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("session")?.value}`,
    },
  });
  const data = await res.json();
  if (data) return data;
  return null;
};

export const addToCart = async ({
  productId,
  quantity = 1,
  size = "39",
}: {
  productId: string;
  quantity?: number;
  size?: string;
}) => {
  const res = await fetch(process.env.URL + "/api/auths/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("session")?.value}`,
    },
    body: JSON.stringify({ product: productId, quantity, size }),
  });
  const data = await res.json();
  if (data) return data;
  return null;
};

export const removeFromCart = async (productId: string) => {
  const res = await fetch(process.env.URL + "/api/auths/cart", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("session")?.value}`,
    },
    body: JSON.stringify({ product: productId }),
  });
  const data = await res.json();
  if (data) return data;
  return null;
};
