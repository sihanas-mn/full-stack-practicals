import React from "react";
import { useState } from "react";

const ToggleParagraph = () => {
  const [isVisible, setVisibility] = useState(true);

  const toggleVisibility = () => {
    setVisibility(!isVisible);
  };

  return (
    <>
      <h1>Toggle paragraph</h1>
      {isVisible && (
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus
          deleniti deserunt temporibus libero maxime dignissimos ipsam
          consequatur nobis nostrum odio?
        </p>
      )}
      <button onClick={toggleVisibility}>
        {isVisible ? "Hide Paragraph" : "Show Paragraph"}
      </button>
    </>
  );
};

export default ToggleParagraph;
