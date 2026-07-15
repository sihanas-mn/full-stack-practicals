import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Content from './components/Content'

function Dashboard() {
  return (
    <>
        <Sidebar></Sidebar>
        <Navbar></Navbar>
        <Content></Content>
    </>
  )
}

export default Dashboard