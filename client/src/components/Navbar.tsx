'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-primary-700 text-white">
      <div className="m mx-auto flex justify-between items-center px-6 py-3">
        {/* Left Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.jpg" alt="Proa Logo" width={32} height={32} />
          <span className="text-xl font-bold tracking-wide">
            PROA<span className="text-secondary font-light">MAP</span>
          </span>
        </Link>

        <p className="text-primary-200 hidden md:block">
            Optimising Solar, Wind and Storage
        </p>

        {/* Right Link */}
        <div className="space-x-6 text-sm font-medium hidden md:flex">
          <Link href="/" className="hover:text-secondary-300 transition">
            Home
          </Link>
          <Link href="/search" className="hover:text-secondary-300 transition">
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}