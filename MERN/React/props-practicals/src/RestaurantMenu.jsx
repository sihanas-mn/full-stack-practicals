import React from 'react'
import MenuItem from './RestaurantMenuComponents/MenuItem'

function RestaurantMenu() {
    let label = "rice"
    let price = 4500
    let isVeg = "veg" 
  return (
    <MenuItem label={label} price={price} isVeg={isVeg}></MenuItem>
  )
}

export default RestaurantMenu