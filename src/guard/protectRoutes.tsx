import LoaderModel from "@/components/loader";
import { AuthContext } from "@/contexts/authContext";
import { PermissionContext } from "@/contexts/permission-provider";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectRoutesProps {
    restrictedTo?: string;
    action?: string;
    module?: string;
}

const ProtectRoutes = ({ restrictedTo, action, module }: ProtectRoutesProps) => {
    const { authUser } = useContext(AuthContext)
    const { hasPermission, isLoading } = useContext(PermissionContext);

    if (isLoading) {
        return <LoaderModel />;
    }

    if (!authUser) {
        return <Navigate to="/signin" replace />;
    }

    if (action && module && !hasPermission(action, module)) {
        return <Navigate to="/unauthorized" replace />;
    }

    if (restrictedTo && authUser?.role === restrictedTo) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default ProtectRoutes;
