"use server";
import { createSession, decrypt, deleteSession } from "@/lib/session";
import { IUser } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const signUp = async (formData: any) => {
  const res = await fetch("http://localhost:3000/api/users/signup", {
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
  const res = await fetch("http://localhost:3000/api/users/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  if (res.status === 200) {
    console.log("data: ", data.data);
    await createSession(data.data);
    redirect("/");
  }
  return data;
};

export const checkSignedIn = async () => {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);
  const userInfo = session?.userInfo as IUser;
  if (!session || !userInfo) return false;
  return true;
};

export const signOut = async () => {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);
  const userInfo = session?.userInfo as IUser;
  if (!session || !userInfo) return null;
  await deleteSession();
  redirect("/auth/signin");
};
