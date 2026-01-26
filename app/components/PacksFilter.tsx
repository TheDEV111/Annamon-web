"use client";

import Image from "next/image";
import { useState } from "react";

// Filter options for packs
const filterOptions = [
  { id: "all", label: "All Packs", hasIcon: true },
  { id: "limited", label: "Limited Edition Packs", hasIcon: false },
  { id: "og", label: "OG Packs", hasIcon: false },
];

export default function PacksFilter() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      {filterOptions.map((option) => (
        <button
          key={option.id}
          onClick={() => setActiveFilter(option.id)}
          className={`
            flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-[14px] 
            text-sm sm:text-base font-medium transition-all duration-200
            ${activeFilter === option.id
              ? "text-white"
              : "bg-[#1D1D1D] border border-[#2A2A2A] text-[#939BAA] hover:text-white hover:border-[#3A3A3A]"
            }
          `}
          style={activeFilter === option.id ? {
            background: "linear-gradient(90deg, #B71959 0%, #E04548 100%)",
            boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.04), 0px 2px 8px rgba(0, 0, 0, 0.08)"
          } : {}}
        >
          {/* Icon for All Packs */}
          {option.hasIcon && activeFilter === option.id && (
            <Image
              src="/Sidebar-icons/gift 1.svg"
              alt=""
              width={24}
              height={24}
              className="w-5 h-5 sm:w-6 sm:h-6 brightness-0 invert"
            />
          )}
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
}
