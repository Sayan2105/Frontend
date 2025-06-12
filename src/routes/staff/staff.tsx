import ProtectRoutes from "@/guard/protectRoutes"
import StaffProfileLayout from "@/pages/staff/profile/profile-layout"
import ResetPassword from "@/pages/staff/profile/resetpassword"
import Staffprofile from "@/pages/staff/profile/staffprofile"
import StaffLayout from "@/pages/staff/staff-layout"
import CreateStaff from "@/pages/staff/staff-list/createStaff"
import Staff from "@/pages/staff/staff-list/staff"
import { Route } from "react-router-dom"



const StaffRoutes = () => {
    return (
        <Route element={<ProtectRoutes action="view" module="Human Resource" />}>
            <Route path="staff" element={<StaffLayout />}>
                <Route path="" element={<Staff />} />
                <Route path="create" element={<CreateStaff />} />
                <Route path=":id" element={<StaffProfileLayout />}>
                    <Route path="" element={<Staffprofile />} />
                    <Route path="edit" element={<CreateStaff />} />
                    <Route path="resetpassword" element={<ResetPassword />} />
                </Route>
            </Route>
        </Route>
    )
}



export default StaffRoutes