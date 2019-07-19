import React, { Component } from "reactn";
import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import "../../pages/profile.css";
import SocialInput from "./SocialInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTwitter,
  faYoutube
} from "@fortawesome/free-brands-svg-icons";

export default class About extends Component {
  state = {
    aboutBlurb: "",
    socialInstagram: "",
    socialYouTube: "",
    socialFacebook: "",
    socialTwitter: ""
  };

  render() {
    const { classes, profileAbout } = this.props;
    return (
      <Paper className="profile-picture" className={classes.paperTwo}>
        <Typography
          component="h1"
          className={classes.panelHeaderTwo}
          color="secondary"
        >
          About Me
        </Typography>
        {this.props.editingAbout ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "column",
                height: "100%"
              }}
            >
              <TextField
                onChange={this.props.handleChange}
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
                value={profileAbout.aboutBlurb}
              />

              <SocialInput
                handleChange={this.props.handleChange}
                iconName={faInstagram}
                socialName="Instagram"
                inputName="socialInstagram"
                socialValue={profileAbout.socialInstagram}
              />
              <SocialInput
                handleChange={this.props.handleChange}
                iconName={faTwitter}
                socialName="Twitter"
                inputName="socialTwitter"
                socialValue={profileAbout.socialTwitter}
              />
              <SocialInput
                handleChange={this.props.handleChange}
                iconName={faYoutube}
                socialName="YouTube"
                inputName="socialYouTube"
                socialValue={profileAbout.socialYouTube}
              />
              <SocialInput
                handleChange={this.props.handleChange}
                iconName={faFacebook}
                socialName="Facebook"
                inputName="socialFacebook"
                socialValue={profileAbout.socialFacebook}
              />
              <Fab
                style={{
                  background: "#5ccd8f",
                  position: "absolute",
                  bottom: 86,
                  right: 7,
                  zIndex: 3
                }}
                onClick={this.props.updateProfileAbout}
              >
                <Icon>check_icon</Icon>
              </Fab>
              <Fab
                style={{
                  background: "indianred",
                  position: "absolute",
                  bottom: 8,
                  right: 7,
                  zIndex: 3,
                  display: this.state.editingPhoto ? "none" : "flex"
                }}
                onClick={this.props.editAboutButton}
              >
                <Icon>close_icon</Icon>
              </Fab>
            </div>
          </>
        ) : (
          <div
            style={{
              position: "relative",
              display: "flex",
              height: "100%",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            {profileAbout ? (
              <>
                <Typography component="h1">
                  {profileAbout.aboutBlurb}
                </Typography>
                <div
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  {/* Instagram */}
                  {profileAbout.socialInstagram ? (
                    <a
                      style={{ color: localStorage.primaryTheme }}
                      href={profileAbout.socialInstagram}
                      target="_blank"
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: 30 }}
                        icon={faInstagram}
                        size="1x"
                      />
                    </a>
                  ) : (
                    <FontAwesomeIcon
                      style={{ fontSize: 30 }}
                      icon={faInstagram}
                      size="1x"
                      className="social-disabled"
                    />
                  )}

                  {/* Twitter */}
                  {profileAbout.socialTwitter ? (
                    <a
                      style={{ color: localStorage.primaryTheme }}
                      className="social-link"
                      href={profileAbout.socialTwitter}
                      target="_blank"
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: 30 }}
                        icon={faTwitter}
                        size="1x"
                      />
                    </a>
                  ) : (
                    <FontAwesomeIcon
                      style={{ fontSize: 30 }}
                      icon={faTwitter}
                      size="1x"
                      className="social-disabled"
                    />
                  )}
                  {/* YouTube */}
                  {profileAbout.socialYouTube ? (
                    <a
                      style={{ color: localStorage.primaryTheme }}
                      href={profileAbout.socialYouTube}
                      target="_blank"
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: 30 }}
                        icon={faYoutube}
                        size="1x"
                      />
                    </a>
                  ) : (
                    <FontAwesomeIcon
                      style={{ fontSize: 30 }}
                      icon={faYoutube}
                      size="1x"
                      className="social-disabled"
                    />
                  )}
                  {/* Facebook */}
                  {profileAbout.socialFacebook ? (
                    <a
                      style={{ color: localStorage.primaryTheme }}
                      href={profileAbout.socialFacebook}
                      target="_blank"
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: 30 }}
                        icon={faFacebook}
                        size="1x"
                      />
                    </a>
                  ) : (
                    <FontAwesomeIcon
                      style={{ fontSize: 30 }}
                      icon={faFacebook}
                      size="1x"
                      className="social-disabled"
                    />
                  )}
                  {this.props.monkeyWrench ? (
                    <Fab
                      style={{
                        position: "absolute",
                        bottom: -8,
                        right: -7,
                        zIndex: 3,
                        display: this.state.editingPhoto ? "none" : "flex"
                      }}
                      onClick={this.props.editAboutButton}
                    >
                      <Icon>edit_icon</Icon>
                    </Fab>
                  ) : null}
                </div>
              </>
            ) : (
              "Loading..."
            )}
          </div>
        )}
      </Paper>
    );
  }
}
