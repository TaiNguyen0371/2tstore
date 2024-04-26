// "use client";
import useClickOutside from "@/hooks/useClickOutside";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
interface ISearchIptProps {
  className?: string;
}
const SearchIpt = (props: ISearchIptProps) => {
  const iptRef = useRef<HTMLInputElement>(null);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const onChangeSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleOpenSearch = () => {
    setIsOpenSearch(!isOpenSearch);
    setSearchValue("");
    if (!isOpenSearch) {
      iptRef.current?.focus();
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Escape") {
      setIsOpenSearch(false);
      setSearchValue("");
    }
  };

  useClickOutside(iptRef, () => {
    setIsOpenSearch(false);
  });

  return (
    <div className={`relative w-[300px] ${props.className}`}>
      <input
        ref={iptRef}
        type="text"
        value={searchValue}
        placeholder="Search"
        onChange={(e) => onChangeSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          width: isOpenSearch ? "100%" : "0px",
          padding: isOpenSearch ? "0 42px 0 10px" : "0px",
        }}
        className="w-full placeholder-gray-200 h-8 bg-transparent text-white border outline-none transition-all float-right rounded-md"
      />
      <Icon
        onClick={() => handleOpenSearch()}
        className={`${
          isOpenSearch ? "size-5" : "size-8"
        } font-semibold text-white absolute right-[5px] top-1/2 -translate-y-1/2`}
        icon={isOpenSearch ? "ic:round-close" : "ic:round-search"}
      />
    </div>
  );
};

export default SearchIpt;
