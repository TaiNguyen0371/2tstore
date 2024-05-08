"use client";
import { Checkbox } from "@material-tailwind/react";

interface ICustomCheckboxProps {
  onChange?: any;
  checked?: boolean;
}
const CustomCheckbox = ({
  onChange,
  checked = false,
}: ICustomCheckboxProps) => {
  return (
    <Checkbox
      color="amber"
      checked={checked}
      crossOrigin={"anonymous"}
      onChange={onChange}
    />
  );
};

export default CustomCheckbox;
