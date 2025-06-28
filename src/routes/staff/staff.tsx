import { lazy } from 'react';
import { Route } from 'react-router-dom';

const ProtectRoutes = lazy(() => import('@/guard/protectRoutes'));
const StaffLayout = lazy(() => import('@/pages/staff/staff-layout'));
const Staff = lazy(() => import('@/pages/staff/staff-list/staff'));
const CreateStaff = lazy(() => import('@/pages/staff/staff-list/createStaff'));
const StaffProfileLayout = lazy(() => import('@/pages/staff/profile/profile-layout'));
const Staffprofile = lazy(() => import('@/pages/staff/profile/staffprofile'));
const ResetPassword = lazy(() => import('@/pages/staff/profile/resetpassword'));

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
    );
};

export default StaffRoutes;
