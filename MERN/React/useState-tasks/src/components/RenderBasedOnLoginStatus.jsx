import React from "react";
import { useState } from "react";

const RenderBasedOnLoginStatus = () => {
  const [isLogin, setLoginStatus] = useState(false);

  const loginToggle = () => {
    setLoginStatus(!isLogin ? true : false);
  };
  return (
    <>
      <h1>Render Based On Login Status</h1>
      <h4>Login Status: {isLogin ? "LoggedIn" : "LoggedOut"}</h4>
      {isLogin && (
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim
          voluptas inventore doloribus, in quidem quam.
        </p>
      )}
      <button onClick={loginToggle}>{isLogin ? "LogOut" : "LogIn"}</button>
    </>
  );
};

export default RenderBasedOnLoginStatus;
