"use client"

import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DentalChart, type ToothState } from '@/components/DentalChart'
import { FileText, Calendar, Stethoscope, Smile, Phone, Mail, User } from 'lucide-react'

export interface Patient {
  id: string
  firstName: string
  lastName: string
  avatar?: string
  phone: string
  email: string
  dateOfBirth: string
  gender: string
  allergies: string[]
  medicalConditions: string[]
  appointments: Appointment[]
  progressNotes: ProgressNote[]
  teeth: Record<number, ToothState>
  isAdult: boolean
}

export interface Appointment {
  id: string
  date: string
  time: string
  type: string
  status: 'pending' | 'approved' | 'rescheduled' | 'completed'
  notes?: string
}

export interface ProgressNote {
  id: string
  date: string
  dentist: string
  notes: string
  teeth?: number[]
  treatment?: string
}

interface PatientDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  patient: Patient | null
}

export function PatientDrawer({ open, onOpenChange, patient }: PatientDrawerProps) {
  if (!patient) return null

  const initials = `${patient.firstName[0]}${patient.lastName[0]}`.toUpperCase()
  const age = new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-3/4 lg:w-2/3 overflow-y-auto">
        <SheetHeader className="mb-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={patient.avatar} alt={`${patient.firstName} ${patient.lastName}`} />
              <AvatarFallback className="text-lg">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <SheetTitle className="font-serif text-2xl">{patient.firstName} {patient.lastName}</SheetTitle>
              <SheetDescription className="text-base">{age} years old</SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="info" className="text-xs sm:text-sm">
              <User className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Info</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="text-xs sm:text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Appointments</span>
            </TabsTrigger>
            <TabsTrigger value="notes" className="text-xs sm:text-sm">
              <FileText className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Notes</span>
            </TabsTrigger>
            <TabsTrigger value="chart" className="text-xs sm:text-sm">
              <Smile className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Chart</span>
            </TabsTrigger>
          </TabsList>

          {/* Info Tab */}
          <TabsContent value="info" className="space-y-6 mt-4">
            {/* Contact Information */}
            <div className="space-y-3">
              <h4 className="font-serif text-lg font-semibold text-[var(--color-text-primary)]">Contact Information</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[var(--color-accent)]" />
                  <a href={`tel:${patient.phone}`} className="text-[var(--color-text-primary)] hover:underline">
                    {patient.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[var(--color-accent)]" />
                  <a href={`mailto:${patient.email}`} className="text-[var(--color-text-primary)] hover:underline">
                    {patient.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Demographics */}
            <div className="space-y-3">
              <h4 className="font-serif text-lg font-semibold text-[var(--color-text-primary)]">Demographics</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-[var(--color-text-muted)]">Date of Birth</p>
                  <p className="text-[var(--color-text-primary)] font-medium">
                    {new Date(patient.dateOfBirth).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-[var(--color-text-muted)]">Gender</p>
                  <p className="text-[var(--color-text-primary)] font-medium capitalize">{patient.gender}</p>
                </div>
              </div>
            </div>

            {/* Medical Information */}
            {(patient.allergies.length > 0 || patient.medicalConditions.length > 0) && (
              <div className="space-y-3">
                <h4 className="font-serif text-lg font-semibold text-[var(--color-text-primary)]">Medical Information</h4>
                {patient.allergies.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-[var(--color-text-muted)] mb-2 uppercase">Allergies</p>
                    <div className="flex flex-wrap gap-2">
                      {patient.allergies.map((allergy) => (
                        <Badge key={allergy} variant="destructive">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {patient.medicalConditions.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-[var(--color-text-muted)] mb-2 uppercase">Medical Conditions</p>
                    <div className="flex flex-wrap gap-2">
                      {patient.medicalConditions.map((condition) => (
                        <Badge key={condition} variant="secondary">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-4 mt-4">
            {patient.appointments.length === 0 ? (
              <p className="text-[var(--color-text-muted)]">No appointments scheduled.</p>
            ) : (
              <div className="space-y-3">
                {patient.appointments.map((apt) => (
                  <div key={apt.id} className="border border-[var(--color-border)] rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-[var(--color-text-primary)]">{apt.type}</p>
                        <p className="text-sm text-[var(--color-text-muted)]">
                          {new Date(apt.date).toLocaleDateString()} at {apt.time}
                        </p>
                      </div>
                      <Badge
                        variant={
                          apt.status === 'approved'
                            ? 'default'
                            : apt.status === 'completed'
                            ? 'secondary'
                            : apt.status === 'rescheduled'
                            ? 'outline'
                            : 'destructive'
                        }
                      >
                        {apt.status}
                      </Badge>
                    </div>
                    {apt.notes && <p className="text-sm text-[var(--color-text-muted)] mt-2">{apt.notes}</p>}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Progress Notes Tab */}
          <TabsContent value="notes" className="space-y-4 mt-4">
            {patient.progressNotes.length === 0 ? (
              <p className="text-[var(--color-text-muted)]">No progress notes yet.</p>
            ) : (
              <div className="space-y-3">
                {patient.progressNotes.map((note) => (
                  <div key={note.id} className="border border-[var(--color-border)] rounded-lg p-4">
                    <div className="mb-2">
                      <p className="font-semibold text-[var(--color-text-primary)]">
                        <Stethoscope className="inline h-4 w-4 mr-2" />
                        Dr. {note.dentist}
                      </p>
                      <p className="text-sm text-[var(--color-text-muted)]">
                        {new Date(note.date).toLocaleDateString()}
                      </p>
                    </div>
                    {note.treatment && (
                      <p className="text-sm font-medium text-[var(--color-text-primary)] mb-2">
                        Treatment: {note.treatment}
                      </p>
                    )}
                    <p className="text-sm text-[var(--color-text-primary)]">{note.notes}</p>
                    {note.teeth && note.teeth.length > 0 && (
                      <p className="text-xs text-[var(--color-text-muted)] mt-2">
                        Teeth affected: {note.teeth.join(', ')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Dental Chart Tab */}
          <TabsContent value="chart" className="mt-4">
            <DentalChart
              teeth={patient.teeth}
              isAdult={patient.isAdult}
              readOnly={true}
            />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
