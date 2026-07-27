import React from "react";
import { useState } from "react";

const FAQAccordian = () => {

    const [isVisible, setVisibility] = useState(false)

    const toggleVisibility = () => {
        setVisibility(!isVisible)
    }

  return (
    <>
      <h1>FAQAccordian</h1>
      <p onClick={toggleVisibility}>what is your name?</p>
        {isVisible && <p>hint: think harder! what is your name!!!</p>}
    </>
  );
};

export default FAQAccordian;
