"use client";

import React from "react";
import { CurrentNavItemContext, navList } from "@/context";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { useContext } from "react";

const Topbar = () => {
  const navId = useContext(CurrentNavItemContext);
  return (
    <div className="top-0 sticky z-10 bg-white responsive-layout flex items-center justify-between border-b-[1px] h-fit">
      <h1 className="text-3xl font-bold">
        {navList[Number(navId) - 1].itemName}
      </h1>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center">
          <img src="/topbar/settings 1.png" alt="" />
        </div>
        <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center">
          <img src="/topbar/noti.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
