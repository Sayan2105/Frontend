import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import ProtectRoutes from "@/guard/protectRoutes";
import LoaderModel from "@/components/loader";

// Lazy load the component
const RosterReport = lazy(() => import("@/pages/dutyRoster/rosterReport"));

const DutyRosterRoutes = () => {
    return (
        <Route element={<ProtectRoutes restrictedTo="patient" action="view" module="Duty Roster" />}>
            <Route
                path="roster_report"
                element={
                    <Suspense fallback={<LoaderModel />}>
                        <RosterReport />
                    </Suspense>
                }
            />
        </Route>
    );
};

export default DutyRosterRoutes;
