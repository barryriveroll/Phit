import React, { Component, setGlobal } from "reactn";
import FitnessTracker from "./FitnessTracker";
import FitnessReports from "./FitnessReports";
import moment from "moment";
import API from "../../utils/API";
import { Slider } from "material-ui-slider";

// Material UI imports
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  demo: {
    [theme.breakpoints.up("lg")]: {
      width: 1170
    }
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  cancelTable: {
    "&:hover": {
      color: theme.palette.text.disabled,
      cursor: "pointer"
    }
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: `${theme.spacing.unit * 3}px`
  },
  cancelDiv: {
    float: "left",
    paddingRight: 12,
    paddingTop: 5,
    marginLeft: -16
  },
  paper: {
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
  xlPaperHeight: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    marginBottom: theme.spacing.unit,
    height: 700,
    [theme.breakpoints.down("md")]: {
      height: 700
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
    top: -20,
    fontSize: "1.5em",
    textShadow: "1px 1px 1px " + theme.palette.secondary.contrastText,
    fontWeight: 300
  },
  panelName: {
    width: "100%",
    marginTop: 20,
    fontFamily: "'Lobster', cursive",
    textAlign: "center"
  },
  tableScrollBar: {
    "&::-webkit-scrollbar": {
      width: 8
    },

    "&::-webkit-scrollbar-track": {
      background: "#00000040"
    },

    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.secondary.main
    },

    "&::-webkit-scrollbar-thumb:hover": {
      background: theme.palette.secondary.dark
    }
  }
});

class FitnessPanel extends Component {
  state = {
    open: false,
    value: 0,
    saving: false,
    saveSuccess: false,
    errorMessage: "",
    fetchDropdownData: false,
    data: {
      labels: [],
      datasets: [
        // Chart data for REPS or cardio thing
        {
          label: "Reps",
          type: "line",
          backgroundColor: this.props.theme.palette.primary.main,
          borderColor: this.props.theme.palette.primary.main,
          borderWidth: 3,
          hoverBackgroundColor: this.props.theme.palette.primary.main,
          hoverBorderColor: this.props.theme.palette.primary.contrastText,
          data: [],
          yAxisID: "y-axis-2",
          fontColor: this.props.theme.typography.body1.color
        },
        // Chart data for SETS
        {
          label: "Sets",
          type: "line",
          backgroundColor: this.props.theme.palette.secondary.main,
          borderColor: this.props.theme.palette.secondary.main,
          borderWidth: 3,
          hoverBackgroundColor: this.props.theme.palette.secondary.main,
          hoverBorderColor: this.props.theme.palette.primary.contrastText,
          data: [],
          yAxisID: "y-axis-3",
          fontColor: this.props.theme.typography.body1.color
        },
        // Chart data for WEIGHT or cardio thing 2
        {
          label: "Weight",
          type: "bar",
          backgroundColor: "#232323",
          borderColor: "#232323",
          borderWidth: 1,
          hoverBackgroundColor: "#232323",
          hoverBorderColor: this.props.theme.palette.primary.contrastText,
          data: [],
          yAxisID: "y-axis-1",
          fontColor: this.props.theme.typography.body1.color
        }
      ]
    },
    anchorEl: null,
    resistanceToAdd: [],
    cardioToAdd: [],
    user: null,
    workoutDate: "",
    selectedWorkout: "None",
    woName: "",
    savedWorkouts: [],
    open: false,
    detailData: {},
    timeframe: "",
    type: "",
    exercise: "",
    detailView: false,
    yAxis: "",
    queryData: [],
    chartWeek: moment().week(),
    canClickDetail: false
  };

  styles = {
    table: {
      table: {
        borderCollapse: "collapse"
      },
      border: {
        border: "1px solid #dddddd",
        width: 140
      }
    }
  };

