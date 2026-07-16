import React from "react";

function StatsCard({ obj }) {
  return (
    <>
      <h1>title: {obj.title}</h1>
      <h1>price: {obj.value}</h1>
      <h1>title: {obj.color}</h1>
      
    </>
  );
}

export default StatsCard;
