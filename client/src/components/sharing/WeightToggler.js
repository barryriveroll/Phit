import React from "react";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";

function ValueLabelComponent(props) {
  let { children, open, value } = props;

  switch (value) {
    case 10:
      value = "Decrease Weight";
      break;
    case 20:
      value = "Same Weight";
      break;
    case 30:
      value = "Increase Weight";
      break;
  }

  const popperRef = React.useRef(null);
  React.useEffect(() => {
    if (popperRef.current) {
      popperRef.current.update();
    }
  });

  return (
    <Tooltip
      PopperProps={{
        popperRef
      }}
      open={open}
      enterTouchDelay={0}
      placement="top"
      title={value}
    >
      {children}
    </Tooltip>
  );
}

export default function WeightToggler(props) {
  // handleChange = index => (event, value) => {
  //   console.log(value, index);

  // };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        position: "relative",
        zIndex: 20000
      }}
    >
      {props.index ? (
        <Slider
          onChange={props.handleSliderWeightChange(props.index)}
          style={{ width: "69%" }}
          defaultValue={20}
          aria-labelledby="discrete-slider"
          // valueLabelDisplay="bottom"
          // getAriaValueText={valuetext}
          step={10}
          marks
          valueLabelDisplay="auto"
          ValueLabelComponent={ValueLabelComponent}
          min={10}
          max={30}
        />
      ) : (
        "Starting Weight"
      )}
    </div>
  );
}
