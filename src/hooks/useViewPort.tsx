"use client";

import { useEffect, useState } from "react";

export const useCurrentViewPort = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    });

    return () =>
      window.removeEventListener("resize", () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      });
  }, []);
  return {
    width: width,
    height: height,
  };
};

export const useScrollHeight = () => {
  const [height, setHeight] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  useEffect(() => {
    setScreenHeight(window.screen.height);
    window.addEventListener("scroll", () => {
      setHeight(window.scrollY);
    });
    return () => {
      window.removeEventListener("scroll", () => {
        setHeight(window.scrollY);
      });
    };
  },[]);

  return {
    height: height,
    screenHeight: screenHeight,
  };
};
