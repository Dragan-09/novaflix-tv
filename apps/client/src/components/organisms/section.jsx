import React from "react";
import Title from "../atoms/section-title";

function Section({ title, id, children, className }) {
  return (
    <div className={`w-full py-10 container mx-auto ${className}`} id={id}>
      <Title title={title}></Title>
      {children}
    </div>
  );
}

export default Section;
