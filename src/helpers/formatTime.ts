const formatTime = (isoTime: string): string => {
    const timePart = isoTime.split('T')[1];
    const [hours, minutes] = timePart.split(':');
    const hour24 = parseInt(hours);
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
    const ampm = hour24 >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minutes} ${ampm}`;
};


export { formatTime };