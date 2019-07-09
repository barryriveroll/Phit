import React from "react";
import { Bar, Pie } from "react-chartjs-2";

// Material UI imports
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

let x = window.matchMedia("(max-width: 700px)");
let chartHeight = 50;

function myFunction(x) {
  if (x.matches) return 85;
  else return 50;
}

class NutritionReports extends React.Component {
  constructor(props) {
    super();

    chartHeight = myFunction(x);
    x.addListener(myFunction);
  }

  render() {
    const barOptions = {
      maintainAspectRatio: true,
      scales: {
        xAxes: [
          {
            ticks: {
              fontColor: this.props.textColor,
              fontSize: 10
            },
            display: true,
            gridLines: {
              display: false
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

    const pieOptions = {
      maintainAspectRatio: true,
      scales: {
        xAxes: [
          {
            ticks: {
              fontColor: this.props.textColor
            },
            display: false,
            gridLines: {
              display: false
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

    const { classes } = this.props;

    return (
      <Paper
        className={this.props.xlNut ? classes.xlPaperHeight : classes.paper}
      >
        <Typography
          component="h1"
          className={classes.panelHeader}
          color="secondary"
        >
          Reports
        </Typography>
        <div>
          <FormControl style={{ float: "left", marginBottom: 18 }}>
            <InputLabel htmlFor="type-native-simple">Type</InputLabel>
            <Select
              style={{ width: 120, marginRight: 15 }}
              native
              value={this.props.chartType}
              onChange={this.props.handleInputChange("chartType")}
              inputProps={{
                name: "chartType",
                id: "type-native-simple"
              }}
            >
              <option value="" />
              <option value={"barChart"}>Bar Chart</option>
              <option value={"pieChart"}>Pie Chart</option>
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="type-native-simple">Timeframe</InputLabel>
            <Select
              style={{ width: 120, marginRight: 15 }}
              native
              value={this.props.xAxis}
              onChange={this.props.handleInputChange("xAxis")}
              inputProps={{
                name: "xAxis",
                id: "type-native-simple"
              }}
            >
              <option value="" />
              <option value={"daily"}>Daily</option>
              <option value={"weekly"}>Weekly</option>
            </Select>
          </FormControl>

          <FormControl>
            <TextField
              id="date"
              style={{ marginRight: 15 }}
              defaultValue={this.props.chartDate}
              name="workoutDate"
              onChange={this.props.selectChartTimeframe}
              label=" "
              type={this.props.xAxis === "weekly" ? "week" : "date"}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
          </FormControl>

          <FormControl
            disabled={
              this.props.xAxis === "daily" ||
              this.props.xAxis === "" ||
              this.props.chartType === "pieChart"
            }
          >
            <InputLabel htmlFor="type-native-simple">Y-Axis</InputLabel>
            <Select
              style={{ width: 120, marginRight: 15 }}
              native
              value={this.props.yAxis}
              onChange={this.props.handleInputChange("yAxis")}
              inputProps={{
                name: "yAxis",
                id: "type-native-simple"
              }}
            >
              <option value="" />
              <option value={"calories"}>Calories</option>
              <option value={"protein"}>Protein</option>
              <option value={"fat"}>Fat</option>
              <option value={"carbs"}>Carbs</option>
            </Select>
          </FormControl>

          {this.props.chartType === "barChart" ? (
            <Bar
              data={this.props.data}
              width={100}
              height={chartHeight}
              options={barOptions}
            />
          ) : (
            <Pie
              data={this.props.data}
              width={100}
              height={chartHeight}
              options={pieOptions}
            />
          )}
        </div>
      </Paper>
    );
  }
}

export default NutritionReports;
