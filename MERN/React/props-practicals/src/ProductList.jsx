import React from 'react'
import Product from './productListComonents/Product'

function ProductList() {
    let title = "diamond"
    let price = 500000
    let inStock = "in stock"

  return (
    <Product title={title} price={price} inStock={inStock}></Product>
)
}

export default ProductList