# 🔐 Full-Stack Authentication & Password Reset System

এটি একটি সম্পূর্ণ **Full-Stack Web Application**, যেখানে ইউজার অথেন্টিকেশন,
ইমেইল OTP ভ্যালিডেশন এবং পাসওয়ার্ড রিসেট/পরিবর্তন করার সুবিধা রয়েছে। এই
প্রজেক্টটির ফ্রন্টএন্ড এবং ব্যাকএন্ড আলাদাভাবে সেটআপ ও রান করার জন্য নিচে
বিস্তারিত নির্দেশাবলী দেওয়া হলো।

---

## 🚀 Tech Stack (প্রযুক্তিসমূহ)

### 🎨 Frontend

- **Framework:** Next.js (App Router) / React.js
- **Styling:** Tailwind CSS, Lucide React (Icons)
- **Animation:** Framer Motion
- **HTTP Client:** Axios
- **Notifications:** React Toastify

### ⚙️ Backend

- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Security & Auth:** Bcrypt (Password Hashing)

---

## ✨ Features (বৈশিষ্ট্যসমূহ)

- 📩 **OTP Verification:** ইমেইলে OTP পাঠিয়ে অ্যাকাউন্ট বা রিসেট ভেরিফিকেশন।
- 🔑 **Reset & Change Password:** নিরাপদে পাসওয়ার্ড পরিবর্তনের সুবিধা।
- 👁️ **Password Toggle:** পাসওয়ার্ড দৃশ্যমান বা লুকানোর অপশন (Show/Hide
  Password)।
- ⚡ **Interactive UI:** Framer Motion দিয়ে তৈরি চমৎকার লোডার এবং এনিমেশন।
- 📱 **Fully Responsive:** মোবাইল, ট্যাবলেট এবং ডেস্কটপ ফ্রেন্ডলি ডিজাইন।

---

## 🛠️ Prerequisites (পূর্বশর্ত)

প্রোজেক্টটি আপনার সিস্টেমে চালানোর আগে নিচের সফটওয়্যারগুলো ইনস্টল করা থাকতে
হবে:

- [Node.js](https://nodejs.org/) (v18.x বা তার বেশি)
- [MongoDB](https://www.mongodb.com/) (Local database অথবা MongoDB Atlas URL)
- Git

---

## 📁 Installation & Setup Guide

প্রথমেই গিটহাব থেকে প্রোজেক্টটি ক্লোন করে নিন:

```bash
git clone [https://github.com/your-username/your-repository-name.git](https://github.com/your-username/your-repository-name.git)
cd your-repository-name
```

├── backend/ │ ├── config/ # Database configuration │ ├── controllers/ #
Business logic (User, Auth) │ ├── models/ # MongoDB Mongoose Schemas │ ├──
routes/ # Express API Routes │ ├── server.js # Main Entry point │ └── .env │ └──
frontend/ ├── src/ │ ├── app/ # Next.js App Router pages │ └── components/ #
Reusable UI Components ├── public/ # Static Assets └── .env.local
