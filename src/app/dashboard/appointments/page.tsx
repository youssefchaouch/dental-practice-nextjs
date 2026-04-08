'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Check, Clock, Phone, RefreshCw, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';

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
    email: string;
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
  email: string;
}

interface Stats {
  pending: number;
  approved: number;
  rescheduled: number;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [stats, setStats] = useState<Stats>({ pending: 0, approved: 0, rescheduled: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await fetch('/api/appointments');
      const data: Appointment[] = await res.json();
      const mapped = data.map((app) => {
        const dateObj = new Date(app.preferredDate);
        const dateStr = dateObj.toISOString().split('T')[0];
        return {
          id: app.id,
          date: dateStr,
          time: app.preferredTime,
          patientName: `${app.patient.firstName} ${app.patient.lastName}`,
          service: app.service,
          status: app.status,
          notes: app.notes,
          phone: app.patient.phone,
          email: app.patient.email || '',
        };
      });
      setAppointments(mapped);
      
      // Calculate stats
      setStats({
        pending: mapped.filter(a => a.status === 'PENDING').length,
        approved: mapped.filter(a => a.status === 'APPROVED').length,
        rescheduled: mapped.filter(a => a.status === 'RESCHEDULED').length,
      });
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

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
        if (selectedEvent?.id === id) {
          setSelectedEvent((prev) => (prev ? { ...prev, status } : prev));
        }
        // Update stats
        fetchAppointments();
      } else {
        alert(result.message || 'Failed to update appointment status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Network error while updating appointment');
    }
  };

  // Filter appointments for selected day
  const selectedDayStr = selectedDate?.toISOString().split('T')[0];
  const dayAppointments = appointments.filter((ev) => ev.date === selectedDayStr);

  // Get appointments with dots for calendar
  const getDateAppointments = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return appointments.filter(a => a.date === dateStr);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-[var(--color-warning)]';
      case 'APPROVED': return 'bg-[var(--color-success)]';
      case 'RESCHEDULED': return 'bg-[var(--color-rescheduled)]';
      case 'REJECTED': return 'bg-[var(--color-error)]';
      default: return 'bg-[var(--color-text-muted)]';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING': return 'badge-pending';
      case 'APPROVED': return 'badge-approved';
      case 'RESCHEDULED': return 'badge-rescheduled';
      default: return 'badge-pending';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-4 flex items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-[var(--color-warning)]" />
          <div>
            <p className="text-2xl font-serif text-[var(--color-text-primary)]">{stats.pending}</p>
            <p className="text-xs text-[var(--color-text-muted)]">Pending</p>
          </div>
        </div>
        <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-4 flex items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-[var(--color-success)]" />
          <div>
            <p className="text-2xl font-serif text-[var(--color-text-primary)]">{stats.approved}</p>
            <p className="text-xs text-[var(--color-text-muted)]">Approved</p>
          </div>
        </div>
        <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-4 flex items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-[var(--color-rescheduled)]" />
          <div>
            <p className="text-2xl font-serif text-[var(--color-text-primary)]">{stats.rescheduled}</p>
            <p className="text-xs text-[var(--color-text-muted)]">Rescheduled</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-[var(--color-card)] border border-[var(--color-border)] p-6">
          <h3 className="font-serif text-xl text-[var(--color-text-primary)] mb-6">Calendar</h3>

          <Calendar
            selected={selectedDate}
            onSelect={(date) => setSelectedDate(date)}
            className="w-full"
            dayRender={({ date, selected }) => {
              const dateAppointments = getDateAppointments(date);
              const isToday = new Date().toDateString() === date.toDateString();
              
              return (
                <div
                  className={`
                    w-full h-12 flex flex-col items-center justify-center text-sm rounded transition-colors
                    ${selected ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]' : ''}
                    ${isToday && !selected ? 'border border-[var(--color-accent)]' : ''}
                  `}
                >
                  <span>{date.getDate()}</span>
                  {dateAppointments.length > 0 && (
                    <div className="flex gap-0.5 mt-1">
                      {dateAppointments.slice(0, 3).map((apt, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full ${getStatusColor(apt.status)}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            }}
          />

          {/* Legend */}
          <div className="flex items-center gap-6 mt-6 pt-6 border-t border-[var(--color-border)]">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-warning)]" />
              <span className="text-xs text-[var(--color-text-muted)]">Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-success)]" />
              <span className="text-xs text-[var(--color-text-muted)]">Approved</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-rescheduled)]" />
              <span className="text-xs text-[var(--color-text-muted)]">Rescheduled</span>
            </div>
          </div>
        </div>

