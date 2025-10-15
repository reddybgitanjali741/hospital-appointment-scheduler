'use client';

import { useMemo } from 'react';
import type { Appointment, Doctor, CalendarView } from '@/types';
import DoctorSelector from './DoctorSelector';
import DayView from './DayView';
import WeekView from './WeekView';
import { MOCK_DOCTORS, MOCK_APPOINTMENTS } from '@/data/mockData';

interface ScheduleViewProps {
  selectedDoctorId: string;
  selectedDate: Date;
  view: CalendarView;
  onDoctorChange: (id: string) => void;
  onDateChange: (date: Date) => void;
  onViewChange: (view: CalendarView) => void;
}

export default function ScheduleView({
  selectedDoctorId,
  selectedDate,
  view,
  onDoctorChange,
  onDateChange,
  onViewChange,
}: ScheduleViewProps) {
  const doctors: Doctor[] = useMemo(() => MOCK_DOCTORS, []);
  const appointments: Appointment[] = useMemo(() => MOCK_APPOINTMENTS, []);

  const selectedDoctor = doctors.find(d => d.id === selectedDoctorId);

  const doctorAppointments = useMemo(() => {
    if (!selectedDoctor) return [];
    return appointments.filter(a => a.doctorId === selectedDoctor.id);
  }, [appointments, selectedDoctor]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Doctor Schedule</h2>
          {selectedDoctor ? (
            <p className="text-sm text-gray-600 mt-1">
              {selectedDoctor.name} — {selectedDoctor.specialty}
            </p>
          ) : (
            <p className="text-sm text-gray-600 mt-1">
              Select a doctor to view appointments
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Doctor Selector */}
          <div className="min-w-[220px]">
            <DoctorSelector
              doctors={doctors}
              selectedDoctorId={selectedDoctorId}
              onChange={onDoctorChange}
            />
          </div>

          {/* Date Picker */}
          <div>
            <input
              type="date"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={(e) => onDateChange(new Date(e.target.value))}
              className="border border-gray-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* View Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => onViewChange('day')}
              className={`px-4 py-2 text-sm rounded ${
                view === 'day' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => onViewChange('week')}
              className={`px-4 py-2 text-sm rounded ${
                view === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Week
            </button>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      {selectedDoctor && (
        <div>
          {view === 'day' && (
            <DayView
              doctor={selectedDoctor}
              appointments={doctorAppointments}
              date={selectedDate}
            />
          )}
          {view === 'week' && (
            <WeekView
              doctor={selectedDoctor}
              appointments={doctorAppointments}
              date={selectedDate}
            />
          )}
        </div>
      )}
    </div>
  );
}
