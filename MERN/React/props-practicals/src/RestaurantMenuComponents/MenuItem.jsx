import React from "react";

function MenuItem({ label, price, isVeg }) {
  return (
    <>
      <p>Lable: {label}</p>
      <p>Price: {price}</p>
      <p>Type: {isVeg}</p>
    </>
  );
}

export default MenuItem;
