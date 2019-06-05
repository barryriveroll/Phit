import React from "react";
import Table from "rc-table";
import Input from "@material-ui/core/Input";

const testData = [
  {
    name: "food name",
    serving: 1,
    servingUnit: "large",
    calories: 1,
    protein: 1,
    fat: 1,
    carbs: 1
  }
];

const nutritionColumns = [
  {
    title: "Food",
    dataIndex: "name",
    key: "name",
    width: 80
  },
  {
    title: "Serving",
    dataIndex: "serving",
    key: "serving",
    width: 40
  },
  {
    title: "Size",
    dataIndex: "servingUnit",
    key: "servingUnit",
    width: 40
  },
  {
    title: "Calories",
    dataIndex: "calories",
    key: "calories",
    width: 40
  },
  {
    title: "Protein",
    dataIndex: "protein",
    key: "protein",
    width: 40
  },
  {
    title: "Fat",
    dataIndex: "fat",
    key: "fat",
    width: 40
  },
  {
    title: "Carbs",
    dataIndex: "carbs",
    key: "carbs",
    width: 40
  }
];

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
  if (propData) {
    let newData = [];
    propData.forEach((food, index) => {
      newData.push({
        name: food.name,
        serving: (
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
        servingUnit: (food.servingUnit * food.servingQty).toFixed(0),
        calories: (food.calories * food.servingQty).toFixed(0),
        protein: (food.protein * food.servingQty).toFixed(0),
        fat: (food.fats * food.servingQty).toFixed(0),
        carbs: (food.carbohydrates * food.servingQty).toFixed(0)
      });
    });

    return newData;
  }
}

function test2(props) {
  let { data } = props;
  console.log(data);

  let newData = DataToRender(
    data.foodItem,
    props.changeQuantity,
    props.mealIndex
  );

  return (
    <>
      <Table data={newData} columns={nutritionColumns} />
    </>
  );
}

export default test2;
