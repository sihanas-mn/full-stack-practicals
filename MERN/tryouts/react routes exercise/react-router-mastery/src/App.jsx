import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Courses from "./pages/Courses";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/courses">Courses</NavLink>
      </nav>

      {/*route definitions*/}
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/courses" element={<Courses/>}></Route>

        {/* unhandled paths */}

        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </>
  );
}

export default App;
