import { getProfile } from "@/actions/auth";
import AuthSections from "@/components/Auth/AuthSections";
import ProfileCard from "@/components/Auth/ProfileCard";
import AuthBanner from "@/images/auth_bg.png";
import Image from "next/image";
const Auth = async () => {
  const userInfo = await getProfile();
  console.log(userInfo);

  return (
    <main>
      <div className="relative">
        <Image
          width={0}
          height={0}
          sizes="100%"
          className="w-full"
          src={AuthBanner}
          alt="Auth Banner"
        />
        <div className="absolute text-white w-1/2 flex items-end flex-col top-1/4 right-8 z-10">
          <h1 className="font-bold text-4xl mb-4">
            HELLO, {userInfo?.firstName}
          </h1>
          <p className="text-2xl w-1/2">
            You can edit your personal information, manage your shopping cart
            and track order progress
          </p>
        </div>
        <div className="w-full h-full absolute top-0 left-0 bg-gray-400 backdrop-filter backdrop-blur-sm bg-opacity-10"></div>
      </div>
      <div className="w-[calc(100%-160px)] mx-auto flex gap-8 -translate-y-[10%]">
        <AuthSections className="flex-grow-[4] bg-cs_secondary_black rounded-xl p-8 h-[500px]" />
        <ProfileCard className="flex-grow-[1]" userInfo={userInfo} />
      </div>
    </main>
  );
};

export default Auth;
