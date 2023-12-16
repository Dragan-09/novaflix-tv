import React from "react";

function Message({ message }) {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[400px] bg-slate-800 p-10 rounded-lg text-center shadow-xl text-primary dark:text-white text-sm">
        {message}
      </div>
    </div>
  );
}

export default Message;
