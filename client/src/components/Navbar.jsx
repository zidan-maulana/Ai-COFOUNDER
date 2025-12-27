import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-md border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">

          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-white">Karo</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                 `text-gray-300 hover:text-primary transition ${isActive ? "text-primary" : ""}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/features"
              className={({ isActive }) =>
                 `text-gray-300 hover:text-primary transition ${isActive ? "text-primary" : ""}`
              }
            >
              Features
            </NavLink>

            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                 `text-gray-300 hover:text-primary transition ${isActive ? "text-primary" : ""}`
              }
            >
              Pricing
            </NavLink>

            <NavLink
              to="/tentang"
              className={({ isActive }) =>
                 `text-gray-300 hover:text-primary transition ${isActive ? "text-primary" : ""}`
              }
            >
              About
            </NavLink>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/login" className="px-6 py-2 text-white hover:text-primary transition">
              Masuk
            </Link>
            <Link to="/register"  className="px-3 py-1.5 sm:px-6 sm:py-2 text-xs sm:text-base bg-white text-dark rounded-lg hover:bg-gray-300 transition font-medium whitespace-nowrap">
              Daftar Sekarang
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
