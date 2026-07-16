import React from 'react'

function Product(props) {
  return (
    <>
        <h1>title: {props.title}</h1>
        <h1>price: {props.price}</h1>
        <h1>inStock: {props.inStock}</h1>
    </>
  )
}

export default Product