import { lazy } from 'react';
import { Route } from 'react-router-dom';

const ProtectRoutes = lazy(() => import('@/guard/protectRoutes'));
const AppointmentLayout = lazy(() => import('@/pages/appointment/appointmentLayout'));
const AdminAppointment = lazy(() => import('@/pages/appointment/appointmet'));
const QueueAppointment = lazy(() => import('@/pages/appointment/QueueAppointment'));
const CancelledAppointments = lazy(() => import('@/pages/appointment/cancelledAppointments'));

const AppointmentRoutes = () => {
    return (
        <Route element={<ProtectRoutes action="view" module="Appointment" />}>
            <Route path="appointment" element={<AppointmentLayout />}>
                <Route path="" element={<AdminAppointment />} />
                <Route path="queue" element={<QueueAppointment />} />
                <Route path="cancelled" element={<CancelledAppointments />} />
            </Route>
        </Route>
    );
};

export default AppointmentRoutes;
