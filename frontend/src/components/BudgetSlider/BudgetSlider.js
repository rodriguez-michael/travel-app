import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { useRecoilState } from "recoil";
import { createComponentGlobalState } from "../../globalstate/atom";

const useStyles = makeStyles({
  root: {
    width: 150,
    marginTop: "50px",
    textAlign: "center",
  },
  slider: {
    color: "primary",
    borderTopRightRadius: "5px",
    borderTopLeftRadius: "5px",
    width: "200px",
    marginBottom: "0px",
    paddingBottom: "0px",
  },
  typography: {
    color: "Black",
    fontSize: "15px",
    whiteSpace: "nowrap",
    marginLeft: "35px",
  },
});

function valuetext(value) {
  return `$${value}`;
}

export default function BudgetSlider() {
  const classes = useStyles();

  const [budget, setBudget] = useRecoilState(createComponentGlobalState);

  const handleChange = (event, newValue) => {
    setBudget((prevState) => {
      return {
        ...prevState,
        budget: (prevState = newValue),
      };
    });
  };

  return (
    <div className={classes.root}>
      <Slider
        className={classes.slider}
        value={budget.budget}
        onChange={handleChange}
        valueLabelDisplay="on"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        step={50}
        max={3000}
      />
      <Typography id="range-slider" gutterBottom className={classes.typography}>
        Maximum Budget
      </Typography>
    </div>
  );
}
