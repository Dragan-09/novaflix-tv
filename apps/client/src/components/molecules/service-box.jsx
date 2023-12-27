import React from "react";
import Icon from "../atoms/icon";

function ServiceCard({ icon, name }) {
  return (
    <div className="service w-full aspect-square rounded-3xl bg-slate-800 p-5 flex content-center justify-center flex-wrap">
      <div className="icon flex justify-center w-full grayscale">
        <Icon icon={icon} width={60} color={"gray"} />
      </div>
      <div className="title text-white pt-5 text-sm text-center">{name}</div>
    </div>
  );
}

export default ServiceCard;
