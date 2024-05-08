import { Typography } from "@material-tailwind/react";
const OrdersOverviewSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={`${className} max-w-full animate-pulse`}>
      <Typography
        as="div"
        variant="h1"
        className="mb-8 h-3 w-1/3 rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
      <div className="flex flex-col gap-2">
        <Typography
          as="div"
          variant="paragraph"
          className="mb-2 h-2 w-full rounded-full bg-gray-300"
        >
          &nbsp;
        </Typography>
        <Typography
          as="div"
          variant="paragraph"
          className="mb-2 h-2 w-full rounded-full bg-gray-300"
        >
          &nbsp;
        </Typography>
        <Typography
          as="div"
          variant="paragraph"
          className="mb-2 h-2 w-full rounded-full bg-gray-300"
        >
          &nbsp;
        </Typography>
        <Typography
          as="div"
          variant="paragraph"
          className="mb-2 h-2 w-full rounded-full bg-gray-300"
        >
          &nbsp;
        </Typography>
      </div>
    </div>
  );
};

export default OrdersOverviewSkeleton;
