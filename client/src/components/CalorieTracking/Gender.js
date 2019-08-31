import React, { Component, setGlobal } from "reactn";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

export default class Gender extends Component {
  state = {
    gender: ""
  };
  chooseGender = event => {
    this.setState({
      gender: event.target.value
    });

    setGlobal({ gender: event.target.value });
  };
  render() {
    return (
      <>
        <InputLabel shrink htmlFor="Gender-label-placeholder">
          Gender
        </InputLabel>
        <Select
          native
          label="Gender"
          value={this.state.gender}
          onChange={this.chooseGender}
          inputProps={{
            name: "type",
            id: "type-native-simple"
          }}
        >
          <option value="" />
          <option value={"male"}>Male</option>
          <option value={"female"}>Female</option>
        </Select>
      </>
    );
  }
}
