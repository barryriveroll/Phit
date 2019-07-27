import React, { useState } from "react";
import Meal from "../../pages/Meal";
import DatePickers from "../DatePicker";
import MealsDropdown from "../tracking/MealsDropdown";

// Material UI imports
import CancelIcon from "@material-ui/icons/Cancel";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import TrackerTable from "../Table";
import MoodIcon from "@material-ui/icons/Mood";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
import FontAwesome from "react-fontawesome";

let x = window.matchMedia("(max-width: 700px)");

function myFunction(x) {
  if (x.matches) return true;
  else return false;
}
let mobile = myFunction(x);
let disabled = false;
let success = false;

function TabContainer(props) {
  return <Typography component="div">{props.children}</Typography>;
}

function returnButtonColor() {
  if (success) {
    return "#5ccd8f";
  } else {
    return "";
  }
}

function returnSaveSuccessOrFailureDependingOnCertainConditions() {
  if (success) {
    return <MoodIcon />;
  } else {
    return <Icon>save</Icon>;
  }
}

const clickSave = (fn, setDone) => {
  fn();
  setDone(false);

  disabled = true;
  setTimeout(() => {
    disabled = false;
    success = true;
  }, 47);

  setTimeout(() => {
    success = false;
    setDone(true);
  }, 3047);
};

function NutritionTracker(props) {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);
  const { value, classes } = props;

  return (
    <Paper
      className={props.xlNut ? classes.xlPaperHeight : classes.paper}
      style={{ position: "relative" }}
    >
      <Typography
        component="h1"
        className={classes.panelHeader}
        color="secondary"
      >
        Tracking
      </Typography>
      <Grid spacing={1} container>
        <Grid item xs={6}>
          <MealsDropdown
            mealName={props.mealName}
            fetchDropdownData={props.fetchDropdownData}
            handleChange={props.handleMealChange}
            handleLoadMealChange={props.handleLoadMealChange}
          />
          {/* <TextField
            fullWidth
            id="filled-dense"
            value={props.mealName}
            inputProps={{ maxLength: 30 }}
            onChange={props.handleInputChange("mealName")}
            label="New meal name"
            style={{ padding: 0 }}
            margin="dense"
            variant="filled"
          /> */}
        </Grid>

        <Grid item xs={6}>
          <TextField
            id="date"
            fullWidth
            value={props.nutritionDate}
            name="nutritionDate"
            onChange={props.selectDate}
            label="Nutrition Date"
            type="date"
            className={classes.textField}
            variant="filled"
            InputLabelProps={{
              shrink: true
            }}
          />
          {/* <DatePickers
            //margin="dense"
            label="Meal Date"
            //style={{ width: 200 }}
            value={props.nutritionDate}
            changeHandler={props.selectDate}
            name="nutritionDate"
          /> */}
        </Grid>
      </Grid>
      <AppBar style={{ height: 48 }} position="static" color="default">
        <Tabs
          value={value}
          onChange={props.handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          {props.mealsToAdd.length ? (
            props.mealsToAdd.map((meal, index) => (
              <Tab
                key={index}
                label={
                  <div>
                    {value === index ? (
                      <CancelIcon
                        className={classes.cancel}
                        onClick={() => props.deleteMeal(index)}
                        style={
                          mobile
                            ? {
                                display:
                                  props.mealsToAdd.length === 1
                                    ? "none"
                                    : "inherit",
                                float: "left",
                                marginRight: 5
                              }
                            : {
                                display:
                                  props.mealsToAdd.length === 1
                                    ? "none"
                                    : "inherit",
                                position: "absolute",
                                left: 0
                              }
                        }
                      />
                    ) : (
                      ""
                    )}
                    {meal.name}
                  </div>
                }
              />
            ))
          ) : (
            <Tab label="No meals" />
          )}
        </Tabs>
      </AppBar>
      {props.mealsToAdd.map(
        (meal, index) =>
          value === index && (
            <div
              className={classes.tableScrollBar}
              key={index}
              style={{
                flexGrow: 1,
                flexDirection: "column",
                overflowY: "auto",
                overflowX: "hidden",
                marginBottom: 5,
                backgroundColor: "#00000017"
              }}
            >
              <TabContainer key={index}>
                <TrackerTable
                  changeQuantity={props.changeQuantity}
                  mealIndex={index}
                  data={meal}
                  type="nutrition"
                  clickDelete={props.clickDelete}
                  classes={classes}
                />
              </TabContainer>
            </div>
          )
      )}

      {/* {props.mealsToAdd.length ? (
        <Meal
          addFoodItem={props.addFoodItem}
          saveNutritionDay={props.saveNutritionDay}
        />
      ) : null} */}
      <Grid container justify="space-between" style={{ paddingTop: 10 }}>
        <Grid item xs={2}>
          <Fab
            style={{
              width: 40,
              height: 40
            }}
            size="small"
            color="primary"
            // disabled={props.mealName.trim().length < 2}
            // className={classes.margin}
            onClick={props.addMeal}
          >
            <span className={classes.addSpan}>+ </span>
            <FontAwesome name="utensils" size="2x" style={{ fontSize: 20 }} />
          </Fab>
        </Grid>
        <Grid item xs={8}>
          <Meal
            addFoodItem={props.addFoodItem}
            saveNutritionDay={props.saveNutritionDay}
          />
        </Grid>

        {/* <Button
          style={{
            width: 70,
            height: 30
          }}
          variant="contained"
          size="small"
          color="primary"
          // disabled={props.mealName.trim().length < 2}
          // className={classes.margin}
          onClick={props.addMeal}
        >
          Add
        </Button> */}
        <Grid item xs={2}>
          <Fab
            style={{
              float: "right",
              width: 40,
              height: 40,
              backgroundColor: returnButtonColor()
            }}
            disabled={disabled}
            size="small"
            color="secondary"
            onClick={() => clickSave(props.saveNutritionDay, setDone)}
          >
            {returnSaveSuccessOrFailureDependingOnCertainConditions()}
          </Fab>
        </Grid>
      </Grid>
    </Paper>
  );
}
NutritionTracker.propTypes = {
  classes: PropTypes.object.isRequired
};

export default NutritionTracker;
