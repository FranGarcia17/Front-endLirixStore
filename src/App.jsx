import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ShowApp from "./pages/ShowApp";
import SignUp from "./pages/Login/SignUp";
import Signing from "./pages/Login/Signing";
import Biblioteca from "./pages/Biblioteca";
import MostRating from "./components/menu/MostRating";
import FromHouse from "./components/menu/FromHouse";
import NewDevelopers from "./components/menu/NewDevelopers";
import LastWeek from "./components/menu/LastWeek";
import Profile from "./components/profile/Profile";
import NotFound from "./pages/NotFound";
import ShowCards from "./components/profile/paidMethods/ShowCards";
import GeneralApps from "./components/home/GeneralApps";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/lirixstore"} />} />
      <Route path="/lirixstore" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/cards" element={<ShowCards />}/>
      <Route path="/lirixstore/:id" element={<ShowApp />} />
      <Route path="lirixstore/library" element={<Biblioteca />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/signing" element={<Signing />} />
      <Route path="/mostrating" element={<MostRating />} />
      <Route path="/fromhouse" element={<FromHouse />} />
      <Route path="/newdevelopers" element={<NewDevelopers />} />
      <Route path="/allapps" element={<GeneralApps />}/>
      <Route path="/lastweek" element={<LastWeek />} />
      <Route path="/*" element={<NotFound />}/>
    </Routes>
  );
}

export default App;
