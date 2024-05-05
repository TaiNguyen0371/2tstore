"use client";
import { ChangeEvent, useState, FocusEvent } from "react";

interface IFormIpt {
  className?: string;
  inputClassName?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder?: string;
  type?: string;
  name?: string;
  id?: string;
}
const FormIpt = ({
  className,
  inputClassName,
  onChange,
  value,
  placeholder,
  type,
  name,
  id,
}: IFormIpt) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  return (
    <div
      className={`${className} relative w-full h-[60px] rounded-xl border-cs_primary_yellow border-[1px]`}
    >
      <h1
        className={`${
          isFocus || value
            ? "top-0 left-0 -translate-y-[100%]"
            : "left-0 top-1/2 -translate-y-1/2 translate-x-2"
        } absolute transition-all ease-in-out duration-300 pointer-events-none`}
      >
        {placeholder}
      </h1>
      <input
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        type={type}
        onChange={onChange}
        value={value}
        name={name}
        id={id}
        className={`${inputClassName} outline-none rounded-xl size-full bg-transparent px-2`}
      />
    </div>
  );
};

export default FormIpt;
