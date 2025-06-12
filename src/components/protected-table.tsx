import { PermissionContext } from '@/contexts/permission-provider';
import { ReactNode, useContext } from 'react';


interface PermissionActionsProps {
    module: string;
    renderTable: (show: boolean, canUpdate: boolean, canDelete: boolean) => ReactNode
}


const ProtectedTable = ({
    module,
    renderTable
}: PermissionActionsProps) => {

    const { hasPermission } = useContext(PermissionContext)

    const canUpdate = hasPermission('update', module);
    const canDelete = hasPermission('delete', module);


    // If no permissions, then return false means no action (if any of these true then show action)
    const shouldShowAction = (canUpdate || canDelete);


    return (
        <>
            <main>{renderTable(shouldShowAction, canUpdate, canDelete)}</main>
        </>
    )

};


export default ProtectedTable;