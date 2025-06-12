import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface DatePickerProps {
  onDateSelect?: (date: string) => void;
  initialDate?: Date | null;
  numberOfDays?: number;
  className?: string;
}

const HorizontalDatePicker: React.FC<DatePickerProps> = ({
  onDateSelect,
  initialDate = null,
  numberOfDays = 30,
  className = ""
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
  const [dates, setDates] = useState<Date[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Generate dates for the specified number of days
  const generateDates = (): Date[] => {
    const dateArray: Date[] = [];
    const today = new Date();

    for (let i = 0; i < numberOfDays; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dateArray.push(date);
    }
    return dateArray;
  };

  useEffect(() => {
    setDates(generateDates());
  }, [numberOfDays]);

  // Scroll functions
  const scrollLeft = (): void => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = (): void => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  // Format functions
  const getDay = (date: Date): string => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getDate = (date: Date): number => {
    return date.getDate();
  };

  const getMonth = (date: Date): string => {
    return date.toLocaleDateString('en-US', { month: 'short' });
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date): boolean => {
    return selectedDate ? date.toDateString() === selectedDate.toDateString() : false;
  };

  const isWeekend = (date: Date): boolean => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const handleDateClick = (date: Date): void => {
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date.toISOString().split('T')[0])
    }
  };


  return (
    <div className={`w-full ${className}`}>

      <div className="relative bg-white dark:bg-white/10 dark:border-white/10 rounded-xl shadow-lg border border-gray-100 p-4">
        {/* Navigation Buttons */}
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white dark:bg-white/20 shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
          aria-label="Scroll left"
          type="button"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-white" />
        </button>

        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white dark:bg-white/20 shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
          aria-label="Scroll right"
          type="button"
        >
          <ChevronRight className="w-4 h-4 text-gray-600 dark:text-white" />
        </button>

        {/* Scrollable Date Container */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide px-8 py-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {dates.map((date: Date, index: number) => {
            const today: boolean = isToday(date);
            const selected: boolean = isSelected(date);
            const weekend: boolean = isWeekend(date);

            return (
              <button
                key={index}
                onClick={() => handleDateClick(date)}
                type="button"
                className={`
                  flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-xl transition-all duration-300 transform hover:scale-105
                  ${selected
                    ? 'bg-gradient-to-b from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                    : today
                      ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 border-2 border-blue-300 dark:border-blue-900/50 shadow-sm'
                      : weekend
                        ? 'bg-gray-50 dark:bg-white/10  hover:bg-gray-100 border border-gray-200 dark:border-gray-700/50 shadow-lg'
                        : 'bg-gray-50 dark:bg-white/10  hover:bg-purple-50 hover:text-purple-600 border border-gray-200 dark:border-gray-700/50 shadow-lg'
                  }
                `}
                aria-label={`Select ${date.toLocaleDateString()}`}
              >
                <span className={`text-xs font-medium mb-1 ${selected ? 'text-white opacity-80' : today ? 'text-blue-600' : 'text-gray-500 dark:text-neutral-200'
                  }`}>
                  {getDay(date)}
                </span>
                <span className={`text-lg font-bold ${selected ? 'text-white' : today ? 'text-blue-700' : weekend ? 'text-gray-600 dark:text-neutral-100' : 'text-gray-800 dark:text-neutral-100'
                  }`}>
                  {getDate(date)}
                </span>
                <span className={`text-xs ${selected ? 'text-white opacity-80' : today ? 'text-blue-600' : 'text-gray-500 dark:text-neutral-200'
                  }`}>
                  {getMonth(date)}
                </span>

                {/* Today indicator */}
                {today && !selected && (
                  <div className="absolute -bottom-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};




export default HorizontalDatePicker