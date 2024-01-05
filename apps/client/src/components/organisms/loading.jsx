import React from "react";
import Brand from "../atoms/brand";

function Loading() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="h-[70px]">
        <Brand />
      </div>
    </div>
  );
}

export default Loading;
