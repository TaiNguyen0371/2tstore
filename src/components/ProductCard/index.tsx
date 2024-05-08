import {
  setFavoriteProduct,
  getFavoriteProducts,
  addToCart,
} from "@/actions/auth";
import { IProduct } from "@/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
interface IProductCardProps {
  productInfo: IProduct;
  className?: string;
  favorited: boolean;
}

const ProductCard = ({
  productInfo,
  className,
  favorited,
}: IProductCardProps) => {
  // console.log("prop", favorited);

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  useEffect(() => {
    setIsFavorite(favorited);
  }, [favorited]);

  const handleAddFavoriteProduct = async () => {
    await setFavoriteProduct(productInfo._id);
    setIsFavorite((prev) => !prev);
  };

  const handleAddToCart = async () => {
    const data = await addToCart({ productId: productInfo._id });
    if (data) {
      toast.success("Add to cart successfully");
    } else {
      toast.error("Add to cart failed");
    }
  };

  return (
    <div
      className={`${className} overflow-hidden group whitespace-nowrap border-l-[1px] border-t-[1px] border-cs_tertiary_black relative rounded-2xl bg-cs_secondary_black w-[350px] h-[300px] shadow-xl`}
    >
      <Link href={`/p/${productInfo.slug}`}>
        <div className="size-[200px] transition-all duration-500 group-hover:-rotate-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            width={0}
            height={0}
            sizes="100%"
            src={productInfo.images[0].url}
            alt={productInfo.name}
            className="w-full select-none"
          />
        </div>
        <div className="text-white p-4 transition-all duration-500 absolute bottom-0 translate-y-[100%] group-hover:translate-y-0">
          <span>{productInfo.name}</span> <br />
          <b>${productInfo.price}</b>
        </div>
      </Link>
      <Icon
        onClick={handleAddFavoriteProduct}
        color={isFavorite ? "red" : "white"}
        className={`cursor-pointer text-white size-8 absolute duration-500 left-2 top-2 -translate-x-[calc(100%+8px)] group-hover:-translate-x-0 transition-transform`}
        icon={isFavorite ? "mdi:heart" : "mdi:heart-outline"}
      />
      <Icon
        onClick={handleAddToCart}
        className="text-white cursor-pointer size-8 absolute duration-500 right-2 top-2 translate-x-[calc(100%+8px)] group-hover:translate-x-0 transition-all"
        icon="mdi:cart-outline"
      />
    </div>
  );
};

export default ProductCard;
