import { Spinner } from "@material-tailwind/react";

const LoadingSection = ({ className }: any) => {
  return (
    <div
      className={`${className} bg-transparent rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 absolute top-0 left-0 w-full h-full grid place-items-center`}
    >
      <Spinner />
    </div>
  );
};

export default LoadingSection;
