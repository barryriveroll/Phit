import React, { Component, getGlobal } from "reactn";
import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import "../../pages/profile.css";
import SocialInput from "./SocialInput";
import {
  faInstagram,
  faFacebook,
  faTwitter,
  faYoutube
} from "@fortawesome/free-brands-svg-icons";
import API from "../../utils/API";

export default class About extends Component {
  state = {
    aboutBlurb: "",
    socialInstagram: "",
    socialYouTube: "",
    socialFacebook: "",
    socialTwitter: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  updateProfileAbout = () => {
    let username = getGlobal().username;
    let updatedData = {
      id: localStorage.userId,
      updateProfile: {
        aboutBlurb: this.state.aboutBlurb,
        socialInstagram: this.state.socialInstagram,
        socialYouTube: this.state.socialYouTube,
        socialFacebook: this.state.socialFacebook,
        socialTwitter: this.state.socialTwitter
      }
    };
    API.updateProfileAbout(username, updatedData);
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className="profile-picture" className={classes.paperTwo}>
        <Typography
          component="h1"
          className={classes.panelHeaderTwo}
          color="secondary"
        >
          About Me
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "column",
            height: "100%"
          }}
        >
          <TextField
            onChange={this.handleChange}
            name="aboutBlurb"
            id="standard-textarea"
            label="Edit About Section"
            placeholder="We are the champions..."
            multiline
            rows="3"
            inputProps={{ maxLength: 240 }}
            className={classes.textField}
            margin="normal"
            style={{ marginTop: 0, marginBottom: 0 }}
          />

          <SocialInput
            handleChange={this.handleChange}
            iconName={faInstagram}
            socialName="Instagram"
            inputName="socialInstagram"
          />
          <SocialInput
            handleChange={this.handleChange}
            iconName={faTwitter}
            socialName="Twitter"
            inputName="socialTwitter"
          />
          <SocialInput
            handleChange={this.handleChange}
            iconName={faYoutube}
            socialName="YouTube"
            inputName="socialYouTube"
          />
          <SocialInput
            handleChange={this.handleChange}
            iconName={faFacebook}
            socialName="Facebook"
            inputName="socialFacebook"
          />
          <div onClick={this.updateProfileAbout}>I am the one who clicks</div>
        </div>
      </Paper>
    );
  }
}
