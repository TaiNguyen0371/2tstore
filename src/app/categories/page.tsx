import Button from "@/components/Button";
import CategoryFilter from "@/components/Pages/Category/CategoryAside";
import Category_Banner from "@/images/category_banner.png";
import Image from "next/image";
const Categories = async () => {
  return (
    <main className="mt-20 mb-8 w-[calc(100%-160px)] mx-auto">
      <div className="py-8 relative">
        <Image
          src={Category_Banner}
          alt="category banner"
          width={0}
          height={0}
          className="size-full rounded-xl"
        />
        <div className="w-1/2 absolute left-0 top-1/2 translate-x-1/4 -translate-y-1/2">
          <p className="text-5xl font-bold w-1/2">
            Don't miss out on our special sale
          </p>
          <Button className="mt-8">Buy now</Button>
        </div>
      </div>
      <div className="flex">
        <CategoryFilter className="w-1/5"/>
      </div>
    </main>
  );
};

export default Categories;
