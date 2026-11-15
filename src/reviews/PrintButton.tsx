"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="flex items-center gap-2 rounded-xl bg-[#090c18] px-5 py-3 font-semibold text-white print:hidden"
    >
      <Printer size={18} /> Print / save as PDF
    </button>
  );
}
