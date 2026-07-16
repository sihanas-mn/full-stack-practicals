import React from "react";
import Button from "./ControlPanelComponents/Button";

function ControlPanel() {
  let text = "panel-text";
  let style = {color:"red"};
  return <Button text={text} style={style}></Button>;
}

export default ControlPanel;
