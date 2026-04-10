"use client"

import React, { useState } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export type ToothState = 
  | 'healthy' 
  | 'cavity' 
  | 'treated' 
  | 'crown' 
  | 'missing' 
  | 'root_canal' 
  | 'implant' 
  | 'to_extract'
  | 'watching'

export interface DentalChartProps {
  teeth: Record<number, ToothState>
  isAdult?: boolean
  onToothClick?: (toothNumber: number, state: ToothState) => void
  readOnly?: boolean
}

const TOOTH_COLORS: Record<ToothState, string> = {
  healthy: '#10b981',      // green
  cavity: '#f59e0b',       // amber
  treated: '#3b82f6',      // blue
  crown: '#8b5cf6',        // violet
  missing: '#6b7280',      // gray
  root_canal: '#ec4899',   // pink
  implant: '#06b6d4',      // cyan
  to_extract: '#ef4444',   // red
  watching: '#f97316',     // orange
}

const TOOTH_STATE_LABELS: Record<ToothState, string> = {
  healthy: 'Healthy',
  cavity: 'Cavity',
  treated: 'Treated',
  crown: 'Crown',
  missing: 'Missing',
  root_canal: 'Root Canal',
  implant: 'Implant',
  to_extract: 'To Extract',
  watching: 'Watching',
}

export function DentalChart({
  teeth,
  isAdult = true,
  onToothClick,
  readOnly = true,
}: DentalChartProps) {
  const [hoveredTooth, setHoveredTooth] = useState<number | null>(null)

  // FDI numbering system
  // Adult: 11-18 (upper right), 21-28 (upper left), 31-38 (lower left), 41-48 (lower right)
  // Child: 51-55 (upper right), 61-65 (upper left), 71-75 (lower left), 81-85 (lower right)
  
  const getToothNumbers = () => {
    if (isAdult) {
      return {
        upperRight: [18, 17, 16, 15, 14, 13, 12, 11],
        upperLeft: [21, 22, 23, 24, 25, 26, 27, 28],
        lowerLeft: [31, 32, 33, 34, 35, 36, 37, 38],
        lowerRight: [48, 47, 46, 45, 44, 43, 42, 41],
      }
    } else {
      return {
        upperRight: [55, 54, 53, 52, 51],
        upperLeft: [61, 62, 63, 64, 65],
        lowerLeft: [71, 72, 73, 74, 75],
        lowerRight: [85, 84, 83, 82, 81],
      }
    }
  }

  const toothNumbers = getToothNumbers()

  const renderToothGroup = (numbers: number[], label: string, y: number) => {
    return (
      <g key={label}>
        <text x="10" y={y + 20} fontSize="12" fontWeight="600" fill="var(--color-text-muted)">
          {label}
        </text>
        {numbers.map((toothNum, index) => {
          const x = 40 + index * 45
          const state = teeth[toothNum] || 'healthy'
          const color = TOOTH_COLORS[state]

          return (
            <TooltipProvider key={toothNum}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <g
                    onClick={() => !readOnly && onToothClick?.(toothNum, state)}
                    onMouseEnter={() => setHoveredTooth(toothNum)}
                    onMouseLeave={() => setHoveredTooth(null)}
                    style={{
                      cursor: readOnly ? 'default' : 'pointer',
                      opacity: hoveredTooth === null || hoveredTooth === toothNum ? 1 : 0.6,
                    }}
                  >
                    {/* Tooth circle */}
                    <circle cx={x} cy={y} r="18" fill={color} opacity="0.9" />
                    {/* Tooth number */}
                    <text
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="14"
                      fontWeight="700"
                      fill="white"
                    >
                      {toothNum}
                    </text>
                  </g>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-semibold">Tooth {toothNum}</p>
                    <p className="text-xs">{TOOTH_STATE_LABELS[state]}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        })}
      </g>
    )
  }

  const svgHeight = isAdult ? 320 : 240

  return (
    <div className="bg-[var(--color-muted)] rounded-lg p-4">
      <svg
        width="100%"
        height={svgHeight}
        viewBox={`0 0 ${isAdult ? 440 : 280} ${svgHeight}`}
        className="mx-auto"
      >
        <defs>
          <style>{`
            text { font-family: system-ui, -apple-system, sans-serif; }
          `}</style>
        </defs>

        {/* Background */}
        <rect width="100%" height="100%" fill="var(--color-background)" rx="8" />

        {/* Title */}
        <text x="50%" y="25" fontSize="16" fontWeight="700" textAnchor="middle" fill="var(--color-text-primary)">
          Dental Chart (FDI System)
        </text>

        {/* Upper teeth */}
        <text x="10" y="50" fontSize="11" fontWeight="600" fill="var(--color-text-muted)" fontStyle="italic">
          UPPER
        </text>
        {renderToothGroup(toothNumbers.upperRight, 'Right', 80)}
        {renderToothGroup(toothNumbers.upperLeft, 'Left', 80)}

        {/* Center line */}
        <line x1="10" y1={isAdult ? 150 : 130} x2={isAdult ? 430 : 270} y2={isAdult ? 150 : 130} stroke="var(--color-border)" strokeWidth="2" strokeDasharray="4" />

        {/* Lower teeth */}
        <text x="10" y={isAdult ? 175 : 155} fontSize="11" fontWeight="600" fill="var(--color-text-muted)" fontStyle="italic">
          LOWER
        </text>
        {renderToothGroup(toothNumbers.lowerLeft, 'Left', isAdult ? 210 : 190)}
        {renderToothGroup(toothNumbers.lowerRight, 'Right', isAdult ? 210 : 190)}
      </svg>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs md:grid-cols-3 lg:grid-cols-5">
        {Object.entries(TOOTH_STATE_LABELS).map(([state, label]) => (
          <div key={state} className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: TOOTH_COLORS[state as ToothState] }}
            />
            <span className="text-[var(--color-text-muted)]">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
