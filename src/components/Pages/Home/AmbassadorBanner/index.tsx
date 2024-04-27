"use client";
import Image from "next/image";
import Link from "next/link";
import DarkBG from "@/images/dark_bg.png";
import ProductShelf from "@/images/base.png";
import { IAmbassador } from "@/types";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState, Ref } from "react";
import Button from "@/components/Button";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
interface IAmbassadorBannerProps {
  ambassadorList: IAmbassador[];
  className?: string;
}
const AmbassadorBanner = ({
  ambassadorList,
  className,
}: IAmbassadorBannerProps) => {
  const ambassadorImgRefs = useRef<HTMLImageElement[]>([]);
  const [rotateDeg, setRotateDeg] = useState<number>(0);
  const [ambassadorProducts, setAmbassadorProducts] = useState<IAmbassador[]>(
    []
  );
  const [ambassadorImgs, setAmbassadorImgs] = useState<string[]>([]);
  useEffect(() => {
    setAmbassadorProducts(ambassadorList);
    setAmbassadorImgs(
      ambassadorList?.map((item) => item?.product?.images[0].url)
    );
  }, [ambassadorList]);

  const productCircleDoNext = () => {
    const newArr = ambassadorProducts.splice(1, ambassadorProducts?.length);
    newArr.push(ambassadorProducts[0]);
    setAmbassadorProducts(newArr);
    setRotateDeg((prev) => prev + 90);
  };
  const productCircleDoPrev = () => {
    if (rotateDeg > 0) {
      const newArr = ambassadorProducts.splice(
        0,
        ambassadorProducts.length - 1
      );
      newArr.splice(0, 0, ambassadorProducts[ambassadorProducts.length - 1]);
      setAmbassadorProducts(newArr);
      setRotateDeg((prev) => prev - 90);
    }
  };
  return (
    <>
      {ambassadorProducts &&
      ambassadorProducts &&
      ambassadorProducts?.length < 4 &&
      ambassadorImgs?.length < 4 ? (
        <h1>No product</h1>
      ) : (
        <div
          className={`${className} relative w-[calc(100%-160px)] h-[700px] my-8 gap-16 mx-auto`}
        >
          {/* background */}
          <Image
            src={DarkBG}
            width={0}
            height={0}
            sizes="100%"
            alt="dark background"
            className="w-full h-full object-cover rounded-xl select-none"
          />
          {/* Product shelf */}
          <div className="absolute bottom-0 right-1/4 translate-x-1/2 z-20">
            <Image
              width={0}
              height={0}
              sizes="100%"
              src={ProductShelf}
              alt="product shelf"
              className="object-cover select-none"
            />
            <Icon
              onClick={productCircleDoNext}
              style={
                rotateDeg < 360 ? { display: "block" } : { display: "none" }
              }
              icon="grommet-icons:form-next"
              className="z-20 text-white absolute size-8 bottom-0 right-0 translate-x-[100%] -translate-y-1/2
        "
            />
            <Icon
              style={rotateDeg > 0 ? { display: "block" } : { display: "none" }}
              onClick={productCircleDoPrev}
              icon="grommet-icons:form-next"
              className="z-20 text-white absolute size-8 bottom-0 left-0 -translate-x-[100%] -translate-y-1/2 scale-[-1]
        "
            />
          </div>
          {/* Product list (circle) */}
          <div
            className="w-[400px] h-[700px] overflow-hidden
        absolute right-1/4 bottom-0 translate-x-1/2 translate-y-[6%] pointer-events-none z-20
      "
          >
            <div
              style={
                rotateDeg > 0
                  ? {
                      transform: `translateX(-50%) translateY(80%) rotate(-${rotateDeg}deg)`,
                    }
                  : { transform: `translateX(-50%) translateY(80%)` }
              }
              className="absolute bottom-0 left-1/2 size-[500px]
            transition-all ease-in-out duration-700 pointer-events-none
        "
            >
              <Image
                width={0}
                height={0}
                sizes="100%"
                src={ambassadorImgs[0]}
                alt="2T Store Ambassador"
                className="select-none size-[300px] absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[100%] object-cover -rotate-45"
              />
              <Image
                width={0}
                height={0}
                sizes="100%"
                src={ambassadorImgs[1]}
                alt="2T Store Ambassador"
                className="select-none size-[300px] absolute top-1/2 -translate-y-1/2 translate-x-[100%] right-0 object-cover rotate-[45deg]"
              />
              <Image
                width={0}
                height={0}
                sizes="100%"
                src={ambassadorImgs[2]}
                alt="2T Store Ambassador"
                className="select-none size-[300px] absolute object-cover bottom-0 left-1/2 -translate-x-1/2 translate-y-[100%] scale-[-1] -rotate-45"
              />
              <Image
                width={0}
                height={0}
                sizes="100%"
                src={ambassadorImgs[3]}
                alt="2T Store Ambassador"
                className="select-none size-[300px] absolute object-cover left-0 top-1/2 -translate-x-[100%] -translate-y-1/2 scale-[-1] rotate-45"
              />
            </div>
          </div>
          {/* Banner */}
          <div className="absolute left-3/4 top-1/2 -translate-y-1/2 -translate-x-[434px]">
            <div className="gap-6 flex items-center">
              <div className="w-[250px] h-[412.5px] rounded-xl overflow-hidden">
                <Image
                  width={0}
                  height={0}
                  sizes="100%"
                  key={ambassadorProducts[0]?.image.url}
                  src={ambassadorProducts[0]?.image.url}
                  ref={(el: HTMLImageElement) =>
                    ambassadorImgRefs.current.push(el)
                  }
                  alt="2T Store"
                  className="w-full h-full blur-sm animate-fadeIn transition-all"
                />
              </div>
              <div className="w-[320px] h-[528px] rounded-xl overflow-hidden">
                <Image
                  width={0}
                  height={0}
                  sizes="100%"
                  key={ambassadorProducts[0]?.image.url}
                  src={ambassadorProducts[0]?.image.url}
                  ref={(el: HTMLImageElement) =>
                    ambassadorImgRefs.current.push(el)
                  }
                  alt="2T Store"
                  className="w-full h-full animate-fadeIn transition-all"
                />
              </div>
              <div className="w-[250px] h-[412.5px] rounded-xl overflow-hidden">
                <Image
                  width={0}
                  height={0}
                  sizes="100%"
                  key={ambassadorProducts[0]?.image.url}
                  src={ambassadorProducts[0]?.image.url}
                  ref={(el: HTMLImageElement) =>
                    ambassadorImgRefs.current.push(el)
                  }
                  alt="2T Store"
                  className="w-full h-full blur-sm animate-fadeIn transition-all"
                />
              </div>
            </div>
          </div>
          {/* Product informations */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 text-white w-1/3 p-8 flex flex-col gap-8 items-start">
            <h1
              key={ambassadorProducts[0]?.name}
              className="text-[50px] font-bold animate-fadeIn transition-all"
            >
              {ambassadorProducts[0]?.product.name}
            </h1>
            <p
              key={ambassadorProducts[0]?.image.url}
              className="animate-fadeIn transition-all"
            >
              {ambassadorProducts[0]?.product.description}
            </p>
            <Button
              key={ambassadorProducts[0]?.product.slug}
              className="animate-fadeIn transition-all"
            >
              <Link href={`/products/${ambassadorProducts[0]?.product.slug}`}>
                Buy now
              </Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default AmbassadorBanner;
