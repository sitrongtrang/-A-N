import React from "react";
import NavList from "./NavList";

const Sidebar = ({children}:{children: React.ReactNode;}) => {
  return (
    <nav className="sticky top-0 pt-5 h-screen min-w-72 border-r-[1px]">
      <div className="flex items-center px-10">
        <img src="/sidebar/smart-home.png" alt="yolohome-logo" />
        <h2 className="font-bold text-3xl">YoloHome</h2>
      </div>
      {children}
    </nav>
  );
};

export default Sidebar;
