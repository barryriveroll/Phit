import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

// Material UI imports
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
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
    height: 28,
    transition: "0.5s all"
  },
  backBtn: {
    minHeight: 28,
    width: 28,
    height: 28,
    position: "absolute",
    top: "calc(50% - 14px)"
  },
  detailBtn: {
    minHeight: 28,
    width: 28,
    height: 28,
    transition: "0.5s all",
    transform: "rotate(225deg)"
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
            display: false,
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
            display: false,
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
            display: false,
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
          fontColor: this.props.textColor,
          filter: (legendItem, chartData) => {
            if (legendItem.datasetIndex === 1) {
              if (this.props.type === "cardio") return false;
            }
            return true;
          }
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
              <option value={"thisWeek"}>Weekly</option>
              <option value={"thisMonth"}>Monthly</option>
            </Select>
          </FormControl>
          <FormControl>
            <TextField
              disabled={!this.props.timeframe || !this.props.exercise}
              id="date"
              style={{ width: 120 }}
              value={this.props.chartWeek}
              name="workoutDate"
              onChange={this.props.selectWeek}
              label=" "
              type={this.props.timeframe === "thisWeek" ? "week" : "month"}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
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
        <Grid container justify="space-around">
          {this.props.data.datasets[0].data.map((data, index) => (
            <Fab
              key={index}
              disabled={!this.props.canClickDetail || !data}
              onClick={
                this.props.detailIndex == index
                  ? this.props.closeDetailView
                  : () =>
                      this.props.clickChartDetail(
                        this.props.data.labels[index][1],
                        index
                      )
              }
              style={
                this.props.detailIndex == index
                  ? classes.detailBtn
                  : classes.smallBtn
              }
              size="small"
              color={this.props.detailIndex == index ? "primary" : "secondary"}
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
