import React from "react";
import { Link } from "react-router-dom";

export default function Header() {

    const toggleMenu = () => {
        console.log("toggle menu")
    }
  return (
    <div>
      <header className="flex items-center justify-between p-4 bg-blue-600 text-white shadow-md">
        <h1 className="text-xl font-bold">TaskManager</h1>
        <nav className="hidden md:flex gap-6">
          <Link to="/" className="hover:underline">
            Dashboard
          </Link>
          <Link to="/boards" className="hover:underline">
            Boards
          </Link>
          <Link to="/tasks" className="hover:underline">
            All Tasks
          </Link>
          <Link to="/" className="hover:underline">
            Profile
          </Link>
        </nav>
        <div className="md:hidden">
          {/* Mobile menu button */}
          <button onClick={toggleMenu}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
}
