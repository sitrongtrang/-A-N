"use client";

import React from "react";

const SearchBar = ({
  handleSearch,
  placeholder,
}: {
  handleSearch: (key: string) => void;
  placeholder: string;
}) => {
  return (
    <div className="has-[:focus]:outline has-[:focus]:outline-1 has-[:focus]:outline-my-primary flex items-center bg-white pl-2 rounded-full gap-2 h-fit">
      <div>
        <img src="/filter/magnifying-glass.png" alt="" />
      </div>
      <input
        onKeyDown={e => {
          if (e.key == "Enter") {
            const searchKey = (e.target as HTMLInputElement).value;
            handleSearch(searchKey);
            (e.target as HTMLInputElement).value = "";
          }
        }}
        type="text"
        placeholder={placeholder}
        className="h-8 w-60 rounded-s-none border-none rounded-e-full focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
