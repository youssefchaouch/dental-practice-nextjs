'use client';

import { Calendar, CheckCircle, Clock, RefreshCw, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Appointment {
  id: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  status: string;
  patient: {
    firstName: string;
    lastName: string;
  };
}

interface Stats {
  total: number;
  pending: number;
  approved: number;
  rescheduled: number;
}

export default function DashboardPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, pending: 0, approved: 0, rescheduled: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await fetch('/api/appointments');
      const data: Appointment[] = await res.json();
      setAppointments(data);
      
      // Calculate stats
      const newStats = {
        total: data.length,
        pending: data.filter(a => a.status === 'PENDING').length,
        approved: data.filter(a => a.status === 'APPROVED').length,
        rescheduled: data.filter(a => a.status === 'RESCHEDULED').length,
      };
      setStats(newStats);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'badge-pending';
      case 'APPROVED': return 'badge-approved';
      case 'RESCHEDULED': return 'badge-rescheduled';
      default: return 'badge-pending';
    }
  };

  const statCards = [
    { 
      label: 'Total Appointments', 
      value: stats.total, 
      icon: Calendar, 
      color: 'text-[var(--color-primary)]',
      bgColor: 'bg-[var(--color-primary)]/10'
    },
    { 
      label: 'Pending', 
      value: stats.pending, 
      icon: Clock, 
      color: 'text-[var(--color-warning)]',
      bgColor: 'bg-[var(--color-warning)]/10'
    },
    { 
      label: 'Approved', 
      value: stats.approved, 
      icon: CheckCircle, 
      color: 'text-[var(--color-success)]',
      bgColor: 'bg-[var(--color-success)]/10'
    },
    { 
      label: 'Rescheduled', 
      value: stats.rescheduled, 
      icon: RefreshCw, 
      color: 'text-[var(--color-rescheduled)]',
      bgColor: 'bg-[var(--color-rescheduled)]/10'
    },
  ];

  // Get recent appointments (last 5)
  const recentAppointments = appointments.slice(0, 5);

  // Get today's appointments
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(a => {
    const appointmentDate = new Date(a.preferredDate).toISOString().split('T')[0];
    return appointmentDate === today;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h2 className="font-serif text-2xl md:text-3xl text-[var(--color-text-primary)] mb-2">
          Welcome back, Dr. Chaouch
        </h2>
        <p className="text-[var(--color-text-muted)]">
          Here&apos;s an overview of your practice today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="bg-[var(--color-card)] border border-[var(--color-border)] p-6 hover:border-[var(--color-accent)] transition-colors duration-300"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="font-serif text-2xl md:text-3xl text-[var(--color-text-primary)]">{stat.value}</p>
                <p className="text-xs text-[var(--color-text-muted)]">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Today's Appointments */}
        <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-xl text-[var(--color-text-primary)]">Today&apos;s Schedule</h3>
            <span className="text-sm text-[var(--color-text-muted)]">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </span>
          </div>

          {todayAppointments.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 mx-auto text-[var(--color-border)] mb-3" />
              <p className="text-[var(--color-text-muted)]">No appointments scheduled for today</p>
            </div>
          ) : (
            <div className="space-y-4">
              {todayAppointments.map((appointment) => (
                <div 
                  key={appointment.id}
                  className="flex items-center gap-4 p-4 bg-[var(--color-muted)] rounded-lg"
                >
                  <div className="text-center">
                    <p className="font-medium text-[var(--color-text-primary)]">{appointment.preferredTime}</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-[var(--color-text-primary)]">
                      {appointment.patient.firstName} {appointment.patient.lastName}
                    </p>
                    <p className="text-sm text-[var(--color-text-muted)]">{appointment.service}</p>
                  </div>
                  <span className={getStatusColor(appointment.status)}>
                    {appointment.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Appointments */}
        <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-xl text-[var(--color-text-primary)]">Recent Appointments</h3>
            <Link 
              href="/dashboard/appointments"
              className="text-sm text-[var(--color-accent)] hover:underline"
            >
              View All
            </Link>
          </div>

          {recentAppointments.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 mx-auto text-[var(--color-border)] mb-3" />
              <p className="text-[var(--color-text-muted)]">No appointments yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentAppointments.map((appointment) => (
                <div 
                  key={appointment.id}
                  className="flex items-center gap-4 p-4 border-b border-[var(--color-border)] last:border-0"
                >
                  <div className="w-10 h-10 rounded-full bg-[var(--color-muted)] flex items-center justify-center">
                    <span className="font-serif text-sm text-[var(--color-accent)]">
                      {appointment.patient.firstName.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[var(--color-text-primary)] truncate">
                      {appointment.patient.firstName} {appointment.patient.lastName}
                    </p>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      {new Date(appointment.preferredDate).toLocaleDateString()} at {appointment.preferredTime}
                    </p>
                  </div>
                  <span className={getStatusColor(appointment.status)}>
                    {appointment.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-6">
        <h3 className="font-serif text-xl text-[var(--color-text-primary)] mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/dashboard/appointments"
            className="flex flex-col items-center gap-3 p-6 bg-[var(--color-muted)] hover:bg-[var(--color-border)] transition-colors rounded-lg"
          >
            <Calendar className="w-8 h-8 text-[var(--color-accent)]" />
            <span className="text-sm font-medium text-[var(--color-text-primary)]">View Calendar</span>
          </Link>
          <Link
            href="/dashboard/patients"
            className="flex flex-col items-center gap-3 p-6 bg-[var(--color-muted)] hover:bg-[var(--color-border)] transition-colors rounded-lg"
          >
            <Users className="w-8 h-8 text-[var(--color-accent)]" />
            <span className="text-sm font-medium text-[var(--color-text-primary)]">Patients</span>
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex flex-col items-center gap-3 p-6 bg-[var(--color-muted)] hover:bg-[var(--color-border)] transition-colors rounded-lg"
          >
            <TrendingUp className="w-8 h-8 text-[var(--color-accent)]" />
            <span className="text-sm font-medium text-[var(--color-text-primary)]">Analytics</span>
          </Link>
          <Link
            href="/"
            className="flex flex-col items-center gap-3 p-6 bg-[var(--color-muted)] hover:bg-[var(--color-border)] transition-colors rounded-lg"
          >
            <TrendingUp className="w-8 h-8 text-[var(--color-accent)]" />
            <span className="text-sm font-medium text-[var(--color-text-primary)]">View Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
