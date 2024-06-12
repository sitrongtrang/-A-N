"use client";
import React, { useContext, useState } from "react";
import { CurrentNavItemContext, SetNavItemContext, navList } from "@/context";

const Content = ({ children }: { children: React.ReactNode }) => {
  const [currNav, setCurrNav] = useState<string>(navList[0].navId);
  return (
    <CurrentNavItemContext.Provider value={currNav}>
      <SetNavItemContext.Provider value={setCurrNav}>
        {children}
      </SetNavItemContext.Provider>
    </CurrentNavItemContext.Provider>
  );
};

export default Content;
