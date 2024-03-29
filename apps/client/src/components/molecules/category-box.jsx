import React from "react";
import Icon from "../atoms/icon";

function CategoryCard({ name, icon }) {
  return (
    <div className="w-full shadow-lg rounded-2xl mb-4 flex items-center content-center justify-center dark:bg-slate-800 overflow-hidden bg-white">
      <div className="cat-name py-5 ps-5 text-center text-primary capitalize text-sm sm:text-xl font-medium w-full dark:text-white truncate">
        {name}
      </div>
      <div className="cat-icon p-5 border-s border-dashed border-gray-600/20">
        <Icon
          icon={icon}
          type="img"
          width="50px"
          className="fill-primary mx-auto w-[50px] dark:grayscale"
        />
      </div>
    </div>
  );
}

export default CategoryCard;
