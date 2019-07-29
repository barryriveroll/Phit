import React, { Component } from "react";

// Material UI imports
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import Fab from "@material-ui/core/Fab";

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  },
  drawerBackground: {
    backgroundColor: theme.palette.background.default,
    width: "100%",
    height: "100vh",
    overflow: "hidden",
    padding: 14
  },
  input: {
    display: "none"
  },
  textField: {
    marginLeft: 0,
    marginRight: theme.spacing.unit,
    marginTop: 0,
    width: 68
  },
  themeButton: {
    width: 100,
    marginRight: 5,
    marginBottom: 5
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: `${theme.spacing.unit * 3}px`
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    marginBottom: theme.spacing.unit,
    display: "flex",
    flexDirection: "column",
    position: "relative"
  },
  panelHeader: {
    fontFamily: "'Lobster', cursive",
    position: "absolute",
    top: -20,
    fontSize: 24,
    textShadow: "1px 1px 1px " + theme.palette.secondary.contrastText,
    fontWeight: 300
  },
  panelName: {
    width: "100%",
    marginTop: 20,
    fontFamily: "'Lobster', cursive",
    textAlign: "center"
  },
  buttonBarRight: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0
  },
  buttonBarLeft: {
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0
  }
});

class Settings extends Component {
  state = {};

  signOut = (signOutFunc, closeSettingsFunc) => {
    closeSettingsFunc("right", false);

    signOutFunc();
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.drawerBackground}>
        <CssBaseline />
        <Grid container justify="center">
          <Grid spacing={8} container style={{ width: 1170 }}>
            <Fab
              onClick={() => this.props.toggleSettings("right", false)}
              style={{ position: "absolute", top: 8, right: 7 }}
              size="medium"
              color="secondary"
              aria-label="Add"
            >
              <CloseIcon />
            </Fab>
            <Typography className={classes.panelName} variant="h3" gutterBottom>
              Settings
            </Typography>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography
                  component="h1"
                  className={classes.panelHeader}
                  color="secondary"
                >
                  User
                </Typography>

                <Grid
                  style={{ display: "flex", justifyContent: "space-between" }}
                  item
                  xs={12}
                >
                  <Typography
                    style={{ marginRight: 15 }}
                    inline
                    variant="body1"
                    gutterBottom
                  >
                    {this.props.currentUser}
                  </Typography>
                  <FormControl>
                    <Button
                      variant="contained"
                      style={{ marginLeft: 8 }}
                      color="secondary"
                      component={Link}
                      to="/"
                      onClick={() =>
                        this.signOut(
                          this.props.signOut,
                          this.props.toggleSettings
                        )
                      }
                    >
                      Sign Out
                    </Button>
                  </FormControl>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography
                  component="h1"
                  className={classes.panelHeader}
                  color="secondary"
                >
                  General
                </Typography>

                <Grid style={{ flexGrow: 1 }} item xs={12}>
                  <Typography
                    style={{ marginRight: 15 }}
                    inline
                    variant="body1"
                    gutterBottom
                  >
                    Theme
                  </Typography>
                  <FormControl>
                    <Button
                      className={classes.themeButton}
                      style={{
                        color: "#fff",
                        backgroundColor: "#f06292"
                      }}
                      variant="contained"
                      onClick={this.props.pinkTheme}
                    >
                      Pink
                    </Button>
                    <Button
                      className={classes.themeButton}
                      style={{
                        color: "rgba(0, 0, 0, 0.87)",
                        backgroundColor: "#ff8a65"
                      }}
                      variant="contained"
                      onClick={this.props.orangeTheme}
                    >
                      Orange
                    </Button>
                  </FormControl>
                  <FormControl>
                    <Button
                      className={classes.themeButton}
                      style={{
                        color: "rgba(0, 0, 0, 0.87)",
                        backgroundColor: "#0097a7"
                      }}
                      variant="contained"
                      onClick={this.props.cyanTheme}
                    >
                      Cyan
                    </Button>
                    <Button
                      className={classes.themeButton}
                      style={{
                        color: "rgba(0, 0, 0, 0.87)",
                        backgroundColor: "#d4d4dc"
                      }}
                      variant="contained"
                      onClick={this.props.greyTheme}
                    >
                      Grey
                    </Button>
                  </FormControl>
                  <br />
                  <Typography inline variant="body1" gutterBottom>
                    Toggle Dark Mode
                  </Typography>
                  <Switch
                    defaultChecked={this.props.theme.palette.type === "dark"}
                    value="checkedF"
                    onClick={this.props.switchUp}
                    color="secondary"
                  />
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography
                  component="h1"
                  className={classes.panelHeader}
                  color="secondary"
                >
                  Dashboard
                </Typography>
                <Grid container>
                  <Grid item sm={6}>
                    <Grid item sm={12}>
                      <Typography
                        style={{ marginRight: 15 }}
                        inline
                        variant="body1"
                        gutterBottom
                      >
                        Top Panel
                      </Typography>
                      <Button
                        className={classes.buttonBarLeft}
                        disabled={this.props.topPanel === "fitness"}
                        variant="contained"
                        value="fitness"
                        onClick={() =>
                          this.props.handleSettingsChange("topPanel", "fitness")
                        }
                        color="primary"
                        style={{ width: 100 }}
                      >
                        Fitness
                      </Button>
                      <Button
                        className={classes.buttonBarRight}
                        disabled={this.props.topPanel === "nutrition"}
                        variant="contained"
                        onClick={() =>
                          this.props.handleSettingsChange(
                            "topPanel",
                            "nutrition"
                          )
                        }
                        color="primary"
                        style={{ width: 100 }}
                      >
                        Nutrition
                      </Button>
                    </Grid>
                    <Grid item sm={12}>
                      <Typography
                        style={{ marginRight: 15 }}
                        inline
                        variant="body1"
                        gutterBottom
                      >
                        XL Fitness Panels
                      </Typography>
                      <Switch
                        defaultChecked={this.props.xlFit}
                        onClick={() =>
                          this.props.handleSettingsChange(
                            "xlFit",
                            !this.props.xlFit
                          )
                        }
                        value="checkedA"
                        color="secondary"
                      />
                    </Grid>
                    <Grid item sm={12}>
                      <Typography
                        style={{ marginRight: 15 }}
                        inline
                        variant="body1"
                        gutterBottom
                      >
                        XL Nutrition Panels
                      </Typography>
                      <Switch
                        defaultChecked={this.props.xlNut}
                        onClick={() =>
                          this.props.handleSettingsChange(
                            "xlNut",
                            !this.props.xlNut
                          )
                        }
                        value="checkedA"
                        color="secondary"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Settings);
