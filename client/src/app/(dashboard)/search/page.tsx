'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import WeatherMap from '@/components/Map';
import FilterByState from '@/components/Filter';

// const fetchStations = async (state?: string) => {
//   const url = state
//     ? `http://localhost:3001/filter?state=${state}`
//     : `http://localhost:3001/stations`;

//   const res = await fetch(url);
//   if (!res.ok) throw new Error('Failed to fetch stations');
//   return res.json();
// };

const fetchStations = async (states?: string[]) => {
  const url = 
    states && states.length > 0
      ? `http://localhost:3001/filter/by-state?${states.map(s => `states=${s}`).join('&')}`
      : `http://localhost:3001/stations`;

  const res = await fetch(url);
  if(!res.ok) throw new Error('Failed to fetch stations');
  return res.json();
}
export default function SearchPage() {
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  // const selectedState = selectedStates[0]; // Only the first state

  const {
    data: stations,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['stations', selectedStates],
    queryFn: () => fetchStations(selectedStates),
  });

  return (
    <div className="p-6">
      <h3 className="text-xl font-bold mb-4 text-black">Weather Stations</h3>
      <p className="text-gray-600 mb-4">
        Use the map and filters below to explore and find relevant stations and information.
      </p>

      <div className="flex flex-col lg:flex-row w-full gap-6">
        {/* Filter Component */}
        <FilterByState onChange={setSelectedStates} />

        {/* Weather Map Component */}
        <div className="flex-1">
          {isLoading && <p>Loading...</p>}
          {isError && <p>Failed to load stations.</p>}
          {!isLoading && stations && (
            <WeatherMap stations={stations} isLoading={isLoading} isError={isError} />
          )}
        </div>
      </div>
    </div>
  );
}