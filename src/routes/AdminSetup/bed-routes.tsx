import SetupBed from "@/admin/setup/bed/bed-name/bed"
import SetupBedFloors from "@/admin/setup/bed/floor/bed-floors"
import SetupBedGroups from "@/admin/setup/bed/group/bed-groups"
import SetupBedLayout from "@/admin/setup/bed/layout"
import { Route } from "react-router-dom"




const BedRoutes = () => {
    return (
        <Route path="admin/setup/bed" element={<SetupBedLayout />}>
            <Route path="" element={<SetupBed />} />
            <Route path="groups" element={<SetupBedGroups />} />
            <Route path="floors" element={<SetupBedFloors />} />
        </Route>
    )
}

export default BedRoutes