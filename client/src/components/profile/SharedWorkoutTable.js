import React from "reactn";
import Input from "@material-ui/core/Input";
import WeightToggler from "../sharing/WeightToggler";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

function valuetext(value) {
  return `${value}°C`;
}

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

function returnData(resistanceToAdd, handleChange) {
  let exerciseData = [];

  resistanceToAdd.forEach((resistance, index) =>
    exerciseData.push({
      exercise: (
        <Input
          id={index}
          fullWidth
          name="name"
          onChange={handleChange}
          value={resistance.name}
          type="text"
          inputProps={{ placeholder: "Exercise Name" }}
        />
      ),
      sets: (
        <Input
          id={index}
          name="sets"
          onChange={handleChange}
          value={resistance.sets}
          type="number"
          inputProps={{
            min: 1,
            max: 20,
            defaultValue: 1,
            style: { boxSizing: "content-box" }
          }}
        />
      )
    })
  );
  return exerciseData;
}

function returnSubData(index, resistanceToAdd) {
  let dataCopy = [...resistanceToAdd];
  let exerciseSubData = [];

  for (let i = 0; i < dataCopy[index].sets; i++) {
    exerciseSubData.push({
      set: `Set ${i + 1}`,
      reps: dataCopy[index].reps[i],
      weight: <WeightToggler />
    });
  }

  return exerciseSubData;
}

function returnColumns(resistance) {
  if (resistance) {
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
}

function SharedWorkoutTable(props) {
  return (
    <div>
      <Slider
        defaultValue={30}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={10}
        max={110}
      />
      <ReactTable
        data={returnData(props.resistanceToAdd, props.handleChange)}
        columns={returnColumns(props.resistance)}
        defaultPageSize={10}
        showPagination={false}
        className="-striped -highlight"
        SubComponent={
          props.resistance
            ? row => {
                return (
                  <div style={{ padding: "20px" }}>
                    <ReactTable
                      data={returnSubData(row.index, props.resistanceToAdd)}
                      columns={subColumns}
                      defaultPageSize={props.resistanceToAdd[row.index].sets}
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

export default SharedWorkoutTable;
