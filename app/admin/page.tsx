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
  doc,
  updateDoc,
} from "firebase/firestore";

import * as XLSX from "xlsx";

export default function AdminPage() {

  const router = useRouter();

  const [leads, setLeads] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  // =========================================
  // LOGIN CHECK
  // =========================================

  useEffect(() => {

    const isLoggedIn =
      sessionStorage.getItem(
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

    sessionStorage.removeItem(
      "adminLoggedIn"
    );

    router.push("/login");
  };

  // =========================================
  // SEARCH FILTER
  // =========================================

  const filteredLeads =
    leads.filter((lead) =>

      lead.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||

      lead.phone
        ?.includes(search)

    );

  // =========================================
  // UPDATE STATUS
  // =========================================

  const updateStatus =
    async (
      id: string,
      status: string
    ) => {

      const leadRef =
        doc(
          db,
          "loanInquiries",
          id
        );

      await updateDoc(
        leadRef,
        {
          status,
        }
      );

      setLeads((prev) =>

        prev.map((lead) =>

          lead.id === id

            ? {
                ...lead,
                status,
              }

            : lead
        )
      );
    };

  // =========================================
  // AI LEAD SCORE
  // =========================================

  const getLeadScore =
    (amount: number) => {

      if (amount >= 500000) {

        return {
          label: "🟢 High",
          color:
            "text-green-600",
        };
      }

      if (amount >= 200000) {

        return {
          label: "🟡 Medium",
          color:
            "text-yellow-500",
        };
      }

      return {
        label: "🔴 Low",
        color:
          "text-red-500",
      };
    };

  // =========================================
  // EXPORT EXCEL
  // =========================================

  const exportToExcel = () => {

    const exportData =
      leads.map((lead) => ({

        Name:
          lead.name,

        Phone:
          lead.phone,

        LoanType:
          lead.loanType,

        Amount:
          lead.loanAmount,

        Status:
          lead.status || "New",

        AIScore:
          getLeadScore(
            Number(
              lead.loanAmount
            )
          ).label,

      }));

    const worksheet =
      XLSX.utils.json_to_sheet(
        exportData
      );

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Leads"
    );

    XLSX.writeFile(
      workbook,
      "Connect-Loans-Leads.xlsx"
    );
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

        <div className="flex items-center gap-4 flex-wrap">

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
            onClick={exportToExcel}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-semibold"
          >

            Export Excel

          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl font-semibold"
          >

            Logout

          </button>

        </div>

      </div>

      {/* SEARCH */}

      <div className="mb-6">

        <input
          type="text"
          placeholder="Search by name or phone"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="w-full md:w-96 border rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      {/* TABLE */}

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1400px]">

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
                  AI Score
                </th>

                <th className="p-5 text-left">
                  Status
                </th>

                <th className="p-5 text-left">
                  WhatsApp
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredLeads.map(
                (lead) => {

                  const score =
                    getLeadScore(
                      Number(
                        lead.loanAmount
                      )
                    );

                  return (

                    <tr
                      key={lead.id}
                      className="border-b hover:bg-slate-50 transition"
                    >

                      {/* NAME */}

                      <td className="p-5 font-semibold">

                        {lead.name}

                      </td>

                      {/* PHONE */}

                      <td className="p-5">

                        {lead.phone}

                      </td>

                      {/* LOAN TYPE */}

                      <td className="p-5">

                        {lead.loanType}

                      </td>

                      {/* AMOUNT */}

                      <td className="p-5 text-green-600 font-semibold">

                        ₹{lead.loanAmount}

                      </td>

                      {/* AI SCORE */}

                      <td className={`p-5 font-bold ${score.color}`}>

                        {score.label}

                      </td>

                      {/* STATUS */}

                      <td className="p-5">

                        <select
                          value={
                            lead.status || "New"
                          }
                          onChange={(e) =>
                            updateStatus(
                              lead.id,
                              e.target.value
                            )
                          }
                          className="border rounded-xl px-3 py-2"
                        >

                          <option>
                            New
                          </option>

                          <option>
                            Contacted
                          </option>

                          <option>
                            Approved
                          </option>

                          <option>
                            Rejected
                          </option>

                        </select>

                      </td>

                      {/* WHATSAPP */}

                      <td className="p-5">

                        <a
                          href={`https://wa.me/91${lead.phone}`}
                          target="_blank"
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl"
                        >

                          WhatsApp

                        </a>

                      </td>

                    </tr>
                  );
                }
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}