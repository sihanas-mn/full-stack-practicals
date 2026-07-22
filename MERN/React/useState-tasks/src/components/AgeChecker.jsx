import React from 'react'
import { useState } from 'react'

const AgeChecker = () => {
    const [age, setAge] = useState(0)

    const setAgeVar = (event) => {
        setAge(event.target.value)
    }
  return (
    <>
    <h1>Age Checker</h1>
    <input type="text" onChange={setAgeVar}/>
    <p>You are a(n): {age > 18 ? 'major' : 'minor'}</p>
    </>
    
  )
}

export default AgeChecker