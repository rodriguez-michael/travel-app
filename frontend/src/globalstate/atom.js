import { atom } from "recoil";
const getDate = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;
  return today;
};
export const createComponentGlobalState = atom({
  key: "createComponentGlobalState",
  default: {
    origin: "",
    country: "",
    budget: 5000,
    temperature: 100,
    roundTrip: false,
    departureDate: getDate(),
    returnDate: getDate(),
    travelers: 1,
    covidDataObj: {},
    city: "",
  },
});

export const createDataGlobalState = atom({
  key: "createDataGlobalState",
  default: [],
});

export const createAirportGlobalState = atom({
  key: "createAirportGlobalState",
  default: [],
});

export const createCovidGlobalState = atom({
  key: "createCovidGlobalState",
  default: [],
});

export const createDestinationCovidGlobalState = atom({
  key: "createCovidGlobalState",
  default: {
    stateName: "",
    confirmedCases: "",
    activeCases: "",
    deaths: "",
    fatalityRatio: "",
  },
});

export const createFavoritesGlobalState = atom({
  key: "createFavoritesGlobalState",
  default: [],
});
