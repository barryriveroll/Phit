import React, { Component } from "reactn";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import TrackerTable from "../../components/Table";
import TagSelector from "./TagSelector";
import SharedTable from "./SharedTable";

// let value = 0;

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 5 }}>
      {props.children}
    </Typography>
  );
}

export default class SharedWorkouts extends Component {
  state = {
    value: 0
  };

  handleTabChange = (event, value) => {
    this.setState({ value });
  };
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paperThree}>
        <Typography
          component="h1"
          className={classes.panelHeaderTwo}
          color="secondary"
        >
          Shared Workouts
        </Typography>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            scrollButtons="auto"
          >
            <Tab label="Resistance" />
            <Tab label="Cardio" />
          </Tabs>
        </AppBar>

        <div
          style={{
            flexGrow: 1,
            flexDirection: "column",
            overflowY: "auto",
            overflowX: "hidden",
            backgroundColor: "#00000017"
          }}
        >
          {this.state.value === 0 && (
            <TabContainer>
              <TagSelector resistance classes={classes} />
              <SharedTable />
            </TabContainer>
          )}
          {this.state.value === 1 && (
            <TabContainer>
              <TagSelector classes={classes} />
              <SharedTable />
            </TabContainer>
          )}
        </div>
      </Paper>
    );
  }
}
