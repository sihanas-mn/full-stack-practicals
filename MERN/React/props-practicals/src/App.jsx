import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import WelcomePage from "./WelcomePage";
import UserProfile from "./UserProfile";
import ProductList from "./ProductList";
import ControlPanel from "./ControlPanel";
import StudentDashboard from "./StudentDashboard";
import ProfilePage from "./ProfilePage";
import RestaurantMenu from "./RestaurantMenu";
import AnalyticsBoard from "./AnalyticsBoard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <WelcomePage />
      <UserProfile/>
      <ProductList></ProductList>
      <ControlPanel></ControlPanel>
      <StudentDashboard></StudentDashboard>
      <ProfilePage></ProfilePage>
      <RestaurantMenu></RestaurantMenu>
      <AnalyticsBoard></AnalyticsBoard>
    </>
  );
}

export default App;
