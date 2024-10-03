import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Background from "./shared/Background";
import Navbar from "./shared/Navbar";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Tables from "./pages/Tables";
import Mentors from "./pages/Mentors";
import Mentis from "./pages/Mentis";
import Login from "./pages/Login";
import Signup from "./pages/Signup/Signup";

const Layout = () => {
  return (
    <Router>
      <Background />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/app/tables" element={<Tables />} />
        <Route path="/app/mentors" element={<Mentors />} />
        <Route path="/app/mentis" element={<Mentis />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default Layout;
