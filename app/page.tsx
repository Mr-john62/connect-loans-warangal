"use client";

import { useState } from "react";

export default function Home() {

  // Loan Inquiry Form
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loanType, setLoanType] = useState("");
  const [loanValue, setLoanValue] = useState("");

  // EMI Calculator States
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(16);
  const [loanYears, setLoanYears] = useState(5);

  // Schedule Toggle
  const [showSchedule, setShowSchedule] = useState(false);

  // EMI Formula
  const monthlyRate = interestRate / 12 / 100;
  const months = loanYears * 12;

  const emi =
    (loanAmount *
      monthlyRate *
      Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  const totalPayment = emi * months;
  const totalInterest = totalPayment - loanAmount;

  // Amortization Schedule
  const schedule = [];

  let balance = loanAmount;

  for (let i = 1; i <= months; i++) {

    const interest = balance * monthlyRate;
    const principal = emi - interest;

    balance -= principal;

    schedule.push({
      month: i,
      emi: emi.toFixed(0),
      interest: interest.toFixed(0),
      principal: principal.toFixed(0),
      balance: balance > 0 ? balance.toFixed(0) : "0",
    });
  }

  // WhatsApp Submit
  const handleWhatsAppSubmit = () => {

    const message = `
*New Loan Inquiry*

👤 Name: ${name}
📞 Phone: ${phone}
🏦 Loan Type: ${loanType}
💰 Loan Amount: ₹${loanValue}
`;

    const whatsappUrl = `https://wa.me/919963703915?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow z-50">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <img
            src="/logo.png"
            alt="Logo"
            width={220}
          />

          <nav className="hidden md:flex gap-8 font-semibold">

            <a href="#services">Services</a>
            <a href="#emi">EMI Calculator</a>
            <a href="#contact">Contact</a>

          </nav>

          <a
            href="#contact"
            className="bg-blue-600 text-white px-6 py-3 rounded-2xl"
          >
            Apply Now
          </a>

        </div>

      </header>

      {/* Hero Section */}
      <section className="pt-40 pb-24 bg-gradient-to-br from-blue-50 to-white">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div>

            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              Trusted Loan Agency In Warangal
            </span>

            <h1 className="text-6xl font-extrabold mt-6 leading-tight">
              Fast & Easy
              <span className="text-blue-600"> Loan Solutions</span>
            </h1>

            <p className="text-gray-600 text-lg mt-6">
              Connect Loans Warangal helps customers get quick loan approvals
              with minimal documentation and expert financial guidance.
            </p>

            <div className="flex gap-4 mt-8">

              <a
                href="#contact"
                className="bg-blue-600 text-white px-8 py-4 rounded-2xl"
              >
                Apply For Loan
              </a>

              <a
                href="#contact"
                className="border px-8 py-4 rounded-2xl"
              >
                Contact Us
              </a>

            </div>

          </div>

          {/* Inquiry Form */}
          <div>

            <div className="bg-white rounded-3xl shadow-2xl p-8">

              <h2 className="text-2xl font-bold mb-6">
                Quick Loan Inquiry
              </h2>

              <div className="space-y-5">

                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded-2xl px-5 py-4"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border rounded-2xl px-5 py-4"
                />

                <select
                  value={loanType}
                  onChange={(e) => setLoanType(e.target.value)}
                  className="w-full border rounded-2xl px-5 py-4"
                >
                  <option value="">Select Loan Type</option>
                  <option>Loan Consolidation</option>
                  <option>Personal Loan</option>
                  <option>Business Loan</option>
                  <option>Home Loan</option>
                  <option>Mortgage Loan</option>
                </select>

                <input
                  type="number"
                  placeholder="Loan Amount"
                  value={loanValue}
                  onChange={(e) => setLoanValue(e.target.value)}
                  className="w-full border rounded-2xl px-5 py-4"
                />

                <button
                  onClick={handleWhatsAppSubmit}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl"
                >
                  Submit Application
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <h2 className="text-5xl font-bold">
              Loan Services
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">

            {[
              ["💳", "Loan Consolidation"],
              ["💰", "Personal Loan"],
              ["🏢", "Business Loan"],
              ["🏠", "Home Loan"],
              ["📑", "Mortgage Loan"],
            ].map((item, index) => (

              <div
                key={index}
                className="bg-slate-50 rounded-3xl p-8 hover:bg-blue-600 hover:text-white transition"
              >

                <div className="text-5xl mb-6">
                  {item[0]}
                </div>

                <h3 className="text-2xl font-bold">
                  {item[1]}
                </h3>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* EMI Calculator */}
      <section id="emi" className="py-24 bg-slate-50">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">

            <h2 className="text-5xl font-bold">
              EMI Calculator
            </h2>

          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-10 grid lg:grid-cols-2 gap-10">

            {/* Inputs */}
            <div className="space-y-6">

              <div>

                <label className="font-semibold">
                  Loan Amount (₹)
                </label>

                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
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
                  onChange={(e) => setInterestRate(Number(e.target.value))}
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
                  onChange={(e) => setLoanYears(Number(e.target.value))}
                  className="w-full border rounded-2xl px-5 py-4 mt-2"
                />

              </div>

            </div>

            {/* EMI Results */}
            <div className="bg-blue-600 text-white rounded-3xl p-10">

              <h3 className="text-3xl font-bold mb-8">
                Loan EMI Details
              </h3>

              <div className="space-y-5 text-lg">

                <div className="flex justify-between">
                  <span>Monthly EMI</span>
                  <span>₹{emi.toFixed(0)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Total Interest</span>
                  <span>₹{totalInterest.toFixed(0)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Total Payment</span>
                  <span>₹{totalPayment.toFixed(0)}</span>
                </div>

              </div>

            </div>

          </div>

          {/* Schedule Button */}
          <div className="mt-10 text-center">

            <button
              onClick={() => setShowSchedule(!showSchedule)}
              className="bg-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-blue-700 transition"
            >

              {showSchedule
                ? "Hide Loan Schedule"
                : "View Loan Schedule"}

            </button>

          </div>

          {/* Schedule Table */}
          {showSchedule && (

            <div className="mt-16 bg-white rounded-3xl shadow-2xl overflow-hidden">

              <div className="bg-blue-600 text-white px-8 py-6">

                <h2 className="text-3xl font-bold">
                  Loan Tenure Schedule
                </h2>

                <p className="mt-2 text-blue-100">
                  Month-wise EMI repayment breakdown
                </p>

              </div>

              <div className="overflow-x-auto max-h-[500px] overflow-y-auto">

                <table className="w-full min-w-[900px] text-left">

                  <thead className="bg-slate-100 sticky top-0">

                    <tr>

                      <th className="p-5 font-bold">Month</th>
                      <th className="p-5 font-bold">EMI</th>
                      <th className="p-5 font-bold">Interest</th>
                      <th className="p-5 font-bold">Principal</th>
                      <th className="p-5 font-bold">Balance</th>

                    </tr>

                  </thead>

                  <tbody>

                    {schedule.map((item, index) => (

                      <tr
                        key={index}
                        className="border-b hover:bg-blue-50 transition"
                      >

                        <td className="p-5">{item.month}</td>

                        <td className="p-5 font-semibold">
                          ₹{item.emi}
                        </td>

                        <td className="p-5 text-red-500">
                          ₹{item.interest}
                        </td>

                        <td className="p-5 text-green-600">
                          ₹{item.principal}
                        </td>

                        <td className="p-5">
                          ₹{item.balance}
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          )}

        </div>

      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          <div>

            <h2 className="text-5xl font-bold mb-6">
              Contact Connect Loans Warangal
            </h2>

            <div className="space-y-5 text-lg">

              <p>📍 Warangal, Telangana</p>

              <p>📞 +91 9963703915</p>

              <p>✉️ praveenrc07@gmail.com</p>

              <a
                href="https://wa.me/919963703915"
                target="_blank"
                className="inline-block bg-green-500 text-white px-8 py-4 rounded-2xl"
              >
                Chat On WhatsApp
              </a>

            </div>

          </div>

          {/* Google Map */}
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

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/919963703915"
        target="_blank"
        className="fixed bottom-6 right-6 bg-green-500 text-white px-5 py-4 rounded-full shadow-2xl"
      >
        WhatsApp
      </a>

    </div>
  );
}