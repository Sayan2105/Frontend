import LoaderModel from "@/components/loader";
import ProtectRoutes from "@/guard/protectRoutes";
import { lazy, Suspense } from "react";
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
            <Route
                path="opd"
                element={
                    <Suspense fallback={<LoaderModel />}>
                        <AdminOPDlayout />
                    </Suspense>
                }
            >
                <Route
                    path=""
                    element={
                        <Suspense fallback={<LoaderModel />}>
                            <OPDLIST />
                        </Suspense>
                    }
                />
                <Route
                    path=":opdId"
                    element={
                        <Suspense fallback={<LoaderModel />}>
                            <OpdDetailsLayout />
                        </Suspense>
                    }
                >
                    <Route
                        path=""
                        element={
                            <Suspense fallback={<LoaderModel />}>
                                <VisitDetails />
                            </Suspense>
                        }
                    />
                    <Route
                        path="medication"
                        element={
                            <Suspense fallback={<LoaderModel />}>
                                <Medication />
                            </Suspense>
                        }
                    />
                    <Route
                        path="vital"
                        element={
                            <Suspense fallback={<LoaderModel />}>
                                <Vital />
                            </Suspense>
                        }
                    />
                    <Route
                        path="operation"
                        element={
                            <Suspense fallback={<LoaderModel />}>
                                <OperationList />
                            </Suspense>
                        }
                    />
                    <Route
                        path="timeline"
                        element={
                            <Suspense fallback={<LoaderModel />}>
                                <Timeline />
                            </Suspense>
                        }
                    />
                    <Route
                        path="charges"
                        element={
                            <Suspense fallback={<LoaderModel />}>
                                <CahrgesList />
                            </Suspense>
                        }
                    />
                    <Route
                        path="treatmenthistory"
                        element={
                            <Suspense fallback={<LoaderModel />}>
                                <TreatmentsList />
                            </Suspense>
                        }
                    />
                    <Route
                        path="payment"
                        element={
                            <Suspense fallback={<LoaderModel />}>
                                <PaymentsList />
                            </Suspense>
                        }
                    />
                    <Route
                        path="lab"
                        element={
                            <Suspense fallback={<LoaderModel />}>
                                <OpdLabInvestigations />
                            </Suspense>
                        }
                    />
                </Route>
            </Route>
        </Route>
    );
};

export default OpdRoutes;
