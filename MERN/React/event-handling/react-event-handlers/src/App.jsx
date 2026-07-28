import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import ButtonClick from "./event-components/ButtonClick";
import DoubleClickEvent from "./event-components/DoubleClickEvent";
import MouseHover from "./event-components/MouseHover";
import InputFocus from "./event-components/InputFocus";
import InputBlur from "./event-components/InputBlur";
import KeyPressDetection from "./event-components/KeyPressDetection";
import EnterKeyDetection from "./event-components/EnterKeyDetection";
import FormSubmit from "./event-components/FormSubmit";
import DropdownChange from "./event-components/dropdownChange";
import CheckboxEvent from "./event-components/CheckboxEvent";
import RadioButtonEvent from "./event-components/RadioButtonEvent";
import MultipleNavigation from "./event-components/MultipleNavigation";
import ImageClickEvent from "./event-components/ImageClickEvent";
import RightClickEvent from "./event-components/RightClickEvent";
import TaskManager from "./event-components/FetchAPI";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ButtonClick></ButtonClick>
      <br></br>
      <br></br>
      <DoubleClickEvent></DoubleClickEvent>
      <br></br>
      <br></br>
      <MouseHover></MouseHover>
      <br></br>
      <br></br>
      <InputFocus></InputFocus>
      <br></br>
      <br></br>
      <InputBlur></InputBlur>
      <br></br>
      <br></br>
      <KeyPressDetection></KeyPressDetection>
      <br></br>
      <br></br>
      <EnterKeyDetection></EnterKeyDetection>
      <br></br>
      <br></br>
      <FormSubmit></FormSubmit>
      <br></br>
      <br></br>
      <DropdownChange></DropdownChange>
      <br></br>
      <br></br>
      <CheckboxEvent></CheckboxEvent>
      <br></br>
      <br></br>
      <RadioButtonEvent></RadioButtonEvent>
      <br></br>
      <br></br>
      <MultipleNavigation></MultipleNavigation>
      <br></br>
      <br></br>
      <ImageClickEvent></ImageClickEvent>
      <br></br>
      <br></br>
      <RightClickEvent></RightClickEvent>
      <br></br>
      <br></br>
      <TaskManager></TaskManager>
      <br></br>
      <br></br>
    </>
  );
}

export default App;
