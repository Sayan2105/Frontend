import ProtectRoutes from '@/guard/protectRoutes';
import { lazy } from 'react';
import { Route } from 'react-router-dom';

// Lazy imports
const IpdLayout = lazy(() => import('@/pages/ipd/ipd-layout'));
const Ipds = lazy(() => import('@/pages/ipd/ipds/ipds'));
const IpdSectionsLayout = lazy(() => import('@/pages/ipd/sections/ipd-section-layout'));
const IpdOverview = lazy(() => import('@/pages/ipd/sections/overview/overview'));
const IpdMedications = lazy(() => import('@/pages/ipd/sections/medication/medications'));
const IpdOperations = lazy(() => import('@/pages/ipd/sections/operation/operations'));
const IpdVitals = lazy(() => import('@/pages/ipd/sections/vital/vitals'));
const IpdTimelines = lazy(() => import('@/pages/ipd/sections/timeline/timeline'));
const IpdPayments = lazy(() => import('@/pages/ipd/sections/payment/payments'));
const IpdCharges = lazy(() => import('@/pages/ipd/sections/charges/charges'));
const IpdTreatmentHistories = lazy(() => import('@/pages/ipd/sections/treatment-history/treatment-histories'));
const IpdCounsultantRegisters = lazy(() => import('@/pages/ipd/sections/consulatant-register/consultant-registers'));
const IpdLabInvestigations = lazy(() => import('@/pages/ipd/sections/lab-investigations/lab-inestigations'));
const IpdPrescription = lazy(() => import('@/pages/ipd/sections/prescription/prescriptions'));

const IpdRoutes = () => {
    return (
        <Route element={<ProtectRoutes action="view" module="Ipd" />}>
            <Route path="ipd" element={<IpdLayout />}>
                <Route path="" element={<Ipds />} />
                <Route path=":ipdId" element={<IpdSectionsLayout />}>
                    <Route path="" element={<IpdOverview />} />
                    <Route path="medication" element={<IpdMedications />} />
                    <Route path="operation" element={<IpdOperations />} />
                    <Route path="vital" element={<IpdVitals />} />
                    <Route path="timeline" element={<IpdTimelines />} />
                    <Route path="payment" element={<IpdPayments />} />
                    <Route path="charges" element={<IpdCharges />} />
                    <Route path="treatmenthistory" element={<IpdTreatmentHistories />} />
                    <Route path="consultant-register" element={<IpdCounsultantRegisters />} />
                    <Route path="lab" element={<IpdLabInvestigations />} />
                    <Route path="prescription" element={<IpdPrescription />} />
                </Route>
            </Route>
        </Route>
    );
};

export default IpdRoutes;
