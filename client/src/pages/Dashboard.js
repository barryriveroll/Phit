import React, { Component, Fragment } from "react";
import { auth } from "../firebase.js";

//Panel imports
import FitnessPanel from "../components/panels/FitnessPanel";
import NutritionPanel from "../components/panels/NutritionPanel";

// Material UI imports
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Paper from "@material-ui/core/Paper";
import NotFound from "../components/NotFound.js";

let x = window.matchMedia("(max-width: 700px)");

class Dashboard extends Component {
  state = { xlFit: this.props.xlFit, value: 0, user: { emailVerified: false } };

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

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <React.Fragment>
        <CssBaseline />

        {x.matches ? (
          <Fragment>
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
                    <Tab label="Nutrition" />
                    <Tab label="Fitness" />
                  </Tabs>
                </AppBar>
              </Paper>
              <Grid container spacing={0} justify="center" {...this.props}>
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
              </Grid>
            </Fragment>
          </Fragment>
        ) : (
          <Fragment>
            <Grid container spacing={0} justify="center" {...this.props}>
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
          </Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Dashboard;
