import { PermissionContext } from "@/contexts/permission-provider";
import { ReactNode, useContext } from "react";


interface PermissionProtectedActionProps {
    children: ReactNode;
    action: 'view' | 'create' | 'delete' | 'update' | string;
    module: string;
}

const PermissionProtectedAction = ({
    children,
    action,
    module
}: PermissionProtectedActionProps) => {

    const { hasPermission } = useContext(PermissionContext)

    return hasPermission(action, module) ? <>{children}</> : null;

}


export default PermissionProtectedAction