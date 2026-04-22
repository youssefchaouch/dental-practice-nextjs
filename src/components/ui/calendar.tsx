import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns"
import * as React from "react"
import { buttonVariants } from "./button"

interface CalendarProps {
  selected?: Date
  onSelect?: (date: Date) => void
  className?: string
  dayRender?: (props: {
    date: Date
    selected: boolean
    hovered: boolean
  }) => React.ReactNode
}

export function Calendar({
  selected,
  onSelect,
  className,
  dayRender,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState<Date>(
    selected || new Date()
  )
  const [hoveredDate, setHoveredDate] = React.useState<Date | null>(null)

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 })
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 })

  const days: Date[] = []
  let day = startDate
  while (day <= endDate) {
    days.push(day)
    day = addDays(day, 1)
  }

  return (
    <div className={cn("w-full p-3", className)}>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm font-medium">
          {format(currentMonth, "MMMM yyyy")}
        </span>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          )}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div
            key={d}
            className="text-center text-xs font-medium text-muted-foreground py-1"
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((date) => {
          const isSelected = selected ? isSameDay(date, selected) : false
          const isHovered = hoveredDate ? isSameDay(date, hoveredDate) : false
          const isCurrentMonth = isSameMonth(date, currentMonth)
          const isToday = isSameDay(date, new Date())

          return (
            <button
              key={date.toISOString()}
              className={cn(
                "relative flex items-center justify-center rounded-md text-sm transition-colors",
                "h-9 w-full p-0 font-normal",
                isCurrentMonth
                  ? "text-foreground"
                  : "text-muted-foreground opacity-50",
                isSelected &&
                  "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                !isSelected && isHovered && "bg-accent",
                !isSelected && isToday && "bg-accent text-accent-foreground",
                "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              )}
              onClick={() => onSelect?.(date)}
              onMouseEnter={() => setHoveredDate(date)}
              onMouseLeave={() => setHoveredDate(null)}
            >
              {dayRender ? (
                dayRender({ date, selected: isSelected, hovered: isHovered })
              ) : (
                <time dateTime={format(date, "yyyy-MM-dd")}>
                  {date.getDate()}
                </time>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
