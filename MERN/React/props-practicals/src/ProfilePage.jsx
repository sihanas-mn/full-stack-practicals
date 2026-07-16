import React from 'react'
import Profile from './ProfilePage/Profile'

function ProfilePage() {
    let username = "kayne"
    let password = "050215"
    let avatarUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMiVAaZpXFUxG-SsGTbFP-TazT_8E1fYPzB3eveycuqA&s=10"
    let bio = "human on planet earth"
  return (
    <Profile username={username} password={password} avatarUrl={avatarUrl} bio={bio}></Profile>
  )
}

export default ProfilePage