import Image from "next/image";
import AmbassadorCard from "@/components/AmbassadorCard";
import HomeCarousel from "@/components/Pages/Home/HomeCarousel";
import { fetchAmbassador, fetchCarousel, fetchNew } from "@/actions/product";
import { IAmbassador } from "@/types";
import Button from "@/components/Button";
import HomeProductListBG from "@/images/home_product_list_bg.png";
import PredatorSeriesBG from "@/images/predator_series_bg.png";
import ProductCard from "@/components/ProductCard";
import AmbassadorBanner from "@/components/Pages/Home/AmbassadorBanner";
import HomeProductList from "@/components/Pages/Home/HomeProductList";
import { verifySession } from "@/actions/auth";
import { createContext, useContext } from "react";

export default async function Home() {
  const carouselPros = await fetchCarousel();
  const ambassadorList = await fetchAmbassador();
  const newProducts = await fetchNew();
  
  return (
    <main className="">
      <HomeCarousel carouselPros={carouselPros} />
      <AmbassadorBanner ambassadorList={ambassadorList} />
      <div className="relative w-[calc(100%-160px)] min-h-[600px] my-8 gap-16 mx-auto">
        <Image
          className="w-full h-full rounded-xl object-cover"
          alt="2T Store"
          src={HomeProductListBG}
          width={0}
          height={0}
          sizes="100%"
        />
        <div className="absolute top-1/2 left-0 w-1/3 px-8 -translate-y-1/2 h-1/2 flex flex-col gap-8">
          <h1 className="text-4xl font-bold">New Collection</h1>
          <b className="font-semibold">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus
            atque eius perferendis quasi praesentium, aspernatur deserunt
            impedit ex omnis non aliquid assumenda consequuntur cumque ratione
            nesciunt sit dolore, maiores natus.
          </b>
          <Button className="!bg-cs_tertiary_black !text-white">Buy now</Button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 w-1/2">
          <HomeProductList productList={newProducts} />
        </div>
      </div>
      <div className="relative w-[calc(100%-160px)] min-h-[600px] my-8 gap-16 mx-auto">
        <Image
          className="w-full h-full rounded-xl object-cover"
          alt="2T Store"
          width={0}
          height={0}
          sizes="100%"
          src={PredatorSeriesBG}
        />
        <div className="absolute right-1/4 translate-x-1/2 top-1/2 translate-y-1/2">
          <Button>View Now</Button>
        </div>
      </div>
    </main>
  );
}
