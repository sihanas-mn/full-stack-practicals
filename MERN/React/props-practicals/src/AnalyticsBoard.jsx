import React from "react";
import StatsCard from "./AnalyticsBoardComponents/StatsCard";

function AnalyticsBoard() {
  let obj = { title: "revenue", value: 450000, color: "red" };
  return <StatsCard obj={obj}></StatsCard>;
}

export default AnalyticsBoard;
