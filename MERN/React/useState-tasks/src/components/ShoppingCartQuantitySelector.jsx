import React from "react";
import { useState } from "react";

const ShoppingCartQuantitySelector = () => {

    let [productQuantity, setQuantity] = useState(0)
    let productPrice = 1000
    
    const totalPrice = productPrice * productQuantity

    const increase = () => {
        setQuantity(productQuantity = productQuantity + 1)
    }

    const decrease = () => {
        setQuantity(productQuantity= productQuantity - 1)
    }

  return (
    <>
      <h1>Shopping Cart Quantity Selector</h1>
    <button onClick={increase}>Add to Cart</button>
    <button onClick={decrease}>Remove from cart</button>
    <h4>Product Quantity: {productQuantity}</h4>
    <h3>Total: {totalPrice}</h3>
    </>
  );
};

export default ShoppingCartQuantitySelector;
