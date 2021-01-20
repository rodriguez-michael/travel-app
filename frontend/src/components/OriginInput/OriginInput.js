import React, { useEffect } from "react";
import AirportAPI from "../../api/AirportAPI";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useRecoilState } from "recoil";
import {
  createComponentGlobalState,
  createAirportGlobalState,
  createCovidGlobalState,
} from "../../globalstate/atom";

const OriginInput = () => {
  const [airports, setAirports] = useRecoilState(createAirportGlobalState);
  const [airCode, setAirCode] = useRecoilState(createComponentGlobalState);
  const [covidGlobalState, setCovidGlobalState] = useRecoilState(
    createCovidGlobalState
  );

  const getDatas = async () => {
    const response = await AirportAPI.getData();
    setAirports(response);
  };

  useEffect(() => {
    getDatas();
  }, []);

  const filterCovidData = (country) => {
    if (country === "United States") {
      country = "USA";
    }
    let covidData = covidGlobalState.data.find(
      (element) => element.name === country
    );
    return covidData;
  };

  const getSearchInfo = (event) => {
    let country = event.target.outerText.split(" -")[2].trim();
    let iata = event.target.outerText.split(" -")[1];
    let cityName = event.target.outerText.split(" -")[0];
    iata = iata.trim();
    let covidData = filterCovidData(country);
    setAirCode((prevState) => {
      return {
        ...prevState,
        origin: (prevState = iata),
        country: (prevState = country),
        covidDataObj: (prevState = covidData),
        city: (prevState = cityName),
      };
    });
  };

  return (
    <div>
      <Autocomplete
        id="combo-box-demo"
        options={airports}
        getOptionLabel={(option) =>
          `${option.city} - ${option.IATA} - ${option.country}`
        }
        onChange={getSearchInfo}
        style={{ width: 200 }}
        renderInput={(params) => (
          <TextField {...params} label="Origin Airport" variant="outlined" />
        )}
      />
    </div>
  );
};

export default OriginInput;
