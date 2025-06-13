import LoaderModel from '@/components/loader';
import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';

// Lazy load all patient components
const ProtectRoutes = lazy(() => import('@/guard/protectRoutes'));
const PatientLayout = lazy(() => import('@/patient/patientLayout'));
const PatientDashboard = lazy(() => import('@/patient/dashboard/patientDashboard'));
const PatientProfile = lazy(() => import('@/patient/profile/patientProfile'));
const PatientResetPassword = lazy(() => import('@/patient/profile/patientResetPassword'));

const PatientRoutes = () => {
    return (
        <Route
            element={
                <Suspense fallback={<LoaderModel />}>
                    <ProtectRoutes />
                </Suspense>
            }
        >
            <Route
                path="patient"
                element={
                    <Suspense fallback={<LoaderModel />}>
                        <PatientLayout />
                    </Suspense>
                }
            >
                <Route
                    path="dashboard"
                    element={
                        <Suspense fallback={<LoaderModel />}>
                            <PatientDashboard />
                        </Suspense>
                    }
                />
                <Route
                    path="profile/:id"
                    element={
                        <Suspense fallback={<LoaderModel />}>
                            <PatientProfile />
                        </Suspense>
                    }
                />
                <Route
                    path="resetpassword/:id"
                    element={
                        <Suspense fallback={<LoaderModel />}>
                            <PatientResetPassword />
                        </Suspense>
                    }
                />
            </Route>
        </Route>
    );
};

export default PatientRoutes;