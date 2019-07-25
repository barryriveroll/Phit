import React from "react";
import deburr from "lodash/deburr";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Popper from "@material-ui/core/Popper";
import { makeStyles } from "@material-ui/core/styles";
import API from "../../utils/API";

let suggestions = updateDropdownSuggestions();

function updateDropdownSuggestions() {
  let workoutSuggestions = [];
  API.findUserWorkOuts(localStorage.userId).then(res => {
    if (res.data.length) {
      for (let i = 0; i < res.data[0].workouts.length; i++) {
        if (res.data[0].workouts[i].name) {
          workoutSuggestions.push({
            label: res.data[0].workouts[i].name,
            value: res.data[0].workouts[i]._id
          });
        }
      }

      workoutSuggestions.sort((a, b) =>
        a.label > b.label ? 1 : b.label > a.label ? -1 : 0
      );

      workoutSuggestions = workoutSuggestions.map(suggestion => ({
        label: suggestion.label,
        value: suggestion.value
      }));
    }
  });
  return workoutSuggestions;
}

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input
        }
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map(part => (
          <span
            key={part.text}
            style={{ fontWeight: part.highlight ? 500 : 400 }}
          >
            {part.text}
          </span>
        ))}
      </div>
    </MenuItem>
  );
}

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 &&
          suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    position: "relative"
  },
  suggestionsContainerOpen: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  suggestion: {
    display: "block"
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  },
  divider: {
    height: theme.spacing(2)
  }
}));

export default function WorkoutsDropdown(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [state, setState] = React.useState({
    single: "",
    popper: ""
  });

  const [stateSuggestions, setSuggestions] = React.useState([]);

  const handleSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleChange = (name, handleChange) => (event, { newValue }) => {
    setState({
      ...state,
      [name]: newValue
    });

    handleChange(newValue);
  };

  const autosuggestProps = {
    renderInputComponent,
    suggestions: stateSuggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion
  };

  return (
    <div className={classes.root}>
      <Autosuggest
        {...autosuggestProps}
        inputProps={{
          classes,
          variant: "filled",
          id: "react-autosuggest-popper",
          label: "Workout Name",
          //   placeholder: "With Popper",
          value: state.popper,
          onChange: handleChange("popper", props.handleChange),

          inputRef: node => {
            setAnchorEl(node);
          }
          //   InputLabelProps: {
          //     shrink: true
          //   }
        }}
        theme={{
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion
        }}
        renderSuggestionsContainer={options => (
          <Popper
            style={{ zIndex: 2500, position: "relative" }}
            anchorEl={anchorEl}
            open={Boolean(options.children)}
            onClick={() =>
              props.handleLoadWorkoutChange(
                options.children.props.items[
                  options.children.props.highlightedItemIndex
                ]
              )
            }
          >
            <Paper
              square
              {...options.containerProps}
              style={{
                width: anchorEl ? anchorEl.clientWidth : undefined,
                zIndex: 2500,
                position: "relative"
              }}
            >
              {options.children}
            </Paper>
          </Popper>
        )}
      />
    </div>
  );
}
