import React from 'react'
import { useState } from 'react'

const OnAndOff = () => {

    const [isOn, setState] = useState(true)

    const toggleState = (event) => {
        setState(!isOn)
    }

  return (
    <>
    <h1>On / Off App</h1>
    <button onClick={toggleState}>On / Off</button>
    <p>{isOn ? 'On' : 'Off'}</p>
    </>
  )
}

export default OnAndOff