'use client';

import type { Doctor } from '@/types';

interface DoctorSelectorProps {
  doctors: Doctor[];
  selectedDoctorId: string;
  onChange: (id: string) => void;
}

export default function DoctorSelector({ doctors, selectedDoctorId, onChange }: DoctorSelectorProps) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-semibold">Select Doctor:</label>
      <select
        value={selectedDoctorId}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">-- Choose a doctor --</option>
        {doctors.map((doc) => (
          <option key={doc.id} value={doc.id}>
            {doc.name}
          </option>
        ))}
      </select>
    </div>
  );
}
