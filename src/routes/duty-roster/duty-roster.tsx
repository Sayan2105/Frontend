import ProtectRoutes from "@/guard/protectRoutes"
import RosterReport from "@/pages/dutyRoster/rosterReport"
import { Route } from "react-router-dom"



const DutyRosterRoutes = () => {
    return (
        <Route element={<ProtectRoutes restrictedTo="patient" action="view" module="Duty Roster" />}>
            <Route path="roster_report" element={<RosterReport />} />
        </Route>
    )
}

export default DutyRosterRoutes