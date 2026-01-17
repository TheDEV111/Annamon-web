"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#1D1D1D] border-b border-[#333333]
                       h-14 sm:h-14 md:h-16 lg:h-[70px] xl:h-[74px]
                       flex items-center justify-end px-4 lg:px-6 xl:px-8">
      {/* Login Button - Gradient */}
      <Link
        href="/login"
        className="flex items-center gap-2 px-4 py-2 lg:px-5 lg:py-2.5
                   bg-linear-to-r from-[#B71959] to-[#E04548]
                   rounded-[14px]
                   text-white font-medium text-sm lg:text-base
                   hover:opacity-90 transition-opacity duration-200"
      >
        <div className="relative w-5 h-5">
          <Image
            src="/Sidebar-icons/log-in 1.svg"
            alt="Login"
            fill
            className="object-contain"
          />
        </div>
        <span>Login</span>
      </Link>
    </header>
  );
}
