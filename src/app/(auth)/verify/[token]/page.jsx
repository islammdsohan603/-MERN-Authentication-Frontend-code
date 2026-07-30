'use client';

import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Verify = () => {
  const { token } = useParams();
  const [status, setStatus] = useState('Verifying...');

  const navigate = useRouter();

  useEffect(() => {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const verifyEmail = async () => {
      try {
        const res = await axios.post(
          `${serverUrl}/user/verify`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (res.data.success) {
          setStatus('✅ Email Verifyed');
          setTimeout(() => {
            navigate.push('/login');
          }, 2000);
        } else {
          setStatus('❌ Invalid or Expired Token');
        }
      } catch (error) {
        console.log(error);
        setStatus('❌ Verification Failed, Pleass try again');
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className=" relative w-full h-screen bg-green-100 overflow-hidden">
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow-md text-center w-full max-w-md">
          <h2 className="text-xl font-semibold text-gray-800"> {status} </h2>
        </div>
      </div>
    </div>
  );
};

export default Verify;
