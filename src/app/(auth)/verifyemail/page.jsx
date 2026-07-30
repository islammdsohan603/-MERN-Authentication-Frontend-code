import React from 'react';

const VerifyMail = () => {
  return (
    <div className="h-screen w-full relative overflow-hidden">
      <div className=" min-h-screen flex items-center justify-center bg-green-100 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
          <h1 className="text-2xl font-semibold text-green-700 mb-4">
            ✅ Check Your Email
          </h1>
          <p className=" text-gray-400 text-sm ">
            We've sent you an email to verify your account. Pleass check your
            inbox for email
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyMail;
