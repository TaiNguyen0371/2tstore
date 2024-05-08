"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Tooltip } from "@material-tailwind/react";
import { MouseEvent } from "react";
interface ICustomIcon {
  icon: string;
  className?: string;
  tooltip?: string;
  size?: string;
  onClick?: () => void;
}
const CustomIcon = ({
  icon,
  tooltip,
  className,
  size = "20px",
  onClick,
}: ICustomIcon) => {
  return (
    <Tooltip content={tooltip} className={className}>
      <Icon
        icon={icon}
        fontSize={size}
        onClick={onClick}
        className="cursor-pointer"
      />
    </Tooltip>
  );
};

export default CustomIcon;
