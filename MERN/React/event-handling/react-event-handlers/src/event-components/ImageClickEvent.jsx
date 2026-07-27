import React from "react";
import { useState } from "react";

const ImageClickEvent = () => {
    const [isClicked, setClick] = useState(false)

    const toggleClick = () => {
        setClick(!isClicked)
    }
  return (
    <>
      <h1>ImageClickEvent</h1>
      <img src="..\src\assets\hero.png" onClick={toggleClick}/>
      {isClicked && <p>You clicked the image!!!</p>}
    </>
  );
};

export default ImageClickEvent;
