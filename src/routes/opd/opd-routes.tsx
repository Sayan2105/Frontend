import ProtectRoutes from "@/guard/protectRoutes";
import { lazy } from "react";
import { Route } from "react-router-dom";

// Lazy-loaded components
const AdminOPDlayout = lazy(() => import("@/pages/OPD/opd-layout"));
const OPDLIST = lazy(() => import("@/pages/OPD/opdList"));
const OpdDetailsLayout = lazy(() => import("@/pages/OPD/details/opdDetailsLayout"));
const VisitDetails = lazy(() => import("@/pages/OPD/details/overview/visitDetails"));
const Medication = lazy(() => import("@/pages/OPD/details/medication/medication"));
const Vital = lazy(() => import("@/pages/OPD/details/vital/vital"));
const OperationList = lazy(() => import("@/pages/OPD/details/operation/operationList"));
const Timeline = lazy(() => import("@/pages/OPD/details/timeline/timelineList"));
const CahrgesList = lazy(() => import("@/pages/OPD/details/charges/chargesList"));
const TreatmentsList = lazy(() => import("@/pages/OPD/details/treatmentHistory/treatmentsList"));
const PaymentsList = lazy(() => import("@/pages/OPD/details/payments/paymentsList"));
const OpdLabInvestigations = lazy(() => import("@/pages/OPD/details/lab-investigation/lab-investigations"));

const OpdRoutes = () => {
    return (
        <Route element={<ProtectRoutes action="view" module="Opd" />}>
            <Route path="opd" element={<AdminOPDlayout />}>
                <Route path="" element={<OPDLIST />} />
                <Route path=":opdId" element={<OpdDetailsLayout />}>
                    <Route path="" element={<VisitDetails />} />
                    <Route path="medication" element={<Medication />} />
                    <Route path="vital" element={<Vital />} />
                    <Route path="operation" element={<OperationList />} />
                    <Route path="timeline" element={<Timeline />} />
                    <Route path="charges" element={<CahrgesList />} />
                    <Route path="treatmenthistory" element={<TreatmentsList />} />
                    <Route path="payment" element={<PaymentsList />} />
                    <Route path="lab" element={<OpdLabInvestigations />} />
                </Route>
            </Route>
        </Route>
    );
};

export default OpdRoutes;
