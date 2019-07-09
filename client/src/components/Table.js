import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Input from "@material-ui/core/Input";
import CancelIcon from "@material-ui/icons/Cancel";
import Typography from "@material-ui/core/Typography";

let widthSizes = {
  bigWidth: 60,
  smallWidth: 60
};
let rows = 6;
let tableHeight = "282px";
let x = window.matchMedia("(max-width: 700px)");

function returnNutritionData(propData, changeQuantity, mealIndex, clickDelete) {
  let newData = [];
  if (propData) {
    let data = [...propData];
    data.forEach((food, index) => {
      newData.push({
        name: (
          <>
            <div
              onClick={() => clickDelete(mealIndex, index)}
              // className={classes.cancelDiv}
            >
              <CancelIcon style={{ float: "left", marginRight: 5 }} />
            </div>
            {food.name}
          </>
        ),
        servingQty: (
          <Input
            placeholder="1"
            value={food.servingQty}
            onChange={changeQuantity}
            type="number"
            inputProps={{
              style: { padding: "0 0 7px" },
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

function returnFitnessData(
  data,
  type,
  changeHandler,
  clickDelete,
  handleSetChange
) {
  let newData = [];

  if (data) {
    if (type === "resistance") {
      data.forEach((exercise, index) => {
        newData.push({
          exercise: (
            <>
              <div
                onClick={() => clickDelete("resistance", index)}
                // className={classes.cancelDiv}
              >
                <CancelIcon style={{ float: "left", marginRight: 5 }} />
              </div>

              <Input
                id={index}
                fullWidth
                name="name"
                onChange={changeHandler("resistanceToAdd")}
                value={exercise.name}
                type="text"
                inputProps={{ placeholder: "Exercise Name" }}
              />
            </>
          ),
          sets: (
            <Input
              id={index}
              name="sets"
              onChange={handleSetChange}
              value={exercise.sets}
              type="number"
              inputProps={{ min: 1, defaultValue: 1 }}
            />
          )
        });
      });
    } else if (type === "cardio") {
      data.forEach((exercise, index) => {
        newData.push({
          exercise: (
            <>
              <div
                onClick={() => clickDelete("cardio", index)}
                // className={classes.cancelDiv}
              >
                <CancelIcon style={{ float: "left" }} />
              </div>

              <Input
                id={index}
                fullWidth
                name="name"
                onChange={changeHandler("cardioToAdd")}
                value={exercise.name}
                type="text"
              />
            </>
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

function resistanceSets(data, rowIndex, changeHandler, handleSetChange) {
  let setData = [];

  for (let i = 0; i < data[rowIndex].sets; i++) {
    setData.push({
      setNumber: <Typography variant="body1">{`Set ${i + 1}`}</Typography>,
      reps: (
        <Input
          id={i}
          name="reps"
          value={data[rowIndex].reps[i]}
          type="number"
          onChange={changeHandler("reps", rowIndex)}
          inputProps={{ min: 1, defaultValue: 1 }}
        />
      ),
      weight: (
        <Input
          id={i}
          name="weight"
          value={data[rowIndex].weight[i]}
          type="number"
          onChange={changeHandler("weight", rowIndex)}
          inputProps={{ min: 1, defaultValue: 1 }}
        />
      )
    });
  }
  // data.forEach((exercise, index) => {
  //   setData.push({
  //     reps: (
  //       <Input id={index} name="reps" value={exercise.reps} type="number" />
  //     ),
  //     weight: (
  //       <Input id={index} name="weight" value={exercise.weight} type="number" />
  //     )
  //   });
  // });
  return setData;
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
      default:
        break;
    }
  } else {
    rows = 3;
    tableHeight = "170px";
    switch (type) {
      case "nutrition":
        return { bigWidth: 135, smallWidth: 65 };
      case "resistance":
        return { bigWidth: 250, smallWidth: 92 };
      case "cardio":
        return { bigWidth: 250, smallWidth: 134 };
      default:
        break;
    }
  }
}

function returnSubColumn() {
  const classes = {
    TableHeader: {
      color: localStorage.getItem("secondaryTheme")
    }
  };
  return [
    {
      Header: () => <span style={classes.TableHeader}>Set</span>,
      width: widthSizes.smallWidth,
      accessor: "setNumber"
    },
    {
      Header: () => <span style={classes.TableHeader}>Reps</span>,
      width: "200px",
      accessor: "reps"
    },
    {
      Header: () => <span style={classes.TableHeader}>Weight</span>,
      width: "200px",
      accessor: "weight"
    }
  ];
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
      }
      // {
      //   Header: () => <span style={classes.TableHeader}>Reps</span>,
      //   width: widthSizes.smallWidth,
      //   accessor: "reps"
      // },
      // {
      //   Header: () => <span style={classes.TableHeader}>Weight</span>,
      //   width: widthSizes.smallWidth,
      //   accessor: "weight"
      // }
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
  state = {};

  render() {
    return (
      <>
        <ReactTable
          collapseOnDataChange={false}
          data={
            this.props.fitness
              ? returnFitnessData(
                  this.props.data,
                  this.props.type,
                  this.props.onChange,
                  this.props.clickDelete,
                  this.props.handleSetChange
                )
              : returnNutritionData(
                  this.props.data.foodItem,
                  this.props.changeQuantity,
                  this.props.mealIndex,
                  this.props.clickDelete
                )
          }
          columns={returnColumns(this.props.type)}
          style={{
            height: tableHeight,
            fontSize: 12,
            textAlign: "left"
          }}
          resizable={false}
          minRows={rows}
          showPagination={false}
          className="-striped -highlight"
          SubComponent={
            this.props.type === "resistance"
              ? row => {
                  return (
                    <div style={{ padding: "20px" }}>
                      <ReactTable
                        data={resistanceSets(
                          this.props.data,
                          row.index,
                          this.props.handleResistanceArrayChange,
                          this.props.handleSetChange
                        )}
                        minRows={this.props.data[row.index].sets}
                        columns={returnSubColumn()}
                        showPagination={false}
                      />
                    </div>
                  );
                }
              : null
          }
        />
      </>
    );
  }
}

export default TrackerTable;
