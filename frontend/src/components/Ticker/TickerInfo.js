import React from "react";
import Ticker from "react-ticker";
import CovidCard from "../HomePageCards/CovidCard";

function TickerInfo() {
  return (
    <Ticker offset="run-in" speed={7}>
      {() => <CovidCard />}
    </Ticker>
  );
}

export default TickerInfo;
