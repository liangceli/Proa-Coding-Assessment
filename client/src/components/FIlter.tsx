import React, { useState } from 'react';

const AU_STATES = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'];

type Props = {onChange: (selectedStates: string[]) => void;};

export default function FilterByState({ onChange }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleState = (state: string) => {
    const updated = selected.includes(state)
      ? selected.filter((s) => s !== state)
      : [...selected, state];
    setSelected(updated);
    onChange(updated);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white h-full w-full lg:max-w-sm">
      <h2 className="text-lg font-semibold mb-3 text-black">Filter by State</h2>
      <div className="gap-2">
        {AU_STATES.map((state) => (
          <button
            key={state}
            onClick={() => toggleState(state)}
            className={`px-3 py-1 rounded-md border text-sm w-full mt-2 mb-3
              ${
                selected.includes(state)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-800 border-gray-300 hover:bg-blue-100'
              }`}
          >
            {state}
          </button>
        ))}
      </div>
    </div>
  );
}