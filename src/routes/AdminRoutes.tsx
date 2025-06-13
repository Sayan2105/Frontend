import ProtectRoutes from "@/guard/protectRoutes"
import { lazy } from "react";
import { Route } from "react-router-dom"

const AdminLayout = lazy(() => import("@/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("@/admin/dashboard/dashboard"));



const AdminRoutes = () => {

    return (

        // protected route only handling authentication
        <Route element={<ProtectRoutes restrictedTo="patient" />}>
            <Route path="admin" element={<AdminLayout />}>
                {/* Dashboard */}
                <Route
                    path="dashboard"
                    element={<AdminDashboard />}
                />
            </Route>
        </Route>

    )
}

export default AdminRoutes