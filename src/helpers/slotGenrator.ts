export function generateDatesInRange(start: string, end: string) {
    const dates: string[] = [];
    const current = new Date(start);
    const endDate = new Date(end);

    while (current <= endDate) {
        // Exclude Sundays if needed
        if (current.getUTCDay() !== 0) {
            // Push a new Date object (to avoid mutation issues)
            dates.push(new Date(current).toISOString()?.split('T')[0]);
        }
        current.setUTCDate(current.getUTCDate() + 1);
    }

    return dates;
}



export function generateTimeSlots(
    baseDate: Date,
    startTime: string, // "HH:mm"
    endTime: string,
    intervalMinutes: number = 15
) {
    const [startHour, startMinute] = startTime?.split(":").map(Number);
    const [endHour, endMinute] = endTime?.split(":").map(Number);

    const start = new Date(Date.UTC(
        baseDate.getUTCFullYear(),
        baseDate.getUTCMonth(),
        baseDate.getUTCDate(),
        startHour,
        startMinute
    ));

    const end = new Date(Date.UTC(
        baseDate.getUTCFullYear(),
        baseDate.getUTCMonth(),
        baseDate.getUTCDate(),
        endHour,
        endMinute
    ));

    const slots = [];
    const current = new Date(start);

    while (current < end) {
        slots.push(new Date(current).toISOString()); // Clone to avoid mutation
        current.setUTCMinutes(current.getUTCMinutes() + intervalMinutes);
    }

    return slots;
}
