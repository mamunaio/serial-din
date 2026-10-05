"use client";

import React, { useState, useTransition } from "react";
import { MOCK_DOCTORS } from "@/lib/doctors";
import { bookAppointment, BookingResponse } from "@/app/actions/booking";
import AppointmentSlip from "./AppointmentSlip";

export default function BookingForm() {
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(MOCK_DOCTORS[0].id);
  const [appointmentDate, setAppointmentDate] = useState<string>(
    () => new Date().toISOString().split("T")[0]
  );
  const [filterSpecialty, setFilterSpecialty] = useState<string>("ALL");

  const [isPending, startTransition] = useTransition();
  const [response, setResponse] = useState<BookingResponse | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [showSlipView, setShowSlipView] = useState<boolean>(false);

  const selectedDoctor = MOCK_DOCTORS.find((d) => d.id === selectedDoctorId) || MOCK_DOCTORS[0];

  const specialties = ["ALL", ...Array.from(new Set(MOCK_DOCTORS.map((d) => d.specialization.split(" ")[0])))];

  const filteredDoctors = filterSpecialty === "ALL"
    ? MOCK_DOCTORS
    : MOCK_DOCTORS.filter((d) => d.specialization.toLowerCase().includes(filterSpecialty.toLowerCase()));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!patientName.trim()) {
      setFormError("Please enter your full name.");
      return;
    }
    if (!phone.trim() || phone.replace(/[\s-]/g, "").length < 6) {
      setFormError("Please enter a valid contact phone number.");
      return;
    }
    if (!selectedDoctorId) {
      setFormError("Please select a doctor.");
      return;
    }

    startTransition(async () => {
      const res = await bookAppointment({
        name: patientName,
        phone,
        doctorId: selectedDoctorId,
        appointmentDate,
      });

      setResponse(res);
      if (!res.success && res.error) {
        setFormError(res.error);
      }
    });
  };

  const handleReset = () => {
    setResponse(null);
    setFormError(null);
    setShowSlipView(false);
    setPatientName("");
    setPhone("");
    setSelectedDoctorId(MOCK_DOCTORS[0].id);
    setAppointmentDate(new Date().toISOString().split("T")[0]);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Decorative ambient background blur orbs */}
      <div className="no-print absolute -top-16 -left-16 w-72 h-72 bg-gradient-to-tr from-cyan-500/20 to-blue-600/30 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="no-print absolute -bottom-16 -right-16 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* When appointment is confirmed */}
      {response?.success && response.appointment ? (
        showSlipView ? (
          /* Full PDF Printable Slip View */
          <div className="animate-in fade-in zoom-in-95 duration-300">
            <AppointmentSlip
              data={response.appointment}
              onClose={() => setShowSlipView(false)}
            />
          </div>
        ) : (
          /* Glassmorphism Success Ticket View */
          <div className="backdrop-blur-2xl bg-white/70 dark:bg-zinc-900/70 border border-white/40 dark:border-zinc-700/50 shadow-2xl rounded-3xl p-8 sm:p-10 transition-all duration-500 animate-in fade-in zoom-in-95">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 mb-4 shadow-[0_0_30px_rgba(16,185,129,0.25)]">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="px-3 py-1 text-xs font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase bg-emerald-500/10 rounded-full border border-emerald-500/20">
                Appointment Confirmed
              </span>
              <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white mt-3">
                Doctor Serial Reserved!
              </h2>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm max-w-md mx-auto mt-1">
                Your appointment has been saved. Your official token number is #{String(response.appointment.serialNumber).padStart(2, "0")}.
              </p>
            </div>

            {/* Serial Ticket Card */}
            <div className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-b from-white/90 to-white/60 dark:from-zinc-800/90 dark:to-zinc-850/60 border border-white/50 dark:border-zinc-700/60 rounded-2xl p-6 sm:p-8 shadow-lg">
              {/* Top accent glow line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-400 via-cyan-500 to-indigo-500" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* Serial Number Display */}
                <div className="text-center p-6 bg-gradient-to-br from-indigo-500/10 via-cyan-500/10 to-blue-500/5 rounded-2xl border border-indigo-500/20 flex flex-col items-center justify-center">
                  <span className="text-xs uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">
                    Serial Number
                  </span>
                  <span className="text-6xl font-black bg-gradient-to-r from-indigo-600 via-cyan-600 to-blue-600 dark:from-indigo-400 dark:via-cyan-300 dark:to-blue-400 bg-clip-text text-transparent my-1">
                    #{String(response.appointment.serialNumber).padStart(2, "0")}
                  </span>
                  <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    Status: <strong className="text-emerald-500 capitalize">{response.appointment.status.toLowerCase()}</strong>
                  </span>
                </div>

                {/* Appointment Details */}
                <div className="md:col-span-2 space-y-4">
                  <div className="border-b border-zinc-200/60 dark:border-zinc-700/60 pb-3">
                    <h4 className="text-lg font-bold text-zinc-900 dark:text-white">
                      {response.appointment.doctorName}
                    </h4>
                    <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400">
                      {response.appointment.doctorSpecialization}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-xs text-zinc-400 font-medium block">Patient Name</span>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-100">
                        {response.appointment.patientName}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-zinc-400 font-medium block">Phone Number</span>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-100">
                        {response.appointment.patientPhone}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-zinc-400 font-medium block">Appointment Date</span>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-100">
                        {new Date(response.appointment.appointmentDate).toLocaleDateString("en-US", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-zinc-400 font-medium block">Consultation Fee</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        ${response.appointment.consultationFee.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-100/70 dark:bg-zinc-800/70 p-3 rounded-xl flex items-start space-x-2">
                    <svg className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{response.appointment.chamberAddress}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleReset}
                type="button"
                className="px-6 py-3.5 rounded-xl font-semibold text-sm text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-200 shadow-sm"
              >
                Book Another Appointment
              </button>
              <button
                onClick={() => setShowSlipView(true)}
                type="button"
                className="px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>View & Print Official PDF Slip</span>
              </button>
            </div>
          </div>
        )
      ) : (
        /* Main Booking Form */
        <form
          onSubmit={handleSubmit}
          className="backdrop-blur-2xl bg-white/75 dark:bg-zinc-900/75 border border-white/40 dark:border-zinc-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-3xl p-6 sm:p-10 transition-all duration-300"
        >
          {/* Header Section */}
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
              <span>Instant Serial Booking</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
              Doctor Appointment & Serial
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">
              Select your specialist, enter patient details, and receive an instant queue serial number.
            </p>
          </div>

          {/* Form Error Banner */}
          {formError && (
            <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm flex items-center space-x-3 animate-in fade-in slide-in-from-top-2">
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{formError}</span>
            </div>
          )}

          <div className="space-y-8">
            {/* 1. Patient Details */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                  1
                </span>
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Patient Information
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Patient Name */}
                <div className="space-y-1.5">
                  <label htmlFor="patientName" className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                    Patient Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="patientName"
                    name="patientName"
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/70 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-200 text-sm shadow-sm"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="e.g. +1 555-0199"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/70 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-200 text-sm shadow-sm"
                  />
                </div>

                {/* Appointment Date */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="appointmentDate" className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                    Preferred Appointment Date
                  </label>
                  <input
                    id="appointmentDate"
                    name="appointmentDate"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/70 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-200 text-sm shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* 2. Doctor Selection */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                    2
                  </span>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Select Specialist Doctor
                  </h3>
                </div>

                {/* Category filters */}
                <div className="flex flex-wrap gap-1.5">
                  {specialties.map((spec) => (
                    <button
                      key={spec}
                      type="button"
                      onClick={() => setFilterSpecialty(spec)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                        filterSpecialty === spec
                          ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-sm"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                      }`}
                    >
                      {spec}
                    </button>
                  ))}
                </div>
              </div>

              {/* Doctor Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[360px] overflow-y-auto pr-1">
                {filteredDoctors.map((doc) => {
                  const isSelected = selectedDoctorId === doc.id;
                  return (
                    <div
                      key={doc.id}
                      onClick={() => setSelectedDoctorId(doc.id)}
                      className={`cursor-pointer group relative p-4 rounded-2xl border transition-all duration-200 ${
                        isSelected
                          ? "backdrop-blur-xl bg-cyan-500/10 dark:bg-cyan-500/15 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.2)] scale-[1.01]"
                          : "backdrop-blur-md bg-white/40 dark:bg-zinc-800/40 border-zinc-200/70 dark:border-zinc-700/50 hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-white/70 dark:hover:bg-zinc-800/70"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center space-x-3">
                          {/* Doctor Avatar Badge */}
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm text-white shadow-md ${
                            isSelected
                              ? "bg-gradient-to-br from-cyan-500 to-indigo-600"
                              : "bg-gradient-to-br from-zinc-600 to-zinc-800 group-hover:from-zinc-500 group-hover:to-zinc-700"
                          }`}>
                            {doc.name.split(" ")[1]?.charAt(0) || doc.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-zinc-900 dark:text-white leading-tight">
                              {doc.name}
                            </h4>
                            <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 mt-0.5">
                              {doc.specialization}
                            </p>
                          </div>
                        </div>

                        {/* Selected Radio Indicator */}
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                          isSelected
                            ? "border-cyan-500 bg-cyan-500 text-white"
                            : "border-zinc-300 dark:border-zinc-600 bg-transparent"
                        }`}>
                          {isSelected && (
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>

                      {/* Chamber & Fee details */}
                      <div className="mt-3 pt-2.5 border-t border-zinc-200/40 dark:border-zinc-700/40 flex items-center justify-between text-xs">
                        <span className="text-zinc-500 dark:text-zinc-400 truncate max-w-[180px]">
                          {doc.chamberAddress.split(",")[0]}
                        </span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                          ${doc.consultationFee.toFixed(0)} Fee
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Booking Summary Pill */}
            <div className="p-4 rounded-2xl bg-zinc-100/70 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <span className="text-xs text-zinc-400 font-medium block">Selected Doctor</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                    {selectedDoctor.name} ({selectedDoctor.specialization})
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-zinc-400 font-medium block">Total Payable</span>
                <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                  ${selectedDoctor.consultationFee.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-4 px-6 rounded-2xl font-bold text-white text-base bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:via-blue-500 hover:to-indigo-500 shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_35px_rgba(37,99,235,0.4)] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-2"
            >
              {isPending ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  <span>Reserving Serial Number...</span>
                </>
              ) : (
                <>
                  <span>Confirm & Get Serial Number</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
