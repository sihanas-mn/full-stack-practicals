import React from 'react'
import UserCard from './userProfileComponents/UserCard'

function UserProfile() {
    let name = "aski"
    let age = 23
    let city = "kalmunai"
  return (
    <UserCard name={name} city={city} age={age}></UserCard>
  )
}

export default UserProfile