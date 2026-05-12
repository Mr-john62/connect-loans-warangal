"use client";

import {
  useEffect,
  useState,
} from "react";

import { db } from "@/lib/firebase";

import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

export default function AdminPage() {

  const [leads, setLeads] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  // =========================================
  // FETCH FIREBASE LEADS
  // =========================================

  useEffect(() => {

    const fetchLeads =
      async () => {

        try {

          const q = query(
            collection(
              db,
              "loanInquiries"
            ),
            orderBy(
              "createdAt",
              "desc"
            )
          );

          const querySnapshot =
            await getDocs(q);

          const allLeads =
            querySnapshot.docs.map(
              (doc) => ({

                id: doc.id,

                ...doc.data(),

              })
            );

          setLeads(allLeads);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      };

    fetchLeads();

  }, []);

  return (

    <div className="min-h-screen bg-slate-100 p-6 md:p-10">

      {/* ========================================= */}
      {/* HEADER */}
      {/* ========================================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-6">

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

        {/* TOTAL LEADS */}

        <div className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold text-lg shadow-lg">

          Total Leads: {leads.length}

        </div>

      </div>

      {/* ========================================= */}
      {/* TABLE */}
      {/* ========================================= */}

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

                <th className="p-5 text-left">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan={5}
                    className="p-10 text-center text-lg"
                  >

                    Loading Leads...

                  </td>

                </tr>

              ) : leads.length === 0 ? (

                <tr>

                  <td
                    colSpan={5}
                    className="p-10 text-center text-lg"
                  >

                    No Leads Found

                  </td>

                </tr>

              ) : (

                leads.map(
                  (
                    lead
                  ) => (

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

                      <td className="p-5 font-semibold text-green-600">

                        ₹{lead.loanAmount}

                      </td>

                      <td className="p-5 text-gray-600">

                        {lead.createdAt
                          ?.toDate?.()
                          ?.toLocaleString?.() ||
                          "N/A"}

                      </td>

                    </tr>
                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}