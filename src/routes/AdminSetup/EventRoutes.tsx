import EventCalendar from '@/admin/setup/events/EventCalendar'
import { Route } from 'react-router-dom'


const EventRoutes = () => {
  return (
    <Route path="admin/setup/event" element={<EventCalendar />} />
  )
}

export default EventRoutes