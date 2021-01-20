import React, { useState } from "react";
import FlightCard from "../../components/FlightCard/FlightCard";
import { useRecoilState } from "recoil";
import {
  createComponentGlobalState,
  createDataGlobalState,
  createCovidGlobalState,
  createAirportGlobalState,
} from "../../globalstate/atom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { createClient } from "pexels";

const SearchResultsPage = () => {
  const [globalState, setGlobalState] = useRecoilState(createComponentGlobalState);

  const [dataGlobalState, setDataGlobalState] = useRecoilState(createDataGlobalState);

  const [covidDataGlobalState, setCovidDataGlobalState] = useRecoilState(createCovidGlobalState);

  const [airport, setAirport] = useRecoilState(createAirportGlobalState);

  const [pictures, setPictures] = useState([]);

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));

  const classes = useStyles();

  const getCityFromIATA = (getCity) => {
    let foundCity = airport.find((element) => element.IATA === getCity);
    if (foundCity === undefined) {
      return "Cancun";
    } else {
      return foundCity.city;
    }
  };

  // UNCOMMENT FOR IMAGE ON CARD
  // const client = createClient('563492ad6f91700001000001813b52472e6f470c9c6715df83f9b7f6');
  // const query = getCityFromIATA(flight?.destination)
  // let displayPhoto = client.photos.search({ query, per_page: 1 }).then(photos => setDisplayPhotoUrl(photos?.photos[0]?.src?.medium));
  // let query = 'charleston'
  // let displayPhoto = client.photos.search({ query, per_page: 1 }).then(photos => photos?.photos[0]?.src?.medium);

  return (
    <div>
      {pictures && (
        <div
          className={classes.root}
          style={{ display: "flex", textAlign: "center", marginTop: "30px" }}
        >
          <Grid
            container
            style={{ textAlign: "center", color: "white", fontSize: "50px" }}
          >
            <Grid
              item
              xs={10}
              container
              spacing={6}
              style={{ marginTop: "5px", margin: "auto auto" }}
              className={classes.test}
            >
              {dataGlobalState?.data?.slice(0, 12).map((flight, index) => (
                <Grid item key={index} xs={4} sm={6} md={4} lg={3}>
                  <FlightCard
                    flight={flight}
                    index={index}
                    photo={`https://picsum.photos/200`}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
