'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation'; // 🎯 useParams যোগ করা হয়েছে
import { motion } from 'framer-motion';
import {
  KeyRound,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const params = useParams();

  // 🎯 Dynamic Route [email] থেকে ইমেইল বের করা
  const rawEmail = params?.email ? String(params.email) : '';
  const email = decodeURIComponent(rawEmail);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error('Please fill in both password fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match. Please try again.');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    const serverUrl =
      process.env.NEXT_PUBLIC_SERVER_URL || 'https://servercode-ten.vercel.app';

    try {
      setIsLoading(true);

      const [res] = await Promise.all([
        axios.post(
          `${serverUrl}/user/change-password/${encodeURIComponent(email)}`,
          {
            newPassword,
            confirmPassword,
          },
        ),
        new Promise(resolve => setTimeout(resolve, 2000)),
      ]);

      if (res.data.success) {
        toast.success(res.data.message || 'Password updated successfully');
        router.push('/login');
      } else {
        toast.error(res.data.message || 'Failed to update password');
        setIsLoading(false);
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        'Failed to update password. Please try again later.';
      toast.error(errorMsg);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-green-50 via-emerald-50 to-teal-100 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-green-100 p-6 sm:p-8 space-y-6"
      >
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-100 text-green-600 mb-2 shadow-inner">
            <KeyRound className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Reset Password
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xs mx-auto">
            Enter a new password for{' '}
            <span className="font-semibold text-green-700">
              {email || 'your account'}
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-semibold text-gray-700 block">
              New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-11 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 text-sm focus:bg-white focus:border-green-600 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                {showNewPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-semibold text-gray-700 block">
              Confirm New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-11 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 text-sm focus:bg-white focus:border-green-600 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 space-y-2">
            <p className="text-xs font-semibold text-gray-500">
              Password requirements:
            </p>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <CheckCircle2
                  className={`w-4 h-4 transition-colors ${
                    newPassword.length >= 6 ? 'text-green-500' : 'text-gray-300'
                  }`}
                />
                <span>At least 6 characters long</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <CheckCircle2
                  className={`w-4 h-4 transition-colors ${
                    newPassword && newPassword === confirmPassword
                      ? 'text-green-500'
                      : 'text-gray-300'
                  }`}
                />
                <span>Passwords match</span>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={isLoading || !newPassword || !confirmPassword}
            className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg shadow-green-600/25 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Updating Password...</span>
              </>
            ) : (
              <span>Reset Password</span>
            )}
          </motion.button>
        </form>

        <div className="text-center pt-2 border-t border-gray-100">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-500 hover:text-green-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ChangePassword;
