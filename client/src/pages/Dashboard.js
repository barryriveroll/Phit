import React, { Component, Fragment } from "react";
import auth from "../firebase.js";
import Meal from "./Meal";
import firebase from "firebase";

//Panel imports
import FitnessPanel from "../components/panels/FitnessPanel";
import NutritionPanel from "../components/panels/NutritionPanel";
import Landing from "./landing";

// Material UI imports
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import SettingsIcon from "@material-ui/icons/Settings";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import Settings from "../pages/Settings";
import Paper from "@material-ui/core/Paper";

let x = window.matchMedia("(max-width: 700px)");

class Dashboard extends Component {
  state = { xlFit: this.props.xlFit, value: 0 };

  componentDidMount = () => {
    setTimeout(
      () =>
        auth.onAuthStateChanged(firebaseUser => {
          this.setState({
            user: firebaseUser
          });
        }),
      500
    );
  };

  toggleSettings = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static">
          <ToolBar
            style={{
              justifyContent: "space-between"
            }}
          >
            <Typography
              variant="h2"
              color="inherit"
              style={{ fontFamily: "Lobster" }}
            >
              Phit
            </Typography>
            <div>
              {this.state.user ? (
                <Tabs value={0} centered>
                  <Tab
                    icon={<SettingsIcon />}
                    label={this.state.user.email}
                    onClick={this.toggleSettings("right", true)}
                  />
                </Tabs>
              ) : null}
            </div>
          </ToolBar>
        </AppBar>

        {x.matches ? (
          <Fragment>
            {this.state.user ? (
              <Fragment>
                <Paper style={{ flexGrow: 1 }}>
                  <AppBar position="static" color="default">
                    <Tabs
                      value={this.state.value}
                      onChange={this.handleChange}
                      indicatorColor="primary"
                      textColor="primary"
                      scrollButtons="auto"
                      centered
                    >
                      <Tab label="Fitness" />
                      <Tab label="Nutrition" />
                    </Tabs>
                  </AppBar>
                </Paper>
                <Grid container spacing={0} justify="center">
                  {this.state.value === 0 && (
                    <NutritionPanel
                      xlNut={this.props.xlNut}
                      theme={this.props.theme}
                    />
                  )}
                  {this.state.value === 1 && (
                    <FitnessPanel
                      xlFit={this.props.xlFit}
                      theme={this.props.theme}
                    />
                  )}
                </Grid>{" "}
              </Fragment>
            ) : (
              ""
            )}
          </Fragment>
        ) : (
          <Fragment>
            {this.state.user ? (
              <Grid container spacing={0} justify="center">
                {this.props.topPanel === "fitness" ? (
                  <Fragment>
                    <FitnessPanel
                      xlFit={this.props.xlFit}
                      theme={this.props.theme}
                    />
                    <NutritionPanel
                      xlNut={this.props.xlNut}
                      theme={this.props.theme}
                    />
                  </Fragment>
                ) : (
                  <Fragment>
                    <NutritionPanel
                      xlNut={this.props.xlNut}
                      theme={this.props.theme}
                    />
                    <FitnessPanel
                      xlFit={this.props.xlFit}
                      theme={this.props.theme}
                    />
                  </Fragment>
                )}
              </Grid>
            ) : (
              ""
            )}
          </Fragment>
        )}
        <Drawer
          anchor="right"
          open={this.state.right}
          onClose={this.toggleSettings("right", false)}
        >
          <div tabIndex={0} role="button">
            <div style={{ width: 350 }}>
              <Settings
                currentUser={
                  this.state.user ? this.state.user.email : "no user email"
                }
                toggleSettings={this.toggleSettings}
                signOut={this.props.signOut}
                handleSettingsChange={this.props.handleSettingsChange}
                topPanel={this.props.topPanel}
                orangeTheme={this.props.orangeTheme}
                pinkTheme={this.props.pinkTheme}
                greyTheme={this.props.greyTheme}
                cyanTheme={this.props.cyanTheme}
                switchUp={this.props.switchUp}
                theme={this.props.theme}
                xlNut={this.props.xlNut}
                xlFit={this.props.xlFit}
              />
            </div>
          </div>
        </Drawer>
      </React.Fragment>
    );
  }
}

export default Dashboard;
