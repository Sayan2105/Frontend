export default function calculateShiftDuration(startTime: string, endTime: string): number {
    
    // Helper function to convert time in "HH:mm" format to minutes
    const timeToMinutes = (time: string): number => {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    };
  
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);
  
    const durationMinutes = endMinutes < startMinutes ? (1440 - startMinutes) + endMinutes : endMinutes - startMinutes;
  
    return Math.floor(durationMinutes / 60); 
  }
  
  