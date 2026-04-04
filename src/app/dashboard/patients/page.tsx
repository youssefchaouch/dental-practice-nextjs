

import { prisma } from '@/lib/db';

export default async function PatientsPage() {
  const patients = await prisma.patient.findMany({ orderBy: { createdAt: 'desc' } });
  return (
    <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
      <h2 className="text-3xl font-bold mb-4">Patients</h2>
      <ul className="space-y-2">
        {patients.length === 0 ? (
          <li className="text-gray-500">No patients found.</li>
        ) : (
          patients.map(patient => (
            <li key={patient.id} className="border-b py-2">
              <span className="font-semibold">{patient.firstName} {patient.lastName}</span> — {patient.email}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
