"use client";

import Image from "next/image";
import logo from "@/images/logo.png";

import NavBar from "@/components/Layout/NavBar";
import { useEffect, useState } from "react";
import Link from "next/link";
import SearchIpt from "../../SearchIpt";
import useScroll from "@/hooks/useScroll";
interface IHeaderProps {
  className?: string;
  signedIn?: boolean;
}
const Header = (props: IHeaderProps) => {
  const { isScrollDown } = useScroll();

  return (
    <header
      style={{
        transform: isScrollDown ? "translateY(-100%)" : "",
      }}
      className={`
      fixed w-full h-20 flex items-center justify-between top-0 left-0 px-10
      shadow-gray-700 shadow-sm backdrop-blur-lg bg-opacity-40
      transition-transform transition-1000 ease-linear z-50
      ${props.className}`}
    >
      <div>
        <Link href="/">
          <Image src={logo} className="size-20" alt="2T Store" />
        </Link>
      </div>
      <NavBar className="" isSignedIn={props.signedIn} />
    </header>
  );
};

export default Header;