        {/* Day Details Panel */}
        <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-6">
          <h3 className="font-serif text-lg text-[var(--color-text-primary)] mb-2">
            {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </h3>
          <p className="text-sm text-[var(--color-text-muted)] mb-6">
            {dayAppointments.length} appointment{dayAppointments.length !== 1 ? 's' : ''}
          </p>

          {dayAppointments.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="w-10 h-10 mx-auto text-[var(--color-border)] mb-3" />
              <p className="text-sm text-[var(--color-text-muted)]">No appointments scheduled</p>
            </div>
          ) : (
            <div className="space-y-3">
              {dayAppointments.map((apt) => (
                <button
                  key={apt.id}
                  onClick={() => setSelectedEvent(apt)}
                  className={`
                    w-full text-left p-4 rounded-lg border transition-all
                    ${selectedEvent?.id === apt.id 
                      ? 'border-[var(--color-accent)] bg-[var(--color-muted)]' 
                      : 'border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-muted)]'
                    }
                  `}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-[var(--color-text-primary)]">{apt.time}</span>
                    <span className={getStatusBadge(apt.status)}>{apt.status}</span>
                  </div>
                  <p className="text-sm text-[var(--color-text-primary)]">{apt.patientName}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{apt.service}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* All Appointments Table */}
      <div className="bg-[var(--color-card)] border border-[var(--color-border)] overflow-hidden">
        <div className="p-6 border-b border-[var(--color-border)]">
          <h3 className="font-serif text-xl text-[var(--color-text-primary)]">All Appointments</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--color-muted)]">
                <th className="px-6 py-4 text-left text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Patient</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Service</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Time</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Phone</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-[var(--color-text-muted)]">
                    No appointments found.
                  </td>
                </tr>
              ) : (
                appointments.map((a) => (
                  <tr key={a.id} className="hover:bg-[var(--color-muted)] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[var(--color-muted)] flex items-center justify-center">
                          <span className="font-serif text-xs text-[var(--color-accent)]">
                            {a.patientName.charAt(0)}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-[var(--color-text-primary)]">{a.patientName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[var(--color-text-secondary)]">{a.service}</td>
                    <td className="px-6 py-4 text-sm text-[var(--color-text-secondary)]">{a.date}</td>
                    <td className="px-6 py-4 text-sm text-[var(--color-text-secondary)]">{a.time}</td>
                    <td className="px-6 py-4 text-sm text-[var(--color-text-secondary)]">{a.phone}</td>
                    <td className="px-6 py-4">
                      <span className={getStatusBadge(a.status)}>{a.status}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {a.status === 'PENDING' && (
                          <>
                            <button
                              onClick={() => updateStatus(a.id, 'APPROVED')}
                              className="p-2 text-[var(--color-success)] hover:bg-[var(--color-success)]/10 rounded transition-colors"
                              title="Approve"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => updateStatus(a.id, 'REJECTED')}
                              className="p-2 text-[var(--color-error)] hover:bg-[var(--color-error)]/10 rounded transition-colors"
                              title="Reject"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => updateStatus(a.id, 'RESCHEDULED')}
                          className="p-2 text-[var(--color-rescheduled)] hover:bg-[var(--color-rescheduled)]/10 rounded transition-colors"
                          title="Reschedule"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setSelectedEvent(a)}
                          className="p-2 text-[var(--color-text-muted)] hover:bg-[var(--color-muted)] rounded transition-colors"
                          title="View Details"
                        >
                          <User className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Appointment Detail Modal */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 bg-[var(--color-text-primary)]/60 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div 
            className="bg-[var(--color-card)] w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between">
              <h3 className="font-serif text-xl text-[var(--color-text-primary)]">Appointment Details</h3>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-muted)] flex items-center justify-center">
                  <span className="font-serif text-lg text-[var(--color-accent)]">
                    {selectedEvent.patientName.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-[var(--color-text-primary)]">{selectedEvent.patientName}</p>
                  <span className={getStatusBadge(selectedEvent.status)}>{selectedEvent.status}</span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-[var(--color-border)]">
                <div className="flex justify-between">
                  <span className="text-sm text-[var(--color-text-muted)]">Service</span>
                  <span className="text-sm font-medium text-[var(--color-text-primary)]">{selectedEvent.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[var(--color-text-muted)]">Date</span>
                  <span className="text-sm font-medium text-[var(--color-text-primary)]">{selectedEvent.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[var(--color-text-muted)]">Time</span>
                  <span className="text-sm font-medium text-[var(--color-text-primary)]">{selectedEvent.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[var(--color-text-muted)]">Phone</span>
                  <a href={`tel:${selectedEvent.phone}`} className="text-sm font-medium text-[var(--color-accent)]">
                    {selectedEvent.phone}
                  </a>
                </div>
                {selectedEvent.notes && (
                  <div className="pt-3 border-t border-[var(--color-border)]">
                    <span className="text-sm text-[var(--color-text-muted)] block mb-1">Notes</span>
                    <p className="text-sm text-[var(--color-text-primary)]">{selectedEvent.notes}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                {selectedEvent.status === 'PENDING' && (
                  <>
                    <Button
                      onClick={() => {
                        updateStatus(selectedEvent.id, 'APPROVED');
                        setSelectedEvent(null);
                      }}
                      className="flex-1 bg-[var(--color-success)] hover:bg-[var(--color-success)]/90 text-white"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => {
                        updateStatus(selectedEvent.id, 'REJECTED');
                        setSelectedEvent(null);
                      }}
                      variant="outline"
                      className="flex-1 border-[var(--color-error)] text-[var(--color-error)] hover:bg-[var(--color-error)]/10"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </>
                )}
                <Button
                  onClick={() => {
                    updateStatus(selectedEvent.id, 'RESCHEDULED');
                    setSelectedEvent(null);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reschedule
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
