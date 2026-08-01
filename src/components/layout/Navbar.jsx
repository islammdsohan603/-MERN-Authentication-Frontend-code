'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Book, BookOpen, User2, Menu, X, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getData } from '../context/userContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, setUser } = getData();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    const accessToken =
      typeof window !== 'undefined'
        ? localStorage.getItem('accessToken')
        : null;
    const serverUrl =
      process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

    try {
      const res = await axios.post(
        `${serverUrl}/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        toast.success(res.data.message || 'Logout successful');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUser(null);
      localStorage.removeItem('accessToken');
      setIsMobileMenuOpen(false);
      setIsProfileOpen(false);
    }
  };

  return (
    <nav className="w-full border-b border-green-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="w-11/12 max-w-7xl mx-auto px-2 py-3 flex justify-between items-center">
        {/* Brand Logo */}
        <Link href="/" className="flex gap-2 items-center text-green-800">
          <BookOpen className="h-7 w-7 text-green-600" />
          <h1 className="font-bold text-2xl tracking-tight text-gray-800">
            <span className="text-green-600">Notes</span>App
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-6 items-center font-medium text-gray-700">
            <li className="hover:text-green-600 transition-colors">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:text-green-600 transition-colors">
              <Link href="/#features">Features</Link>
            </li>
            <li className="hover:text-green-600 transition-colors">
              <Link href="/#pricing">Pricing</Link>
            </li>
          </ul>

          {/* Desktop User Action */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-700 font-bold border border-green-300 hover:ring-2 hover:ring-green-500/20 transition-all cursor-pointer"
              >
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg p-2 space-y-1 text-sm font-medium text-gray-700"
                  >
                    <Link
                      href="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors"
                    >
                      <User2 className="w-4 h-4" /> Profile
                    </Link>
                    <Link
                      href="/notes"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors"
                    >
                      <Book className="w-4 h-4" /> My Notes
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="font-medium text-gray-700 hover:text-green-600 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors shadow-sm"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-700 hover:text-green-600 focus:outline-none cursor-pointer"
          >
            {isMobileMenuOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Animated Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-white border-b border-green-100 px-4 py-4 space-y-4"
          >
            <ul className="flex flex-col space-y-3 font-medium text-gray-700">
              <li>
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block hover:text-green-600"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#features"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block hover:text-green-600"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block hover:text-green-600"
                >
                  Pricing
                </Link>
              </li>
            </ul>

            <hr className="border-gray-100" />

            {user ? (
              <div className="space-y-2 font-medium">
                <Link
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg text-gray-700 hover:bg-green-50"
                >
                  <User2 className="w-4 h-4 text-green-600" /> Profile
                </Link>
                <Link
                  href="/notes"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg text-gray-700 hover:bg-green-50"
                >
                  <Book className="w-4 h-4 text-green-600" /> My Notes
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 p-2 rounded-lg text-red-600 hover:bg-red-50 text-left cursor-pointer"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-2 border border-gray-200 rounded-lg text-gray-700 font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-2 bg-green-600 text-white rounded-lg font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
