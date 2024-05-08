"use client";
import { getProfile } from "@/actions/auth";
import { IUser } from "@/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { userAgent } from "next/server";

interface IProfileCard {
  className?: string;
  userInfo?: IUser | null;
}
const ProfileCard = ({ className, userInfo }: IProfileCard) => {
  return (
    <div
      className={`${className} bg-cs_secondary_black h-[400px] rounded-xl p-8 pt-[132px] relative`}
    >
      <div className="size-[200px] bg-green-300 rounded-full absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 grid place-items-center">
        {userInfo?.avatar && (
          <Image src={userInfo.avatar} alt={"2T Store user avatar"} />
        )}
        {!userInfo?.avatar && (
          <h1 className="text-[100px]">{userInfo?.firstName.split("")[0]}</h1>
        )}
        <div
          className="
          size-10 rounded-full bg-white 
          absolute bottom-[calc(100px-sin(45deg)*100px)] right-[calc(100px-sin(45deg)*100px)] translate-y-1/2 translate-x-1/2 
          grid place-items-center
          "
        >
          <Icon
            className="text-black size-5 cursor-pointer"
            icon={"mdi:camera-outline"}
          />
        </div>
      </div>
      <div className="w-3/4 flex-col mx-auto flex items-center gap-4">
        <div className="w-full flex justify-between">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl">20</h1>
            <span>Favorites</span>
          </div>
          <div>
            <h1 className="text-2xl">20</h1>
            <span>Carts</span>
          </div>
        </div>
        <h1 className="text-center text-2xl">
          {userInfo?.firstName + " " + userInfo?.lastName}
        </h1>
        <h1>
          {userInfo?.phone ? userInfo?.phone : "No number phone"}
        </h1>
        <span>{userInfo?.city ? userInfo?.city : "No address"}</span>
      </div>
    </div>
  );
};

export default ProfileCard;
