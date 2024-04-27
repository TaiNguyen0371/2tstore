import Carousel from "@/components/Pages/ProductDetail/Carousel";
import Informations from "@/components/Pages/ProductDetail/Informations";
import { fetchBySlug } from "@/actions/product";
import Link from "next/link";
const ProductDetail = async ({ params }: { params: { slug: string } }) => {
  const productDetail = await fetchBySlug(params.slug);
  return (
    <div className="mt-40 mb-20 w-[calc(100%-160px)] mx-auto min-h-screen flex flex-col gap-8 items-center">
      {/* Link */}
      <div className="text-white text-lg font-semibold w-full">
        <Link href={""}>Home</Link>
        <span> / </span>
        <Link href={`/p/${params.slug}`}>{productDetail?.name}</Link>
      </div>
      {/* Detail */}

      <div className="w-4/5 rounded-xl p-8 flex gap-8">
        <Carousel productImgs={productDetail?.images} className="w-3/5" />
        <Informations productInfor={productDetail} className="w-2/5" />
      </div>
      <div className="w-full">
        <h1 className="uppercase text-2xl text-white font-bold">
          Perfect your style
        </h1>
      </div>
      <div className="w-full">
        <h1 className="uppercase text-2xl text-white font-bold">
          Others also bought
        </h1>
      </div>
    </div>
  );
};

export default ProductDetail;
