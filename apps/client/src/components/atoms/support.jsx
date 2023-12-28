import React from "react";

function Support() {
  return (
    <>
      <a
        href="https://api.whatsapp.com/"
        target="_blank"
        className="support fixed left-5 bottom-5 z-30 w-[60px] aspect-square cursor-pointer hidden sm:block">
        <img
          src="/public/images/icons/whatsapp.gif"
          alt=""
          className="absolute top-0 left-0 opacity-0 hover:opacity-100"
        />
        <img src="/public/images/icons/whatsapp.png" alt="" className="" />
      </a>
    </>
  );
}

export default Support;
