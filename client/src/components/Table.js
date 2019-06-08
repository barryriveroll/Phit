import React, { useEffect } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Input from "@material-ui/core/Input";
import CancelIcon from "@material-ui/icons/Cancel";

let widthSizes = {
  bigWidth: 60,
  smallWidth: 60
};
let rows = 6;
let x = window.matchMedia("(max-width: 700px)");

function ResistanceToRender(propData, changeHandler) {
  let newData = [];
  if (propData) {
    let data = [...propData];

    return newData;
  }
}

function returnNutritionData(propData, changeQuantity, mealIndex, clickDelete) {
  let newData = [];
  if (propData) {
    let data = [...propData];
    data.forEach((food, index) => {
      newData.push({
        name:
          (
            <div
              onClick={() => clickDelete(mealIndex, index)}
              // className={classes.cancelDiv}
            >
              <CancelIcon />
            </div>
          ) + food.name,
        servingQty: (
          <Input
            placeholder="1"
            value={food.servingQty}
            onChange={changeQuantity}
            type="number"
            inputProps={{
              name: mealIndex,
              id: index
            }}
          />
        ),
        servingUnit: food.servingUnit,
        calories: (food.calories * food.servingQty).toFixed(0),
        protein: (food.protein * food.servingQty).toFixed(0),
        fats: (food.fats * food.servingQty).toFixed(0),
        carbohydrates: (food.carbohydrates * food.servingQty).toFixed(0)
      });
    });

    return newData;
  }
}

function returnFitnessData(data, type, changeHandler) {
  console.log(type);
  let newData = [];

  if (data) {
    if (type === "resistance") {
      data.forEach((exercise, index) => {
        newData.push({
          exercise: (
            <Input
              id={index}
              fullWidth
              name="name"
              onChange={changeHandler("resistanceToAdd")}
              value={exercise.name}
              type="text"
            />
          ),
          sets: (
            <Input
              id={index}
              name="sets"
              onChange={changeHandler("resistanceToAdd")}
              value={exercise.sets}
              type="number"
            />
          ),
          reps: (
            <Input
              id={index}
              name="reps"
              onChange={changeHandler("resistanceToAdd")}
              value={exercise.reps}
              type="number"
            />
          ),
          weight: (
            <Input
              id={index}
              name="weight"
              onChange={changeHandler("resistanceToAdd")}
              value={exercise.weight}
              type="number"
            />
          )
        });
      });
    } else if (type === "cardio") {
      data.forEach((exercise, index) => {
        newData.push({
          exercise: (
            <Input
              id={index}
              fullWidth
              name="name"
              onChange={changeHandler("cardioToAdd")}
              value={exercise.name}
              type="text"
            />
          ),
          time: (
            <Input
              id={index}
              name="time"
              onChange={changeHandler("cardioToAdd")}
              value={exercise.time}
              type="number"
            />
          ),
          distance: (
            <Input
              id={index}
              name="distance"
              onChange={changeHandler("cardioToAdd")}
              value={exercise.distance}
              type="number"
            />
          )
        });
      });
    }
  }
  return newData;
}

function columnResponsive(x, type) {
  if (x.matches) {
    switch (type) {
      case "nutrition":
        return { bigWidth: 85, smallWidth: 47 };
      case "resistance":
        return { bigWidth: 172, smallWidth: 65 };
      case "cardio":
        return { bigWidth: 172, smallWidth: 98 };
    }
  } else {
    switch (type) {
      case "nutrition":
        return { bigWidth: 135, smallWidth: 65 };
      case "resistance":
        return { bigWidth: 250, smallWidth: 92 };
      case "cardio":
        return { bigWidth: 250, smallWidth: 134 };
    }
  }
}

function returnColumns(type) {
  const classes = {
    TableHeader: {
      color: localStorage.getItem("secondaryTheme")
    }
  };

  widthSizes = columnResponsive(x, type);
  x.addListener(columnResponsive);

  if (type === "nutrition") {
    return [
      {
        Header: () => <span style={classes.TableHeader}>Food</span>,
        accessor: "name",
        width: widthSizes.bigWidth
      },
      {
        Header: () => <span style={classes.TableHeader}>Serving</span>,
        width: widthSizes.smallWidth,
        accessor: "servingQty"
      },
      {
        Header: () => <span style={classes.TableHeader}>Unit</span>,
        width: widthSizes.smallWidth,
        accessor: "servingUnit"
      },
      {
        Header: () => <span style={classes.TableHeader}>KCal</span>,
        width: widthSizes.smallWidth,
        accessor: "calories"
      },
      {
        Header: () => <span style={classes.TableHeader}>Fat</span>,
        width: widthSizes.smallWidth,
        accessor: "fats"
      },
      {
        Header: () => <span style={classes.TableHeader}>Carbs</span>,
        width: widthSizes.smallWidth,
        accessor: "carbohydrates"
      },
      {
        Header: () => <span style={classes.TableHeader}>Protein</span>,
        width: widthSizes.smallWidth,
        accessor: "protein"
      }
    ];
  } else if (type === "resistance") {
    return [
      {
        Header: () => <span style={classes.TableHeader}>Exercise</span>,
        accessor: "exercise",
        width: widthSizes.bigWidth
      },
      {
        Header: () => <span style={classes.TableHeader}>Sets</span>,
        width: widthSizes.smallWidth,
        accessor: "sets"
      },
      {
        Header: () => <span style={classes.TableHeader}>Reps</span>,
        width: widthSizes.smallWidth,
        accessor: "reps"
      },
      {
        Header: () => <span style={classes.TableHeader}>Weight</span>,
        width: widthSizes.smallWidth,
        accessor: "weight"
      }
    ];
  } else if (type === "cardio") {
    return [
      {
        Header: () => <span style={classes.TableHeader}>Exercise</span>,
        accessor: "exercise",
        width: widthSizes.bigWidth
      },
      {
        Header: () => <span style={classes.TableHeader}>Time</span>,
        width: widthSizes.smallWidth,
        accessor: "time"
      },
      {
        Header: () => <span style={classes.TableHeader}>Distance</span>,
        width: widthSizes.smallWidth,
        accessor: "distance"
      }
    ];
  }
}

class TrackerTable extends React.Component {
  render() {
    return (
      <>
        <ReactTable
          data={
            this.props.fitness
              ? returnFitnessData(
                  this.props.data,
                  this.props.type,
                  this.props.onChange
                )
              : returnNutritionData(
                  this.props.data.foodItem,
                  this.props.changeQuantity,
                  this.props.mealIndex
                )
          }
          columns={returnColumns(this.props.type)}
          style={{
            height: "282px",
            fontSize: 12,
            textAlign: "left"
          }}
          resizable={false}
          minRows={rows}
          showPagination={false}
          className="-striped -highlight"
        />
      </>
    );
  }
}

export default TrackerTable;
