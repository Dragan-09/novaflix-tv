import React from "react";
import Brand from "./brand";
import Title from "./section-title";

function Form({ children, onSubmit, brand, className }) {
  return (
    <div
      className={`auth w-[400px] h-full sm:h-auto text-primary dark:text-white p-10 bg-white dark:bg-slate-800 rounded-xl shadow-xl ${className}`}>
      {brand && (
        <div className="brand flex justify-center h-12 mb-10">
          <a href="/">
            <Brand />
          </a>
        </div>
      )}
      {/* <Title title={"Checkout"} /> */}
      <form className="grid grid-cols-2 gap-x-2 gap-y-4" onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  );
}

export default Form;
