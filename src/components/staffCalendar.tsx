import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // Fixed name
import { useEffect, useState } from 'react'
import { getEvents } from '@/admin/setup/events/APIHandlers'
import toast from 'react-hot-toast'



const StaffCalendar = () => {

  // api state
  const [Events, setEvents] = useState([])


  const fetchEvents = async () => {
    try {
      const data = await getEvents()
      setEvents(data as any)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  useEffect(() => {
    fetchEvents()
  }, [])


  return (

    <div className='lg:px-10'>
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
          selectMirror={true}
          aspectRatio={1.5}
          events={Events}
          buttonText={{
            today: 'T',
            month: 'M',
            week: 'W',
            day: 'D'
          }}
        />
      </div>
    </div>

  )
}

export default StaffCalendar