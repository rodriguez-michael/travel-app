import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useRecoilState } from "recoil";
import { createComponentGlobalState } from "../../globalstate/atom";

const DepartureDate = () => {
  const [departureDate, setDepartureDate] = useRecoilState(
    createComponentGlobalState
  );

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexWrap: "wrap",
      marginTop: "30px",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

  const classes = useStyles();

  const handleDateChange = (event) => {
    setDepartureDate((prevState) => {
      return {
        ...prevState,
        departureDate: (prevState = event.target.value),
      };
    });
  };

  const getDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    today = `${yyyy}-${mm}-${dd}`;
    return today;
  };

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        onChange={handleDateChange}
        label="Departure"
        type="date"
        defaultValue={getDate()}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
};

export default DepartureDate;
