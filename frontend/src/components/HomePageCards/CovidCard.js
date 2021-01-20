import React, { useState, useEffect } from "react";
import WarningIcon from "@material-ui/icons/Warning";

export default function CovidCard() {
  const [stats, handleStats] = useState([]);

  useEffect(() => {
    FetchData();
  }, []);

  //data fetching from the api
  const FetchData = async () => {
    const data = await fetch("https://corona.lmao.ninja/v2/all");
    const stats = await data.json();

    handleStats(stats);
  };

  // ----------Ticker Info ---------------------------
  let nfObject = new Intl.NumberFormat("en-US");

  let data = [
    <WarningIcon fontSize="small" />,
    "  ",
    "Worldwide COVID 19 Information",
    "  ",
    <WarningIcon fontSize="small" />,
    "  ",
    "Active Cases: ",
    nfObject.format(stats.cases),
    "  ",
    <WarningIcon fontSize="small" />,
    "  ",
    "Deaths: ",
    nfObject.format(stats.deaths),
    "  ",
    <WarningIcon fontSize="small" />,
    "  ",
    "Number of Countries Affected: ",
    nfObject.format(stats.affectedCountries),
    "  ",
    <WarningIcon fontSize="small" />,
    "  ",
    "Cases Today: ",
    nfObject.format(stats.todayCases),
    "  ",
    <WarningIcon fontSize="small" />,
    "  ",
    "Deaths Today: ",
    nfObject.format(stats.todayDeaths),
    "  ",
    <WarningIcon fontSize="small" />,
    "  ",
    "Recoveries Today: ",
    nfObject.format(stats.todayRecovered),
    "  ",
    <WarningIcon fontSize="small" />,
    "  ",
    "Tests Administered: ",
    nfObject.format(stats.tests),
  ];

  return stats ? (
    <h2 style={{ whiteSpace: "nowrap", color: "#3F51B5" }}>{data}</h2>
  ) : (
    <p style={{ visibility: "hidden" }}>Placeholder</p>
  );
}
