"use client"

import { PatientDrawer, type Patient as PatientType } from '@/components/PatientDrawer'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

export default function PatientsPage() {
  const [patients, setPatients] = useState<PatientType[]>([])
  const [selectedPatient, setSelectedPatient] = useState<PatientType | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch('/api/patients')
        if (res.ok) {
          const data = await res.json()
          setPatients(data)
        } else {
          console.error('Failed to fetch patients')
        }
      } catch (error) {
        console.error('Error fetching patients:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPatients()
  }, [])

  // Filter patients based on search query
  const filteredPatients = useMemo(() => {
    if (!searchQuery.trim()) return patients

    const query = searchQuery.toLowerCase()
    return patients.filter(
      (patient) =>
        patient.firstName.toLowerCase().includes(query) ||
        patient.lastName.toLowerCase().includes(query) ||
        patient.email.toLowerCase().includes(query) ||
        patient.phone.includes(query)
    )
  }, [searchQuery, patients])

  const handleSelectPatient = (patient: PatientType) => {
    setSelectedPatient(patient)
    setIsDrawerOpen(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-serif text-3xl font-bold text-[var(--color-text-primary)]">Patients</h1>
          <p className="text-[var(--color-text-muted)] mt-2">Manage patient records, appointments, and dental charts</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient List */}
          <div className="lg:col-span-1 bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg overflow-hidden flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-[var(--color-border)]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--color-text-muted)]" />
                <Input
                  type="text"
                  placeholder="Search patients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-[var(--color-background)] border-[var(--color-border)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)]"
                />
              </div>
            </div>

            {/* Patient List Items */}
            <div className="flex-1 overflow-y-auto">
              {filteredPatients.length === 0 ? (
                <div className="p-6 text-center text-[var(--color-text-muted)]">
                  <p>No patients found matching your search.</p>
                </div>
              ) : (
                <div className="divide-y divide-[var(--color-border)]">
                  {filteredPatients.map((patient) => {
                    const initials = `${patient.firstName[0]}${patient.lastName[0]}`.toUpperCase()
                    const isSelected = selectedPatient?.id === patient.id

                    return (
                      <button
                        key={patient.id}
                        onClick={() => handleSelectPatient(patient)}
                        className={`w-full text-left p-4 transition-colors hover:bg-[var(--color-muted)] ${
                          isSelected ? 'bg-[var(--color-muted)] border-l-4 border-[var(--color-accent)]' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={patient.avatar} />
                            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-[var(--color-text-primary)] truncate">
                              {patient.firstName} {patient.lastName}
                            </p>
                            <p className="text-xs text-[var(--color-text-muted)] truncate">
                              {patient.email}
                            </p>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Patient Details Preview */}
          <div className="lg:col-span-2 bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6">
            {selectedPatient ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4 pb-6 border-b border-[var(--color-border)]">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedPatient.avatar} />
                    <AvatarFallback className="text-lg">
                      {`${selectedPatient.firstName[0]}${selectedPatient.lastName[0]}`.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-serif text-2xl text-[var(--color-text-primary)]">
                      {selectedPatient.firstName} {selectedPatient.lastName}
                    </h2>
                    <p className="text-[var(--color-text-muted)]">
                      {selectedPatient.dateOfBirth ? new Date(selectedPatient.dateOfBirth).getFullYear() - new Date().getFullYear() : 'Age unknown'} years old
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Contact Info */}
                  <div>
                    <h3 className="font-semibold text-[var(--color-text-primary)] mb-3">Contact</h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-[var(--color-text-muted)]">
                        Phone: <span className="text-[var(--color-text-primary)]">{selectedPatient.phone}</span>
                      </p>
                      <p className="text-[var(--color-text-muted)]">
                        Email: <span className="text-[var(--color-text-primary)]">{selectedPatient.email}</span>
                      </p>
                    </div>
                  </div>

                  {/* Medical Info - Placeholder, as schema doesn't have these fields */}
                  <div>
                    <h3 className="font-semibold text-[var(--color-text-primary)] mb-3">Medical</h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-[var(--color-text-muted)]">
                        No medical notes available (extend schema if needed).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Stats - Placeholder */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[var(--color-border)]">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[var(--color-accent)]">
                      0
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] uppercase">Appointments</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[var(--color-accent)]">
                      0
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] uppercase">Notes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[var(--color-accent)]">
                      0
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] uppercase">Healthy Teeth</p>
                  </div>
                </div>

                {/* View Full Details Button */}
                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className="w-full bg-[var(--color-accent)] text-white py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  View Full Details
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-[var(--color-text-muted)]">
                <p>Select a patient from the list to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Patient Details Drawer */}
      <PatientDrawer
        open={isDrawerOpen}
        onOpenChangeAction={setIsDrawerOpen}
        patient={selectedPatient}
      />
    </div>
  )
}