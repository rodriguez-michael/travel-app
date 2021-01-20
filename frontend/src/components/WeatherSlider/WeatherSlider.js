import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { useRecoilState } from "recoil";
import { createComponentGlobalState } from "../../globalstate/atom";

const useStyles = makeStyles({
  root: {
    width: 150,
    marginTop: 50,
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
    marginLeft: "35px",
    whiteSpace: "nowrap",
  },
});

function valuetext(value) {
  return `${value}°`;
}

export default function WeatherSlider() {
  const classes = useStyles();
  const [temperature, setTemperature] = useRecoilState(
    createComponentGlobalState
  );

  const handleChange = (event, newValue) => {
    setTemperature((prevState) => {
      return {
        ...prevState,
        temperature: (prevState = newValue),
      };
    });
  };

  return (
    <div className={classes.root}>
      <Slider
        className={classes.slider}
        value={temperature.temperature}
        onChange={handleChange}
        valueLabelDisplay="on"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        step={5}
        max={100}
      />
      <Typography id="range-slider" gutterBottom className={classes.typography}>
        Temperature +/- 10°
      </Typography>
    </div>
  );
}
