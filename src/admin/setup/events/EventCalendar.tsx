import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // Fixed name
import { DateSelectArg, EventClickArg } from '@fullcalendar/core/index.js'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { createEvents, deleteEvent, getEvents } from '@/admin/setup/events/APIHandlers'
import toast from 'react-hot-toast'
import { useConfirmation } from '@/hooks/useConfirmation'
import AlertModel from '@/components/alertModel'
import EventForm, { EventFormSchema } from '@/admin/setup/events/eventform'




const EventCalendar = () => {

    // my custom hook
    const { confirm, confirmationProps } = useConfirmation()

    // pending
    const [isPending, setPending] = useState(false)

    // calendar utils
    const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null)
    const [isFormModal, setFormModal] = useState<boolean>(false)

    // api state
    const [Events, setEvents] = useState([])


    const handleDateClick = (e: DateSelectArg) => {
        setSelectedDate(e)
        setFormModal(true)
    }


    // For deleting events
    const handleEventClick = async (selected: EventClickArg) => {
        try {
            const id = Number(selected.event.id);
            const Confirmed = await confirm();
            if (!Confirmed) return null
            setPending(true)
            //deleting from DB
            const data = await deleteEvent(id)
            toast.success(data.message)
            selected.event.remove()
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setPending(false)
            confirmationProps.onCancel()
        }
    }


    // adding new event
    const onAddEvent = async (formData: z.infer<typeof EventFormSchema>) => {
        const calendarApi = selectedDate?.view.calendar
        calendarApi?.unselect()

        const newEvent = {
            title: formData.title,
            start: selectedDate?.start,
            end: selectedDate?.end,
            allDay: selectedDate?.allDay
        }

        try {
            setPending(true)
            const data = await createEvents(newEvent)
            toast.success(data.message)
            setFormModal(false)
            fetchEvents()
        } catch ({ message }: any) {
            toast.error(message)
        } finally { setPending(false) }
    }


    const fetchEvents = async () => {
        try {
            const data = await getEvents()
            console.log(data);

            setEvents(data as any)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    useEffect(() => {
        fetchEvents()
    }, [])


    return (

        <div className='lg:p-10  py-5 px-2.5'>
            <div className="p-2.5 border rounded-lg shadow-lg">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    height="80vh"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    aspectRatio={1.5}
                    eventStartEditable={true}
                    select={handleDateClick}
                    eventClick={handleEventClick}
                    events={Events}
                    buttonText={{
                        today: 'T',
                        month: 'M',
                        week: 'W',
                        day: 'D'
                    }}
                />
            </div>

            {/* model */}

            {isFormModal && (
                <EventForm Submit={onAddEvent} isPending={isPending}
                    onClick={() => setFormModal(false)}
                />
            )}

            {/* alert modal */}

            {confirmationProps.isOpen && (
                <AlertModel
                    continue={() => confirmationProps.onConfirm()}
                    cancel={() => confirmationProps.onCancel()}
                    isPending={isPending}
                />
            )}

        </div>

    )
}

export default EventCalendar