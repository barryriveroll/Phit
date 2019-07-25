import React, { setGlobal } from "reactn";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";

const marks = [
  {
    value: 0,
    label: "0°C"
  },
  {
    value: 20,
    label: "20°C"
  },
  {
    value: 37,
    label: "37°C"
  },
  {
    value: 100,
    label: "100°C"
  }
];

function valuetext(value) {
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
  console.log(value);
  return value;
}

function ValueLabelComponent(props) {
  let { children, open, value } = props;

  //   const popperRef = React.useRef(null);
  //   React.useEffect(() => {
  //     if (popperRef.current) {
  //       popperRef.current.update();
  //     }
  //   });

  // return (
  //   <Tooltip
  //     PopperProps={
  //       {
  //         // popperRef
  //       }
  //     }
  //     open={open}
  //     enterTouchDelay={0}
  //     placement="top"
  //     title={value}
  //   >
  //     {children}
  //   </Tooltip>
  // );
}

export default class WeightToggler extends React.Component {
  handleChange = index => (event, value) => {
    console.log(value, index);
    let copyOfGlobal = [...this.global.sharedResistanceWeightProgress];
    copyOfGlobal[index] = value;
    setGlobal({ sharedResistanceWeightProgress: copyOfGlobal });
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          zIndex: 20000
        }}
      >
        {this.props.index ? (
          <Slider
            onChange={this.handleChange(this.props.index)}
            style={{ width: "69%" }}
            defaultValue={20}
            aria-labelledby="discrete-slider"
            // valueLabelDisplay="bottom"
            getAriaValueText={valuetext}
            step={10}
            marks
            valueLabelDisplay="auto"
            // ValueLabelComponent={ValueLabelComponent}
            min={10}
            max={30}
          />
        ) : (
          "Starting Weight"
        )}
      </div>
    );
  }
}
