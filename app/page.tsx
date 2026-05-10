"use client";

import { useState } from "react";

export default function Home() {

  // Loan Form States
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loanType, setLoanType] = useState("");
  const [loanValue, setLoanValue] = useState("");

  // EMI States
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(10);
  const [loanYears, setLoanYears] = useState(5);

  // EMI Calculation
  const monthlyRate = interestRate / 12 / 100;
  const months = loanYears * 12;

  const emi =
    (loanAmount *
      monthlyRate *
      Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  const totalPayment = emi * months;
  const totalInterest = totalPayment - loanAmount;

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
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="Connect Warangal Logo"
              width={220}
            />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex gap-8 text-sm font-semibold">

            <a href="#services" className="hover:text-blue-600 transition">
              Services
            </a>

            <a href="#emi" className="hover:text-blue-600 transition">
              EMI Calculator
            </a>

            <a href="#contact" className="hover:text-blue-600 transition">
              Contact
            </a>

          </nav>

          {/* Apply Button */}
          <a
            href="#contact"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl shadow-lg transition inline-block"
          >
            Apply Now
          </a>

        </div>

      </header>

      {/* Hero Section */}
      <section className="pt-40 pb-24 bg-gradient-to-br from-blue-50 via-white to-slate-100">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div>

            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Trusted Loan Agency In Warangal
            </span>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              Fast & Easy
              <span className="text-blue-600"> Loan Solutions</span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Connect Warangal helps customers get quick loan approvals
              with minimal documentation and expert financial guidance.
            </p>

            <div className="flex flex-wrap gap-4">

              <a
                href="#contact"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl shadow-xl transition inline-block"
              >
                Apply For Loan
              </a>

              <a
                href="#contact"
                className="border border-gray-300 hover:border-blue-600 hover:text-blue-600 px-8 py-4 rounded-2xl transition inline-block"
              >
                Contact Us
              </a>

            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-14">

              <div>
                <h3 className="text-3xl font-bold">10K+</h3>
                <p className="text-gray-500 mt-1">Customers</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">₹250Cr+</h3>
                <p className="text-gray-500 mt-1">Loans Processed</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">24 Hours</h3>
                <p className="text-gray-500 mt-1">Approval Time</p>
              </div>

            </div>

          </div>

          {/* Loan Form */}
          <div>

            <div className="bg-white rounded-[32px] shadow-2xl p-8 border border-gray-100">

              <h3 className="text-2xl font-bold mb-6">
                Quick Loan Inquiry
              </h3>

              <div className="space-y-5">

                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select
                  value={loanType}
                  onChange={(e) => setLoanType(e.target.value)}
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Submit */}
                <button
                  onClick={handleWhatsAppSubmit}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg font-semibold shadow-lg transition"
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

            <h2 className="text-4xl font-bold mb-4">
              Loan Services
            </h2>

            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Flexible financing solutions for individuals and businesses.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">

            <div className="bg-slate-50 hover:bg-blue-600 hover:text-white transition-all duration-300 rounded-3xl p-8 shadow-sm hover:shadow-2xl">
              <div className="text-4xl mb-6">💳</div>
              <h3 className="text-2xl font-bold mb-4">Loan Consolidation</h3>
              <p>Combine multiple loans into one easy repayment.</p>
            </div>

            <div className="bg-slate-50 hover:bg-blue-600 hover:text-white transition-all duration-300 rounded-3xl p-8 shadow-sm hover:shadow-2xl">
              <div className="text-4xl mb-6">💰</div>
              <h3 className="text-2xl font-bold mb-4">Personal Loan</h3>
              <p>Quick personal financing with fast approvals.</p>
            </div>

            <div className="bg-slate-50 hover:bg-blue-600 hover:text-white transition-all duration-300 rounded-3xl p-8 shadow-sm hover:shadow-2xl">
              <div className="text-4xl mb-6">🏢</div>
              <h3 className="text-2xl font-bold mb-4">Business Loan</h3>
              <p>Flexible funding solutions for business growth.</p>
            </div>

            <div className="bg-slate-50 hover:bg-blue-600 hover:text-white transition-all duration-300 rounded-3xl p-8 shadow-sm hover:shadow-2xl">
              <div className="text-4xl mb-6">🏠</div>
              <h3 className="text-2xl font-bold mb-4">Home Loan</h3>
              <p>Affordable home financing solutions.</p>
            </div>

            <div className="bg-slate-50 hover:bg-blue-600 hover:text-white transition-all duration-300 rounded-3xl p-8 shadow-sm hover:shadow-2xl">
              <div className="text-4xl mb-6">📑</div>
              <h3 className="text-2xl font-bold mb-4">Mortgage Loan</h3>
              <p>Secure mortgage loans with easy processing.</p>
            </div>

          </div>

        </div>

      </section>

      {/* EMI Calculator */}
      <section id="emi" className="py-24 bg-slate-50">

        <div className="max-w-5xl mx-auto px-6">

          <div className="text-center mb-14">

            <h2 className="text-5xl font-bold mb-4">
              EMI Calculator
            </h2>

            <p className="text-gray-600 text-lg">
              Calculate your monthly loan EMI instantly.
            </p>

          </div>

          <div className="bg-white rounded-[32px] shadow-2xl p-10 border border-gray-100 grid md:grid-cols-2 gap-10">

            {/* Inputs */}
            <div className="space-y-6">

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Loan Amount (₹)
                </label>

                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Interest Rate (%)
                </label>

                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Loan Tenure (Years)
                </label>

                <input
                  type="number"
                  value={loanYears}
                  onChange={(e) => setLoanYears(Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

            </div>

            {/* Results */}
            <div className="bg-blue-600 text-white rounded-[32px] p-10 flex flex-col justify-center">

              <div className="mb-8">

                <p className="text-lg opacity-80 mb-2">
                  Monthly EMI
                </p>

                <h3 className="text-5xl font-bold">
                  ₹{emi.toFixed(0)}
                </h3>

              </div>

              <div className="space-y-5">

                <div className="flex justify-between text-lg">
                  <span>Total Interest</span>
                  <span>₹{totalInterest.toFixed(0)}</span>
                </div>

                <div className="flex justify-between text-lg">
                  <span>Total Payment</span>
                  <span>₹{totalPayment.toFixed(0)}</span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Contact + Google Maps */}
      <section id="contact" className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>

            <h2 className="text-5xl font-bold mb-6">
              Contact Loans Warangal
            </h2>

            <p className="text-gray-600 text-lg mb-10">
              Visit our office or contact us directly for fast loan approvals.
            </p>

            <div className="space-y-5 text-lg">

              <p>📍 Warangal, Telangana</p>

              <p>📞 +91 9963703915</p>

              <p>✉️ praveenrc07@gmail.com</p>

              <a
                href="https://wa.me/919963703915"
                target="_blank"
                className="inline-block bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl shadow-lg transition"
              >
                Chat On WhatsApp
              </a>

            </div>

          </div>

          {/* Google Map */}
          <div className="rounded-[32px] overflow-hidden shadow-2xl border border-gray-200">

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3794.6371680251336!2d79.5475080751791!3d17.99560998299898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDU5JzQ0LjIiTiA3OcKwMzMnMDAuMyJF!5e0!3m2!1sen!2sin!4v1778439603286!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

          </div>

        </div>

      </section>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919963703915"
        target="_blank"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition duration-300"
      >
        WhatsApp
      </a>

    </div>
  );
}