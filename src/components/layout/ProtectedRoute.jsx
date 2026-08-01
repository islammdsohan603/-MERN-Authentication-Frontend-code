'use client';

import React from 'react';
import { getData } from '../context/userContext';
import Link from 'next/link';

const ProtectedRoute = ({ children }) => {
  const { user } = getData();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gray-50 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">Please log in to access this page.</p>
        <Link
          href="/login"
          className="px-6 py-2.5 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors shadow-md shadow-green-600/20"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
