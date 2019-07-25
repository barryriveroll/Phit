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
import WorkoutsDropdown from "../tracking/WorkoutsDropdown";
import MoodIcon from "@material-ui/icons/Mood";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import SharedDialogWorkout from "../SharedDialogWorkout";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";

function TabContainer(props) {
  return <Typography component="div">{props.children}</Typography>;
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
    return <Icon>save</Icon>;
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
      <Grid justify="space-between" container spacing={1}>
        <Grid item xs={6}>
          <WorkoutsDropdown
            handleLoadWorkoutChange={props.handleLoadWorkoutChange}
            // woName={props.woName}
            handleChange={props.handleWorkoutChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="date"
            fullWidth
            value={props.workoutDate}
            name="workoutDate"
            onChange={props.selectDate}
            label="Workout Date"
            type="date"
            className={classes.textField}
            variant="filled"
            InputLabelProps={{
              shrink: true
            }}
          />
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
        <Grid item xs={6}>
          <Fab
            style={{ marginRight: 6, height: 40, width: 40 }}
            color="primary"
            size="small"
            onClick={props.handleClose("resistanceToAdd")}
          >
            <span className={classes.addSpan}>+ </span>
            <Icon>fitness_center</Icon>
          </Fab>

          <Fab
            color="primary"
            style={{ height: 40, width: 40 }}
            size="small"
            onClick={props.handleClose("cardioToAdd")}
          >
            <span className={classes.addSpan}>+ </span>
            <Icon>directions_run</Icon>
          </Fab>
        </Grid>
        <Grid item xs={3}>
          <SharedDialogWorkout
            resistanceToAdd={props.resistanceToAdd}
            workoutName={props.woName}
            classes={classes}
          />
        </Grid>

        <Grid item xs={3}>
          <Fab
            size="small"
            style={{
              width: 40,
              height: 40,
              float: "right",
              backgroundColor: props.buttonColor
            }}
            color="secondary"
            onClick={props.saveDay}
            // className={classes.button}
            disabled={props.saving}
          >
            {returnSaveSuccessOrFailureDependingOnCertainConditions(
              props.saveSuccess,
              props.errorMessage
            )}
          </Fab>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default FitnessTracker;
