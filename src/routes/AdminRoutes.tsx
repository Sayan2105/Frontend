import AdminLayout from "@/admin/AdminLayout"
import AdminDashboard from "@/admin/dashboard/dashboard"
import ProtectRoutes from "@/guard/protectRoutes"
import { Route } from "react-router-dom"





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