  clickChartDetail = (date, detailIndex) => {
    date = moment(date).format("YYYY-MM-DD");
    let index = this.state.queryData.findIndex(
      loopburger => loopburger.date === date
    );
    let newLabels = [];
    let newLineData = this.state.queryData[index].resistance.reps;
    let newBarData = this.state.queryData[index].resistance.weight;
    for (let i = 0; i < this.state.queryData[index].resistance.sets; i++) {
      newLabels.push("Set " + (i + 1));
    }
    let detailData = {
      labels: newLabels,
      datasets: [
        {
          label: "Reps",
          type: "line",
          backgroundColor: this.props.theme.palette.primary.main,
          borderColor: this.props.theme.palette.primary.main,
          borderWidth: 3,
          hoverBackgroundColor: this.props.theme.palette.primary.main,
          hoverBorderColor: this.props.theme.palette.primary.contrastText,
          data: newLineData,
          yAxisID: "y-axis-2",
          fontColor: this.props.theme.typography.body1.color
        },
        {
          label: "Weight",
          type: "bar",
          backgroundColor: "#232323",
          borderColor: "#232323",
          borderWidth: 1,
          hoverBackgroundColor: "#232323",
          hoverBorderColor: this.props.theme.palette.primary.contrastText,
          data: newBarData,
          yAxisID: "y-axis-1",
          fontColor: this.props.theme.typography.body1.color
        }
      ]
    };

    this.setState({ detailView: true, detailData, detailIndex }, () =>
      this.getWorkOutByTimeframe(this.state.exercise)
    );
  };

  closeDetailView = () => {
    this.setState({
      detailView: false,
      detailIndex: null,
      timeframe: "thisWeek"
    });
  };

  clickDelete = (type, index) => {
    let name = `${type}ToAdd`;
    let newArr = [...this.state[name]];
    newArr.splice(index, 1);
    this.setState({ [name]: newArr });
  };

  clickExerciseType = name => event => {
    const { value } = event.target;
    this.setState({
      [name]: value,
      yAxis: "",
      exercise: "",
      canClickDetail: false
    });
  };

  clickExerciseName = name => event => {
    const { value } = event.target;
    this.setState({ [name]: value, canClickDetail: false }, () => {
      if (this.state.timeframe) {
        this.getWorkOutByTimeframe(this.state.exercise);
      }
    });
  };

  handleTabChange = (event, value) => {
    this.setState({ value });
  };

  handleLoadWorkoutChange = workout => {
    API.getWorkOutById(workout.value).then(res => {
      const newResistance = [];
      const newCardio = [];
      console.log(res.data);
      if (res.data.resistance) {
        res.data.resistance.forEach(exercise => {
          newResistance.push({
            name: exercise.name,
            weight: exercise.weight,
            reps: exercise.reps,
            sets: exercise.sets
          });
        });
      }

      if (res.data.cardio) {
        res.data.cardio.forEach(exercise => {
          newCardio.push({
            name: exercise.name,
            time: exercise.time,
            distance: exercise.distance
          });
        });
      }

      this.setState({ resistanceToAdd: newResistance, cardioToAdd: newCardio });
    });
  };

