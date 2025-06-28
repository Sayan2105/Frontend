import ProtectRoutes from "@/guard/protectRoutes";
import { lazy } from "react";
import { Route } from "react-router-dom";

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
            <Route path="blood-bank" element={<BloodBankLayout />}>
                <Route path="issue-blood" element={<BloodIssues />} />
                <Route path="doner" element={<DonorLayouts />}>
                    <Route path="blood-donations" element={<BloodDonations />} />
                    <Route path="blood-donors" element={<BloodDonors />} />
                </Route>
                <Route path="components" element={<BloodBankLayout />}>
                    <Route path="blood-components" element={<BloodComponents />} />
                    <Route path="issue-components" element={<BloodComponentIssues />} />
                </Route>
            </Route>
        </Route>
    );
};

export default BloodBankRoutes;
