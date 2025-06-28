import { lazy } from 'react';
import { Route } from 'react-router-dom';

const ProtectRoutes = lazy(() => import('@/guard/protectRoutes'));
const PatientLayout = lazy(() => import('@/patient/patientLayout'));
const PatientDashboard = lazy(() => import('@/patient/dashboard/patientDashboard'));
const PatientProfile = lazy(() => import('@/patient/profile/patientProfile'));
const PatientResetPassword = lazy(() => import('@/patient/profile/patientResetPassword'));

const PatientRoutes = () => {
    return (
        <Route element={<ProtectRoutes />}>
            <Route path="patient" element={<PatientLayout />}>
                <Route path="dashboard" element={<PatientDashboard />} />
                <Route path="profile/:id" element={<PatientProfile />} />
                <Route path="resetpassword/:id" element={<PatientResetPassword />} />
            </Route>
        </Route>
    );
};

export default PatientRoutes;
