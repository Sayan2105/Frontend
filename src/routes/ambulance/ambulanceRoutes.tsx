import ProtectRoutes from "@/guard/protectRoutes"
import Ambulances from "@/pages/ambulance/ambulances/ambulances"
import AssignedAmbulances from "@/pages/ambulance/assign-ambulance/assigned-ambulances"
import AmbulanceLayout from "@/pages/ambulance/layout"
import { Route } from "react-router-dom"



const AmbulanceRoutes = () => {
    return (
        <Route element={<ProtectRoutes action="view" module="Assign Ambulance" />}>
            <Route path="ambulance" element={<AmbulanceLayout />}>
                <Route path="" element={<AssignedAmbulances />} />
                <Route element={<ProtectRoutes restrictedTo='patient' />}>
                    <Route path="create" element={<Ambulances />} />
                </Route>
            </Route>
        </Route>
    )
}



export default AmbulanceRoutes