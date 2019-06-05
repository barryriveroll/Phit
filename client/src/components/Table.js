import React, { useEffect } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Input from "@material-ui/core/Input";

let widthSizes = {
  bigWidth: 60,
  smallWidth: 60
};
let x = window.matchMedia("(max-width: 700px)");

const resistanceColumns = [
  {
    Header: "Food",
    accessor: "name",
    width: 100
  },
  {
    Header: "Serving",
    width: 50,
    accessor: "servingQty"
  },
  {
    Header: "Unit",
    width: 50,
    accessor: "servingUnit"
  },
  {
    Header: "Calories",
    width: 40,
    accessor: "calories"
  }
];

function DataToRender(propData, changeQuantity, mealIndex) {
  let newData = [];
  if (propData) {
    let data = [...propData];
    data.forEach((food, index) => {
      newData.push({
        name: food.name,
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

function myFunction(x) {
  if (x.matches) return { bigWidth: 85, smallWidth: 47 };
  else return { bigWidth: 135, smallWidth: 65 };
}

class TrackerTable extends React.Component {
  constructor(props) {
    super();

    widthSizes = myFunction(x);
    console.log(widthSizes);
    x.addListener(myFunction);
  }

  render() {
    let classes = {
      TableHeader: {
        color: localStorage.getItem("secondaryTheme")
      }
    };

    const nutritionColumns = [
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

    let { data } = this.props;
    console.log(data);

    let newData = DataToRender(
      data.foodItem,
      this.props.changeQuantity,
      this.props.mealIndex
    );

    return (
      <>
        <ReactTable
          data={newData}
          columns={nutritionColumns}
          style={{
            height: "235px",
            fontSize: 12,
            textAlign: "left"
          }}
          resizable={false}
          minRows={5}
          showPagination={false}
          className="-striped -highlight"
        />
      </>
    );
  }
}

export default TrackerTable;
