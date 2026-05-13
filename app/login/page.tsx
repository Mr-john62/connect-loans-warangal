"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  // =========================================
  // LOGIN FUNCTION
  // =========================================

  const handleLogin = () => {

    const savedUsername =
      localStorage.getItem(
        "adminUsername"
      ) || "connectloans";

    const savedPassword =
      localStorage.getItem(
        "adminPassword"
      ) || "Connect@2025";

    if (
      username === savedUsername &&
      password === savedPassword
    ) {

      localStorage.setItem(
        "adminLoggedIn",
        "true"
      );

      router.push("/admin");

    } else {

      alert(
        "Invalid Username or Password"
      );
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">

      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">

        {/* LOGO */}

        <div className="text-center mb-8">

          <img
            src="/logo.png"
            alt="Logo"
            className="w-20 h-20 mx-auto mb-4"
          />

          <h1 className="text-3xl font-bold">

            Admin Login

          </h1>

          <p className="text-gray-500 mt-2">

            Connect Loans Warangal

          </p>

        </div>

        {/* FORM */}

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
            className="w-full border rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full border rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-4 rounded-2xl font-semibold"
          >

            Login

          </button>

        </div>

      </div>

    </div>
  );
}