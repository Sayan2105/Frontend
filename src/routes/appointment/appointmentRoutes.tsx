import ProtectRoutes from '@/guard/protectRoutes'
import AppointmentLayout from '@/pages/appointment/appointmentLayout'
import AdminAppointment from '@/pages/appointment/appointmet'
import CancelledAppointments from '@/pages/appointment/cancelledAppointments'
import QueueAppointment from '@/pages/appointment/QueueAppointment'
import { Route } from 'react-router-dom'

const AppointmentRoutes = () => {
    return (
        <Route element={<ProtectRoutes action='view' module='Appointment' />}>
            <Route path="appointment" element={<AppointmentLayout />}>
                <Route path="" element={<AdminAppointment />} />
                <Route path="queue" element={<QueueAppointment />} />
                <Route path="cancelled" element={<CancelledAppointments />} />
            </Route>
        </Route>
    )
}

export default AppointmentRoutes