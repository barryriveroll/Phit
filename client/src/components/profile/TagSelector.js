import React, { Component, setGlobal, getGlobal } from "reactn";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";

export default class TagSelector extends Component {
  state = {
    selectedTags: [],
    resistanceTags: [],
    cardioTags: []
  };
  handleChange = event => {
    this.setState({ selectedTags: event.target.value });
  };

  handleDelete = chipToDelete => () => {
    let selectedTags = [...this.state.selectedTags];
    selectedTags = selectedTags.filter(tag => tag !== chipToDelete);
    this.setState({ selectedTags });
  };

  componentDidMount = () => {
    this.setState({
      resistanceTags: [
        ...this.global.resistanceTags,
        ...this.global.globalTags
      ],
      cardioTags: [...this.global.cardioTags, ...this.global.globalTags]
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <FormControl className={classes.formControl} fullWidth>
        <InputLabel htmlFor="select-multiple-chip">Tags</InputLabel>
        <Select
          multiple
          value={this.state.selectedTags}
          onChange={this.handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(value => (
                <Chip
                  key={value}
                  label={value}
                  onDelete={this.handleDelete(value)}
                  className={classes.chip}
                  color="primary"
                />
              ))}
            </div>
          )}
        >
          {this.props.resistance
            ? this.state.resistanceTags.map(tag => (
                <MenuItem key={tag} value={tag}>
                  {tag}
                </MenuItem>
              ))
            : this.state.cardioTags.map(tag => (
                <MenuItem key={tag} value={tag}>
                  {tag}
                </MenuItem>
              ))}
          ))}
        </Select>
      </FormControl>
    );
  }
}
