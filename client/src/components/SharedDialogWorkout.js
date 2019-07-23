import React, { Component, getGlobal, setGlobal } from "reactn";
import Button from "@material-ui/core/Button";
import moment from "moment";

import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import ShareIcon from "@material-ui/icons/Share";
import SharedTable from "../components/profile/SharedTable";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import SharedWorkoutTable from "./profile/SharedWorkoutTable";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 5 }}>
      {props.children}
    </Typography>
  );
}

class SharedDialogWorkout extends Component {
  state = {
    setOpen: false,
    value: 0,
    resistanceToShare: []
  };

  // GetFormattedDate = () => {
  //   var todayTime = new Date();
  //   var month = format(todayTime.getMonth() + 1);
  //   var day = format(todayTime.getDate());
  //   var year = format(todayTime.getFullYear());
  //   return month + "/" + day + "/" + year;
  // };

  toggleDialog = () => {
    this.setState({
      setOpen: !this.state.setOpen,
      resistanceToShare: [...this.props.resistanceToAdd]
    });
  };

  handleChange = event => {
    let { name, value, id } = event.target;
    if (name === "sets") {
      if (value < 1) value = 1;
      if (value > 20) value = 20;
    }
    let resistanceCopy = [...this.state.resistanceToShare];
    resistanceCopy[id][name] = value;
    this.setState({ resistanceToShare: resistanceCopy });
  };

  handleTabChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Fab
          style={{ float: "right" }}
          size="small"
          onClick={this.toggleDialog}
          color="secondary"
          aria-label="Edit"
          className={classes.fab}
        >
          <ShareIcon />
        </Fab>

        <Dialog
          open={this.state.setOpen}
          onClose={this.toggleDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Share Workout</DialogTitle>
          <DialogContent>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingBottom: 16
              }}
            >
              <div style={{ width: "48%" }}>
                <TextField
                  id="name"
                  defaultValue={this.props.workoutName}
                  variant="filled"
                  fullWidth
                  name="name"
                  label="Workout Name"
                  type="text"
                />
              </div>
              <div style={{ width: "48%" }}>
                <TextField
                  id="date"
                  variant="filled"
                  fullWidth
                  disabled={true}
                  value={moment().format("YYYY-MM-DD")}
                  name="sharedDate"
                  label="Share Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </div>
            </div>
            <AppBar style={{ width: 545 }} position="static" color="default">
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
                height: 400,
                flexDirection: "column",
                overflowY: "auto",
                overflowX: "hidden",
                backgroundColor: "#00000017"
              }}
            >
              {this.state.value === 0 && (
                <TabContainer>
                  <SharedWorkoutTable
                    resistance
                    resistanceToAdd={this.props.resistanceToAdd}
                    handleChange={this.handleChange}
                  />
                </TabContainer>
              )}
              {this.state.value === 1 && (
                <TabContainer>
                  <SharedWorkoutTable />
                </TabContainer>
              )}
            </div>
            <TextField
              style={{ paddingTop: 20 }}
              fullWidth
              rows="3"
              multiline
              inputProps={{ maxLength: 500 }}
              id="input-with-icon-grid"
              placeholder="Additional notes (optional)"
              name="sharedNotes"
              // onChange={}
              // value={}
            />
          </DialogContent>
          <DialogActions>
            {this.state.reportySuc ? (
              <Typography style={{ width: "50%" }}>
                Thanks. Your report is on the way.
              </Typography>
            ) : (
              ""
            )}

            <Button onClick={this.toggleDialog} color="primary">
              Close
            </Button>
            <Button
              style={{ width: 143 }}
              disabled={
                !this.state.reportyCat ||
                this.state.reportyText.length < 5 ||
                !this.state.canReport
              }
              onClick={this.reportButton}
              color="primary"
            >
              {this.state.timer < 60
                ? `Share Workout (${this.state.timer})`
                : "Share Workout"}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default SharedDialogWorkout;
