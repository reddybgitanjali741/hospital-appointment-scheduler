'use client';

import { format } from 'date-fns';
import type { Appointment, Doctor } from '@/types';

interface DayViewProps {
  appointments: Appointment[];
  doctor: Doctor | undefined;
  date: Date;
}

export default function DayView({ appointments, doctor, date }: DayViewProps) {
  if (!doctor) return <div>No doctor selected</div>;

  // Filter appointments for the doctor on the selected date
  const filteredAppointments = appointments.filter(a => {
    if (a.doctorId !== doctor.id) return false;
    const aptDate = new Date(a.startTime);
    return aptDate.toDateString() === date.toDateString();
  });

  const appointmentColors: Record<string, string> = {
    consultation: 'bg-blue-100 text-blue-800',
    surgery: 'bg-red-100 text-red-800',
    checkup: 'bg-green-100 text-green-800',
    'follow-up': 'bg-yellow-100 text-yellow-800',
    procedure: 'bg-purple-100 text-purple-800',
    default: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="p-4 border rounded mb-4">
      <h2 className="text-lg font-bold mb-2">
        {doctor.name} - {format(date, 'dd MMM yyyy')}
      </h2>

      {filteredAppointments.length === 0 && <p>No appointments</p>}

      <ul>
        {filteredAppointments.map((appointment) => {
          const type = appointment.type || 'default';
          const time = new Date(appointment.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          return (
            <li key={appointment.id} className={`p-2 mb-1 rounded ${appointmentColors[type]}`}>
              {time} - {appointment.type}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
