import StaffDepartments from '@/admin/setup/staff/department/departments'
import StaffDesignations from '@/admin/setup/staff/designation/designations'
import SetupStaffLayout from '@/admin/setup/staff/layout'
import StaffSpecializations from '@/admin/setup/staff/specialization/specializations'
import { Route } from 'react-router-dom'



const SetupStaffRoutes = () => {
    return (
        <Route path='admin/setupStaff' element={<SetupStaffLayout />}>
            <Route path='specialization' element={<StaffSpecializations />} />
            <Route path="department" element={<StaffDepartments />} />
            <Route path="designation" element={<StaffDesignations />} />
        </Route>
    )
}



export default SetupStaffRoutes