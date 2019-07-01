import React from "react";
import moment from "moment";

// Material UI imports
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// import Table from "@material-ui/core/Table";
import TrackerTable from "../Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DatePickers from "../DatePicker";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import WorkoutsDropdown from "../WorkoutsDropdown";
import CancelIcon from "@material-ui/icons/Cancel";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 5 }}>
      {props.children}
    </Typography>
  );
}

function FitnessTracker(props) {
  const classNames = {
    errorTab: {
      transition: "color 1s",
      color: "red"
    }
  };

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
          <DatePickers
            margin="dense"
            label="Workout Date"
            value={props.workoutDate}
            changeHandler={props.selectDate}
            name="workoutDate"
          />
        </Grid>
      </Grid>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={props.handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
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
        <Grid item xs={7}>
          <Button
            style={{ marginRight: 6 }}
            color="primary"
            variant="contained"
            onClick={props.handleClose("resistanceToAdd")}
          >
            Add Resistance
          </Button>

          <Button
            color="primary"
            variant="contained"
            onClick={props.handleClose("cardioToAdd")}
          >
            Add Cardio
          </Button>
        </Grid>
        <Grid item xs={2}>
          {/* Check for the first letter in error message, currently "Missing data..." */}
          <Typography
            component="body1"
            style={
              props.errorMessage.charAt(0) === "M"
                ? { color: "red", marginTop: 6 }
                : { color: "#34c334", marginTop: 6 }
            }
          >
            {props.errorMessage}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            style={{ float: "right" }}
            color="secondary"
            onClick={props.saveDay}
            className={classes.button}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default FitnessTracker;
