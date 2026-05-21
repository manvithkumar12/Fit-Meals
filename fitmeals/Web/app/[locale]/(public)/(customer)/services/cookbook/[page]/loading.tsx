import React from "react";
import SearchBar from "@/src/Components/SearchBar/SearchBar";
import CookBooksLoading from "@/src/Components/ServiceComponent/CookBook/CookBooksLoading";

const loading = async () => {
  return (
    <div className="w-screen h-max pt-10 pb-5 overflow-hidden flex flex-col justify-center items-center ">
      <SearchBar />
      <CookBooksLoading />
    </div>
  );
};

export default loading;
