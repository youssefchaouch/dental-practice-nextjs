"use client";
import '@fullcalendar/common/main.css';
import type { EventClickArg } from "@fullcalendar/core"; // <-- import from core
import dayGridPlugin from '@fullcalendar/daygrid';
import '@fullcalendar/daygrid/main.css';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from "@fullcalendar/react";
import { useEffect, useState } from 'react';
import DashboardLayout from '../layout';

interface Appointment {
  id: string;
  service: string;
  preferredDate: string;
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
  title: string;
  start: string;
  extendedProps: {
    notes?: string;
    status: string;
    phone: string;
    patientName: string;
    service: string;
  };
}

export default function AppointmentsFullCalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [modal, setModal] = useState<null | CalendarEvent>(null);

  useEffect(() => {
    async function fetchAppointments() {
      const res = await fetch('/api/appointments');
      const data: Appointment[] = await res.json();
      const mapped = data.map(app => ({
        id: app.id,
        title: `${app.patient.firstName} ${app.patient.lastName} - ${app.service}`,
        start: app.preferredDate,
        extendedProps: {
          notes: app.notes,
          status: app.status,
          phone: app.patient.phone,
          patientName: `${app.patient.firstName} ${app.patient.lastName}`,
          service: app.service,
        },
      }));
      setEvents(mapped);
    }
    fetchAppointments();
  }, []);

  const handleEventClick = (info: EventClickArg) => {
    setModal(info.event as any);
  };

  return (
    <DashboardLayout>
      <div className="bg-white p-8 rounded shadow-md w-full">
        <h2 className="text-3xl font-bold mb-4">Appointments Calendar</h2>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={handleEventClick}
          height={600}
        />
        {/* Modal */}
        {modal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
              <h3 className="text-xl font-bold mb-2">Appointment Details</h3>
              <p><span className="font-semibold">Patient:</span> {modal.extendedProps.patientName}</p>
              <p><span className="font-semibold">Service:</span> {modal.extendedProps.service}</p>
              <p><span className="font-semibold">Status:</span> {modal.extendedProps.status}</p>
              <p><span className="font-semibold">Notes:</span> {modal.extendedProps.notes || 'None'}</p>
              <p><span className="font-semibold">Phone:</span> {modal.extendedProps.phone}</p>
              <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => setModal(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
