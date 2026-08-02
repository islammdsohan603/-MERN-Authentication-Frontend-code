'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  ArrowLeft,
  KeyRound,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const serverUrl =
    process.env.NEXT_PUBLIC_SERVER_URL || 'https://servercode-ten.vercel.app';

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    try {
      setIsLoading(true);

      const res = await axios.post(`${serverUrl}/user/forgot-password`, {
        email,
      });

      if (res.data.success) {
        setIsSubmitted(true);
        router.push(`verify-otp/${email}`);
        toast.success(res.data.message || 'Reset link sent successfully');
        setEmail('');
      } else {
        setError(res.data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to send reset link. Try again later.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-green-50 via-emerald-50 to-teal-100 flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Container Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-green-100 p-6 sm:p-8 space-y-6"
      >
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            /* --- STEP 1: Email Form --- */
            <motion.div
              key="form-step"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Top Header */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-green-100 text-green-600 mb-2 shadow-inner">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Forgot Password?
                </h1>
                <p className="text-sm text-gray-600 max-w-xs mx-auto">
                  No worries, enter your email below and we'll send you a
                  password reset link.
                </p>
              </div>

              {/* Error Alert */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 text-xs sm:text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5 text-left">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-gray-700 block"
                  >
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 text-gray-400 pointer-events-none">
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Enter your registered email"
                      required
                      className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all duration-200 text-sm font-medium"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full cursor-pointer py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg shadow-green-600/25 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed mt-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending reset link...</span>
                    </>
                  ) : (
                    <span>Send Reset Link</span>
                  )}
                </motion.button>
              </form>

              {/* Back to Login Link */}
              <div className="text-center pt-2 border-t border-gray-100">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-green-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Login
                </Link>
              </div>
            </motion.div>
          ) : (
            /* --- STEP 2: Success Message --- */
            <motion.div
              key="success-step"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center space-y-6 py-2"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  Check Your Email
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We have sent a password reset link to:
                  <br />
                  <span className="font-semibold text-gray-800">{email}</span>
                </p>
              </div>

              <div className="pt-2 space-y-3">
                <Link
                  href="/login"
                  className="block w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg shadow-green-600/25 transition-all text-center text-sm"
                >
                  Return to Login
                </Link>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-gray-500 hover:text-green-600 transition-colors cursor-pointer"
                >
                  Didn't receive the email?{' '}
                  <span className="underline font-medium">Try again</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
