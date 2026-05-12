"use client";

import { useState } from "react";

import { db } from "@/lib/firebase";

import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export default function Home() {

  // =========================================
  // FORM STATES
  // =========================================

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loanType, setLoanType] =
    useState("");
  const [loanValue, setLoanValue] =
    useState("");

  // =========================================
  // EMI CALCULATOR STATES
  // =========================================

  const [loanAmount, setLoanAmount] =
    useState(500000);

  const [interestRate, setInterestRate] =
    useState(16);

  const [loanYears, setLoanYears] =
    useState(5);

  const [showSchedule, setShowSchedule] =
    useState(false);

  // =========================================
  // REDUCING BALANCE EMI FORMULA
  // =========================================

  const months = loanYears * 12;

  const monthlyRate =
    interestRate / 12 / 100;

  let emi = 0;

  let totalPayment = 0;

  let totalInterest = 0;

  if (
    loanAmount > 0 &&
    interestRate > 0 &&
    loanYears > 0
  ) {

    emi =
      (
        loanAmount *
        monthlyRate *
        Math.pow(
          1 + monthlyRate,
          months
        )
      ) /
      (
        Math.pow(
          1 + monthlyRate,
          months
        ) - 1
      );

    totalPayment =
      emi * months;

    totalInterest =
      totalPayment - loanAmount;
  }

  // =========================================
  // LOAN SCHEDULE
  // =========================================

  const schedule = [];

  let balance = loanAmount;

  for (
    let i = 1;
    i <= months;
    i++
  ) {

    const interest =
      balance * monthlyRate;

    const principal =
      emi - interest;

    balance -= principal;

    schedule.push({

      month: i,

      emi: emi.toFixed(2),

      interest:
        interest.toFixed(2),

      principal:
        principal.toFixed(2),

      balance:
        balance > 0
          ? balance.toFixed(2)
          : "0",

    });
  }

  // =========================================
  // FIREBASE SAVE
  // =========================================

  const handleSubmit =
    async () => {

    try {

      await addDoc(
        collection(
          db,
          "loanInquiries"
        ),
        {

          name,
          phone,
          loanType,
          loanAmount: loanValue,

          createdAt:
            serverTimestamp(),

        }
      );

      alert(
        "✅ Your loan inquiry has been submitted successfully. Our team will contact you shortly."
      );

      setName("");
      setPhone("");
      setLoanType("");
      setLoanValue("");

    } catch (error) {

      console.log(error);

      alert(
        "Something went wrong!"
      );
    }
  };

  return (

    <div className="min-h-screen bg-white text-gray-900">

      {/* ========================================= */}
      {/* NAVBAR */}
      {/* ========================================= */}

      <header className="fixed top-0 left-0 right-0 bg-white shadow z-50">

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">

          <img
            src="/logo.png"
            alt="Logo"
            width={160}
          />

          <nav className="hidden md:flex gap-8 font-semibold">

            <a href="#services">
              Services
            </a>

            <a href="#emi">
              EMI Calculator
            </a>

            <a href="#contact">
              Contact
            </a>

          </nav>

          <a
            href="#contact"
            className="bg-blue-600 text-white px-4 md:px-6 py-3 rounded-2xl text-sm md:text-base"
          >

            Apply Now

          </a>

        </div>

      </header>

      {/* ========================================= */}
      {/* HERO */}
      {/* ========================================= */}

      <section className="pt-32 pb-16 md:pb-24 bg-gradient-to-br from-blue-50 to-white">

        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* LEFT */}

          <div>

            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs md:text-sm font-semibold">

              Trusted Loan Agency In Warangal

            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold mt-6 leading-tight">

              Fast & Easy

              <span className="text-blue-600">

                {" "}Loan Solutions

              </span>

            </h1>

            <p className="text-gray-600 text-base md:text-lg mt-6">

              Connect Loans Warangal helps customers get quick loan approvals with minimal documentation and expert financial guidance.

            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">

              <a
                href="#contact"
                className="bg-blue-600 text-white px-8 py-4 rounded-2xl text-center"
              >

                Apply For Loan

              </a>

              <a
                href="#contact"
                className="border px-8 py-4 rounded-2xl text-center"
              >

                Contact Us

              </a>

            </div>

          </div>

          {/* FORM */}

          <div>

            <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">

              <h2 className="text-2xl font-bold mb-6">

                Quick Loan Inquiry

              </h2>

              <div className="space-y-5">

                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="w-full border rounded-2xl px-5 py-4"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  className="w-full border rounded-2xl px-5 py-4"
                />

                <select
                  value={loanType}
                  onChange={(e) =>
                    setLoanType(e.target.value)
                  }
                  className="w-full border rounded-2xl px-5 py-4"
                >

                  <option value="">
                    Select Loan Type
                  </option>

                  <option>
                    Loan Consolidation
                  </option>

                  <option>
                    Personal Loan
                  </option>

                  <option>
                    Business Loan
                  </option>

                  <option>
                    Home Loan
                  </option>

                  <option>
                    Mortgage Loan
                  </option>

                </select>

                <input
                  type="number"
                  placeholder="Loan Amount"
                  value={loanValue}
                  onChange={(e) =>
                    setLoanValue(e.target.value)
                  }
                  className="w-full border rounded-2xl px-5 py-4"
                />

                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl"
                >

                  Submit Application

                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ========================================= */}
      {/* SERVICES */}
      {/* ========================================= */}

      <section
        id="services"
        className="py-16 md:py-24 bg-white"
      >

        <div className="max-w-7xl mx-auto px-4 md:px-6">

          <div className="text-center mb-16">

            <h2 className="text-3xl md:text-5xl font-bold">

              Our Loan Services

            </h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

            <div className="bg-blue-50 rounded-3xl p-8 shadow text-center">

              <div className="text-6xl mb-5">
                🔄
              </div>

              <h3 className="text-2xl font-bold">

                Loan Consolidation

              </h3>

            </div>

            <div className="bg-blue-50 rounded-3xl p-8 shadow text-center">

              <div className="text-6xl mb-5">
                💳
              </div>

              <h3 className="text-2xl font-bold">

                Personal Loan

              </h3>

            </div>

            <div className="bg-blue-50 rounded-3xl p-8 shadow text-center">

              <div className="text-6xl mb-5">
                🏢
              </div>

              <h3 className="text-2xl font-bold">

                Business Loan

              </h3>

            </div>

            <div className="bg-blue-50 rounded-3xl p-8 shadow text-center">

              <div className="text-6xl mb-5">
                🏠
              </div>

              <h3 className="text-2xl font-bold">

                Home Loan

              </h3>

            </div>

            <div className="bg-blue-50 rounded-3xl p-8 shadow text-center">

              <div className="text-6xl mb-5">
                📑
              </div>

              <h3 className="text-2xl font-bold">

                Mortgage Loan

              </h3>

            </div>

          </div>

        </div>

      </section>

      {/* ========================================= */}
      {/* EMI CALCULATOR */}
      {/* ========================================= */}

      <section
        id="emi"
        className="py-16 md:py-24 bg-slate-50"
      >

        <div className="max-w-7xl mx-auto px-4 md:px-6">

          <div className="text-center mb-14">

            <h2 className="text-3xl md:text-5xl font-bold">

              EMI Calculator

            </h2>

          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* INPUTS */}

            <div className="space-y-6">

              <div>

                <label className="font-semibold">

                  Loan Amount (₹)

                </label>

                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) =>
                    setLoanAmount(
                      Number(
                        e.target.value
                      )
                    )
                  }
                  className="w-full border rounded-2xl px-5 py-4 mt-2"
                />

              </div>

              <div>

                <label className="font-semibold">

                  Interest Rate (%)

                </label>

                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) =>
                    setInterestRate(
                      Number(
                        e.target.value
                      )
                    )
                  }
                  className="w-full border rounded-2xl px-5 py-4 mt-2"
                />

              </div>

              <div>

                <label className="font-semibold">

                  Loan Tenure (Years)

                </label>

                <input
                  type="number"
                  value={loanYears}
                  onChange={(e) =>
                    setLoanYears(
                      Number(
                        e.target.value
                      )
                    )
                  }
                  className="w-full border rounded-2xl px-5 py-4 mt-2"
                />

              </div>

            </div>

            {/* RESULTS */}

            <div className="bg-blue-600 text-white rounded-3xl p-6 md:p-10">

              <h3 className="text-2xl md:text-3xl font-bold mb-8">

                Loan EMI Details

              </h3>

              <div className="space-y-5 text-base md:text-lg">

                <div className="flex justify-between">

                  <span>
                    Monthly EMI
                  </span>

                  <span>
                    ₹{emi.toFixed(2)}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span>
                    Total Interest
                  </span>

                  <span>
                    ₹{totalInterest.toFixed(2)}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span>
                    Total Payment
                  </span>

                  <span>
                    ₹{totalPayment.toFixed(2)}
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* BUTTON */}

          <div className="mt-10 text-center">

            <button
              onClick={() =>
                setShowSchedule(
                  !showSchedule
                )
              }
              className="bg-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-blue-700 transition"
            >

              {showSchedule
                ? "Hide Loan Schedule"
                : "View Loan Schedule"}

            </button>

          </div>

          {/* SCHEDULE TABLE */}

          {showSchedule && (

            <div className="mt-12 bg-white rounded-3xl shadow overflow-hidden">

              <div className="overflow-x-auto max-h-[500px] overflow-y-auto">

                <table className="w-full min-w-[900px]">

                  <thead className="bg-blue-600 text-white sticky top-0">

                    <tr>

                      <th className="p-4 text-left">
                        Month
                      </th>

                      <th className="p-4 text-left">
                        EMI
                      </th>

                      <th className="p-4 text-left">
                        Interest
                      </th>

                      <th className="p-4 text-left">
                        Principal
                      </th>

                      <th className="p-4 text-left">
                        Balance
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {schedule.map(
                      (
                        item,
                        index
                      ) => (

                        <tr
                          key={index}
                          className="border-b"
                        >

                          <td className="p-4">
                            {item.month}
                          </td>

                          <td className="p-4">
                            ₹{item.emi}
                          </td>

                          <td className="p-4 text-red-500">
                            ₹{item.interest}
                          </td>

                          <td className="p-4 text-green-600">
                            ₹{item.principal}
                          </td>

                          <td className="p-4">
                            ₹{item.balance}
                          </td>

                        </tr>
                      )
                    )}

                  </tbody>

                </table>

              </div>

            </div>

          )}

        </div>

      </section>

      {/* ========================================= */}
      {/* CONTACT */}
      {/* ========================================= */}

      <section
        id="contact"
        className="py-16 md:py-24 bg-white"
      >

        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div>

            <h2 className="text-3xl md:text-5xl font-bold mb-6">

              Contact Connect Loans Warangal

            </h2>

            <div className="space-y-5 text-base md:text-lg">

              <p>
                📍 Warangal, Telangana
              </p>

              <p>
                📞 +91 9704193481
              </p>

              <p>
                ✉️ connectloanswgl@gmail.com
              </p>

              <a
                href="https://wa.me/919704193481"
                target="_blank"
                className="inline-block bg-green-500 text-white px-8 py-4 rounded-2xl"
              >

                Chat On WhatsApp

              </a>

            </div>

          </div>

          {/* MAP */}

          <div className="rounded-3xl overflow-hidden shadow-2xl">

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3794.6371680251336!2d79.5475080751791!3d17.99560998299898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDU5JzQ0LjIiTiA3OcKwMzMnMDAuMyJF!5e0!3m2!1sen!2sin!4v1778439603286!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>

          </div>

        </div>

      </section>

      {/* FLOATING WHATSAPP */}

      <a
        href="https://wa.me/919704193481"
        target="_blank"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full shadow-2xl z-50 flex items-center justify-center"
      >

        <img
          src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
          alt="WhatsApp"
          className="w-8 h-8"
        />

      </a>

    </div>
  );
}