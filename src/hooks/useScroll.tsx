"use client";
import { useEffect, useState } from "react";

const useScroll = () => {
  const [isScrollUp, setIsScrollUp] = useState(false);
  const [isScrollDown, setIsScrollDown] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (prevScrollPos > currentScrollPos) {
        setIsScrollUp(true);
        setIsScrollDown(false);
      } else {
        setIsScrollUp(false);
        setIsScrollDown(true);
      }

      setPrevScrollPos(currentScrollPos);
    };

    // Attach the event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);
  return {
    isScrollDown: isScrollDown,
    isScrollUp: isScrollUp,
  };
};

export default useScroll;
