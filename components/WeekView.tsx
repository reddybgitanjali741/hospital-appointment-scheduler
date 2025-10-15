'use client';

import { format, addDays } from 'date-fns';
import type { Appointment, Doctor } from '@/types';

interface WeekViewProps {
  appointments: Appointment[];
  doctor: Doctor | undefined;
  date: Date; // this will be the start of the week
}

export default function WeekView({ appointments, doctor, date }: WeekViewProps) {
  if (!doctor) return <div>No doctor selected</div>;

  // Build array of 7 days starting from the given date
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(date, i));

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
      <h2 className="text-lg font-bold mb-2">{doctor.name} - Week View</h2>
      <div className="grid grid-cols-7 gap-2">
        {weekDates.map((day) => {
          // Filter appointments for this doctor on this day
          const dayAppointments = appointments.filter(a => {
            if (a.doctorId !== doctor.id) return false;
            const aptDate = new Date(a.startTime);
            return aptDate.toDateString() === day.toDateString();
          });

          return (
            <div key={day.toISOString()} className="p-2 border rounded">
              <h3 className="text-sm font-bold mb-1">{format(day, 'EEE dd')}</h3>
              {dayAppointments.length === 0 && <p className="text-xs">No appointments</p>}
              <ul>
                {dayAppointments.map((appointment) => {
                  const type = appointment.type || 'default';
                  const time = new Date(appointment.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                  return (
                    <li key={appointment.id} className={`p-1 mb-1 rounded text-xs ${appointmentColors[type]}`}>
                      {time} - {appointment.type}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
