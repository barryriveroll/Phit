import React, { Component, setGlobal } from "reactn";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

export default class Height extends Component {
  state = {
    ft: 0,
    in: 0
  };
  chooseHeight = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    setGlobal({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <>
        <InputLabel shrink htmlFor="Gender-label-placeholder">
          Height
        </InputLabel>
        <Select
          native
          label="Feet"
          value={this.state.ft}
          onChange={this.chooseHeight}
          inputProps={{
            name: "ft",
            id: "type-native-simple"
          }}
        >
          <option value={0}>0 ft</option>
          <option value={1}>1 ft</option>
          <option value={2}>2 ft</option>
          <option value={3}>3 ft</option>
          <option value={4}>4 ft</option>
          <option value={5}>5 ft</option>
          <option value={6}>6 ft</option>
          <option value={7}>7 ft</option>
        </Select>
        <Select
          native
          label="Inches"
          value={this.state.in}
          onChange={this.chooseHeight}
          inputProps={{
            name: "in",
            id: "type-native-simple"
          }}
        >
          <option value={0}>0 in</option>
          <option value={1}>1 in</option>
          <option value={2}>2 in</option>
          <option value={3}>3 in</option>
          <option value={4}>4 in</option>
          <option value={5}>5 in</option>
          <option value={6}>6 in</option>
          <option value={7}>7 in</option>
          <option value={8}>8 in</option>
          <option value={9}>9 in</option>
          <option value={10}>10 in</option>
          <option value={11}>11 in</option>
        </Select>
      </>
    );
  }
}
