import LoaderModel from '@/components/loader';
import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';

// Lazy load all staff components
const ProtectRoutes = lazy(() => import('@/guard/protectRoutes'));
const StaffLayout = lazy(() => import('@/pages/staff/staff-layout'));
const Staff = lazy(() => import('@/pages/staff/staff-list/staff'));
const CreateStaff = lazy(() => import('@/pages/staff/staff-list/createStaff'));
const StaffProfileLayout = lazy(() => import('@/pages/staff/profile/profile-layout'));
const Staffprofile = lazy(() => import('@/pages/staff/profile/staffprofile'));
const ResetPassword = lazy(() => import('@/pages/staff/profile/resetpassword'));

const StaffRoutes = () => {
    return (
        <Route
            element={
                <Suspense fallback={<LoaderModel />}>
                    <ProtectRoutes action="view" module="Human Resource" />
                </Suspense>
            }
        >
            <Route
                path="staff"
                element={
                    <Suspense fallback={<LoaderModel />}>
                        <StaffLayout />
                    </Suspense>
                }
            >
                <Route
                    path=""
                    element={
                        <Suspense fallback={<LoaderModel />}>
                            <Staff />
                        </Suspense>
                    }
                />
                <Route
                    path="create"
                    element={
                        <Suspense fallback={<LoaderModel />}>
                            <CreateStaff />
                        </Suspense>
                    }
                />
                <Route
                    path=":id"
                    element={
                        <Suspense fallback={<LoaderModel />}>
                            <StaffProfileLayout />
                        </Suspense>
                    }
                >
                    <Route
                        path=""
                        element={
                            <Suspense fallback={<LoaderModel />}>
                                <Staffprofile />
                            </Suspense>
                        }
                    />
                    <Route
                        path="edit"
                        element={
                            <Suspense fallback={<LoaderModel />}>
                                <CreateStaff />
                            </Suspense>
                        }
                    />
                    <Route
                        path="resetpassword"
                        element={
                            <Suspense fallback={<LoaderModel />}>
                                <ResetPassword />
                            </Suspense>
                        }
                    />
                </Route>
            </Route>
        </Route>
    );
};

export default StaffRoutes;