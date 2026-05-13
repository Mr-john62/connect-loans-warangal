"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { db } from "@/lib/firebase";

import {
  collection,
  getDocs,
} from "firebase/firestore";

export default function AdminPage() {

  const router = useRouter();

  const [leads, setLeads] =
    useState<any[]>([]);

  // =========================================
  // LOGIN CHECK
  // =========================================

  useEffect(() => {

    const isLoggedIn =
      localStorage.getItem(
        "adminLoggedIn"
      );

    if (!isLoggedIn) {

      router.push("/login");

      return;
    }

    const fetchLeads =
      async () => {

        const querySnapshot =
          await getDocs(
            collection(
              db,
              "loanInquiries"
            )
          );

        const data =
          querySnapshot.docs.map(
            (doc) => ({

              id: doc.id,

              ...doc.data(),

            })
          );

        setLeads(data);
      };

    fetchLeads();

  }, [router]);

  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = () => {

    localStorage.removeItem(
      "adminLoggedIn"
    );

    router.push("/login");
  };

  return (

    <div className="min-h-screen bg-slate-100 p-6 md:p-10">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

        {/* LEFT */}

        <div className="flex items-center gap-4">

          <img
            src="/logo.png"
            alt="Logo"
            className="w-16 h-16 object-contain"
          />

          <div>

            <h1 className="text-3xl md:text-5xl font-bold">

              Admin Leads Dashboard

            </h1>

            <p className="text-gray-600 mt-2">

              Connect Loans Warangal

            </p>

          </div>

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-4">

          <div className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold">

            Total Leads: {leads.length}

          </div>

          <button
            onClick={() =>
              router.push("/settings")
            }
            className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-2xl font-semibold"
          >

            Settings

          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl font-semibold"
          >

            Logout

          </button>

        </div>

      </div>

      {/* TABLE */}

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead className="bg-blue-600 text-white">

              <tr>

                <th className="p-5 text-left">
                  Name
                </th>

                <th className="p-5 text-left">
                  Phone
                </th>

                <th className="p-5 text-left">
                  Loan Type
                </th>

                <th className="p-5 text-left">
                  Amount
                </th>

              </tr>

            </thead>

            <tbody>

              {leads.map(
                (lead) => (

                  <tr
                    key={lead.id}
                    className="border-b hover:bg-slate-50 transition"
                  >

                    <td className="p-5 font-semibold">

                      {lead.name}

                    </td>

                    <td className="p-5">

                      {lead.phone}

                    </td>

                    <td className="p-5">

                      {lead.loanType}

                    </td>

                    <td className="p-5 text-green-600 font-semibold">

                      ₹{lead.loanAmount}

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}