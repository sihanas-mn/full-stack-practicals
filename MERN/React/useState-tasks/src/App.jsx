import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import CounterApp from './components/CounterApp'
import RealTimeInputDisplay from './components/RealTimeInputDisplay'
import ToggleParagraph from './components/ToggleParagraph'
import OnAndOff from './components/OnAndOff'
import LikeCounter from './components/LikeCounter'
import CharacterCounter from './components/CharacterCounter'
import ThemeToggle from './components/ThemeToggle'
import BalanceCalculator from './components/BalanceCalculator'
import ShoppingCartQuantitySelector from './components/ShoppingCartQuantitySelector'
import RenderBasedOnLoginStatus from './components/RenderBasedOnLoginStatus'

function App() {

  return (
    <>
      <CounterApp></CounterApp>
      <RealTimeInputDisplay></RealTimeInputDisplay>
      <ToggleParagraph></ToggleParagraph>
      <OnAndOff></OnAndOff>
      <LikeCounter></LikeCounter>
      <CharacterCounter></CharacterCounter>
      <ThemeToggle></ThemeToggle>
      <BalanceCalculator></BalanceCalculator>
      <ShoppingCartQuantitySelector></ShoppingCartQuantitySelector>
      <RenderBasedOnLoginStatus></RenderBasedOnLoginStatus>
    </>
  )
}

export default App
