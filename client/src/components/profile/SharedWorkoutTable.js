import React, { setGlobal } from "reactn";
import Input from "@material-ui/core/Input";
import WeightToggler from "../sharing/WeightToggler";
import moment from "moment";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Typography } from "@material-ui/core";

const subColumns = [
  {
    Header: "Set",
    accessor: "set"
  },
  {
    Header: "Reps",
    accessor: "reps"
  },
  {
    Header: "Weight",
    accessor: "weight"
  }
];

class SharedWorkoutTable extends React.Component {
  state = {
    sharedworkoutName: this.props.woName,
    sharedDate: moment().format("YYYY-MM-DD"),
    sharedResistance: this.props.resistanceToAdd,
    sharedCardio: []
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleExerciseNameChange = event => {
    let sharedResistance = [...this.state.sharedResistance];
    const { value, id } = event.target;
    sharedResistance[id].name = value;
    this.setState({ sharedResistance });
  };

  handleNestedSetChange = event => {
    let sharedResistance = [...this.state.sharedResistance];
    let { value, id } = event.target;
    if (value > 20) value = 20;
    if (value < 1) value = 1;
    sharedResistance[id].sets = value;

    this.setState({ sharedResistance });
  };

  handleNestedRepChange = i => event => {
    let sharedResistance = [...this.state.sharedResistance];
    let { value, id } = event.target;
    if (value > 100) value = 100;
    if (value < 1) value = 1;
    sharedResistance[id].reps[i] = value;
    this.setState({ sharedResistance });
  };

  returnData = () => {
    let exerciseData = [];

    this.props.resistanceToAdd.forEach((resistance, index) => {
      exerciseData.push({
        exercise: (
          <Input
            id={index}
            fullWidth
            name="name"
            onChange={this.handleExerciseNameChange}
            value={this.state.sharedResistance[index].name}
            type="text"
            inputProps={{ placeholder: "Exercise Name" }}
          />
        ),
        sets: (
          <Input
            id={index}
            name="sets"
            onChange={this.handleNestedSetChange}
            value={parseInt(this.state.sharedResistance[index].sets)}
            type="number"
            inputProps={{
              min: 1,
              max: 20,
              defaultValue: 1,
              style: { boxSizing: "content-box" }
            }}
          />
        )
      });
    });

    return exerciseData;
  };

  returnSubData = index => {
    let dataCopy = [...this.props.resistanceToAdd];
    let exerciseSubData = [];
    let wieghtProgress = [];

    for (let i = 0; i < dataCopy[index].sets; i++) {
      wieghtProgress.push(20);
      exerciseSubData.push({
        set: `Set ${i + 1}`,
        reps: (
          <Input
            id={index}
            name="reps"
            onChange={this.handleNestedRepChange(i)}
            value={parseInt(this.state.sharedResistance[index].reps[i])}
            type="number"
            inputProps={{
              min: 1,
              max: 20,
              defaultValue: 1,
              style: { boxSizing: "content-box" }
            }}
          />
        ),

        // dataCopy[index].reps[i],
        weight: <WeightToggler index={i} />
      });
    }
    setGlobal({ sharedResistanceWeightProgress: wieghtProgress });
    return exerciseSubData;
  };

  returnColumns = () => {
    if (this.props.resistance) {
      return [
        {
          Header: "Exercise",
          accessor: "exercise"
        },
        {
          Header: "Sets",
          accessor: "sets"
        }
      ];
    } else {
      return [
        {
          Header: "Exercise",
          accessor: "exercise"
        },
        {
          Header: "Time",
          accessor: "time"
        },
        {
          Header: "Distance",
          accessor: "distance"
        }
      ];
    }
  };

  render() {
    return (
      <div>
        <ReactTable
          collapseOnDataChange={false}
          data={this.returnData()}
          columns={this.returnColumns()}
          defaultPageSize={10}
          showPagination={false}
          className="-striped -highlight"
          SubComponent={
            this.props.resistance
              ? row => {
                  return (
                    <div style={{ padding: "20px" }}>
                      <ReactTable
                        data={this.returnSubData(row.index)}
                        columns={subColumns}
                        defaultPageSize={
                          this.props.resistanceToAdd[row.index].sets
                        }
                        showPagination={false}
                      />
                    </div>
                  );
                }
              : null
          }
        />
      </div>
    );
  }
}

export default SharedWorkoutTable;
