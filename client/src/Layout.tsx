import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner.tsx";

import Background from "@/components/shared/Background.tsx";
import Navbar from "@/components/shared/Navbar.tsx";
import HomePage from "@/pages/HomePage";
import Mentors from "@/pages/Mentors/Mentors.tsx";
import Mentis from "@/pages/Mentis/Mentis.tsx";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup/Signup";
import AdminBoard from "@/pages/Admin/AdminBoard";
import MentorProfile from "@/pages/Profile/MentorProfile/MentorProfile.tsx";
import MentiProfile from "@/pages/Profile/MentiProfile/MentiProfile.tsx";
import MentorDashboard from "@/pages/Mentors/Dashboard/MentorDashboard.tsx";
import MentiDashboard from "@/pages/Tasks/MentiDashboard.tsx";
import AboutPage from "@/pages/AboutPage.tsx";
import Contact from "@/pages/Contact/Contact.tsx";

const Layout = () => {
  return (
    <Router>
      <Background />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/app/mentors/:id/dashboard"
          element={<MentorDashboard />}
        />
        <Route path="/app/mentis/:id/dashboard" element={<MentiDashboard />} />
        <Route path="/app/mentors" element={<Mentors />} />
        <Route path="/app/mentors/:id" element={<MentorProfile />} />
        <Route path="/app/mentis" element={<Mentis />} />
        <Route path="/app/mentis/:id" element={<MentiProfile />} />
        <Route path="/app/admin/board" element={<AdminBoard />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Toaster
        toastOptions={{
          classNames: {
            error: "bg-red-400 text-white",
            success: "text-white bg-green-500",
            warning: "text-yellow-400",
            info: "bg-blue-400",
          },
        }}
      />
    </Router>
  );
};

export default Layout;
