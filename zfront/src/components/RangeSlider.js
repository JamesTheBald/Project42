// by jpmarks in https://stackoverflow.com/questions/62725470/creat-range-slider-in-react-js
import React from "react";

const RangeSlider = (props) => {
  
  let sliderValue = props.sliderValue;
  const setSliderValue = props.setSliderValue;
  
  return (
    <div>
      <input
        min={40} 
        max={500}
        type="range"
        value={sliderValue}
        id="myRange"
        onChange={(event) => setSliderValue(event.target.value)}
      />
    </div>
  );
};
export default RangeSlider;