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
        <Route path="blood-bank" element={<BloodBankLayout />}>

            {/* Issue Blood */}
            <Route element={<ProtectRoutes action="view" module="Issue Blood" />}>
                <Route path="issue-blood" element={<BloodIssues />} />
            </Route>

            {/* Donor Section */}
            <Route path="doner" element={<DonorLayouts />}>
                <Route element={<ProtectRoutes action="view" module="Blood Donation" />}>
                    <Route path="blood-donations" element={<BloodDonations />} />
                </Route>
                <Route element={<ProtectRoutes action="view" module="Blood Donors" />}>
                    <Route path="blood-donors" element={<BloodDonors />} />
                </Route>
            </Route>

            {/* Components Section */}
            <Route path="components" element={<BloodBankLayout />}>
                <Route element={<ProtectRoutes action="view" module="Blood Component" />}>
                    <Route path="blood-components" element={<BloodComponents />} />
                </Route>
                <Route element={<ProtectRoutes action="view" module="Issue Blood Component" />}>
                    <Route path="issue-components" element={<BloodComponentIssues />} />
                </Route>
            </Route>

        </Route>

    );
};

export default BloodBankRoutes;
