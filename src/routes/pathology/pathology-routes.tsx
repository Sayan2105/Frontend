import ProtectRoutes from "@/guard/protectRoutes"
import PathologyBills from "@/pages/pathology/pathology-bills"
import { Route } from "react-router-dom"

const PathologyRoutes = () => {
    return (
        <Route element={<ProtectRoutes action="view" module="Radiology Bill" />}>
            <Route path="pathology" element={<PathologyBills />} />
        </Route>
    )
}

export default PathologyRoutes