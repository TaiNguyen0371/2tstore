"use client";

import Button from "@/components/Button";
import FormInfo from "../FormInfo";
import Favorites from "../Favorites";
import Orders from "../Orders";
import { useState } from "react";

const AuthSections = ({ className }: { className?: string }) => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const tabTitle = ["Profile", "Favorites", "Orders"];
  const tabComponent = [<FormInfo />, <Favorites />, <Orders />];
  return (
    <div className={`${className}`}>
      <div className="flex gap-4">
        {tabTitle.map((title, index) => (
          <div key={index} className="w-1/3">
            <Button
              onClick={() => setTabIndex(index)}
              className={`${
                tabIndex === index &&
                "border-[1px] border-cs_primary_yellow text-cs_primary_yellow"
              } w-full !bg-cs_tertiary_black text-lg`}
            >
              {title}
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-8">{tabComponent.find((item, index) => index === tabIndex)}</div>
    </div>
  );
};

export default AuthSections;
