"use client";

import { refreshToken } from "@/actions/auth";
import { useEffect } from "react";

interface IAppProvider {
  children: React.ReactNode;
  token: string | undefined;
}
const AppProvider = ({ children, token }: IAppProvider) => {
  useEffect(() => {
    if (!token) return;
    refreshToken(token);
  }, []);
  return <>{children}</>;
};

export default AppProvider;
