'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, ArrowLeft, Loader2, RefreshCw } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const VerifyOtp = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const inputRefs = useRef([]);
  const router = useRouter();
  const params = useParams();

  const rawEmail = params?.email ? String(params.email) : '';
  const email = decodeURIComponent(rawEmail);

  const handleChange = (index, value) => {
    const digit = value.replace(/\D/g, '');
    if (digit.length > 1) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = digit;
    setOtp(updatedOtp);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = e => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6);
    if (pastedData) {
      const digits = pastedData.split('');
      const newOtp = ['', '', '', '', '', ''];
      digits.forEach((d, i) => {
        newOtp[i] = d;
      });
      setOtp(newOtp);
      inputRefs.current[Math.min(digits.length - 1, 5)]?.focus();
    }
  };

  // 🎯 সংশোধনকৃত handleSubmit ফাংশন
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) {
      setError('Please enter the complete 6-digit OTP.');
      return;
    }

    const serverUrl =
      process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

    try {
      setIsLoading(true);

      // API কল এবং বাধ্যতামূলক ২ সেকেন্ডের লোডিং এনিমেশন টাইমার একসাথে চালানো
      const [res] = await Promise.all([
        axios.post(
          `${serverUrl}/user/verify-otp/${encodeURIComponent(email)}`,
          { otp: fullOtp },
        ),
        new Promise(resolve => setTimeout(resolve, 2000)), // ২ সেকেন্ডের ফিক্সড এনিমেশন
      ]);

      if (res.data.success) {
        setSuccess(true);
        toast.success(res.data.message || 'OTP verified successfully');

        // ২ সেকেন্ডের লোডিং শেষ হলে নেভিগেট হবে
        router.push(`/change-password/${encodeURIComponent(email)}`);
      } else {
        setError(res.data.message || 'Failed to verify OTP. Please try again.');
        setIsLoading(false);
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        'Failed to verify OTP. Please try again later.';
      setError(errorMsg);
      toast.error(errorMsg);
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      toast.error('Email address not found.');
      return;
    }

    const serverUrl =
      process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

    try {
      setIsResending(true);
      const res = await axios.post(`${serverUrl}/user/resend-otp`, { email });
      toast.success(
        res.data.message || 'A new verification code has been sent!',
      );
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Failed to resend OTP. Try again.',
      );
    } finally {
      setIsResending(false);
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
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Verify Your Email
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xs mx-auto">
            We have sent a 6-digit verification code to your email address:
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs sm:text-sm font-semibold mt-1">
            <Mail className="w-3.5 h-3.5" />
            <span>{email || 'No email specified'}</span>
          </div>
        </div>

        {error && (
          <div className="p-3 text-xs sm:text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl text-center">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex justify-between gap-1.5 sm:gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-11 h-12 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-bold bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:bg-white focus:border-green-600 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all duration-200 shadow-sm"
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={isLoading || otp.some(digit => digit === '')}
            className="w-full cursor-pointer py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg shadow-green-600/25 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Verifying Code...</span>
              </>
            ) : (
              <span>Verify Account</span>
            )}
          </motion.button>
        </form>

        <div className="space-y-4 text-center pt-2 border-t border-gray-100">
          <p className="text-xs sm:text-sm text-gray-600">
            Didn't receive the code?{' '}
            <button
              type="button"
              onClick={handleResendCode}
              disabled={isResending}
              className="font-semibold text-green-600 hover:text-green-700 hover:underline transition-colors cursor-pointer inline-flex items-center gap-1 disabled:opacity-50"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`}
              />
              {isResending ? 'Sending...' : 'Resend Code'}
            </button>
          </p>

          <div>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-500 hover:text-green-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyOtp;
