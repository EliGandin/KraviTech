import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./shared/Navbar";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Tables from "./pages/Tables";
import Mentors from "./pages/Mentors";
import Mentis from "./pages/Mentis";
import Login from "./pages/Login";

const Layout = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="/mentis" element={<Mentis />} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default Layout;
