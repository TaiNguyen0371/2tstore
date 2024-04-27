import { IProduct } from "@/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
interface IProductCardProps {
  productInfo: IProduct;
  className?: string;
}

const ProductCard = ({ productInfo, className }: IProductCardProps) => {
  return (
    <Link href={`/p/${productInfo.slug}`} className={`${className}`}>
      <div
        className={`overflow-hidden group whitespace-nowrap border-l-[1px] border-t-[1px] relative rounded-2xl bg-cs_secondary_black w-[350px] h-[300px]`}
      >
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
        <Icon
          className="text-white size-8 absolute duration-500 left-2 top-2 -translate-x-[calc(100%+8px)] group-hover:-translate-x-0 transition-all"
          icon="ph:heart"
        />
        <Icon
          className="text-white size-8 absolute duration-500 right-2 top-2 translate-x-[calc(100%+8px)] group-hover:translate-x-0 transition-all"
          icon="mdi:cart-outline"
        />
      </div>
    </Link>
  );
};

export default ProductCard;
