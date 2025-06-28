import ProtectRoutes from "@/guard/protectRoutes";
import { lazy } from "react";
import { Route } from "react-router-dom";

const RosterReport = lazy(() => import("@/pages/dutyRoster/rosterReport"));

const DutyRosterRoutes = () => {
    return (
        <Route element={<ProtectRoutes restrictedTo="patient" action="view" module="Duty Roster" />}>
            <Route path="roster_report" element={<RosterReport />} />
        </Route>
    );
};

export default DutyRosterRoutes;
