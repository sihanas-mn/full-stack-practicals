import React from "react";
import { useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  const themeToggler = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const themeStyles = {
    light: {
      backgroundColor: "#ffffff",
      color: "#333333",
    },
    dark: {
      backgroundColor: "#1e1e1e",
      color: "#ffffff",
    },
  };

  const currentStyle = theme === 'light' ? themeStyles.light : themeStyles.dark;

  let applyStyle = {
        backgroundColor: theme === 'light' ? '#333333' : '#ffffff',
        color: theme === 'light' ? '#ffffff' : '#333333',
        padding: '10px'
      }

  return (
    <div style={{...currentStyle,
        minHeight: '50vh',
        
    }}>
      <h1 style={applyStyle}>Theme Toggle</h1>
      <button onClick={themeToggler} style={{
        backgroundColor: theme === 'light' ? '#333333' : '#ffffff',
        color: theme === 'light' ? '#ffffff' : '#333333'
      }}>Toggle theme</button>
    </div>
  );
};

export default ThemeToggle;
