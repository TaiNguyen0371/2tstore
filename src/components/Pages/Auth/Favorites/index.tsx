import { getFavoriteProducts } from "@/actions/auth";
import LoadingSection from "@/components/Layout/LoadingSection";
import ProductCard from "@/components/ProductCard";
import { IProduct } from "@/types";
import { useEffect, useState } from "react";

const Favorites = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [productList, setProductList] = useState<IProduct[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getFavoriteProducts();
      const productList = data.data.favoriteProducts.map(
        (fp: any) => fp.product
      );
      setProductList(productList);
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold my-8">Favorites</h1>
      <div className="relative">
        {loading && (
          <LoadingSection className="z-20 !w-[calc(100%+64px)] !h-[calc(100%+64px)] -translate-x-[32px] -translate-y-[32px]" />
        )}
        <div className="flex flex-wrap min-h-[500px] gap-4">
          {!loading && productList?.length === 0 && <p>No favorite products</p>}
          {productList?.map((product, index: number) => (
            <ProductCard
              className="!w-[calc(100%/3-32px/3)]"
              key={index}
              productInfo={product}
              favorited={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
