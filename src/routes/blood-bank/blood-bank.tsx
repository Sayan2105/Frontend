import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import ProtectRoutes from "@/guard/protectRoutes";
import LoaderModel from "@/components/loader";

// Lazy-loaded components
const BloodComponents = lazy(() => import("@/pages/blood bank/blood-component/components/components"));
const BloodComponentIssues = lazy(() => import("@/pages/blood bank/blood-component/issue-components/issue-componnets"));
const BloodDonations = lazy(() => import("@/pages/blood bank/doner/blood-donations/donations"));
const BloodDonors = lazy(() => import("@/pages/blood bank/doner/blood-doners/donors"));
const DonorLayouts = lazy(() => import("@/pages/blood bank/doner/layout"));
const BloodIssues = lazy(() => import("@/pages/blood bank/issue-blood/blood-issues"));
const BloodBankLayout = lazy(() => import("@/pages/blood bank/layout"));

const BloodBankRoutes = () => {
    return (
        <Route element={<ProtectRoutes action="view" module="Issue Blood" />}>
            <Route path="blood-bank" element={
                <Suspense fallback={<LoaderModel />}>
                    <BloodBankLayout />
                </Suspense>
            }>
                <Route path="issue-blood" element={
                    <Suspense fallback={<LoaderModel />}>
                        <BloodIssues />
                    </Suspense>
                } />
                <Route path="doner" element={
                    <Suspense fallback={<LoaderModel />}>
                        <DonorLayouts />
                    </Suspense>
                }>
                    <Route path="blood-donations" element={
                        <Suspense fallback={<LoaderModel />}>
                            <BloodDonations />
                        </Suspense>
                    } />
                    <Route path="blood-donors" element={
                        <Suspense fallback={<LoaderModel />}>
                            <BloodDonors />
                        </Suspense>
                    } />
                </Route>
                <Route path="components" element={
                    <Suspense fallback={<LoaderModel />}>
                        <BloodBankLayout />
                    </Suspense>
                }>
                    <Route path="blood-components" element={
                        <Suspense fallback={<LoaderModel />}>
                            <BloodComponents />
                        </Suspense>
                    } />
                    <Route path="issue-components" element={
                        <Suspense fallback={<LoaderModel />}>
                            <BloodComponentIssues />
                        </Suspense>
                    } />
                </Route>
            </Route>
        </Route>
    );
};

export default BloodBankRoutes;
