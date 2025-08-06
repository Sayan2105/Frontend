import { formatTime } from '@/helpers/formatTime';
import { AlertCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface TimeSlotSelectorProps {
    bookedSlots?: string[]; // Array of ISO time strings to disable the time slots
    timeSlots?: string[]; // Array of ISO time strings
    onTimeSelect?: (selectedTime: string) => void;
    selectedTime?: string | null;
    className?: string;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
    bookedSlots = [],
    timeSlots = [],
    onTimeSelect,
    selectedTime: propSelectedTime = null,
    className = ""
}) => {
    const [selectedTime, setSelectedTime] = useState<string | null>(propSelectedTime);

    useEffect(() => {
        setSelectedTime(propSelectedTime ?? null);
    }, [propSelectedTime]);

    const isPastTime = (isoTime: string): boolean => {
        const slotTime = isoTime.split('T')[1].slice(0, 5).split(':').map(Number);
        const currentTime = new Date().toTimeString().slice(0, 5).split(':').map(Number);

        const slot = new Date().setHours(slotTime[0], slotTime[1], 0, 0);
        const now = new Date().setHours(currentTime[0], currentTime[1], 0, 0);

        const isToday = new Date(isoTime).toISOString().split('T')[0] === new Date().toISOString().split('T')[0];

        if (!isToday) return false;

        return slot < now;
    };

    const isAvailable = (timeSlot: string): boolean => {
        const isBooked = bookedSlots.includes(timeSlot)
        // if booked slot then return false
        return !isBooked && !isPastTime(timeSlot)
    };

    const handleTimeClick = (timeSlot: string) => {
        if (!isAvailable(timeSlot)) return;
        setSelectedTime(timeSlot);
        if (onTimeSelect) {
            onTimeSelect(timeSlot); // Return the full ISO time string
        }
    };

    if (!timeSlots || timeSlots.length === 0) {
        return (
            <div className='flex gap-3 justify-center items-center w-full rounded-2xl p-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 dark:from-amber-900/10 dark:to-orange-900/10 dark:border-amber-800/30 shadow-sm'>
                <div className='p-2 rounded-full bg-amber-100 dark:bg-amber-900/20'>
                    <AlertCircle className='w-5 h-5 text-amber-600 dark:text-amber-400' />
                </div>
                <div className='text-center'>
                    <h3 className='font-semibold text-amber-800 dark:text-amber-300 text-lg'>Select a Date First</h3>
                    <p className='text-sm text-amber-600 dark:text-amber-400 mt-1'>Choose a date to see available time slots</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`${className}`}>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {timeSlots.map((timeSlot) => {
                    const isSelected = selectedTime === timeSlot;
                    const available = isAvailable(timeSlot);
                    const pastTime = isPastTime(timeSlot);

                    return (
                        <button
                            type='button'
                            key={timeSlot} // Use the time string as key
                            onClick={() => handleTimeClick(timeSlot)}
                            disabled={!available}
                            className={`
                                py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 border
                                ${isSelected
                                    ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                                    : available
                                        ? 'bg-white dark:bg-gray-800 dark:text-white text-gray-700 border-gray-300 dark:border-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600'
                                        : 'bg-gray-100 dark:bg-gray-900 dark:text-gray-400 text-gray-400 border-gray-300 dark:border-gray-700 cursor-not-allowed line-through'
                                }
                            `}
                            title={
                                pastTime
                                    ? 'This time has passed'
                                    : !available
                                        ? 'Time slot not available'
                                        : 'Select this time'
                            }
                        >
                            {formatTime(timeSlot)}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default TimeSlotSelector;