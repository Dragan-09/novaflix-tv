import React from "react";
import dateFormat from "dateformat";
import Button from "../atoms/button";
import logoutUtil from "../utils/logout";

function UserDropdown({ full_name, username, current_plan, className }) {
  const end_date_format = dateFormat(current_plan.end_date, "dd mmm yyyy");
  const diff_days = Math.abs(
    Math.floor((new Date() - new Date(current_plan.end_date)) / 8.64e7)
  );
  const handleLogout = logoutUtil();
  let statusColor, description;
  let isPinging = true;
  let plan_name = `${current_plan.name} Plan`;
  switch (current_plan.status) {
    case "ACTIVE":
      statusColor = "#2ecc71";
      description = `Ends in ${end_date_format}, ${diff_days} days remaining`;
      break;
    case "ON_PROCESS":
      statusColor = "#1f75f6";
      description = "On Process...";
      break;
    default:
      statusColor = "gray";
      isPinging = false;
      description = "Check our plans for more infrmation";
      plan_name = "No Plan Chosen";
  }

  return (
    <div
      className={`sm:w-[300px] bg-white py-2 px-4 sm:rounded-md rounded-t-xl z-20 shadow-lg animate-display fixed bottom-[55px] sm:bottom-auto w-full sm:relative ${className}`}
    >
      <div className="w-full text-center py-4 border-b border-gray-500/40">
        <div className="w-full font-bold text-xl h-6">Hi, {full_name}!</div>
        <div className="w-full text-gray-500 text-sm">@{username}</div>
      </div>
      <div className="w-full pt-3 px-1 pb-4">
        <div className="w-full text-primary font-semibold text-md h-4">
          Current Plan
        </div>
        <div className="w-full ps-0.5">
          <div className="w-full font-semibold text-lg flex justify-between items-center">
            <span>{plan_name}</span>
            <span
              className="block w-[10px] h-[10px] bg-active rounded-full"
              style={{ backgroundColor: statusColor }}
            >
              <span
                className={`block w-[10px] h-[10px] bg-active rounded-full ${
                  isPinging && "animate-ping"
                }`}
                style={{ backgroundColor: statusColor }}
              ></span>
            </span>
          </div>
          <div className="w-full text-gray-500 text-xs -mt-2">
            {description}
          </div>
        </div>
      </div>
      <div className="w-full pt-2">
        <Button
          size={"medium"}
          style={"filled"}
          color={"primary"}
          className={"w-full justify-center"}
          onClick={handleLogout}
        >
          Sign out
        </Button>
      </div>
    </div>
  );
}

export default UserDropdown;
