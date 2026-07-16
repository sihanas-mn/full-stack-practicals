import React from "react";
import NameCall from "./wecomePageComponent/NameCall";

function WelcomePage() {
  name = "aski";
  return (
    <>
      <NameCall name={name} />
    </>
  );
}

export default WelcomePage;
