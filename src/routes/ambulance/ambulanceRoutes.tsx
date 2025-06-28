import PrintAmbulanceInvoice from '@/pages/ambulance/assign-ambulance/print/print-bill';
import { lazy } from 'react';
import { Route } from 'react-router-dom';

const ProtectRoutes = lazy(() => import('@/guard/protectRoutes'));
const AmbulanceLayout = lazy(() => import('@/pages/ambulance/layout'));
const AssignedAmbulances = lazy(() => import('@/pages/ambulance/assign-ambulance/assigned-ambulances'));
const Ambulances = lazy(() => import('@/pages/ambulance/ambulances/ambulances'));

const AmbulanceRoutes = () => {
    return (
        <Route element={<ProtectRoutes action="view" module="Assign Ambulance" />}>
            <Route path="ambulance" element={<AmbulanceLayout />}>
                <Route path="" element={<AssignedAmbulances />} />
                <Route element={<ProtectRoutes restrictedTo="patient" />}>
                    <Route path="create" element={<Ambulances />} />
                    <Route path="print/:invoiceId" element={<PrintAmbulanceInvoice />} />
                </Route>
            </Route>
        </Route>
    );
};

export default AmbulanceRoutes;
