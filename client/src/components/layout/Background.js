import React from "react";
import AnimatedBg from "react-animated-bg";

const Background = () => {
  return (
    <div>
      <AnimatedBg
        colors={["#f4f9f9", "#f1d1d0", "#fbaccc", "#f875aa"]}
        duration={3}
        delay={0}
        timingFunction="ease-out"
        className="animated-section"
      ></AnimatedBg>
    </div>
  );
};

export default Background;
