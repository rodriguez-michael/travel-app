import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Divider,
} from "@material-ui/core";
import useStyles from "./styles";
import { useRecoilState } from "recoil";
import {
  createAirportGlobalState,
  createComponentGlobalState,
} from "../../globalstate/atom";
import { Link } from "react-router-dom";
import { createClient } from "pexels";
import WeatherAPI from "../../api/WeatherAPI";

const FlightCard = ({ flight, index, photo }) => {
  const classes = useStyles();
  const [globalState, setGlobalState] = useRecoilState(
    createComponentGlobalState
  );
  const [airport, setAirport] = useRecoilState(createAirportGlobalState);
  const [displayPhotoUrl, setDisplayPhotoUrl] = useState(null);
  const [cityWeather, setCityWeather] = useState(null);
  const [stateName, setStateName] = useState(null);
  const [confirmedCases, setConfirmedCases] = useState(null);
  const [activeCases, setActiveCases] = useState(null);
  const [deaths, setDeaths] = useState(null);
  const [fatalityRatio, setFatalityRatio] = useState(null);
  const [destinationCovid, setDestinationCovid] = useRecoilState(
    createComponentGlobalState
  );

  const getCityFromIATA = (getCity) => {
    let foundCity = airport.find((element) => element.IATA === getCity);
    if (foundCity === undefined) {
      return "Cancun";
    } else {
      return foundCity.city;
    }
  };

  const getCountryFromIATA = (getCountry) => {
    let foundCountry = airport.find((element) => element.IATA === getCountry);
    if (foundCountry === undefined) {
      return "Mexico";
    } else {
      return foundCountry.country;
    }
  };

  //  Get weather
  useEffect(() => {
    getCityWeather();
    countyNameFromCity();
  }, []);

  const getCityWeather = async () => {
    let response = await WeatherAPI.getWeather(
      getCityFromIATA(flight?.destination)
    );
    setCityWeather(
      (((response?.list[21].main.temp - 273.15) * 9) / 5 + 32)
        .toString()
        .split(".")[0]
    );
  };

  // get county name
  const getCountyName = async () => {
    const response = await fetch("cityinfo.json");
    const data = await response.json();
    return data;
  };

  const countyNameFromCity = async () => {
    let city = getCityFromIATA(flight?.destination);
    // let county = destinationCityName.toLowerCase()
    let response = await getCountyName();
    let data = await response?.find(
      (element) => element.city.toLowerCase() === city.toLowerCase()
    );

    countyCovidData(data?.county_name);
  };

  // covid info by county
  const getCountyData = async () => {
    const response = await fetch("covid.json");
    const data = await response.json();
    return data;
  };

  const countyCovidData = async (county) => {
    let response = await getCountyData();
    let data = await response?.find(
      (element) =>
        element.Admin2.toLowerCase() === county?.toLowerCase() &&
        element.Country_Region === getCountryFromIATA(flight?.destination)
    );
    let data2 = await response?.find(
      (element) =>
        element.Admin2.toLowerCase() === county?.toLowerCase() &&
        element.Country_Region === "US"
    );

    if (data) {
      let state = data?.Province_State;
      let confirmedCasess = data?.Confirmed;
      let activeCasess = data?.Active;
      let deathss = data?.Deaths;
      let fatalityRatioo = data?.Case_Fatality_Ratio;

      setStateName(state);
      setConfirmedCases(confirmedCasess);
      setActiveCases(activeCasess);
      setDeaths(deathss);
      setFatalityRatio(fatalityRatioo);
    } else if (data2) {
      let state = data?.Province_State;
      let confirmedCasess = data2?.Confirmed;
      let activeCasess = data2?.Active;
      let deathss = data2?.Deaths;
      let fatalityRatioo = data2?.Case_Fatality_Ratio;

      setStateName(state);
      setConfirmedCases(confirmedCasess);
      setActiveCases(activeCasess);
      setDeaths(deathss);
      setFatalityRatio(fatalityRatioo);
    } else {
      let response2 = await getCountyData();
      let data2 = await response2?.find(
        (element) =>
          element.Province_State === "" &&
          element.Country_Region === getCountryFromIATA(flight?.destination)
      );

      let state = data?.Province_State;
      let confirmedCasess = data2?.Confirmed;
      let activeCasess = data2?.Active;
      let deathss = data2?.Deaths;
      let fatalityRatioo = data2?.Case_Fatality_Ratio;

      setStateName(state);
      setConfirmedCases(confirmedCasess);
      setActiveCases(activeCasess);
      setDeaths(deathss);
      setFatalityRatio(fatalityRatioo);
    }
  };

  const API_KEY1 = process.env.REACT_APP_PEXELS_API_ONE;
  const API_KEY2 = process.env.REACT_APP_PEXELS_API_TWO;

  // const client = createClient(API_KEY1);
  // const query = getCityFromIATA(flight?.destination)
  // console.log(client.photos.search({ query, per_page: 1 }))
  // let displayPhoto = client.photos.search({ query, per_page: 1 }).then(photos => setDisplayPhotoUrl(photos?.photos[0]?.src?.medium));

  const covidInfo = () => {
    setDestinationCovid((prevState) => {
      return {
        ...prevState,
        stateName: (prevState = stateName),
        confirmedCases: (prevState = confirmedCases),
        activeCases: (prevState = activeCases),
        deaths: (prevState = deaths),
        fatalityRatio: (prevState = fatalityRatio),
      };
    });
  };

  let nfObject = new Intl.NumberFormat("en-US");

  const destinationPhoto = {
    Charleston:
      "https://travel.home.sndimg.com/content/dam/images/travel/stock/2017/9/5/iStock_Charleston-South-Carolina_522739970_xl.jpg.rend.hgtvcom.616.411.suffix/1504639655161.jpeg",
    Mazatlan:
      "https://assets3.thrillist.com/v1/image/2853764/1584x3000/scale;jpeg_quality=60;progressive.jpg",
    Anchorage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Anchorage_on_an_April_evening.jpg/1920px-Anchorage_on_an_April_evening.jpg",
    "Guatemala City":
      "https://journeyaroundtheglobe.files.wordpress.com/2020/03/mg_9638.jpg",
    "Belize City":
      "https://d1ay7qnb0dqwzm.cloudfront.net/317952.4932.59f36a4a0c.jpg",
    Kona:
      "https://www.gohawaii.com/sites/default/files/styles/narrow_carousel_large/public/content-carousel-images/Kealakekua%20Bay%20Hawaii.jpg?itok=I1k4F9CK",
    Richmond:
      "https://cdn-image.departures.com/sites/default/files/styles/responsive_900x600/public/1539117336/monument-avenue-richmond-virginia-RICHMOND1018.jpg?itok=BlPtvCnt",
    Warsaw:
      "https://www.telegraph.co.uk/content/dam/Travel/2017/July/warsaw-GettyImages-53893674.jpg?imwidth=1400",
    Athens:
      "https://horizon-media.s3-eu-west-1.amazonaws.com/s3fs-public/field/image/athens-1891719_crop.jpg",
    Cancun:
      "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2020%2F07%2F13%2Fcancun-mexico-coastline-CANCUNNOW0720.jpg",
    Dublin:
      "https://cdn-image.departures.com/sites/default/files/styles/responsive_900x600/public/1580339465/header-aerial-dubin-overview-DUBLIN0120.jpg?itok=8X1sLc2V",
    "Tel-aviv":
      "https://static.timesofisrael.com/www/uploads/2020/02/Untitled-4-6.jpg",
  };

  return (
    <>
      {Number(cityWeather) <= globalState.temperature + 10 &&
      Number(cityWeather) >= globalState.temperature - 10 ? (
        <Link
          to={`/details/${flight.destination}`}
          style={{ textDecoration: "none" }}
        >
          <Card
            className={classes.root}
            key={index}
            style={{ textDecoration: "none" }}
            onClick={covidInfo}
          >
            <CardMedia
              className={classes.media}
              image={destinationPhoto[getCityFromIATA(flight?.destination)]}
              title={flight?.origin}
            />

            <CardContent style={{ backgroundColor: "white" }}>
              <div className={classes.cardContent}>
                <Typography variant="h5">
                  {getCityFromIATA(flight?.destination)},{" "}
                  {getCountryFromIATA(flight?.destination)}
                </Typography>
              </div>
              <Typography variant="body2" color="textSecondary" />
            </CardContent>
            <CardActions
              disableSpacing
              className={classes.cardActions}
              style={{ backgroundColor: "white", textDecoration: "none" }}
            >
              <Typography variant="h5">${flight.price.total}</Typography>
              <Typography variant="h5">{cityWeather}°F</Typography>
            </CardActions>

            <div style={{ textDecoration: "underline" }}>
              <Typography variant="h6">Covid Data</Typography>
            </div>
            <div>
              <Typography>
                Confirmed Cases: {nfObject.format(confirmedCases)}
              </Typography>
            </div>
            <div>
              <Typography>
                Active Cases: {nfObject.format(activeCases)}
              </Typography>
            </div>
            <div>
              <Typography>Deaths: {nfObject.format(deaths)}</Typography>
            </div>
            <div>
              <Typography>
                Fatality Rate: {fatalityRatio?.toFixed(2)}%
              </Typography>
            </div>
          </Card>
        </Link>
      ) : (
        <Card
          className={classes.root}
          key={index}
          style={{
            textDecoration: "none",
            backgroundColor: "rgba(255,255,255, 0.2)",
          }}
        >
          <Typography variant="h5" style={{ color: "rgba(0, 0, 0, 0.5)" }}>
            Adjust Your
          </Typography>
          <Typography variant="h5" style={{ color: "rgba(0, 0, 0, 0.5)" }}>
            Temperature
          </Typography>
          <Typography variant="h5" style={{ color: "rgba(0, 0, 0, 0.5)" }}>
            Slider Preferences
          </Typography>
          <Typography variant="h5" style={{ color: "rgba(0, 0, 0, 0.5)" }}>
            To Click This
          </Typography>
          <Typography variant="h5" style={{ color: "rgba(0, 0, 0, 0.5)" }}>
            This Destination
          </Typography>
          <Typography variant="h5" style={{ color: "rgba(0, 0, 0, 0.5)" }}>
            And View
          </Typography>
          <Typography variant="h5" style={{ color: "rgba(0, 0, 0, 0.5)" }}>
            Details
          </Typography>
          <CardContent style={{}}>
            <Divider />
            <div className={classes.cardContent}>
              <Typography variant="h5" style={{ color: "rgba(0, 0, 0, 0.5)" }}>
                {getCityFromIATA(flight?.destination)},{" "}
                {getCountryFromIATA(flight?.destination)}
              </Typography>
            </div>
            <Typography variant="body2" color="textSecondary" />
          </CardContent>
          <CardActions
            disableSpacing
            className={classes.cardActions}
            style={{}}
          >
            <Typography variant="h5" style={{ color: "rgba(0, 0, 0, 0.5)" }}>
              ${flight.price.total}
            </Typography>
            <Typography variant="h5" style={{ color: "rgba(0, 0, 0, 0.5)" }}>
              {cityWeather}°F
            </Typography>
          </CardActions>
          <div>
            <Typography
              variant="h6"
              style={{
                textDecoration: "underline",
                color: "rgba(0, 0, 0, 0.5)",
              }}
            >
              Covid Data
            </Typography>
          </div>
          <div>
            <Typography style={{ color: "rgba(0, 0, 0, 0.5)" }}>
              Confirmed Cases: {nfObject.format(confirmedCases)}
            </Typography>
          </div>
          <div>
            <Typography style={{ color: "rgba(0, 0, 0, 0.5)" }}>
              Active Cases: {nfObject.format(activeCases)}
            </Typography>
          </div>
          <div>
            <Typography style={{ color: "rgba(0, 0, 0, 0.5)" }}>
              Deaths: {nfObject.format(deaths)}
            </Typography>
          </div>
          <div>
            <Typography style={{ color: "rgba(0, 0, 0, 0.5)" }}>
              Fatality Rate: {fatalityRatio?.toFixed(2)}%
            </Typography>
          </div>
        </Card>
      )}
    </>
  );
};

export default FlightCard;
