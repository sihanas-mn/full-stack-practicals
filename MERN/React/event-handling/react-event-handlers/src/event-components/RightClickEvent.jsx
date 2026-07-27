import React from "react";
import { useState } from "react";

const RightClickEvent = () => {
    const [isRClicked, setRclick] = useState(false)
    const handleRightClick = (e) => {
        setRclick(!isRClicked)
        e.preventDefault()
    }
  return (
    <>
      <h1>RightClickEvent</h1>
      <button onContextMenu={handleRightClick}>Right Click Here</button>
      {isRClicked && <p>entered context menu!!!</p>}
    </>
  );
};

export default RightClickEvent;
