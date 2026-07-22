import React from "react";
import { useState } from "react";

const ShowHidePasswordFeature = () => {
    const [passVibility, setVisibility] = useState(false)

    const toggleVisibility = () => {
        setVisibility(!passVibility ? true : false)
        
    }
  return (
    <>
      <h1>Show Hide Password Feature</h1>
      <input type={!passVibility ? 'text' : 'password'}/>
      <button onClick={toggleVisibility}>{passVibility ? 'Show' : 'Hide'} Password</button>
    </>
  );
};

export default ShowHidePasswordFeature;
