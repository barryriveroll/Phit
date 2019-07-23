import React, { useState } from "react";

// Material UI imports
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import TrackerTable from "../Table";
import Grid from "@material-ui/core/Grid";
import WorkoutsDropdown from "../WorkoutsDropdown";
import MoodIcon from "@material-ui/icons/Mood";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import SharedDialogWorkout from "../SharedDialogWorkout";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 5 }}>
      {props.children}
    </Typography>
  );
}

function returnSaveSuccessOrFailureDependingOnCertainConditions(
  saveSuccess,
  errorMessage
) {
  if (errorMessage) {
    if (saveSuccess) {
      return <MoodIcon />;
    } else {
      return <MoodBadIcon />;
    }
  } else {
    return "Save";
  }
}

function FitnessTracker(props) {
  const { value, classes } = props;
  return (
    <Paper className={props.xlFit ? classes.xlPaperHeight : classes.paper}>
      <Typography
        component="h1"
        className={classes.panelHeader}
        color="secondary"
      >
        Tracking
      </Typography>
      <Grid justify="space-between" container>
        <Grid item xs={6}>
          <WorkoutsDropdown
            handleLoadWorkoutChange={props.handleLoadWorkoutChange}
            fetchDropdownData={props.fetchDropdownData}
          />
          <TextField
            fullWidth
            id="outlined-name"
            label="Name"
            value={props.woName}
            onChange={props.handleNameChange}
            className={classes.textField}
            margin="dense"
            variant="filled"
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            id="date"
            value={props.workoutDate}
            name="workoutDate"
            onChange={props.selectDate}
            label="Workout Date"
            type="date"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
          />
          <SharedDialogWorkout classes={classes} />
        </Grid>
      </Grid>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={props.handleChange}
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
        className={classes.tableScrollBar}
        style={{
          flexGrow: 1,
          flexDirection: "column",
          overflowY: "auto",
          overflowX: "hidden",
          backgroundColor: "#00000017"
        }}
      >
        {value === 0 && (
          <TabContainer>
            <TrackerTable
              classes={classes}
              fitness
              onChange={props.handleInputChange}
              clickDelete={props.clickDelete}
              type="resistance"
              data={props.resistanceToAdd}
              handleSetChange={props.handleSetChange}
              handleResistanceArrayChange={props.handleResistanceArrayChange}
            />
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            <TrackerTable
              fitness
              onChange={props.handleInputChange}
              clickDelete={props.clickDelete}
              type="cardio"
              data={props.cardioToAdd}
            />
          </TabContainer>
        )}
      </div>
      <Grid style={{ marginTop: 6 }} container>
        <Grid item xs={9}>
          <Button
            style={{ marginRight: 6 }}
            color="primary"
            size="small"
            variant="contained"
            onClick={props.handleClose("resistanceToAdd")}
          >
            Add Resistance
          </Button>

          <Button
            color="primary"
            variant="contained"
            size="small"
            onClick={props.handleClose("cardioToAdd")}
          >
            Add Cardio
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            size="small"
            style={{
              width: 70,
              height: 30,
              float: "right",
              backgroundColor: props.buttonColor
            }}
            color="secondary"
            onClick={props.saveDay}
            className={classes.button}
            disabled={props.saving}
          >
            {returnSaveSuccessOrFailureDependingOnCertainConditions(
              props.saveSuccess,
              props.errorMessage
            )}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default FitnessTracker;
