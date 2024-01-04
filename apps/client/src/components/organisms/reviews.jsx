import React from "react";

function Reviews() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (window.Trustpilot) {
      window.Trustpilot.loadFromElement(ref.current, true);
    }
  }, []);
  return (
    <div
      className="py-3"
      ref={ref}
      data-template-id={"56278e9abfbbba0bdcd568bc"}
      data-businessunit-id={"65968db7f39b042c44ee6f77"}
      data-locale={"en-US"}
      data-style-height={"70px"}
      data-style-width={"100%"}>
      <a
        href="https://www.trustpilot.com/review/lcomeback.com"
        target="_blank"
        rel="noopener">
        {" "}
        Trustpilot
      </a>
    </div>
  );
}

export default Reviews;
