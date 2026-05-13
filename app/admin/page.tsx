"use client";

import { useEffect, useState } from "react";

import { db } from "@/lib/firebase";

import {
  collection,
  getDocs,
} from "firebase/firestore";

export default function AdminPage() {

  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {

    const fetchLeads = async () => {

      const querySnapshot = await getDocs(
        collection(db, "loanInquiries")
      );

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLeads(data);
    };

    fetchLeads();

  }, []);

  return (

    <div className="min-h-screen bg-slate-100 p-6 md:p-10">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-10">

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

        <div className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold">

          Total Leads: {leads.length}

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

              {leads.map((lead) => (

                <tr
                  key={lead.id}
                  className="border-b hover:bg-slate-50"
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

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}