import React from "react";
import { useRecoilState } from "recoil";
import {
  createComponentGlobalState,
  createDataGlobalState,
} from "../../globalstate/atom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AirportAPI from "../../api/AirportAPI";
import OriginInput from "../../components/OriginInput/OriginInput";
import BudgetSlider from "../../components/BudgetSlider/BudgetSlider";
import WeatherSlider from "../../components/WeatherSlider/WeatherSlider";
import RoundTripSwitch from "../../components/RoundTripSwitch/RoundTripSwitch";
import DepartureDate from "../../components/DepartureDate/DepartureDate";
import ReturnDate from "../../components/ReturnDate/ReturnDate";
import Travelers from "../../components/Travelers/Travelers";
import { Link } from "react-router-dom";

const SearchBox = () => {
  const [globalState, setGlobalState] = useRecoilState(
    createComponentGlobalState
  );

  const [dataGlobalState, setDataGlobalState] = useRecoilState(
    createDataGlobalState
  );

  const searchFlights = async () => {
    let response = await AirportAPI.getFlight(
      globalState.origin,
      globalState.budget,
      globalState.roundTrip,
      globalState.departureDate
    );
    let data = await response.json();
    setDataGlobalState(data);
    return data;
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));

  const classes = useStyles();

  return (
    <div
      style={{
        backgroundColor: "rgba(255,255,255, 0.1)",
        border: "3px solid #6495ED",
        borderRadius: "15px",
        height: "200px",
        width: "100%",
        marginTop: "30px",
        marginLeft: "50px",
        marginRight: "0px",
        marginBottom: "0px",
        paddingLeft: "80px",
        paddingRight: "0px",
      }}
    >
      <Grid
        spacing={1}
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={3} className={classes.test}>
          <Travelers />
        </Grid>
        <Grid item xs={3} className={classes.test}>
          <RoundTripSwitch />
        </Grid>
        <Grid item xs={3} className={classes.test}>
          <DepartureDate />
        </Grid>
        <Grid item xs={2} className={classes.test}>
          {!globalState.roundTrip && <ReturnDate />}
        </Grid>
        <Grid item xs={3} className={classes.test}>
          <BudgetSlider />
        </Grid>
        <Grid item xs={3} className={classes.test}>
          <WeatherSlider />
        </Grid>
        <Grid item xs={3} className={classes.test}>
          <OriginInput />
        </Grid>
        <Grid
          item
          xs={2}
          className={classes.test}
          style={{ paddingRight: "0px" }}
        >
          <Button
            onClick={searchFlights}
            component={Link}
            to="/results"
            variant="contained"
            color="primary"
            size="large"
            style={{ width: "200px", height: "50px" }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchBox;
