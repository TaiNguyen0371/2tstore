import { Typography } from "@material-tailwind/react";

const CartProductListSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <Typography
        as="div"
        variant="h1"
        className="mb-4 h-5 w-20 rounded-full  bg-gray-300"
      >
        &nbsp;
      </Typography>
      <Typography
        as="div"
        variant="paragraph"
        className="mb-2 h-2 w-40 rounded-full  bg-gray-300"
      >
        &nbsp;
      </Typography>
      <div className="mt-8 bg-gray-300 rounded-xl h-[500px] animate-pulse"></div>
    </div>
  );
};

export default CartProductListSkeleton;
