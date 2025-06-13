import LoaderModel from '@/components/loader';
import ProtectRoutes from '@/guard/protectRoutes';
import { lazy, Suspense } from 'react';
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
            <Route
                path="ipd"
                element={
                    <Suspense fallback={<LoaderModel />}>
                        <IpdLayout />
                    </Suspense>
                }
            >
                <Route
                    path=""
                    element={
                        <Suspense fallback={<LoaderModel />}>
                            <Ipds />
                        </Suspense>
                    }
                />
                <Route
                    path=":ipdId"
                    element={
                        <Suspense fallback={<LoaderModel />}>
                            <IpdSectionsLayout />
                        </Suspense>
                    }
                >
                    <Route
                        path=""
                        element={
                            <Suspense fallback={<LoaderModel />}>
                                <IpdOverview />
                            </Suspense>
                        }
                    />
                    <Route
                        path="medication"
                        element={
                            <Suspense fallback={<LoaderModel />}>
                                <IpdMedications />
                            </Suspense>
                        }
                    />
                    <Route
                        path="operation"
                        element={
                            <Suspense fallback={<LoaderModel />}>
                                <IpdOperations />
                            </Suspense>
                        }
                    />
                    <Route
                        path="vital"
                        element={
                            <Suspense fallback={<LoaderModel />}>
                                <IpdVitals />
                            </Suspense>
                        }
                    />
                    <Route
                        path="timeline"
                        element={
                            <Suspense fallback={<LoaderModel />}>
                                <IpdTimelines />
                            </Suspense>
                        }
                    />
                    <Route
                        path="payment"
                        element={
                            <Suspense fallback={<LoaderModel />}>
                                <IpdPayments />
                            </Suspense>
                        }
                    />
                    <Route
                        path="charges"
                        element={
                            <Suspense fallback={<LoaderModel />}>
                                <IpdCharges />
                            </Suspense>
                        }
                    />
                    <Route
                        path="treatmenthistory"
                        element={
                            <Suspense fallback={<LoaderModel />}>
                                <IpdTreatmentHistories />
                            </Suspense>
                        }
                    />
                    <Route
                        path="consultant-register"
                        element={
                            <Suspense fallback={<LoaderModel />}>
                                <IpdCounsultantRegisters />
                            </Suspense>
                        }
                    />
                    <Route
                        path="lab"
                        element={
                            <Suspense fallback={<LoaderModel />}>
                                <IpdLabInvestigations />
                            </Suspense>
                        }
                    />
                    <Route
                        path="prescription"
                        element={
                            <Suspense fallback={<LoaderModel />}>
                                <IpdPrescription />
                            </Suspense>
                        }
                    />
                </Route>
            </Route>
        </Route>
    );
};

export default IpdRoutes;
