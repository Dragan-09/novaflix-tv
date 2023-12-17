import React from "react";
import Button from "../atoms/button";

function Message({ message, buttons }) {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[400px] dark:bg-slate-800 bg-white p-10 rounded-lg text-center shadow-xl text-primary dark:text-white text-sm">
        {message}
        <div className="button pt-4">
          {buttons &&
            buttons.map((button) => (
              <Button
                color={button.color || "primary"}
                style={"filled"}
                size={"medium"}
                onClick={() => (location.href = button.link)}
                className={"mx-1"}
              >
                {button.content}
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Message;
