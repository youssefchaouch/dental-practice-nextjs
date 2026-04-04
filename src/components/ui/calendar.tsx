import { cn } from "@/lib/utils";
import { addDays, addMonths, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, startOfMonth, startOfWeek, subMonths } from "date-fns";
import * as React from "react";

interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date) => void;
  className?: string;
  dayRender?: (props: { date: Date; selected: boolean; hovered: boolean }) => React.ReactNode;
}

export function Calendar({ selected, onSelect, className, dayRender }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState<Date>(selected || new Date());
  const [hoveredDate, setHoveredDate] = React.useState<Date | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days: Date[] = [];
  let day = startDate;
  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <div className="flex justify-between items-center mb-4">
        <button
          className="px-2 py-1 rounded hover:bg-blue-100"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        >
          &lt;
        </button>
        <span className="font-bold text-lg">{format(currentMonth, "MMMM yyyy")}</span>
        <button
          className="px-2 py-1 rounded hover:bg-blue-100"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d} className="text-center font-semibold text-gray-500 py-1">
            {d}
          </div>
        ))}
        {days.map((date) => {
          const isSelected = selected ? isSameDay(date, selected) : false;
          const isHovered = hoveredDate ? isSameDay(date, hoveredDate) : false;
          return (
            <button
              key={date.toISOString()}
              className={cn(
                "w-full h-10 flex items-center justify-center rounded-lg transition",
                isSelected && "bg-blue-600 text-white",
                isHovered && "bg-blue-100",
                isSameMonth(date, currentMonth) ? "" : "text-gray-400"
              )}
              onClick={() => onSelect?.(date)}
              onMouseEnter={() => setHoveredDate(date)}
              onMouseLeave={() => setHoveredDate(null)}
            >
              {dayRender ? dayRender({ date, selected: isSelected, hovered: isHovered }) : date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
