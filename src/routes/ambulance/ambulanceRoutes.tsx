import LoaderModel from '@/components/loader';
import PrintAmbulanceInvoice from '@/pages/ambulance/assign-ambulance/print/print-bill';
import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';

// Lazy load all ambulance components
const ProtectRoutes = lazy(() => import('@/guard/protectRoutes'));
const AmbulanceLayout = lazy(() => import('@/pages/ambulance/layout'));
const AssignedAmbulances = lazy(() => import('@/pages/ambulance/assign-ambulance/assigned-ambulances'));
const Ambulances = lazy(() => import('@/pages/ambulance/ambulances/ambulances'));

const AmbulanceRoutes = () => {
    return (
        <Route
            element={
                <Suspense fallback={<LoaderModel />}>
                    <ProtectRoutes action="view" module="Assign Ambulance" />
                </Suspense>
            }
        >
            <Route
                path="ambulance"
                element={
                    <Suspense fallback={<LoaderModel />}>
                        <AmbulanceLayout />
                    </Suspense>
                }
            >
                <Route
                    path=""
                    element={
                        <Suspense fallback={<LoaderModel />}>
                            <AssignedAmbulances />
                        </Suspense>
                    }
                />
                <Route
                    element={
                        <Suspense fallback={<LoaderModel />}>
                            <ProtectRoutes restrictedTo="patient" />
                        </Suspense>
                    }
                >
                    <Route
                        path="create"
                        element={
                            <Suspense fallback={<LoaderModel />}>
                                <Ambulances />
                            </Suspense>
                        }
                    />

                    <Route
                        path="print/:invoiceId"
                        element={
                            <Suspense fallback={<LoaderModel />}>
                                <PrintAmbulanceInvoice />
                            </Suspense>
                        }
                    />
                </Route>
            </Route>
        </Route>
    );
};

export default AmbulanceRoutes;