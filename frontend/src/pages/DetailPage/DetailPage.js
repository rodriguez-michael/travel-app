import React, { useState, useEffect } from "react";
import {
  createComponentGlobalState,
  createDataGlobalState,
  createAirportGlobalState,
} from "../../globalstate/atom";
import { useRecoilState } from "recoil";
import WeatherAPI from "../../api/WeatherAPI";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ReactWeather, { useOpenWeather } from "react-open-weather";
import DetailPageCard from "../../components/DetailPageCard/DetailPageCard";
import { Card, CardContent, Divider } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import AssessmentIcon from "@material-ui/icons/Assessment";

const DetailPage = (props) => {
  const [globalState, setGlobalState] = useRecoilState(
    createComponentGlobalState
  );

  const [dataGlobalState, setDataGlobalState] = useRecoilState(
    createDataGlobalState
  );

  const [airport, setAirport] = useRecoilState(createAirportGlobalState);

  const [destinationCovid, setDestinationCovid] = useRecoilState(
    createComponentGlobalState
  );

  const [cityWeather, setCityWeather] = useState(null);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  let airportCode = props?.props?.match?.params.airportCode;

  let destinationInfo = dataGlobalState?.data?.find(
    (flight) => flight?.destination === airportCode
  );

  let price = destinationInfo?.price?.total;

  let departureDate = destinationInfo?.departureDate;

  let originAirport = destinationInfo?.origin;

  const getCityFromIATA = (getCity) => {
    let foundCity = airport.find((element) => element.IATA === getCity);
    if (foundCity === undefined) {
      return getCity;
    } else {
      return foundCity.city;
    }
  };

  let originCity = getCityFromIATA(originAirport);

  let destinationCityName = getCityFromIATA(airportCode);

  const getCountryFromIATA = (getCountry) => {
    let foundCountry = airport.find((element) => element.IATA === getCountry);
    if (foundCountry === undefined) {
      return "Mexico";
    } else {
      return foundCountry.country;
    }
  };

  const getCityWeather = async () => {
    let response = await WeatherAPI.getWeather(destinationCityName);
    setCityWeather(
      (((response.list[21].main.temp - 273.15) * 9) / 5 + 32)
        .toString()
        .split(".")[0]
    );
    return response.list[21].main.temp;
  };

  const getLongLat = async () => {
    let response = await WeatherAPI.getLocation(destinationCityName);

    setLatitude(response.data[0].latitude);

    setLongitude(response.data[0].longitude);
  };

  useEffect(() => {
    getCityWeather();
    getLongLat();
  }, []);

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginRight: "50px",
      marginLeft: "50px",
      marginBottom: "20px",
      marginTop: "20px",
      opacity: "100%",
      borderRadius: "50px",
    },
    paper: {
      padding: theme.spacing(10),
      textAlign: "center",
      color: "black",
    },
  }));

  const classes = useStyles();

  const morphDate = () => {
    let newDate = globalState.departureDate.split("-");
    let year = newDate[0].slice(2, 4);

    let finalDate = `${year}${newDate[1]}${newDate[2]}`;

    return finalDate;
  };

  const { data, isLoading, errorMessage } = useOpenWeather({
    key: "10bac6a18403e8a8404715133cb4907f",
    lat: `${latitude ? latitude : "32.795293"}`,
    lon: `${longitude ? longitude : "-79.948209"}`,
    lang: "en",
    unit: "imperial",
  });

  let nfObject = new Intl.NumberFormat("en-US");

  return (
    <div style={{ marginTop: "40px" }}>
      <div style={{ marginTop: "20px", width: "46%", marginLeft: "575px" }}>
        <Alert
          severity="warning"
          style={{ marginBottom: "10px", borderRadius: "5px" }}
        >
          <AlertTitle>
            {destinationCityName}, {destinationCovid.stateName},{" "}
            {getCountryFromIATA(props?.props?.match?.params.airportCode)} may
            have travel restrictions in place, including self-quarantine, due to
            COVID-19.
          </AlertTitle>
          Find out more
          <a
            href={`https://www.kayak.com/travel-restrictions/${getCountryFromIATA(
              props?.props?.match?.params.airportCode
            )
              .toLowerCase()
              .replace(/\s/g, "-")}#${destinationCovid.stateName
              ?.match(/\b\w/g)
              .join("")
              .toLowerCase()}`}
            target="_blank"
            rel="noreferrer"
            style={{
              marginLeft: "5px",
              textDecoration: "none",
              color: "blue",
              borderRadius: "45px",
            }}
          >
            Here!
          </a>
        </Alert>
      </div>

      <div className={classes.root}>
        <Grid container spacing={10} style={{ textAlign: "center" }}>
          <Grid item xs={3}>
            <Card
              style={{
                textAlign: "center",
                opacity: "95%",
                borderRadius: "5px",
                maxHeight: "360px",
                height: "360px",
              }}
            >
              <AssessmentIcon
                style={{
                  fontSize: "40px",
                  color: "#3F51B5",
                  marginLeft: "-10px",
                  marginTop: "10px",
                }}
              />

              <CardContent style={{ textAlign: "center" }}>
                <div style={{ textAlign: "center" }}>
                  <Typography
                    variant="h1"
                    gutterTop
                    style={{
                      color: "black",
                      fontSize: "40px",
                      marginTop: "-19px",
                    }}
                  >
                    {destinationCityName} <br></br>{" "}
                    <span style={{ fontSize: "30px", color: "black" }}>
                      Covid-19 Data
                    </span>
                  </Typography>
                </div>

                <Divider />

                <div style={{ textAlign: "center", marginTop: "11px" }}>
                  <div style={{ textAlign: "center", marginTop: "15px" }}>
                    <Typography
                      style={{ fontSize: "25px", textAlign: "center" }}
                    >
                      Confirmed Cases:{" "}
                      <span style={{ fontSize: "25px", color: "#3F51B5" }}>
                        {nfObject.format(destinationCovid.confirmedCases)}
                      </span>
                    </Typography>
                  </div>

                  <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <Typography
                      style={{ fontSize: "25px", textAlign: "center" }}
                    >
                      Active Cases:{" "}
                      <span style={{ fontSize: "25px", color: "#3F51B5" }}>
                        {nfObject.format(destinationCovid.activeCases)}
                      </span>
                    </Typography>
                  </div>

                  <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <Typography
                      style={{ fontSize: "25px", textAlign: "center" }}
                    >
                      Deaths:{" "}
                      <span style={{ fontSize: "25px", color: "#3F51B5" }}>
                        {nfObject.format(destinationCovid.deaths)}
                      </span>
                    </Typography>
                  </div>

                  <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <Typography
                      style={{ fontSize: "25px", textAlign: "center" }}
                    >
                      Fatality Rate:{" "}
                      <span style={{ fontSize: "25px", color: "#3F51B5" }}>
                        {destinationCovid.fatalityRatio?.toFixed(2)}%
                      </span>
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6} style={{ textAlign: "center" }}>
            <DetailPageCard
              originCity={originCity}
              destinationCityName={destinationCityName}
              price={price}
              departureDate={departureDate}
              dest={airportCode}
              orig={globalState.origin}
              date={morphDate()}
            />
          </Grid>

          <Grid item xs={3}>
            {longitude != null && (
              <div>
                <Card
                  position="static"
                  style={{
                    backgroundColor: "rgba(255,255,255, 0.2)",
                    borderRadius: "5px",
                    maxHeight: "360px",
                    height: "360px",
                  }}
                >
                  <ReactWeather
                    isLoading={isLoading}
                    errorMessage={errorMessage}
                    data={data}
                    lang="en"
                    locationLabel={destinationCityName}
                    unitsLabels={{ temperature: "F", windSpeed: "Km/h" }}
                    showForecast
                  />
                </Card>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default DetailPage;
