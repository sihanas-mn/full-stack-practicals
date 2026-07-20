import React from 'react'
import SmallBox from './Layout/SmallBox'
import MediumBox from './Layout/MediumBox'
import LargeBox from './Layout/LargeBox'

function Layout() {
    let sizeObj = {small: "small", medium: "medium", large: "large"}
  return (
    <>
        <SmallBox sizeObj={sizeObj}></SmallBox>
        <MediumBox sizeObj={sizeObj}></MediumBox>
        <LargeBox sizeObj={sizeObj}></LargeBox>
    </>
  )
}

export default Layout