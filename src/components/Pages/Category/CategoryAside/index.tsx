"use client";

import { Option, Select } from "@material-tailwind/react";

interface ICategoryAsideProps {
  className?: string;
}
const CategoryAside = ({ className }: ICategoryAsideProps = {}) => {
  return (
    <div className={`${className} bg-cs_secondary_black h-20 rounded-xl`}>
      <Select
        label="Gender"
        menuProps={{
          className: "bg-cs_secondary_black border-none",
        }}
        // containerProps={{ className: " hover:bg-cs_tertiary_black" }}
        labelProps={{ className: "text-white text-base" }}
        className="!outline-none !border-none !text-white !bg-cs_secondary_black [&>ul]:bg-cs_secondary_black"
      >
        <Option className="!text-white !bg-cs_secondary_black hover:!bg-cs_tertiary_black" value="all">
          All
        </Option>
      </Select>
    </div>
  );
};

export default CategoryAside;