  handleWorkoutChange = newValue => {
    this.setState({ woName: newValue });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value }, () => {
      if (name === "timeframe" || (name === "yAxis" && this.state.timeframe)) {
        this.getWorkOutByTimeframe(this.state.exercise);
      }
    });
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleAnchorEl = node => {
    this.anchorEl = node;
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  toggleShareDialog = () => {
    this.setState({ open: !this.state.open });
  };

  handleClose = name => event => {
    let joined;
    let value = 0;
    if (name === "cardioToAdd") {
      value = 1;
      joined = this.state[name].concat({ name: "" });
    } else if (name === "resistanceToAdd") {
      joined = this.state[name].concat({
        name: "",
        weight: [1],
        reps: [1],
        sets: 1
      });
    }
    if (name) {
      this.setState({ open: false, [name]: joined, value });
    } else {
      this.setState({ open: false });
    }
  };

  handleClickAway = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  componentDidMount = () => {
    setGlobal({ exerciseReady: false });
    API.findUserWorkOuts(localStorage.userId).then(res => {
      let savedArray = res.data[0].workouts.filter(workout => workout.name);
      this.setState(
        {
          savedWorkouts: savedArray,
          allWorkOuts: res.data[0].workouts
        },
        () => {
          this.setExerciseArrays("resistance", "resistanceExerciseNames");
          this.setExerciseArrays("cardio", "cardioExerciseNames");
          this.returnWorkoutsByDate(moment().format("YYYY-MM-DD"));
          this.getWorkOutByTimeframe(
            "you have no idea the pain this has caused my family"
          );
        }
      );
    });
  };

  setExerciseArrays = (value, nameArray) => {
    let array = [];
    for (let i = 0; i < this.state.allWorkOuts.length; i++) {
      for (let j = 0; j < this.state.allWorkOuts[i][value].length; j++) {
        if (
          this.state.allWorkOuts[i][value].length &&
          !array.includes(this.state.allWorkOuts[i][value][j].name)
        ) {
          array.push(this.state.allWorkOuts[i][value][j].name);
        }
      }
    }
    this.setState({
      [nameArray]: array
    });
  };

  addExercise = name => {
    let joined = this.state[name].concat({ name: "" });
    this.setState({ open: false, [name]: joined });
  };

  handleResistanceArrayChange = (type, exerciseId) => event => {
    const { value, id } = event.currentTarget;
    let newRez = [...this.state.resistanceToAdd];
    newRez[exerciseId][type][id] = parseInt(value);
    this.setState({ resistanceToAdd: newRez });
  };

  handleInputChange = type => event => {
    const { value, id, name } = event.currentTarget;
    let newExerciseArr = [...this.state[type]];
    newExerciseArr[id][name] = value;
    this.setState({ [type]: newExerciseArr });
  };
  handleNameChange = event => {
    const { value } = event.currentTarget;
    this.setState({ woName: value });
  };
  handleCardio = event => {
    const { value, id, name } = event.currentTarget;
    [...this.state.cardioToAdd[id][name]] = value;
    this.setState({ cardioToAdd: this.state.cardioToAdd });
  };

  handleSetChange = event => {
    let { value, id } = event.currentTarget;
    console.log(value);
    value = parseInt(value);
    if (value < 1) value = 1;
    if (value > 20) value = 20;
    let resistanceArrayCopy = [...this.state.resistanceToAdd];
    if (value > resistanceArrayCopy[id].sets) {
      for (let i = resistanceArrayCopy[id].sets; i < value; i++) {
        resistanceArrayCopy[id].weight.push(1);
        resistanceArrayCopy[id].reps.push(1);
      }
    } else {
      resistanceArrayCopy[id].weight.length = value;
      resistanceArrayCopy[id].reps.length = value;
    }
    resistanceArrayCopy[id].sets = value;
    this.setState({ resistanceToAdd: resistanceArrayCopy });
  };

  saveDay = () => {
    this.setState({ saving: true }, () => {
      let data = {
        WorkOut: {
          date: this.state.workoutDate,
          week: moment(this.state.workoutDate, "YYYY-MM-DD").week(),
          user: localStorage.userId,
          resistance: [],
          cardio: []
        }
      };

      if (this.state.woName) {
        data.WorkOut["name"] = this.state.woName;
      }

      let resistanceNames = [...this.state.resistanceExerciseNames];
      let cardioNames = [...this.state.cardioExerciseNames];

      if (this.state.resistanceToAdd.length) {
        this.state.resistanceToAdd.map(resistance => {
          if (!resistanceNames.includes(resistance.name)) {
            resistanceNames.push(resistance.name);
          }

          data.WorkOut.resistance.push({
            name: resistance.name,
            sets: parseInt(resistance.sets),
            reps: resistance.reps,
            weight: resistance.weight
          });
        });
      }
      if (this.state.cardioToAdd.length) {
        this.state.cardioToAdd.map(cardio => {
          if (!cardioNames.includes(cardio.name)) {
            cardioNames.push(cardio.name);
          }
          data.WorkOut.cardio.push({
            name: cardio.name,
            distance: parseInt(cardio.distance),
            time: parseInt(cardio.time)
          });
        });
      }

      this.setState({ fetchDropdownData: true, errorMessage: "" }, () => {
        API.saveWorkOut(data.WorkOut).then(res => {
          if (res.data.errors) {
            this.setState(
              {
                errorMessage: "Missing workout info!",
                saving: false,
                saveSuccess: false,
                buttonColor: "#cc3737"
              },
              () => {
                setTimeout(() => {
                  this.setState({ errorMessage: "", buttonColor: "" });
                }, 3000);
              }
            );
          } else {
            if (res.data.upserted) {
              API.pushWorkOut({
                userId: localStorage.userId,
                id: res.data.upserted[0]._id
              });
            }

            if (this.state.timeframe) {
              this.getWorkOutByTimeframe(this.state.exercise);
            }

            this.setState(
              {
                resistanceExerciseNames: resistanceNames,
                cardioExerciseNames: cardioNames,
                fetchDropdownData: false,
                errorMessage: "Saved workout!",
                saving: false,
                buttonColor: "#469640",
                saveSuccess: true
              },
              () => {
                setTimeout(() => {
                  this.setState({ errorMessage: "", buttonColor: "" });
                }, 3000);
              }
            );
          }
        });
      });
    });
  };

  returnWorkoutsByDate = date => {
    console.log(this.global.userId);
    this.setState({ workoutDate: date }, () => {
      API.getWorkOutsByDate(this.state.workoutDate, localStorage.userId).then(
        res => {
          if (res.data.length) {
            let newWorkOutState = { resistanceToAdd: [], cardioToAdd: [] };
            if (res.data[0].resistance) {
              res.data[0].resistance.map(resistance => {
                newWorkOutState.resistanceToAdd.push({
                  name: resistance.name,
                  sets: resistance.sets,
                  reps: resistance.reps,
                  weight: resistance.weight
                });
              });
            }
            if (res.data[0].cardio) {
              res.data[0].cardio.map(cardio => {
                newWorkOutState.cardioToAdd.push({
                  name: cardio.name,
                  time: cardio.time,
                  distance: cardio.distance
                });
              });
            }

            this.setState(
              {
                resistanceToAdd: newWorkOutState.resistanceToAdd,
                cardioToAdd: newWorkOutState.cardioToAdd,
                selectedWorkout: res.data[0].name ? res.data[0].name : "None"
              },
              () => {
                setGlobal({ exerciseReady: true });
              }
            );
          } else {
            this.setState(
              {
                resistanceToAdd: [],
                cardioToAdd: [],
                selectedWorkout: "None"
              },
              () => {
                setGlobal({ exerciseReady: true });
              }
            );
          }
        }
      );
    });
  };

  getWorkOutByTimeframe = exercise => {
    API.workOutByWeek({
      week: this.state.chartWeek,
      name: exercise,
      user: localStorage.userId,
      type: this.state.type
    }).then(res => {
      let newChartData = { ...this.state.data };
      const dateArray = [
        moment()
          .day("Sunday")
          .week(this.state.chartWeek)
          .format("MM-DD-YYYY"),
        moment()
          .day("Monday")
          .week(this.state.chartWeek)
          .format("MM-DD-YYYY"),
        moment()
          .day("Tuesday")
          .week(this.state.chartWeek)
          .format("MM-DD-YYYY"),
        moment()
          .day("Wednesday")
          .week(this.state.chartWeek)
          .format("MM-DD-YYYY"),
        moment()
          .day("Thursday")
          .week(this.state.chartWeek)
          .format("MM-DD-YYYY"),
        moment()
          .day("Friday")
          .week(this.state.chartWeek)
          .format("MM-DD-YYYY"),
        moment()
          .day("Saturday")
          .week(this.state.chartWeek)
          .format("MM-DD-YYYY")
      ];

      newChartData.labels = [
        ["Sunday", dateArray[0]],
        ["Monday", dateArray[1]],
        ["Tuesday", dateArray[2]],
        ["Wednesday", dateArray[3]],
        ["Thursday", dateArray[4]],
        ["Friday", dateArray[5]],
        ["Saturday", dateArray[6]]
      ];

      let newData = [null, null, null, null, null, null, null];
      let lineData = [null, null, null, null, null, null, null];
      let line2Data = [null, null, null, null, null, null, null];

      for (let i = 0; i < res.data.length; i++) {
        const dateToFind = moment(res.data[i].date).format("MM-DD-YYYY");
        const id = dateArray.indexOf(dateToFind);
        if (this.state.type === "resistance" && this.state.exercise) {
          newData[id] = this.returnAverage(res.data[i].resistance.weight);
          lineData[id] = this.returnAverage(res.data[i].resistance.reps);
          line2Data[id] = res.data[i].resistance.sets;
          newChartData.datasets[2].label = "Weight";
          newChartData.datasets[0].label = "Reps";
          newChartData.datasets[1].label = "Sets";
        } else if (this.state.type === "cardio") {
          newData[id] = res.data[i].cardio.distance;
          lineData[id] = res.data[i].cardio["time"];
          newChartData.datasets[2].label = "Distance";
          newChartData.datasets[0].label = "Time";
        }
      }

      newChartData.datasets[2].data = newData;
      newChartData.datasets[0].data = lineData;
      newChartData.datasets[1].data = line2Data;

      let queryData = [...res.data];
      queryData.forEach(data => {
        if (data.cardio) {
          data.cardio = [];
        }
      });

      let canClickDetail = false;
      if (this.state.type === "resistance") {
        canClickDetail = true;
      }

      this.setState({
        data: newChartData,
        queryData,
        canClickDetail
      });
    });
  };

  returnAverage = arr => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }

    return (sum / arr.length).toFixed(0);
  };

  clickSavedWorkout = event => {
    let date = "";
    for (let i = 0; i < this.state.savedWorkouts.length; i++) {
      if (this.state.savedWorkouts[i].name === event.target.value) {
        date = this.state.savedWorkouts[i].date;
      }
    }

    this.returnWorkoutsByDate(date);
  };

  selectDate = event => {
    let newDate = event.target.value;
    this.returnWorkoutsByDate(newDate);
  };

  selectWeek = event => {
    let week = event.target.value.split("W")[1];
    if (week === undefined) week = 52;
    this.setState(
      {
        chartWeek: week,
        timeframe: "thisWeek",
        detailView: false,
        detailIndex: null
      },
      () => this.getWorkOutByTimeframe(this.state.exercise)
    );
  };

  selectWorktout = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, open } = this.state;

    return (
      <Grid container spacing={1} className={classes.demo}>
        <Typography className={classes.panelName} variant="h3" gutterBottom>
          Fitness
        </Typography>
        <Grid item xs={12} md={this.props.xlFit ? 12 : 6}>
          <FitnessTracker
            saving={this.state.saving}
            buttonColor={this.state.buttonColor}
            saveSuccess={this.state.saveSuccess}
            handleResistanceArrayChange={this.handleResistanceArrayChange}
            handleSetChange={this.handleSetChange}
            clickDelete={this.clickDelete}
            errorMessage={this.state.errorMessage}
            fetchDropdownData={this.state.fetchDropdownData}
            value={this.state.value}
            classes={classes}
            xlFit={this.props.xlFit}
            handleAnchorEl={this.handleAnchorEl}
            selectWorktout={this.state.selectedWorkout}
            clickSavedWorkout={this.clickSavedWorkout}
            savedWorkouts={this.state.savedWorkouts}
            workoutDate={this.state.workoutDate}
            selectDate={this.selectDate}
            woName={this.state.woName}
            handleNameChange={this.handleNameChange}
            resistanceToAdd={this.state.resistanceToAdd}
            cardioToAdd={this.state.cardioToAdd}
            handleToggle={this.handleToggle}
            anchorEl={anchorEl}
            handleCardio={this.handleCardio}
            handleInputChange={this.handleInputChange}
            handleClickAway={this.handleClickAway}
            handleClose={this.handleClose}
            saveDay={this.saveDay}
            open={open}
            handleLoadWorkoutChange={this.handleLoadWorkoutChange}
            handleChange={this.handleTabChange}
            handleWorkoutChange={this.handleWorkoutChange}
            toggleShareDialog={this.toggleShareDialog}
          />
        </Grid>
        <Grid item xs={12} md={this.props.xlFit ? 12 : 6}>
          <Paper
            className={this.props.xlFit ? classes.xlPaperHeight : classes.paper}
          >
            <Typography
              component="h1"
              className={classes.panelHeader}
              color="secondary"
            >
              Reports
            </Typography>
            <FitnessReports
              canClickDetail={this.state.canClickDetail}
              selectWeek={this.selectWeek}
              chartWeek={this.props.chartWeek}
              closeDetailView={this.closeDetailView}
              detailView={this.state.detailView}
              detailData={this.state.detailData}
              detailIndex={this.state.detailIndex}
              data={this.state.data}
              clickChartDetail={this.clickChartDetail}
              workOuts={this.state.allWorkOuts}
              getWorkOuts={this.getWorkOutByTimeframe}
              cardioArray={this.state.cardioExerciseNames}
              resistanceArray={this.state.resistanceExerciseNames}
              clickExerciseName={this.clickExerciseName}
              clickExerciseType={this.clickExerciseType}
              handleChange={this.handleChange}
              type={this.state.type}
              exercise={this.state.exercise}
              yAxis={this.state.yAxis}
              timeframe={this.state.timeframe}
              textColor={this.props.theme.typography.body1.color}
            />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(FitnessPanel);
