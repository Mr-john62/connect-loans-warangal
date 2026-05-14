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
  addDoc,
  deleteDoc,
} from "firebase/firestore";

import * as XLSX from "xlsx";

export default function AdminPage() {

  const router = useRouter();

  const [leads, setLeads] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  // =========================================
  // FOLLOW UP
  // =========================================

  const [followUpDates, setFollowUpDates] =
    useState<{ [key: string]: string }>({});

  // =========================================
  // PREVIEW MODAL
  // =========================================

  const [showPreview, setShowPreview] =
    useState(false);

  // =========================================
  // MANUAL LEAD MODAL
  // =========================================

  const [showModal, setShowModal] =
    useState(false);

  const [manualName, setManualName] =
    useState("");

  const [manualPhone, setManualPhone] =
    useState("");

  const [manualLoanType, setManualLoanType] =
    useState("");

  const [manualAmount, setManualAmount] =
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
  // FOLLOW UP DATE
  // =========================================

  const handleFollowUpDate =
    async (
      id: string,
      date: string
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
          followUpDate: date,
        }
      );

      setLeads((prev) =>

        prev.map((lead) =>

          lead.id === id

            ? {
                ...lead,
                followUpDate: date,
              }

            : lead
        )
      );
    };

  // =========================================
  // REMARKS
  // =========================================

  const handleRemark =
    async (
      id: string,
      remark: string
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
          remark,
        }
      );

      setLeads((prev) =>

        prev.map((lead) =>

          lead.id === id

            ? {
                ...lead,
                remark,
              }

            : lead
        )
      );
    };

  // =========================================
  // DELETE LEAD
  // =========================================

  const handleDeleteLead =
    async (id: string) => {

      const confirmDelete =
        confirm(
          "Are you sure you want to delete this lead?"
        );

      if (!confirmDelete)
        return;

      await deleteDoc(
        doc(
          db,
          "loanInquiries",
          id
        )
      );

      setLeads(
        leads.filter(
          (lead) =>
            lead.id !== id
        )
      );

      alert(
        "Lead Deleted Successfully"
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
  // DOWNLOAD EXCEL
  // =========================================

  const downloadExcel = () => {

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

        FollowUp:
          lead.followUpDate || "",

        Remark:
          lead.remark || "",

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

  // =========================================
  // MANUAL LEAD ADD
  // =========================================

  const handleManualLead =
    async () => {

      if (
        !manualName ||
        !manualPhone ||
        !manualLoanType ||
        !manualAmount
      ) {

        alert(
          "Please fill all fields"
        );

        return;
      }

      const newLead = {

        name: manualName,

        phone: manualPhone,

        loanType:
          manualLoanType,

        loanAmount:
          manualAmount,

        status: "New",

        followUpDate: "",

        remark: "",

      };

      const docRef =
        await addDoc(
          collection(
            db,
            "loanInquiries"
          ),
          newLead
        );

      setLeads([
        {
          id: docRef.id,
          ...newLead,
        },
        ...leads,
      ]);

      setManualName("");
      setManualPhone("");
      setManualLoanType("");
      setManualAmount("");

      setShowModal(false);

      alert(
        "Lead Added Successfully"
      );
    };

  // =========================================
  // ANALYTICS COUNTS
  // =========================================

  const totalLeads =
    leads.length;

  const approvedLeads =
    leads.filter(
      (lead) =>
        lead.status ===
        "Approved"
    ).length;

  const contactedLeads =
    leads.filter(
      (lead) =>
        lead.status ===
        "Contacted"
    ).length;

  const rejectedLeads =
    leads.filter(
      (lead) =>
        lead.status ===
        "Rejected"
    ).length;

  return (

    <div className="min-h-screen bg-slate-100 p-6 md:p-10">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

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

        <div className="flex items-center gap-4 flex-wrap">

          <button
            onClick={() =>
              router.push("/settings")
            }
            className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-2xl font-semibold"
          >

            Settings

          </button>

          <button
            onClick={() =>
              setShowModal(true)
            }
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl font-semibold"
          >

            Add Lead

          </button>

          <button
            onClick={() =>
              setShowPreview(true)
            }
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-semibold"
          >

            Preview Leads

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
          className="w-full md:w-96 border rounded-2xl px-5 py-4"
        />

      </div>

      {/* ANALYTICS */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

        <div className="bg-blue-600 text-white rounded-3xl p-6">

          <h3>Total Leads</h3>

          <p className="text-4xl font-bold mt-3">

            {totalLeads}

          </p>

        </div>

        <div className="bg-green-600 text-white rounded-3xl p-6">

          <h3>Approved</h3>

          <p className="text-4xl font-bold mt-3">

            {approvedLeads}

          </p>

        </div>

        <div className="bg-yellow-500 text-white rounded-3xl p-6">

          <h3>Contacted</h3>

          <p className="text-4xl font-bold mt-3">

            {contactedLeads}

          </p>

        </div>

        <div className="bg-red-500 text-white rounded-3xl p-6">

          <h3>Rejected</h3>

          <p className="text-4xl font-bold mt-3">

            {rejectedLeads}

          </p>

        </div>

      </div>

      {/* TABLE */}

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[2000px]">

            <thead className="bg-blue-600 text-white">

              <tr>

                <th className="p-5 text-left">Name</th>
                <th className="p-5 text-left">Phone</th>
                <th className="p-5 text-left">Loan Type</th>
                <th className="p-5 text-left">Amount</th>
                <th className="p-5 text-left">AI Score</th>
                <th className="p-5 text-left">Status</th>
                <th className="p-5 text-left">Follow-Up</th>
                <th className="p-5 text-left">Remarks</th>
                <th className="p-5 text-left">WhatsApp</th>
                <th className="p-5 text-left">Delete</th>

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
                      className="border-b hover:bg-slate-50"
                    >

                      <td className="p-5">
                        {lead.name}
                      </td>

                      <td className="p-5">
                        {lead.phone}
                      </td>

                      <td className="p-5">
                        {lead.loanType}
                      </td>

                      <td className="p-5">
                        ₹{lead.loanAmount}
                      </td>

                      <td className={`p-5 font-bold ${score.color}`}>
                        {score.label}
                      </td>

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

                          <option>New</option>
                          <option>Contacted</option>
                          <option>Approved</option>
                          <option>Rejected</option>

                        </select>

                      </td>

                      <td className="p-5">

                        <input
                          type="date"
                          value={
                            lead.followUpDate || ""
                          }
                          onChange={(e) =>
                            handleFollowUpDate(
                              lead.id,
                              e.target.value
                            )
                          }
                          className="border rounded-xl px-3 py-2"
                        />

                      </td>

                      <td className="p-5">

                        <textarea
                          value={
                            lead.remark || ""
                          }
                          onChange={(e) =>
                            handleRemark(
                              lead.id,
                              e.target.value
                            )
                          }
                          placeholder="Add remark..."
                          className="border rounded-xl px-3 py-2 w-56 h-20"
                        />

                      </td>

                      <td className="p-5">

                        <a
                          href={`https://wa.me/91${lead.phone}`}
                          target="_blank"
                          className="bg-green-500 text-white px-4 py-2 rounded-xl"
                        >

                          WhatsApp

                        </a>

                      </td>

                      <td className="p-5">

                        <button
                          onClick={() =>
                            handleDeleteLead(
                              lead.id
                            )
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                        >

                          Delete

                        </button>

                      </td>

                    </tr>
                  );
                }
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* PREVIEW MODAL */}

      {showPreview && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

          <div className="bg-white rounded-3xl p-8 w-full max-w-6xl max-h-[90vh] overflow-auto">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-3xl font-bold">

                Leads Preview

              </h2>

              <button
                onClick={() =>
                  setShowPreview(false)
                }
                className="bg-red-500 text-white px-5 py-2 rounded-xl"
              >

                Close

              </button>

            </div>

            <table className="w-full border">

              <thead className="bg-slate-200">

                <tr>

                  <th className="border p-4">
                    Name
                  </th>

                  <th className="border p-4">
                    Phone
                  </th>

                  <th className="border p-4">
                    Loan Type
                  </th>

                  <th className="border p-4">
                    Amount
                  </th>

                  <th className="border p-4">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {leads.map(
                  (lead) => (

                    <tr key={lead.id}>

                      <td className="border p-4">
                        {lead.name}
                      </td>

                      <td className="border p-4">
                        {lead.phone}
                      </td>

                      <td className="border p-4">
                        {lead.loanType}
                      </td>

                      <td className="border p-4">
                        ₹{lead.loanAmount}
                      </td>

                      <td className="border p-4">
                        {lead.status || "New"}
                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

            <div className="mt-8">

              <button
                onClick={downloadExcel}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-semibold"
              >

                Download Excel

              </button>

            </div>

          </div>

        </div>
      )}

      {/* ADD LEAD MODAL */}

      {showModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

          <div className="bg-white rounded-3xl p-8 w-full max-w-lg">

            <h2 className="text-3xl font-bold mb-6">

              Add Manual Lead

            </h2>

            <div className="space-y-4">

              <input
                type="text"
                placeholder="Customer Name"
                value={manualName}
                onChange={(e) =>
                  setManualName(
                    e.target.value
                  )
                }
                className="w-full border rounded-2xl px-5 py-4"
              />

              <input
                type="text"
                placeholder="Phone Number"
                value={manualPhone}
                onChange={(e) =>
                  setManualPhone(
                    e.target.value
                  )
                }
                className="w-full border rounded-2xl px-5 py-4"
              />

              <input
                type="text"
                placeholder="Loan Type"
                value={manualLoanType}
                onChange={(e) =>
                  setManualLoanType(
                    e.target.value
                  )
                }
                className="w-full border rounded-2xl px-5 py-4"
              />

              <input
                type="number"
                placeholder="Loan Amount"
                value={manualAmount}
                onChange={(e) =>
                  setManualAmount(
                    e.target.value
                  )
                }
                className="w-full border rounded-2xl px-5 py-4"
              />

              <div className="flex gap-4 pt-4">

                <button
                  onClick={
                    handleManualLead
                  }
                  className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-semibold"
                >

                  Save Lead

                </button>

                <button
                  onClick={() =>
                    setShowModal(
                      false
                    )
                  }
                  className="flex-1 bg-gray-300 py-4 rounded-2xl font-semibold"
                >

                  Cancel

                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}