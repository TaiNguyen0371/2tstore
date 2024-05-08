import { Select } from "@material-tailwind/react";

interface ISelectProps {
  children: React.ReactNode;
  className?: string;
}
const CustomSelect = ({ children, className }: ISelectProps) => {
  return (
    <Select
      label="Gender"
      className={`${className} w-full min-h-10 bg-transparent px-4 outline-none`}
    >
      {children}
    </Select>
  );
};

export default CustomSelect;
