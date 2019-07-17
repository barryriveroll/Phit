import React, { Component, Fragment } from "reactn";
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
    whiteSpace: "nowrap",
    marginBottom: theme.spacing.unit,
    display: "flex",
    flexDirection: "column",
    position: "relative",
    width: 300,
    height: 300
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
    fontSize: "1.5em",
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
  }
});

class Profile extends Component {
  state = {
    profilePicture: ""
  };

  componentDidMount = () => {
    let username = this.props.match.params.username;

    API.findProfile(username).then(res => {
      if (res.data.length) {
        if (res.data[0]._id === localStorage.userId) {
          monkeyWrench = true;
          cradle = res.data[0].picture;
          console.log(cradle);
        }
        this.setState({ profilePicture: res.data[0].picture });
      }
      auth.onAuthStateChanged(firebaseUser => {
        if (!firebaseUser.emailVerified) monkeyWrench = false;
        this.setState({
          user: firebaseUser
        });
      });
    });
  };

  updatePicture = photoUrl => {
    this.setState({ profilePicture: photoUrl });
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
              <About classes={classes} />
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
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(Profile));
