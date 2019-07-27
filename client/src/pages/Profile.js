import React, { Component, Fragment, getGlobal } from "reactn";
import PictureUploader from "../components/profile/PictureUploader";
import About from "../components/profile/About";
import { auth } from "../firebase";
import "./profile.css";
import { withRouter } from "react-router-dom";
//Material UI
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import API from "../utils/API";
import Report from "../components/profile/Report";
import Loading from "../components/Loading";
import SharedWorkouts from "../components/profile/SharedWorkouts";

let monkeyWrench = false;
let cradle = "";

const styles = theme => ({
  demo: {
    [theme.breakpoints.up("lg")]: {
      width: 1170
    }
  },

  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: `${theme.spacing.unit * 3}px`
  },

  paper: {
    // padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    marginBottom: theme.spacing.unit,
    display: "flex",
    flexDirection: "column",
    position: "relative",
    width: 300,
    height: 300
  },
  paperTwo: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    // whiteSpace: "nowrap",
    marginBottom: theme.spacing.unit,
    display: "flex",
    flexDirection: "column",
    position: "relative",
    width: 300,
    height: 300
  },
  paperThree: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    marginBottom: theme.spacing.unit,
    height: 400,
    [theme.breakpoints.down("md")]: {
      height: 512
    },
    display: "flex",
    flexDirection: "column",
    position: "relative"
  },
  divider: {
    margin: `${theme.spacing.unit * 2}px 0`
  },
  panelHeader: {
    fontFamily: "'Lobster', cursive",
    position: "absolute",
    top: -34,
    left: 13,
    fontSize: "2.5em",
    textShadow: "1px 1px 1px " + theme.palette.secondary.contrastText,
    fontWeight: 300,
    zIndex: 10
  },
  panelHeaderTwo: {
    fontFamily: "'Lobster', cursive",
    position: "absolute",
    top: -20,
    left: 13,
    fontSize: 24,
    textShadow: "1px 1px 1px " + theme.palette.secondary.contrastText,
    fontWeight: 300,
    zIndex: 10
  },
  panelName: {
    width: "100%",
    marginTop: 20,
    fontFamily: "'Lobster', cursive",
    textAlign: "center"
  },
  textField: {
    marginLeft: 5,
    marginRight: 5
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  }
});

class Profile extends Component {
  state = {
    profilePicture: "",
    profileAbout: {
      aboutBlurb: "",
      socialFacebook: "",
      socialInstagram: "",
      socialYouTube: "",
      socialTwitter: ""
    },
    editingAbout: false
  };

  componentDidMount = () => {
    this.fetchUserData();
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match.params.username !== prevState.currentUser) {
      return { currentUser: nextProps.currentUser };
    } else {
      return null;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.username !== this.global.username) {
      this.fetchUserData();
    }
  }

  fetchUserData = () => {
    let username = this.props.match.params.username;
    API.findProfile(username).then(res => {
      if (res.data.length) {
        let profileAbout = {
          aboutBlurb: res.data[0].aboutBlurb,
          socialFacebook: res.data[0].socialFacebook,
          socialInstagram: res.data[0].socialInstagram,
          socialYouTube: res.data[0].socialYouTube,
          socialTwitter: res.data[0].socialTwitter
        };

        if (res.data[0]._id === localStorage.userId) {
          monkeyWrench = true;
          cradle = res.data[0].picture;
        }

        this.setState({ profilePicture: res.data[0].picture, profileAbout });
      }
      auth.onAuthStateChanged(firebaseUser => {
        if (!firebaseUser.emailVerified) monkeyWrench = false;

        this.setState({
          user: firebaseUser,
          currentUser: username
        });
      });
    });
  };

  updatePicture = photoUrl => {
    this.setState({ profilePicture: photoUrl });
  };

  handleChange = event => {
    const { name, value } = event.target;
    let profileAbout = { ...this.state.profileAbout };
    profileAbout[name] = value;
    this.setState({ profileAbout });
  };

  editAboutButton = () => {
    this.setState({ editingAbout: !this.state.editingAbout });
  };

  updateProfileAbout = () => {
    let username = this.global.username;
    let updatedData = {
      id: localStorage.userId,
      updateProfile: {
        aboutBlurb: this.state.profileAbout.aboutBlurb,
        socialInstagram: this.state.profileAbout.socialInstagram,
        socialYouTube: this.state.profileAbout.socialYouTube,
        socialFacebook: this.state.profileAbout.socialFacebook,
        socialTwitter: this.state.profileAbout.socialTwitter
      }
    };
    API.updateProfileAbout(username, updatedData);
    this.setState({ editingAbout: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment {...this.props}>
        <CssBaseline />
        <Grid container justify="center">
          <Grid
            direction="row"
            container
            style={{ maxWidth: 1170 }}
            spacing={8}
          >
            <Typography className={classes.panelName} variant="h3" gutterBottom>
              Profile
            </Typography>
            <Grid
              style={{ display: "flex", justifyContent: "center" }}
              item
              xs={12}
              md={4}
            >
              <PictureUploader
                currentUser={this.state.currentUser}
                updatePicture={this.updatePicture}
                profilePicture={this.state.profilePicture}
                monkeyWrench={monkeyWrench}
                cradle={cradle}
                classes={classes}
              />
            </Grid>
            <Grid
              style={{ display: "flex", justifyContent: "center" }}
              item
              xs={12}
              md={4}
            >
              <About
                monkeyWrench={monkeyWrench}
                profileAbout={this.state.profileAbout}
                classes={classes}
                handleChange={this.handleChange}
                updateProfileAbout={this.updateProfileAbout}
                editingAbout={this.state.editingAbout}
                editAboutButton={this.editAboutButton}
              />
            </Grid>
            {/* Remove this one */}
            <Grid
              style={{ display: "flex", justifyContent: "center" }}
              item
              xs={12}
              md={4}
            >
              <About classes={classes} />
            </Grid>
            <Grid item md={6} xs={12}>
              <SharedWorkouts classes={classes} />
            </Grid>
            <Report />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(Profile));
