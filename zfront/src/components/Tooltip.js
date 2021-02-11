// From: https://dev.to/vtrpldn/how-to-make-an-extremely-reusable-tooltip-component-with-react-and-nothing-else-3pnk

import React, { useState } from "react";
import "../styles/tooltip.css";

const Tooltip = (props) => {
  
  const content = props.content
  const delay = props.delay
  const children = props.children
  const css = props.css

  const [active, setActive] = useState(false);
  let timeout;


  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay || 100);
  };

  const hideTip = () => { 
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      className="tooltipWrapper"
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {active && (
        <div className = {css} >  {/* Edit background color on tooltip.css */}
          {/* Content */}
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
