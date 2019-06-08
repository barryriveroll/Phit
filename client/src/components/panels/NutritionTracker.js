import React, { Fragment } from "react";
import Meal from "../../pages/Meal";
import DatePickers from "../DatePicker";
import IntegrationReactSelect from "../MealsDropdown";

// Material UI imports
import { withStyles } from "@material-ui/core/styles";
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

const styles = {
  root: {
    width: 500
  }
};

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 5 }}>
      {props.children}
    </Typography>
  );
}

function NutritionTracker(props) {
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
      <Grid spacing={16} container>
        <Grid item xs={5} sm={5}>
          <IntegrationReactSelect
            fetchDropdownData={props.fetchDropdownData}
            handleLoadMealChange={props.handleLoadMealChange}
          />
          <TextField
            fullWidth
            id="filled-dense"
            value={props.mealName}
            onChange={props.handleInputChange("mealName")}
            label="New meal name"
            style={{ padding: 0 }}
            margin="dense"
            variant="filled"
          />
        </Grid>
        <Grid item xs={2} sm={2}>
          <FormControl>
            <Button
              disabled={!props.mealToLoad}
              variant="contained"
              size="small"
              color="primary"
              disabled={!props.mealToLoad}
              className={classes.margin}
              onClick={props.addMeal}
            >
              Load
            </Button>
            <Button
              variant="contained"
              size="small"
              color="primary"
              disabled={props.mealName.trim().length < 2}
              className={classes.margin}
              onClick={props.addMeal}
            >
              Add
            </Button>
          </FormControl>
        </Grid>

        <Grid item xs={5} sm={5}>
          <DatePickers
            //margin="dense"
            label="Meal Date"
            variant="filled"
            //style={{ width: 200 }}
            value={props.nutritionDate}
            changeHandler={props.selectDate}
            name="nutritionDate"
          />
        </Grid>
      </Grid>
      <AppBar position="static" color="default">
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
              <Tab key={index} label={meal.name} />
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
                backgroundColor: "#00000017"
              }}
            >
              <TabContainer key={index}>
                <TrackerTable
                  changeQuantity={props.changeQuantity}
                  mealIndex={index}
                  data={meal}
                  type="nutrition"
                />
              </TabContainer>
            </div>
          )
      )}
      {props.mealsToAdd.length ? (
        <Meal
          addFoodItem={props.addFoodItem}
          saveNutritionDay={props.saveNutritionDay}
        />
      ) : null}
    </Paper>
  );
}
NutritionTracker.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NutritionTracker);
