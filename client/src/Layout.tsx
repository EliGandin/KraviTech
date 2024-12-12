import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Background from "./components/ui/Background";
import Navbar from "./components/ui/Navbar";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Tables from "./pages/Tables";
import Mentors from "@/pages/Mentors/Mentors.tsx";
import Mentis from "./pages/Mentis/Mentis.tsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup/Signup";
import AdminBoard from "@/pages/Admin/AdminBoard";
import MentorProfile from "@/pages/Profile/MentorProfile/MentorProfile.tsx";
import MentiProfile from "@/pages/Profile/MentiProfile/MentiProfile.tsx";

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
        <Route path="/app/mentors/:id" element={<MentorProfile />} />
        <Route path="/app/mentis" element={<Mentis />} />
        <Route path="/app/mentis/:id" element={<MentiProfile />} />
        <Route path="/app/admin/board" element={<AdminBoard />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default Layout;
