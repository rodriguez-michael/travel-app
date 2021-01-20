import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useRecoilState } from "recoil";
import { createComponentGlobalState } from "../../globalstate/atom";

const useStyles = makeStyles({
  root: {
    width: 200,
    marginTop: "30px",
    opacity: "105%",
  },
});

const Travelers = () => {
  const classes = useStyles();

  const [travelers, setTravelers] = useRecoilState(createComponentGlobalState);

  const handleChange = (event) => {
    setTravelers((prevState) => {
      return {
        ...prevState,
        travelers: (prevState = event.target.value),
      };
    });
  };

  return (
    <div className={classes.root}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" style={{ opacity: "100%" }}>
          Travelers{" "}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={travelers.travelers}
          onChange={handleChange}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Travelers;
