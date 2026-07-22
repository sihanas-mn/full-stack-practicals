import React from "react";
import { useState } from "react";

const BackgroundColorChanger = () => {
  const [bgColor, setBgColor] = useState("#000000");
  return (
    <>
      <div style={{ backgroundColor:  bgColor , minHeight: "50vh" }}></div>
      <h1>Background Color Changer</h1>
      <button onClick={() =>{setBgColor('#ff0707')}}>Red</button>
      <button onClick={() =>{setBgColor('#07ff3d')}}>Green</button>
      <button onClick={() =>{setBgColor('#d6ff07')}}>Yello</button>
    </>
  );
};

export default BackgroundColorChanger;
