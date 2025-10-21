import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser, fetchCurrentUser } from "./components/store/authSlice";
import Hero from "./screens/Hero";
import UserProfile from "./screens/UserProfile";
import Fqs from "./screens/FQ's";
import AdminPortal from "./screens/AdminScreen/AdminPortal";
import SuccessfulPayment from "./screens/SuccessfulPayment";
import FailedPayment from "./screens/FailedPayment";
import ProtectedVerificationPage from './components/ProtectedVerificationPage';
import VerificationSuccess from './components/VerificationSuccess';
import VerificationFailed from './components/VerificationFailed';
import MaintenancePage from './components/MaintenancePage';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <Router>
      {/* bvcv */}
      <Routes>
        {/* <Route path="/" element={<Hero user={user}/>} /> */}
        <Route path="/" element={<MaintenancePage />} />
        {/* <Route path="/UserProfile" element={<UserProfile user={user} />} />
        <Route path="/Fqs" element={<Fqs />} />
        <Route path="/AdminPortal" element={<AdminPortal />} />
        <Route path="/SuccessfulPayment" element={<SuccessfulPayment />} />
        <Route path="/FailedPayment" element={<FailedPayment />} />
        <Route path="/verification-success" element={
          <ProtectedVerificationPage>
            <VerificationSuccess />
          </ProtectedVerificationPage>
        } />
        <Route path="/verification-failed" element={
          <ProtectedVerificationPage>
            <VerificationFailed />
          </ProtectedVerificationPage>} /> */}
      </Routes>
    </Router>
  );
}

export default App;