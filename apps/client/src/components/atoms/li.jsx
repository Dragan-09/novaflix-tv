import React from "react";
import Icon from "./icon";

function Li({ icon, children }) {
  return (
    <li className="flex">
      <div>
        {icon && (
          <Icon
            icon={icon}
            width={20}
            className={"me-4 mt-1"}
            color={"#9980FA"}
          />
        )}
      </div>
      <div className="grow">{children}</div>
    </li>
  );
}

export default Li;
