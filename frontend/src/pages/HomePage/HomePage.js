import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { createCovidGlobalState } from "../../globalstate/atom";
import { Grid } from "@material-ui/core";
import useStyles from "./styles";
import CovidAPI from "../../api/CovidAPI.js";
import Video from "../../video/cloudvideo.mp4";
import TickerInfo from "../../components/Ticker/TickerInfo";

const HomePage = () => {
  const [covidDataGlobalState, setCovidDataGlobalState] = useRecoilState(
    createCovidGlobalState
  );

  useEffect(() => {
    callCovidApi();
  }, []);

  const callCovidApi = async () => {
    let response = await CovidAPI.getCovidData();
    setCovidDataGlobalState(response);
  };

  const classes = useStyles();

  return (
    <div style={{ marginRight: "160px", marginLeft: "160px" }}>
      <TickerInfo />

      <Grid container className={classes.root}>
        <video
          className="videoTag"
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            width: "100%",
            left: "50%",
            top: "50%",
            height: "100%",
            objectFit: "cover",
            transform: "translate(-50%, -50%)",
            zIndex: "-1",
          }}
        >
          <source src={Video} type="video/mp4" />
        </video>
      </Grid>
    </div>
  );
};

export default HomePage;
