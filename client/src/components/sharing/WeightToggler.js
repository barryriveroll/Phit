import React, { Component } from "react";
import Slider from "@material-ui/core/Slider";

export default function WeightToggler() {
  return (
    <Slider
      defaultValue={30}
      //   getAriaValueText={"text"}
      aria-labelledby="discrete-slider"
      valueLabelDisplay="auto"
      step={10}
      marks
      min={10}
      max={30}
    />
  );
}
