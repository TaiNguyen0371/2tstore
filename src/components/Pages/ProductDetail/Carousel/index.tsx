"use client";
import { IFile } from "@/types";
import { useState } from "react";

interface ICarousel {
  productImgs: IFile[];
  className?: string;
}
const Carousel = ({ productImgs, className }: ICarousel) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className={`${className} flex gap-8 justify-between`}>
      {/* Left */}
      <div>
        <ul className="flex flex-col gap-4">
          {productImgs?.map((img: IFile, index: number) => (
            <li
              // style={activeIndex === index ? { border: "1px solid #FEDF00" } : {}}
              onClick={() => handleClick(index)}
              key={index}
              className={`${activeIndex === index ? "border-[1px] border-cs_primary_yellow bg-cs_tertiary_black" : ""} size-32 bg-cs_secondary_black rounded-xl p-2 cursor-pointer`}
            >
              <img
                src={img.url}
                alt={"2T Store"}
                className="w-full h-full object-cover select-none"
              />
            </li>
          ))}
        </ul>
      </div>
      {/* // Right */}
      <div className="bg-cs_secondary_black rounded-xl p-2 min-h-[750px] grid place-items-center">
        <img
          src={productImgs[activeIndex].url}
          alt=""
          className="w-3/4 h-auto select-none object-cover"
        />
      </div>
    </div>
  );
};

export default Carousel;
