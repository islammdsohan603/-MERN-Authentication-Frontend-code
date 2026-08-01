'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Eye,
  EyeOff,
  Mail,
  User,
  Lock,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import axios, { Axios } from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { getData } from '@/components/context/userContext';

// Reusable Input Field Component
const InputField = ({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  icon: Icon,
  isPassword = false,
  showPassword = false,
  togglePassword,
}) => {
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="space-y-1.5 text-left">
      <label className="text-sm font-semibold text-gray-700 block">
        {label}
      </label>
      <div className="relative flex items-center">
        {/* Left Icon */}
        <div className="absolute left-3.5 text-gray-400 pointer-events-none">
          <Icon className="w-5 h-5" />
        </div>

        {/* Input Field */}
        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="w-full pl-11 pr-11 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all duration-200 text-sm font-medium"
        />

        {/* Password Toggle Eye Icon */}
        {isPassword && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3.5 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

// Main Signup Component
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUser } = getData();

  //  input state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // input update
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await axios.post(`${serverUrl}/user/login`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.data.success) {
        router.refresh();
        router.push('/');

        setUser(res.data.user);
        localStorage.setItem('accessToken', res.data.user.token);

        toast.success(res.data.message);
      } else {
        toast.error(res.data.error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-green-50 via-emerald-50 to-teal-100 flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Card Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-green-100/50 p-8 space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-green-100 text-green-600 mb-2 shadow-inner"
          >
            <User className="w-6 h-6" />
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Login your account
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            icon={Mail}
          />

          <div>
            <InputField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              icon={Lock}
              isPassword
              showPassword={showPassword}
              togglePassword={() => setShowPassword(!showPassword)}
            />

            <Link
              href={'/forgotepassword'}
              className="text-sm text-gray-600 cursor-pointer font-medium hover:underline"
            >
              Frogote Password
            </Link>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={isLoading}
            className="w-full cursor-pointer py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg shadow-green-600/25 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Login account...</span>
              </>
            ) : (
              <>
                <span>Login</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </form>

        {/* Footer Link */}
        <div className="text-center pt-2 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            You have no account?{' '}
            <Link
              href="/signup"
              className="font-semibold text-green-600 hover:text-green-700 transition-colors underline-offset-4 hover:underline"
            >
              SignUp
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
