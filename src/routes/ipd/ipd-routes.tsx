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
        <Route path="ipd" element={<IpdLayout />}>

            {/* List of IPDs */}
            <Route element={<ProtectRoutes action="view" module="Ipd" />}>
                <Route path="" element={<Ipds />} />
            </Route>

            {/* Individual IPD details */}
            <Route path=":ipdId" element={<IpdSectionsLayout />}>

                {/* Overview */}
                <Route element={<ProtectRoutes action="view" module="Ipd" />}>
                    <Route path="" element={<IpdOverview />} />
                </Route>

                {/* Medication */}
                <Route element={<ProtectRoutes action="view" module="Medication" />}>
                    <Route path="medication" element={<IpdMedications />} />
                </Route>

                {/* Operation */}
                <Route element={<ProtectRoutes action="view" module="Operation" />}>
                    <Route path="operation" element={<IpdOperations />} />
                </Route>

                {/* Vital */}
                <Route element={<ProtectRoutes action="view" module="Vitals" />}>
                    <Route path="vital" element={<IpdVitals />} />
                </Route>

                {/* Timeline */}
                <Route element={<ProtectRoutes action="view" module="Timeline" />}>
                    <Route path="timeline" element={<IpdTimelines />} />
                </Route>

                {/* Payment */}
                <Route element={<ProtectRoutes action="view" module="Payments" />}>
                    <Route path="payment" element={<IpdPayments />} />
                </Route>

                {/* Charges */}
                <Route element={<ProtectRoutes action="view" module="Charges" />}>
                    <Route path="charges" element={<IpdCharges />} />
                </Route>

                {/* Treatment History */}
                <Route element={<ProtectRoutes action="view" module="Treatment History" />}>
                    <Route path="treatmenthistory" element={<IpdTreatmentHistories />} />
                </Route>

                {/* Consultant Register */}
                <Route element={<ProtectRoutes action="view" module="Consultant Reg" />}>
                    <Route path="consultant-register" element={<IpdCounsultantRegisters />} />
                </Route>

                {/* Lab */}
                <Route element={<ProtectRoutes action="view" module="Lab Investigation" />}>
                    <Route path="lab" element={<IpdLabInvestigations />} />
                </Route>

                {/* Prescription */}
                <Route element={<ProtectRoutes action="view" module="Prescription" />}>
                    <Route path="prescription" element={<IpdPrescription />} />
                </Route>

            </Route>
        </Route>
    );
};


export default IpdRoutes;
