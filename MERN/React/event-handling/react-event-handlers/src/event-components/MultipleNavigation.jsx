import React from "react";
import { useState } from "react";

const MultipleNavigation = () => {
    const [page, setPage] = useState('home')
    const handlePages = (event) => {
        setPage(event.target.value)
    }
  return (
    <>
      <h1>MultipleNavigation</h1>
      <button value="home" onClick={handlePages}>Home</button>
      <button value="about" onClick={handlePages}>About</button>
      <button value="services" onClick={handlePages}>Services</button>
      <button value="contact" onClick={handlePages}>Contact</button>

      <p>you're on: {page} page </p>
    </>
  );
};

export default MultipleNavigation;
