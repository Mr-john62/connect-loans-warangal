"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

export default function SettingsPage() {

  const router = useRouter();

  const [oldPassword, setOldPassword] =
    useState("");

  const [newUsername, setNewUsername] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  // =========================================
  // CHECK LOGIN
  // =========================================

  useEffect(() => {

    const isLoggedIn =
      localStorage.getItem(
        "adminLoggedIn"
      );

    if (!isLoggedIn) {

      router.push("/login");
    }

  }, [router]);

  // =========================================
  // CHANGE PASSWORD
  // =========================================

  const handleSave = () => {

    const currentPassword =
      localStorage.getItem(
        "adminPassword"
      ) || "Connect@2025";

    if (
      oldPassword !== currentPassword
    ) {

      alert(
        "Old password is incorrect"
      );

      return;
    }

    localStorage.setItem(
      "adminUsername",
      newUsername
    );

    localStorage.setItem(
      "adminPassword",
      newPassword
    );

    alert(
      "Credentials updated successfully"
    );

    setOldPassword("");
    setNewUsername("");
    setNewPassword("");
  };

  return (

    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg">

        <div className="text-center mb-8">

          <img
            src="/logo.png"
            alt="Logo"
            className="w-20 h-20 mx-auto mb-4"
          />

          <h1 className="text-3xl font-bold">

            Admin Settings

          </h1>

          <p className="text-gray-500 mt-2">

            Change Username & Password

          </p>

        </div>

        <div className="space-y-5">

          <input
            type="password"
            placeholder="Current Password"
            value={oldPassword}
            onChange={(e) =>
              setOldPassword(
                e.target.value
              )
            }
            className="w-full border rounded-2xl px-5 py-4"
          />

          <input
            type="text"
            placeholder="New Username"
            value={newUsername}
            onChange={(e) =>
              setNewUsername(
                e.target.value
              )
            }
            className="w-full border rounded-2xl px-5 py-4"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
            className="w-full border rounded-2xl px-5 py-4"
          />

          <button
            onClick={handleSave}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold"
          >

            Save Changes

          </button>

        </div>

      </div>

    </div>
  );
}