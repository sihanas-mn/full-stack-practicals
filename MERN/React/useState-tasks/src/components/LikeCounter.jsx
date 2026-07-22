import React from 'react'
import { useState } from 'react'

const LikeCounter = () => {

    let [likeCount, setLikeCount] = useState(0)

    const likeIncrement = () => {
        setLikeCount(likeCount = likeCount + 1)
    }
  return (
    <>
    <h1>Like Counter</h1>
    <button onClick={likeIncrement}>Like {likeCount}</button>
    </>
  )
}

export default LikeCounter