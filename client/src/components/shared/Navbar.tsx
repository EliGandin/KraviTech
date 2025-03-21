import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  Home,
  Table,
  Users,
  Brain,
  ShieldCheck,
  ChevronDown,
  House,
  BookOpen,
  Mail,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { userAtom } from "@/state/atoms/userAtom.ts";
import { formatInitials } from "@/utils/formatters/formatFields.ts";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userAtom);

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    {
      name: "Dashboard",
      href: `app/${user?.role}s/${user?.id}/dashboard`,
      icon: LayoutDashboard,
    },
    { name: "Tables", href: "app/tables", icon: Table },
    { name: "Mentors", href: "app/mentors", icon: Users },
    { name: "Mentis", href: "app/mentis", icon: Brain },
  ];

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="relative w-full bg-zinc-800 px-4 py-2 text-zinc-100 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-zinc-800 px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-700 hover:text-zinc-100 focus:bg-zinc-700 focus:text-zinc-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            <House className="mr-2 h-4 w-4" />
            Home
          </Link>
          <Link
            to="/about"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-zinc-800 px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-700 hover:text-zinc-100 focus:bg-zinc-700 focus:text-zinc-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            About Us
          </Link>
          <Link
            to="contact"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-zinc-800 px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-700 hover:text-zinc-100 focus:bg-zinc-700 focus:text-zinc-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            <Mail className="mr-2 h-4 w-4" />
            Contact Us
          </Link>
          {user ? (
            <>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-zinc-800 px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-700 hover:text-zinc-100 focus:bg-zinc-700 focus:text-zinc-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              ))}
              {user.role === "admin" && (
                <Link
                  to="app/admin/board"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-zinc-800 px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-700 hover:text-zinc-100 focus:bg-zinc-700 focus:text-zinc-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Admin Board
                </Link>
              )}
            </>
          ) : (
            <Link to="/login">
              <Button
                variant="outline"
                className="mr-auto text-zinc-700 hover:bg-zinc-700 hover:text-zinc-100"
              >
                Login
              </Button>
            </Link>
          )}
        </div>

        {user && (
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center space-x-2 rounded-md bg-zinc-800 px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-700 focus:bg-zinc-700 focus:outline-none"
            >
              <Avatar className="mr-2 h-8 w-8">
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${formatInitials(user.name)}`}
                />
                <AvatarFallback>{formatInitials(user.name)}</AvatarFallback>
              </Avatar>
              <span>Hello, {user.name}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <Link
                    to={`/app/${user.role}s/${user.id}`}
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900"
                    role="menuitem"
                  >
                    <div className="text-sm font-medium leading-none text-gray-900">
                      Profile
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-gray-600">
                      View and edit your profile
                    </p>
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full justify-start rounded-none p-3 font-normal hover:bg-gray-100 focus:bg-gray-100"
                    onClick={handleLogout}
                  >
                    <div className="text-left">
                      <div className="text-sm font-medium leading-none text-gray-900">
                        Logout
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-gray-600">
                        Sign out of your account
                      </p>
                    </div>
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
