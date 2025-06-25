'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const Landing = () => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', query);
  };

  return (
    <div className="relative h-screen w-full">
      <Image
        src="/landing-splash.jpg"
        alt="Rentiful Rental Platform Hero Section"
        fill
        className="object-cover object-center"
        priority
      />

      <div className="absolute inset-0 bg-black bg-opacity-50" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 z-10">
        <h1 className="text-white text-4xl sm:text-5xl font-bold mb-4 max-w-4xl">
          Start your journey to discovering smarter energy insights
        </h1>
        <p className="text-white text-lg sm:text-xl mb-6 max-w-2xl">
          Explore real-time environmental data from weather stations across Australia to support better energy decisions！
        </p>

        <div className="flex max-w-xl">
          <button
            onClick={handleSearch}
            className="bg-[#f08484] hover:bg-rose-600 text-white h-12 px-6 rounded-xl"
          >

              <Link href="/search" className="hover:text-secondary-300 transition">
                    Go to Dashboard to check the Map!
                </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
