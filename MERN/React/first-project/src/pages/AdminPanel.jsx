import React from "react";
import Statistics from "../components/Statistics";
import Charts from "../components/Charts";
import Tables from "../components/Tables";

function AdminPanel() {
  return (
    <>
      <Statistics></Statistics>
      <Charts></Charts>
      <Tables></Tables>
    </>
  );
}

export default AdminPanel;
