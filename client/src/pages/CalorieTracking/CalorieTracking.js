import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";

export default class CalorieTracking extends Component {
  render() {
    return (
      <TextField
        name={this.props.name}
        type="number"
        InputLabelProps={{
          shrink: true
        }}
        label={this.props.label}
        onChange={this.props.handleCalorieChange}
        value={this.props.value}
      />
    );
  }
}
