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
    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }
    return () => {
      if (wrapperRef.current) {
        observer.unobserve(wrapperRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let isDragging = false;
    const dragging = (e: any): void => {
      if (wrapperRef.current) {
        if (!isDragging) return;
        e.preventDefault();
        console.log("dragging", e.movementX);
        if (wrapperRef.current.scrollLeft !== undefined) {
          wrapperRef.current.scrollLeft -= e.movementX;
        }
      }
    };
    if (wrapperRef.current) {
      wrapperRef.current.addEventListener("mousemove", dragging);
      wrapperRef.current.addEventListener("mousedown", () => {
        isDragging = true;
      });
      wrapperRef.current.addEventListener("mouseup", () => {
        isDragging = false;
      });
    }
    return () => {
      if (wrapperRef.current) {
        wrapperRef.current.removeEventListener("mousemove", dragging);
        wrapperRef.current.removeEventListener(
          "mouseup",
          () => (isDragging = false)
        );
        wrapperRef.current.removeEventListener(
          "mousedown",
          () => (isDragging = true)
        );
      }
    };
  }, [wrapperRef]);

  return (
    <div
      ref={wrapperRef}
      className={`${className} p-10 w-full transition-all overflow-x-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_100px,_black_calc(100%-100px),transparent_100%)]`}
    >
      <div className="w-fit flex gap-8">
        {productList.map((pro, index) => (
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
