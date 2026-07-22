import React from "react";
import { useState } from "react";

const CharacterCounter = () => {
  const [charCount, setCharCount] = useState('');

  const showCharCount = (event) => {
    setCharCount(event.target.value);
  };

  return (
    <>
      <h1>Character Counter</h1>
      <input type="text" onChange={showCharCount} />
      <p>Character Count: {charCount.length}</p>
    </>
  );
};

export default CharacterCounter;
