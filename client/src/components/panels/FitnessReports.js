import React, { Component, Fragment } from "react";
import { Bar } from "react-chartjs-2";

// Material UI imports
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Fab from "@material-ui/core/Fab";

let x = window.matchMedia("(max-width: 700px)");
let chartHeight = 50;

function myFunction(x) {
  if (x.matches) return 85;
  else return 50;
}

const classes = {
  smallBtn: {
    minHeight: 28,
    width: 28,
    height: 28
  },
  backBtn: {
    minHeight: 28,
    width: 28,
    height: 28,
    position: "absolute"
  }
};

class FitnessReports extends Component {
  constructor(props) {
    super();

    chartHeight = myFunction(x);
    x.addListener(myFunction);
  }

  render() {
    const mixedOptions = {
      responsive: true,
      tooltips: {
        mode: "label"
      },
      elements: {
        line: {
          fill: false
        }
      },
      scales: {
        xAxes: [
          {
            display: true,
            gridLines: {
              display: false
            },
            ticks: {
              fontColor: this.props.textColor,
              fontSize: 10
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              fontColor: this.props.textColor
            },
            type: "linear",
            display: true,
            position: "left",
            id: "y-axis-1",
            gridLines: {
              display: false
            },
            labels: {
              show: true
            }
          },
          {
            ticks: {
              beginAtZero: true,
              fontColor: this.props.textColor
            },
            type: "linear",
            display: true,
            position: "right",
            id: "y-axis-2",
            gridLines: {
              display: false
            },
            labels: {
              show: true
            }
          },
          {
            ticks: {
              beginAtZero: true,
              fontColor: this.props.textColor
            },
            type: "linear",
            display: true,
            position: "right",
            id: "y-axis-3",
            gridLines: {
              display: false
            },
            labels: {
              show: true
            }
          }
        ]
      },
      legend: {
        labels: {
          fontColor: this.props.textColor
        },
        position: "top"
      }
    };

    return (
      <div>
        <Grid container justify="center">
          <FormControl>
            <InputLabel htmlFor="type-native-simple">Type</InputLabel>
            <Select
              style={{ width: 120, marginRight: 15, marginBottom: 18 }}
              native
              value={this.props.type}
              onChange={this.props.clickExerciseType("type")}
              inputProps={{
                name: "type",
                id: "type-native-simple"
              }}
            >
              <option value="" />
              <option value={"cardio"}>Cardio</option>
              <option value={"resistance"}>Resistance</option>
            </Select>
          </FormControl>

          <FormControl disabled={!this.props.type}>
            <InputLabel htmlFor="exercise-native-simple">Exercise</InputLabel>
            <Select
              style={{ width: 120, marginRight: 15 }}
              native
              value={this.props.exercise}
              onChange={this.props.clickExerciseName("exercise")}
              inputProps={{
                name: "exercise",
                id: "exercise-native-simple"
              }}
            >
              <option value="" />
              {this.props.type
                ? this.props.type === "resistance"
                  ? this.props.resistanceArray.map(exercise => (
                      <option key={exercise}>{exercise}</option>
                    ))
                  : this.props.cardioArray.map(exercise => (
                      <option key={exercise}>{exercise}</option>
                    ))
                : null}
            </Select>
          </FormControl>
          {/* <FormControl disabled={!this.props.exercise}>
            <InputLabel htmlFor="reps-native-simple">Y-Axis</InputLabel>
            <Select
              style={{ width: 120, marginRight: 15 }}
              native
              value={this.props.reps}
              onChange={this.props.handleChange("yAxis")}
              inputProps={{
                name: "reps",
                id: "reps-native-simple"
              }}
            >
              <option value="" />

              {this.props.type === "resistance" ? (
                <Fragment>
                  <option value={"reps"}>Reps</option>
                  <option value={"sets"}>Sets</option>
                </Fragment>
              ) : (
                <Fragment>
                  <option value={"time"}>Time</option>
                </Fragment>
              )}
            </Select>
          </FormControl> */}

          <FormControl disabled={!this.props.exercise}>
            <InputLabel htmlFor="timeframe-native-simple">Timeframe</InputLabel>
            <Select
              style={{ width: 120, marginRight: 15 }}
              native
              value={this.props.timeframe}
              onChange={this.props.handleChange("timeframe")}
              inputProps={{
                name: "timeframe",
                id: "timeframe-native-simple"
              }}
            >
              <option value="" />
              <option value={"thisWeek"}>This Week</option>
              <option value={"thisMonth"}>This Month</option>
              <option value={"thisYear"}>This Year</option>
            </Select>
          </FormControl>
        </Grid>

        {this.props.detailView ? (
          <>
            <Bar
              // redraw
              data={this.props.detailData}
              width={100}
              height={chartHeight}
              options={mixedOptions}
            />
            <Fab
              onClick={this.props.closeDetailView}
              style={classes.backBtn}
              size="small"
              color="primary"
              aria-label="Add"
            >
              <ChevronLeftIcon />
            </Fab>
          </>
        ) : (
          <>
            <Bar
              // redraw
              data={this.props.data}
              width={100}
              height={chartHeight}
              options={mixedOptions}
            />
          </>
        )}
        <Grid
          style={{ marginLeft: 20, paddingRight: 57 }}
          container
          justify="space-evenly"
        >
          {this.props.data.datasets[0].data.map((data, index) => (
            <Fab
              key={index}
              disabled={!data}
              onClick={() =>
                this.props.clickChartDetail(this.props.data.labels[index][1])
              }
              style={classes.smallBtn}
              size="small"
              color="secondary"
              aria-label="Add"
            >
              <AddIcon />
            </Fab>
          ))}
        </Grid>
      </div>
    );
  }
}

export default FitnessReports;
