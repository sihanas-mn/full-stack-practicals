import React from "react";
import { useState } from "react";

const BalanceCalculator = () => {

    const [balance, setBalance] = useState(30000)

    const afterPay = () => {
        (balance >= 5000 ? setBalance(balance - 5000) : setBalance(balance))
        
    }

  return (
    <>
      <h1>Student Balance Calculator</h1>
      <button onClick={afterPay}>Pay</button>
      <p>Current Balance: {balance}</p>
    </>
  );
};

export default BalanceCalculator;
