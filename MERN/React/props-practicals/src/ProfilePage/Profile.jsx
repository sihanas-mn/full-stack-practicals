import React from 'react'

function Profile({username, password, avatarUrl, bio}) {
  return (
    <>
      <h1>Username: {username}</h1>
      <h1>password: {password}</h1>
      <img src={avatarUrl} alt='img here'/>
      <h1>Bio: {bio}</h1>
    </>
  )
}

export default Profile