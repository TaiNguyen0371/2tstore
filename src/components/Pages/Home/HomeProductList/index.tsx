"use client";
import ProductCard from "@/components/ProductCard";
import { IProduct } from "@/types";
import { useEffect, useRef, useState } from "react";
import { observerToFadeIn } from "@/lib/Ui/observerToFadeIn";
interface IHomeProductList {
  productList: IProduct[];
  className?: string;
}

const HomeProductList = ({ productList, className }: IHomeProductList) => {
  // const [isDragging, setIsDragging] = useState<boolean>(false);
  const wrapperRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    const observer = observerToFadeIn();
    const wrapper = wrapperRef.current;
    if (wrapper) {
      observer.observe(wrapper);
    }
    return () => {
      if (wrapper) {
        observer.unobserve(wrapper);
      }
    };
  }, []);

  useEffect(() => {
    let isDragging = false;
    const wrapper = wrapperRef.current;
    const dragging = (e: any): void => {
      if (wrapper) {
        if (!isDragging) return;
        e.preventDefault();
        console.log("dragging", e.movementX);
        if (wrapper.scrollLeft !== undefined) {
          wrapper.scrollLeft -= e.movementX;
        }
      }
    };
    if (wrapper) {
      wrapper.addEventListener("mousemove", dragging);
      wrapper.addEventListener("mousedown", () => {
        isDragging = true;
      });
      wrapper.addEventListener("mouseup", () => {
        isDragging = false;
      });
    }
    return () => {
      if (wrapper) {
        wrapper.removeEventListener("mousemove", dragging);
        wrapper.removeEventListener("mouseup", () => (isDragging = false));
        wrapper.removeEventListener("mousedown", () => (isDragging = true));
      }
    };
  }, [wrapperRef]);

  return (
    <div
      ref={wrapperRef}
      className={`${className} p-10 w-full transition-all overflow-x-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_100px,_black_calc(100%-100px),transparent_100%)]`}
    >
      <div className="w-fit flex gap-8">
        {productList?.map((pro, index) => (
          <ProductCard
            key={index}
            productInfo={pro}
            className="cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
};

export default HomeProductList;
