"use client";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import SearchIpt from "../../SearchIpt";
import { Icon } from "@iconify/react/dist/iconify.js";
import toast from "react-hot-toast";
import { verifySession, signOut } from "@/actions/auth";
interface INavBarProps {
  className?: string;
  isSignedIn?: boolean;
}
const NavBar = ({ className, isSignedIn }: INavBarProps) => {
  const [openNav, setOpenNav] = useState(false);
  // const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
    return () => {
      window.removeEventListener(
        "resize",
        () => window.innerWidth >= 960 && setOpenNav(false)
      );
    };
  }, []);

  // useEffect(() => {
  //   const checkLogin = async () => {
  //     const data = await verifySession();
  //     console.log(data);

  //     if (data.isAuth) setIsSignedIn(true);
  //   };
  //   checkLogin();
  // },[]);

  useEffect(() => {
    if (isSignedIn) {
      toast.success("Sign in successfully");
    }
  }, [isSignedIn]);

  const handleSignOut = async () => {
    await signOut();
    toast.success("Sign out successfully");
  };

  const navList = [
    {
      name: "Home",
      href: "/",
      icon: "",
    },
    {
      name: "Categories",
      href: "/categories",
      icon: "",
    },
    {
      name: "About",
      href: "/about",
      icon: "",
    },
    {
      name: "Contact",
      href: "/contact",
      icon: "",
    },
  ];
  return (
    <div className={`flex items-center px-10 gap-40 ${className}`}>
      <div className={`flex items-center gap-[5px]`}>
        <SearchIpt />
        <Navbar className="!backdrop-saturate-0 !px-0 py-2 lg:px-8 lg:py-4 !w-fit !h-fit !bg-transparent !backdrop-blur-none !backdrop-filter-none border-none shadow-none">
          <div className="flex items-center justify-between text-blue-gray-900">
            <div className="flex items-center gap-4">
              <div className="mr-4 hidden lg:block text-base">
                <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                  {navList?.map((item) => (
                    <Typography
                      key={item.name}
                      as="li"
                      className="text-white p-1 font-semibold"
                    >
                      <Link href={item.href} className="flex items-center">
                        {item.name}
                      </Link>
                    </Typography>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Navbar>
      </div>
      <div className="flex gap-5">
        <Link href={"/auth/cart"}>
          <Icon
            className="size-8 text-white"
            icon="material-symbols:shopping-cart"
          />
        </Link>

        {!isSignedIn ? (
          <Link href={"/auth/signin"}>
            <Icon
              className="size-8 text-white"
              icon="material-symbols:person"
            />
          </Link>
        ) : (
          <Menu allowHover={true}>
            <MenuHandler>
              <Icon
                className="size-8 text-white"
                icon="material-symbols:person"
              />
            </MenuHandler>
            <MenuList className="bg-cs_secondary_black border-none text-white">
              <Link href={"/auth"}>
                <MenuItem className="hover:!bg-cs_tertiary_black hover:!text-white">
                  Profile
                </MenuItem>
              </Link>
              <Link href={"/auth/cart"}>
                <MenuItem className="hover:!bg-cs_tertiary_black hover:!text-white">
                  Cart
                </MenuItem>
              </Link>
              <MenuItem
                onClick={handleSignOut}
                className="hover:!bg-cs_tertiary_black hover:!text-white size-full"
              >
                Sign Out
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </div>
    </div>
  );
};
export default NavBar;
