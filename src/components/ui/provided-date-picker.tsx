import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface DatePickerProps {
    onDateSelect?: (date: string) => void;
    initialDate?: string | null;
    dateSlots?: string[];
    className?: string;
}

const ProvidedDatePicker: React.FC<DatePickerProps> = ({
    onDateSelect,
    initialDate,
    dateSlots = [],
    className = ""
}) => {
    const [dates, setDates] = useState<Date[]>([]);
    const [selectedDate, setSelectedDate] = useState<string | null>(initialDate || null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Update selectedDate when initialDate changes
    useEffect(() => {
        setSelectedDate(initialDate || null);
    }, [initialDate]);

    // Convert your dateSlots to Date objects
    useEffect(() => {
        if (dateSlots && dateSlots.length > 0) {
            const convertedDates = dateSlots.map(dateStr => {
                // Create date using UTC to avoid timezone issues
                return new Date(dateStr + 'T12:00:00.000Z');
            });

            // Sort dates in ascending order
            convertedDates.sort((a, b) => a.getTime() - b.getTime());
            setDates(convertedDates);
        }
    }, [dateSlots]);

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
        if (!selectedDate) return false;
        // Get the date string in YYYY-MM-DD format without timezone conversion
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;
        return selectedDate === dateStr;
    };

    const isPastDate = (date: Date): boolean => {
        const today = new Date();
        const compareDate = new Date(date);

        // Compare just the date parts (year, month, day)
        const todayStr = today.getFullYear() + '-' + (today.getMonth() + 1).toString().padStart(2, '0') + '-' + today.getDate().toString().padStart(2, '0');
        const compareDateStr = compareDate.getFullYear() + '-' + (compareDate.getMonth() + 1).toString().padStart(2, '0') + '-' + compareDate.getDate().toString().padStart(2, '0');

        return compareDateStr < todayStr;
    };

    const handleDateClick = (date: Date): void => {
        // Prevent selection of past dates
        if (isPastDate(date)) {
            return; // Don't allow past date selection
        }

        // Get the date string in YYYY-MM-DD format without timezone conversion
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;

        // Update the selected state
        setSelectedDate(dateStr);

        if (onDateSelect) {
            onDateSelect(dateStr);
        }
    };

    // Show message if no dates provided
    if (!dateSlots || dateSlots.length === 0) {
        return (
            <div className={`w-full ${className}`}>
                <div className="relative bg-white dark:bg-white/10 dark:border-white/10 rounded-xl shadow-lg border border-gray-100 p-8 text-center">
                    <p className="text-gray-500 dark:text-neutral-400">No available dates provided</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`w-full ${className}`}>
            <div className="relative bg-white dark:bg-white/10 dark:border-white/10 rounded-xl shadow-lg border border-gray-100 p-4">
                {/* Navigation Buttons - Only show if there are many dates */}
                {dates.length > 5 && (
                    <>
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
                    </>
                )}

                {/* Scrollable Date Container */}
                <div
                    ref={scrollRef}
                    className={`flex gap-3 py-2 ${dates.length > 5 ? 'overflow-x-auto scrollbar-hide px-8' : 'justify-center px-4'}`}
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {dates.map((date) => {
                        const today: boolean = isToday(date);
                        const selected: boolean = isSelected(date);
                        const pastDate: boolean = isPastDate(date);

                        return (
                            <button
                                key={`${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`} // Use date string as key
                                onClick={() => handleDateClick(date)}
                                type="button"
                                disabled={pastDate} // Disable past date buttons
                                className={`
                  flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-xl transition-all duration-300 transform relative
                  ${selected
                                        ? 'bg-gradient-to-b from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                                        : today && !pastDate
                                            ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 border-2 border-blue-300 dark:border-blue-900/50 shadow-sm hover:bg-blue-200 hover:scale-105 cursor-pointer'
                                            : pastDate
                                                ? 'bg-gray-200 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600/50 opacity-50 cursor-not-allowed'
                                                : 'bg-gray-50 dark:bg-white/10 hover:bg-purple-50 hover:text-purple-600 border border-gray-200 dark:border-gray-700/50 shadow-lg hover:scale-105 cursor-pointer'
                                    }
                `}
                                aria-label={`${pastDate ? 'Past Date - Not Available' : `Select ${date.toLocaleDateString()}`}`}
                            >
                                <span className={`text-xs font-medium mb-1 ${selected ? 'text-white opacity-80' : today && !pastDate ? 'text-blue-600' : pastDate ? 'text-gray-400 dark:text-gray-500' : 'text-gray-500 dark:text-neutral-200'
                                    }`}>
                                    {getDay(date)}
                                </span>
                                <span className={`text-lg font-bold ${selected ? 'text-white' : today && !pastDate ? 'text-blue-700' : pastDate ? 'text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-neutral-100'
                                    }`}>
                                    {getDate(date)}
                                </span>
                                <span className={`text-xs ${selected ? 'text-white opacity-80' : today && !pastDate ? 'text-blue-600' : pastDate ? 'text-gray-400 dark:text-gray-500' : 'text-gray-500 dark:text-neutral-200'
                                    }`}>
                                    {getMonth(date)}
                                </span>

                                {/* Today indicator - but not for past dates */}
                                {today && !selected && !pastDate && (
                                    <div className="absolute -bottom-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                                )}

                                {/* Past date indicator */}
                                {pastDate && (
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">×</span>
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProvidedDatePicker;