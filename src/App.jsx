import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./screens/Hero";
import UserProfile from "./screens/UserProfile";
import Fqs from "./screens/FQ's";
import AdminPortal from "./screens/AdminScreen/AdminPortal";
import SuccessfulPayment from "./screens/SuccessfulPayment";
import FailedPayment from "./screens/FailedPayment";

function App() {
  return (
    <Router>
      {/* bvcv */}
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/Fqs" element={<Fqs />} />
        <Route path="/AdminPortal" element={<AdminPortal />} />
        <Route path="/SuccessfulPayment" element={<SuccessfulPayment />} />
        <Route path="/FailedPayment" element={<FailedPayment />} />
      </Routes>
    </Router>
  );
}

export default App;