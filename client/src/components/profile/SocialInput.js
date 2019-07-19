import React, { Component } from "reactn";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class SocialInput extends Component {
  render() {
    return (
      <div>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item style={{ width: 30 }}>
            <FontAwesomeIcon
              style={{ margin: 5, fontSize: 20 }}
              icon={this.props.iconName}
              size="1x"
            />
          </Grid>
          <Grid item>
            <TextField
              id="input-with-icon-grid"
              placeholder={this.props.socialName}
              name={this.props.inputName}
              onChange={this.props.handleChange}
              value={this.props.socialValue}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}
