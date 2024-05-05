"use client";
import ProductCard from "@/components/ProductCard";
import { IProduct } from "@/types";
import { useEffect, useRef, useState } from "react";
import { observerToFadeIn } from "@/lib/Ui/observerToFadeIn";
import { getFavoriteProducts } from "@/actions/auth";
interface IHomeProductList {
  productList: IProduct[];
  className?: string;
}

const HomeProductList = ({ productList, className }: IHomeProductList) => {
  // const [isDragging, setIsDragging] = useState<boolean>(false);
  const [favoriteProducts, setFavoriteProducts] = useState<IProduct[]>([]);
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

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFavoriteProducts();
      const productList = data.data.favoriteProducts.map(
        (fp: any) => fp.product
      );
      setFavoriteProducts(productList);
    };
    fetchData();
  }, []);
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
            favorited={
              favoriteProducts?.find((fp) => fp._id === pro._id) ? true : false
            }
          />
        ))}
      </div>
    </div>
  );
};

export default HomeProductList;
