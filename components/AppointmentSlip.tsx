"use client";

import React from "react";

export interface AppointmentData {
  id: string;
  serialNumber: number;
  appointmentDate: string;
  status: string;
  patientName: string;
  patientPhone: string;
  doctorName: string;
  doctorSpecialization: string;
  chamberAddress: string;
  consultationFee: number;
}

interface AppointmentSlipProps {
  data: AppointmentData;
  onClose?: () => void;
}

export default function AppointmentSlip({ data, onClose }: AppointmentSlipProps) {
  const formattedDate = new Date(data.appointmentDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const issueTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full">
      {/* Control Bar (Hidden during Print) */}
      <div className="no-print mb-5 flex flex-wrap items-center justify-between gap-3 bg-zinc-900/90 border border-zinc-700/80 p-4 rounded-2xl backdrop-blur-xl shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg">
            🖨️
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Official Printable Appointment Slip</h4>
            <p className="text-xs text-zinc-400">Standard A4 Single-Page Format (Clean White Theme)</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {onClose && (
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-300 bg-zinc-800 hover:bg-zinc-700 transition-colors"
            >
              ← Back to Booking
            </button>
          )}
          <button
            onClick={handlePrint}
            type="button"
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-lg shadow-indigo-500/25 transition-all flex items-center space-x-2 hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Slip (Clean, 1-Page A4 Proportion) */}
      <div
        id="printable-slip"
        className="bg-white text-zinc-900 p-6 sm:p-8 rounded-2xl shadow-2xl border border-zinc-300 max-w-3xl mx-auto font-sans text-xs leading-relaxed"
      >
        {/* Header with Hospital Branding & Token Barcode */}
        <div className="border-b-2 border-zinc-900 pb-3 mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-700 text-white flex items-center justify-center font-black text-xl shadow-sm">
              +
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-zinc-950 uppercase leading-none">
                Serial Din Medical Center
              </h1>
              <p className="text-[11px] font-semibold text-indigo-700 mt-0.5">
                স্মার্ট ডক্টর সিরিয়াল ও ওপিডি কনসাল্টেশন স্লিপ
              </p>
              <p className="text-[10px] text-zinc-500">
                120 Medical Plaza, Dhaka | Hotline: +880 9612-888999
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[9px] font-bold tracking-widest uppercase text-zinc-400 block">
              Official Token
            </span>
            <span className="text-xs font-mono font-bold text-zinc-900 block">
              SLIP #{data.id ? data.id.slice(0, 8).toUpperCase() : "SD-TOKEN"}
            </span>
            <span className="text-[10px] text-zinc-500">
              {formattedDate.split(",")[0]}, {issueTime}
            </span>
          </div>
        </div>

        {/* Highlighted Serial & Doctor Box */}
        <div className="mb-4 p-3.5 rounded-xl bg-zinc-50 border border-zinc-300 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 rounded-xl bg-indigo-700 text-white flex flex-col items-center justify-center shadow">
              <span className="text-[9px] uppercase font-bold tracking-wider opacity-85">SERIAL</span>
              <span className="text-2xl font-black leading-none">
                #{String(data.serialNumber).padStart(2, "0")}
              </span>
            </div>
            <div>
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 mb-0.5">
                ● CONFIRMED / সক্রিয় সিরিয়াল
              </span>
              <h3 className="text-base font-bold text-zinc-950 leading-tight">
                {data.doctorName}
              </h3>
              <p className="text-[11px] font-medium text-indigo-700">
                {data.doctorSpecialization}
              </p>
            </div>
          </div>

          {/* Barcode representation */}
          <div className="text-right hidden sm:block">
            <div className="h-8 w-28 bg-zinc-900 text-white text-[8px] font-mono tracking-widest flex items-center justify-center rounded">
              ||| | |||| | |||
            </div>
            <span className="text-[8px] font-mono text-zinc-400 block mt-0.5">
              TOKEN-#{data.serialNumber}
            </span>
          </div>
        </div>

        {/* 2-Column Info Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Patient Details */}
          <div className="border border-zinc-200 rounded-lg p-3 bg-zinc-50/50">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-indigo-900 border-b border-zinc-200 pb-1 mb-2">
              👤 Patient Information (রোগীর তথ্য)
            </h4>
            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span className="text-zinc-500">Name:</span>
                <span className="font-bold text-zinc-900">{data.patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Phone:</span>
                <span className="font-bold text-zinc-900">{data.patientPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Appointment Date:</span>
                <span className="font-bold text-indigo-900">{formattedDate}</span>
              </div>
            </div>
          </div>

          {/* Chamber Details */}
          <div className="border border-zinc-200 rounded-lg p-3 bg-zinc-50/50">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-indigo-900 border-b border-zinc-200 pb-1 mb-2">
              🏥 Chamber & Room (চেম্বার তথ্য)
            </h4>
            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span className="text-zinc-500">Department:</span>
                <span className="font-semibold text-zinc-800">{data.doctorSpecialization}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Chamber:</span>
                <span className="font-semibold text-zinc-800 text-right truncate max-w-[150px]">
                  {data.chamberAddress}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Reporting:</span>
                <span className="font-bold text-amber-800">15 Mins Before</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fees Table */}
        <div className="border border-zinc-200 rounded-lg overflow-hidden mb-3.5">
          <table className="w-full text-[11px] text-left">
            <thead className="bg-zinc-100 border-b border-zinc-200 text-zinc-700 font-bold uppercase text-[9px]">
              <tr>
                <th className="py-1.5 px-3">Service</th>
                <th className="py-1.5 px-3 text-center">Status</th>
                <th className="py-1.5 px-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              <tr>
                <td className="py-1.5 px-3 font-medium text-zinc-800">
                  Doctor Consultation Fee ({data.doctorName})
                </td>
                <td className="py-1.5 px-3 text-center text-zinc-600 text-[10px]">
                  Payable at Chamber
                </td>
                <td className="py-1.5 px-3 text-right font-bold text-zinc-900">
                  ${data.consultationFee.toFixed(2)}
                </td>
              </tr>
              <tr className="bg-indigo-50/60 font-bold text-xs text-zinc-950">
                <td className="py-2 px-3 text-indigo-950">Total Payable Amount</td>
                <td className="py-2 px-3"></td>
                <td className="py-2 px-3 text-right text-indigo-700 font-black text-sm">
                  ${data.consultationFee.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Important Patient Instructions (Compact) */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 mb-4 text-[10px] text-amber-950">
          <span className="font-bold uppercase tracking-wider block mb-1">
            ⚠️ জরুরি নির্দেশনাবলী (Important Instructions):
          </span>
          <ul className="list-disc list-inside space-y-0.5 text-zinc-700">
            <li>নির্ধারিত সময়ের অন্তত ১৫ মিনিট পূর্বে উপস্থিত হয়ে রিসেপশনে এই টোকেনটি দেখান।</li>
            <li>লাউঞ্জে স্ক্রিনে আপনার <strong>সিরিয়াল #{String(data.serialNumber).padStart(2, "0")}</strong> ডাকা পর্যন্ত অপেক্ষা করুন।</li>
            <li>পূর্ববর্তী সকল প্রেসক্রিপশন ও টেস্ট রিপোর্ট সাথে রাখুন।</li>
          </ul>
        </div>

        {/* Footer & Signature */}
        <div className="pt-2 border-t border-dashed border-zinc-300 flex items-center justify-between text-[10px] text-zinc-500">
          <div>
            <p className="font-bold text-zinc-700">Serial Din Hospital Management System</p>
            <p className="text-[9px]">Computer-generated electronic token. No physical signature required.</p>
          </div>
          <div className="text-right">
            <div className="w-24 border-b border-zinc-400 ml-auto mb-0.5" />
            <p className="font-semibold text-zinc-600 text-[9px]">Duty Officer / Reception</p>
          </div>
        </div>
      </div>
    </div>
  );
}
