'use client';

import { useState } from 'react';
import ScheduleView from '@/components/ScheduleView'; // default import
import type { CalendarView } from '@/types';

export default function SchedulePage() {
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>('day');

  return (
    <div className="p-6">
      <ScheduleView
        selectedDoctorId={selectedDoctorId}
        selectedDate={selectedDate}
        view={view}
        onDoctorChange={setSelectedDoctorId}
        onDateChange={setSelectedDate}
        onViewChange={setView}
      />
    </div>
  );
}
