"use client";
import { Carousel } from "@material-tailwind/react";
import HomeCarouselBg from "@/images/carousel_background.png";
import Image from "next/image";
import { IProduct } from "@/types";
import Button from "@/components/Button";

interface IHomeCarouselProps {
  carouselPros: IProduct[];
}

const HomeCarousel = ({ carouselPros }: IHomeCarouselProps) => {

  return (
    <>
      <div className="relative h-screen overflow-hidden">
        <Image
         width={0}
         height={0}
         sizes="100%"
          src={HomeCarouselBg}
          alt="Home Carousel"
          className="absolute w-full h-full -z-10"
        />
        <Carousel
          loop
          autoplay
          autoplayDelay={3000}
          className="w-full h-full overflow-hidden"
        >
          {carouselPros?.map((pro: IProduct, index: number) => (
            <div key={index} className="h-full w-full flex items-center">
              <div className="w-full flex justify-between items-center gap-[10%]">
                <div className="p-8 pl-20 space-y-16 w-1/3">
                  <h1 className="text-5xl font-bold text-white">{pro.name}</h1>
                  <p className="text-xl font-semibold text-white">
                    {pro.description}
                  </p>
                  <Button>Buy now</Button>
                </div>
                <div className="w-2/3 h-full">
                  <Image
                    width={0}
                    height={0}
                    sizes="100%"
                    className="w-full h-auto object-cover -rotate-[20deg] select-none"
                    src={pro.images[0].url}
                    alt={pro.name}
                  />
                  {/* <Image
                    className="w-[800px] absolute top-0 left-0 object-cover rotate-45 -scale-x-100 translate-x-1/4 -translate-y-[10%]"
                    src={pro.images[0].url}
                    alt=""
                  /> */}
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default HomeCarousel;
