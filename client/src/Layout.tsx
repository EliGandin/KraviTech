import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Navbar from "./shared/Navbar";
import Tables from "./pages/Tables";
import Mentors from "./pages/Mentors";
import Mentis from "./pages/Mentis";

const Layout = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/Mentors" element={<Mentors />} />
        <Route path="/Mentis" element={<Mentis />} />
      </Routes>
    </Router>
  );
};

export default Layout;
