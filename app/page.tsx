import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6 text-center">
      <h1 className="text-4xl font-bold text-blue-700 mb-3">
        🏥 Hospital Appointment Scheduler
      </h1>
      <p className="text-gray-700 max-w-xl mb-8">
        Welcome to the appointment scheduling system. View and manage doctor
        schedules for our hospital.
      </p>

      <Link
        href="/schedule"
        className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition-all"
      >
        Go to Schedule
      </Link>

      <div className="mt-12 text-left">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Available Doctors:
        </h2>
        <ul className="space-y-2 text-gray-600">
          <li>• Dr. Sarah Chen - Cardiology</li>
          <li>• Dr. Michael Rodriguez - Pediatrics</li>
          <li>• Dr. Emily Johnson - General Practice</li>
        </ul>
      </div>
    </main>
  );
}
