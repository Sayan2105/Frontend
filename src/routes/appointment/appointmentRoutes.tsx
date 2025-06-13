import LoaderModel from '@/components/loader'; // Using your custom loader component
import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';

// Lazy load all appointment components
const ProtectRoutes = lazy(() => import('@/guard/protectRoutes'));
const AppointmentLayout = lazy(() => import('@/pages/appointment/appointmentLayout'));
const AdminAppointment = lazy(() => import('@/pages/appointment/appointmet'));
const QueueAppointment = lazy(() => import('@/pages/appointment/QueueAppointment'));
const CancelledAppointments = lazy(() => import('@/pages/appointment/cancelledAppointments'));

const AppointmentRoutes = () => {
    return (
        <Route
            element={
                <Suspense fallback={<LoaderModel />}>
                    <ProtectRoutes action="view" module="Appointment" />
                </Suspense>
            }
        >
            <Route
                path="appointment"
                element={
                    <Suspense fallback={<LoaderModel />}>
                        <AppointmentLayout />
                    </Suspense>
                }
            >
                <Route
                    path=""
                    element={
                        <Suspense fallback={<LoaderModel />}>
                            <AdminAppointment />
                        </Suspense>
                    }
                />
                <Route
                    path="queue"
                    element={
                        <Suspense fallback={<LoaderModel />}>
                            <QueueAppointment />
                        </Suspense>
                    }
                />
                <Route
                    path="cancelled"
                    element={
                        <Suspense fallback={<LoaderModel />}>
                            <CancelledAppointments />
                        </Suspense>
                    }
                />
            </Route>
        </Route>
    );
};

export default AppointmentRoutes;