"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"; // Shadcn UI Calendar
import { Modal } from "@/components/ui/modal";
import { useEffect, useState } from "react";

interface Appointment {
  id: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  status: string;
  patient: {
    firstName: string;
    lastName: string;
    phone: string;
  };
}


interface CalendarEvent {
  id: string;
  date: string;
  time: string;
  patientName: string;
  service: string;
  status: string;
  notes?: string;
  phone: string;
}

      export default function AppointmentsPage() {
        const [appointments, setAppointments] = useState<CalendarEvent[]>([]);
        const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
        const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

        useEffect(() => {
          async function fetchAppointments() {
            const res = await fetch("/api/appointments");
            const data: Appointment[] = await res.json();
            const mapped = data.map((app) => {
              // Convert DateTime to YYYY-MM-DD string for proper date filtering
              const dateObj = new Date(app.preferredDate);
              const dateStr = dateObj.toISOString().split("T")[0];
              return {
                id: app.id,
                date: dateStr,
                time: app.preferredTime,
                patientName: `${app.patient.firstName} ${app.patient.lastName}`,
                service: app.service,
                status: app.status,
                notes: app.notes,
                phone: app.patient.phone,
              };
            });
            setAppointments(mapped);
          }
          fetchAppointments();
        }, []);

        // Update appointment status (Approve / Reject)
        const updateStatus = async (id: string, status: string) => {
          try {
            const res = await fetch('/api/appointments', {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id, status }),
            });
            const result = await res.json();
            if (res.ok && result.success) {
              setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
              if (selectedEvent?.id === id) setSelectedEvent((prev) => (prev ? { ...prev, status } : prev));
            } else {
              alert(result.message || 'Failed to update appointment status');
            }
          } catch (error) {
            console.error('Error updating status:', error);
            alert('Network error while updating appointment');
          }
        };

        // Filter appointments for selected day
        const selectedDayStr = selectedDate?.toISOString().split("T")[0];
        const dayAppointments = appointments.filter((ev) => ev.date === selectedDayStr);

        return (
          <div className="max-w-5xl mx-auto mt-8 bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Appointments Calendar</h2>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <Calendar
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-xl shadow border"
                  dayRender={({ date, selected, hovered }: { date: Date; selected: boolean; hovered: boolean }) => {
                    const dateStr = date.toISOString().split("T")[0];
                    const hasEvents = appointments.some((ev) => ev.date === dateStr);
                    return (
                      <div
                        className={`w-full h-full flex items-center justify-center rounded-lg transition
                          ${selected ? "bg-blue-600 text-white" : ""}
                          ${hovered ? "bg-blue-100" : ""}
                          ${hasEvents ? "border-2 border-blue-400" : ""}
                        `}
                      >
                        {date.getDate()}
                      </div>
                    );
                  }}
                />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-xl font-semibold mb-4">
                  {selectedDate
                    ? `Appointments for ${selectedDate.toLocaleDateString()}`
                    : "Select a day"}
                </h3>
                <div className="space-y-4">
                  {dayAppointments.length === 0 ? (
                    <div className="text-gray-500">No appointments for this day.</div>
                  ) : (
                    dayAppointments.map((ev) => (
                      <div
                        key={ev.id}
                        className={`rounded-lg shadow p-4 cursor-pointer transition flex flex-col gap-1
                          bg-blue-50 hover:bg-blue-100
                          ${ev.status === "APPROVED" ? "border-l-4 border-green-500" : ""}
                          ${ev.status === "PENDING" ? "border-l-4 border-yellow-500" : ""}
                          ${ev.status === "COMPLETED" ? "border-l-4 border-blue-500" : ""}
                        `}
                        onClick={() => setSelectedEvent(ev)}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-blue-700">{ev.patientName}</span>
                          <span className={`text-sm px-2 py-1 rounded font-semibold
                            ${ev.status === "APPROVED" ? "bg-green-200 text-green-800" : ""}
                            ${ev.status === "PENDING" ? "bg-yellow-200 text-yellow-800" : ""}
                            ${ev.status === "COMPLETED" ? "bg-blue-200 text-blue-800" : ""}
                          `}>
                            {ev.status}
                          </span>
                        </div>
                        <div className="text-gray-700">{ev.service}</div>
                        <div className="text-xs text-gray-500">{ev.time}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Table of all appointments */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">All Appointments</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {appointments.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-4 text-center text-gray-500">No appointments found.</td>
                      </tr>
                    ) : (
                      appointments.map((a) => (
                        <tr key={a.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{a.patientName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{a.service}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{a.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{a.time}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{a.phone}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={a.status}
                              onChange={(e) => updateStatus(a.id, e.target.value)}
                              className={`px-3 py-1 rounded-full text-xs font-semibold border cursor-pointer ${
                                a.status === 'APPROVED' ? 'bg-green-100 text-green-800 border-green-300' : 
                                a.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : 
                                a.status === 'REJECTED' ? 'bg-red-100 text-red-800 border-red-300' :
                                'bg-blue-100 text-blue-800 border-blue-300'
                              }`}
                            >
                              <option value="PENDING">PENDING</option>
                              <option value="APPROVED">APPROVED</option>
                              <option value="REJECTED">REJECTED</option>
                              <option value="COMPLETED">COMPLETED</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => setSelectedEvent(a)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal for appointment details */}
            <Modal open={!!selectedEvent} onClose={() => setSelectedEvent(null)}>
              {selectedEvent && (
                <div className="space-y-2 mt-2">
                  <h3 className="text-xl font-bold mb-4 text-blue-700">Appointment Details</h3>
                  <p><span className="font-semibold">Patient:</span> {selectedEvent.patientName}</p>
                  <p><span className="font-semibold">Service:</span> {selectedEvent.service}</p>
                  <p><span className="font-semibold">Status:</span> {selectedEvent.status}</p>
                  <p><span className="font-semibold">Notes:</span> {selectedEvent.notes || "None"}</p>
                  <p><span className="font-semibold">Phone:</span> {selectedEvent.phone}</p>
                  <Button className="mt-6 w-full" onClick={() => setSelectedEvent(null)}>
                    Close
                  </Button>
                </div>
              )}
            </Modal>
          </div>
        );
    }
      
