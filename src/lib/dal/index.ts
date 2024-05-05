// // import "server-only";
// "use server";
// import { cookies } from "next/headers";
// import { decrypt } from "@/lib/session";
// import { cache } from "react";
// import { redirect } from "next/navigation";

// export const verifySession = async () => {
//   const cookie = cookies().get("session")?.value;
//   const session = await decrypt(cookie);

//   // if (!session?.userInfo) {
//   //   redirect("/auth/login");
//   // }

//   return session;
// };
