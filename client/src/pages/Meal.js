import React, { Component, Fragment } from "react";
import API from "../utils/API";
import { auth } from "../firebase.js";
import Dropdown from "../../src/components/Dropdown";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import MoodIcon from "@material-ui/icons/Mood";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";

//Modal
const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  }
};

let buttonColor = "";
let disabled = false;
let success = false;

function returnSaveSuccessOrFailureDependingOnCertainConditions() {
  if (success) {
    return <MoodIcon />;
  } else {
    return "Save";
  }
}

function returnButtonColor() {
  if (success) {
    return "#469640";
  } else {
    return "";
  }
}

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Meal extends Component {
  state = {
    mealDate: null,
    results: [],
    food: "",
    open: false,
    foodNames: "",
    foodData: [],
    disabled: false
  };

  fetchInstantData = data => {
    this.setState({ foodNames: data });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  clickFood = index => {
    this.handleClose();
    this.props.addFoodItem(this.state.foodData[index]);
  };

  componentDidMount = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    this.setState({ mealDate: today });

    auth.onAuthStateChanged(firebaseUser => {
      this.setState({
        user: firebaseUser
      });
    });
  };

  clickSave = fn => {
    fn();

    disabled = true;
    setTimeout(() => {
      disabled = false;
      success = true;
    }, 47);

    setTimeout(() => {
      success = false;
      this.setState({ done: true });
    }, 3047);
  };

  onChange = (value, name) => {
    this.setState({ [name]: value });
  };

  selectDate = event => {
    this.setState({ mealDate: event.target.value });
  };

  saveMeal(mealData) {
    API.saveMeal(mealData)
      .then(res => this.load())
      .catch(err => console.log(err));
  }

  handleSubmit = async foodSearchQuery => {
    this.handleClickOpen();
    this.setState({ foodData: [] });
    document.getElementById("foodSearchInput").setAttribute("value", "");
    const APP_ID = "eb95abc3";
    const APP_KEY = "368d7805ed86900874f9dc4fb92aba0f";

    // let foodSearchQuery = document.getElementById("foodSearchInput").value;
    for (let i = 0; i < 5; i++) {
      const response = await fetch(
        "https://trackapi.nutritionix.com/v2/natural/nutrients",
        {
          method: "post",
          headers: {
            "x-app-key": APP_KEY,
            "x-app-id": APP_ID,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            query: this.state.foodNames[i].label
          })
        }
      );

      if (response.status !== 200) {
        console.log("Error: " + response);
      }
      const data = await response.json();
      const results = data.foods;

      if (results !== undefined) {
        this.setState({ results });
        const foodItemArr = [];
        results.forEach(element => {
          let food = {};
          food["name"] = element.food_name;
          food["calories"] = element.nf_calories;
          food["protein"] = element.nf_protein;
          food["carbohydrates"] = element.nf_total_carbohydrate;
          food["fats"] = element.nf_total_fat;
          food["servingQty"] = element.serving_qty;
          food["servingUnit"] = element.serving_unit;
          foodItemArr.push(food);
        });

        const data = {
          Meal: {
            name: foodSearchQuery,
            foodItem: foodItemArr
          }
        };

        let foodDataArr = [...this.state.foodData];
        foodDataArr.push(data.Meal);
        this.setState({ foodData: foodDataArr });
      } else {
        alert("invalid food");
      }
    }
    this.setState({ food: foodSearchQuery });
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        spacing={1}
        direction="row"
        alignItems="flex-end"
        justify="flex-end"
      >
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={this.handleClose}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                {this.state.foodData
                  ? `Food results for '${this.state.food}'`
                  : "Food"}
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            {this.state.foodData.map((food, index) => (
              <Fragment>
                <ListItem
                  id={index}
                  onClick={() => this.clickFood(index)}
                  button
                >
                  <ListItemText primary={food.foodItem[0].name} />

                  <div style={{ width: "150px" }}>
                    <Typography style={{ display: "block" }}>
                      Calories: {food.foodItem[0].calories}
                    </Typography>

                    <Typography style={{ display: "block" }}>
                      Protien: {food.foodItem[0].protein}
                    </Typography>

                    <Typography style={{ display: "block" }}>
                      Carbohydrates: {food.foodItem[0].carbohydrates}
                    </Typography>

                    <Typography style={{ display: "block" }}>
                      Fats: {food.foodItem[0].fats}
                    </Typography>

                    <Typography style={{ display: "block" }}>
                      Serving Info: {food.foodItem[0].servingQty}{" "}
                      {food.foodItem[0].servingUnit}
                    </Typography>
                  </div>
                </ListItem>
                <Divider />
              </Fragment>
            ))}
          </List>
        </Dialog>
        <Grid item xs={12}>
          <Dropdown
            fetchInstantData={this.fetchInstantData}
            onChange={this.onChange}
            handleSubmit={this.handleSubmit}
          />
        </Grid>
        {/* <Grid item xs={2}> */}
        {/* <Fab
            style={{ float: "right", width: 40, height: 40 }}
            size="small"
            color="primary"
            onClick={this.handleSubmit}
            disabled={this.state.food.length < 3}
          >
            <Icon>search</Icon>
          </Fab> */}

        {/* <Grid item>
              <Button
                style={{
                  width: 70,
                  height: 30,
                  backgroundColor: returnButtonColor()
                }}
                disabled={disabled}
                variant="contained"
                size="small"
                color="secondary"
                onClick={() => this.clickSave(this.props.saveNutritionDay)}
              >
                {returnSaveSuccessOrFailureDependingOnCertainConditions()}
              </Button>
            </Grid> */}
        {/* </Grid> */}
      </Grid>
    );
  }
}

Meal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Meal);
