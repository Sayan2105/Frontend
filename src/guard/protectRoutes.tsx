import LoaderModel from "@/components/loader";
import { PermissionContext } from "@/contexts/permission-provider";
import { authSelector } from "@/features/auth/authSlice";
import { useAppSelector } from "@/hooks";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectRoutesProps {
    restrictedTo?: string;
    action?: string;
    module?: string;
}

const ProtectRoutes = ({ restrictedTo, action, module }: ProtectRoutesProps) => {
    const session = useAppSelector(authSelector);
    const { hasPermission, isLoading } = useContext(PermissionContext);

    if (isLoading) {
        return <LoaderModel />;
    }

    if (!session.user) {
        return <Navigate to="/signin" replace />;
    }

    if (action && module && !hasPermission(action, module)) {
        return <Navigate to="/unauthorized" replace />;
    }

    if (restrictedTo && session.user.role === restrictedTo) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default ProtectRoutes;
