import { lazy } from "react";
import { Route } from "react-router-dom";
import ProtectRoutes from "@/guard/protectRoutes";

// Lazy-loaded components
const AdminOPDlayout = lazy(() => import("@/pages/OPD/opd-layout"));
const OPDLIST = lazy(() => import("@/pages/OPD/opdList"));
const OpdDetailsLayout = lazy(() => import("@/pages/OPD/details/opdDetailsLayout"));
const VisitDetails = lazy(() => import("@/pages/OPD/details/overview/visitDetails"));
const Medication = lazy(() => import("@/pages/OPD/details/medication/medication"));
const Vital = lazy(() => import("@/pages/OPD/details/vital/vital"));
const OperationList = lazy(() => import("@/pages/OPD/details/operation/operationList"));
const Timeline = lazy(() => import("@/pages/OPD/details/timeline/timelineList"));
const ChargesList = lazy(() => import("@/pages/OPD/details/charges/chargesList"));
const TreatmentsList = lazy(() => import("@/pages/OPD/details/treatmentHistory/treatmentsList"));
const PaymentsList = lazy(() => import("@/pages/OPD/details/payments/paymentsList"));
const OpdLabInvestigations = lazy(() => import("@/pages/OPD/details/lab-investigation/lab-investigations"));

const OpdRoutes = () => {
    return (
        <Route path="opd" element={<AdminOPDlayout />}>
            {/* OPD List */}
            <Route element={<ProtectRoutes action="view" module="Opd" />}>
                <Route path="" element={<OPDLIST />} />
            </Route>
            {/* OPD Details */}
            <Route path=":opdId" element={<OpdDetailsLayout />}>

                <Route element={<ProtectRoutes action="view" module="Opd" />}>
                    <Route path="" element={<VisitDetails />} />
                </Route>

                <Route element={<ProtectRoutes action="view" module="Medication" />}>
                    <Route path="medication" element={<Medication />} />
                </Route>

                <Route element={<ProtectRoutes action="view" module="Vitals" />}>
                    <Route path="vital" element={<Vital />} />
                </Route>

                <Route element={<ProtectRoutes action="view" module="Operation" />}>
                    <Route path="operation" element={<OperationList />} />
                </Route>

                <Route element={<ProtectRoutes action="view" module="Timeline" />}>
                    <Route path="timeline" element={<Timeline />} />
                </Route>

                <Route element={<ProtectRoutes action="view" module="Charges" />}>
                    <Route path="charges" element={<ChargesList />} />
                </Route>

                <Route element={<ProtectRoutes action="view" module="Treatment History" />}>
                    <Route path="treatmenthistory" element={<TreatmentsList />} />
                </Route>

                <Route element={<ProtectRoutes action="view" module="Payments" />}>
                    <Route path="payment" element={<PaymentsList />} />
                </Route>

                <Route element={<ProtectRoutes action="view" module="Lab Investigation" />}>
                    <Route path="lab" element={<OpdLabInvestigations />} />
                </Route>

            </Route>

        </Route>
    );
};

export default OpdRoutes;
