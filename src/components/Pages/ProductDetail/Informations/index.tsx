"use client";
import { IProduct } from "@/types";
import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/Button";
interface IInformations {
  productInfor: IProduct;
  className?: string;
}
const Informations = ({ productInfor, className }: IInformations) => {
  const [sizeIndex, setSizeIndex] = useState<number>(0);
  return (
    <div className={`${className} text-white flex flex-col gap-8`}>
     <div>
        <h1 className="font-bold text-3xl">{productInfor.name}</h1>
        <h1 className="text-lg font-bold">$ {productInfor.price}</h1>
     </div>
      <div className="min-h-[120px]">
        <span>Select size</span>
        <div className="flex gap-2 my-2 flex-wrap">
          {productInfor?.sizes?.map((size, index) => (
            <motion.button
              key={index}
              whileTap={{ scale: 0.7 }}
              className={`${
                sizeIndex === index
                  ? "bg-cs_primary_yellow text-cs_tertiary_black border-[2px] border-cs_primary_black"
                  : "text-white border-[1px] border-cs_primary_yellow"
              } transition-all w-[100px] h-[50px] rounded-2xl`}
              onClick={() => setSizeIndex(index)}
            >
              {size.size}
            </motion.button>
          ))}
        </div>
      </div>
      <div>
        <span className="font-bold text-lg">Descriptions</span>
        <p>{productInfor.description}</p>
      </div>
      <div>
        <Button className="w-full">Buy now</Button>
      </div>
    </div>
  );
};

export default Informations;
