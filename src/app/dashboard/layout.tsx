import Link from 'next/link';
import React from 'react';

const sidebarLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/dashboard/patients', label: 'Patients' },
  { href: '/dashboard/appointments', label: 'Appointments' },
  { href: '/dashboard/settings', label: 'Settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col py-8 px-4">
        <div className="text-2xl font-bold mb-8 text-blue-600">Dr. Maha Chaouch</div>
        <nav className="flex flex-col gap-4">
          {sidebarLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-700 hover:text-blue-500 font-medium px-2 py-2 rounded transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-10">
        {/* Top Navbar */}
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Dentist Dashboard</h1>
          <span className="text-gray-500">Welcome, Dr. Maha Chaouch</span>
        </div>
        {children}
      </main>
    </div>
  );
}
