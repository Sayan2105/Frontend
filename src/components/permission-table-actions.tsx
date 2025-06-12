import { MoreHorizontal, Pencil, Trash } from 'lucide-react'; // Assuming you're using Lucide icons
import { ReactNode, useContext } from 'react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { PermissionContext } from '@/contexts/permission-provider';


interface PermissionActionsProps {
    module: string;
    onEdit?: () => void;
    onDelete: () => void;
    containerClass?: string;
    exclude?: {
        edit?: boolean;
        delete?: boolean;
    },
    include?: ReactNode
}


const PermissionTableActions = ({
    module,
    onEdit,
    onDelete,
    exclude = { edit: false, delete: false },
    include
}: PermissionActionsProps) => {

    const { hasPermission } = useContext(PermissionContext)


    const canUpdate = !exclude.edit && hasPermission('update', module);
    const canDelete = !exclude.delete && hasPermission('delete', module);


    // If no permissions, show N/A badge
    if (!canUpdate && !canDelete && !include) {
        return (
            <div className='px-1 py-0.5 text-[12px] cursor-not-allowed bg-red-500 text-white rounded-full'>
                N/A
            </div>
        );
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' className='active:scale-95 transition-all' size='sm'>
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='p-0.5 dark:border-gray-800 z-[200]'>
                {include && (
                    <DropdownMenuItem>
                        <button type='button' className='relative flex items-center w-full space-x-2 h-5 hover:text-gray-600 dark:hover:text-gray-400'>
                            {include}
                        </button>
                    </DropdownMenuItem>
                )}

                {canUpdate && (
                    <DropdownMenuItem>
                        <button type='button' onClick={onEdit} className='flex items-center w-full space-x-2 h-5 hover:text-gray-600 dark:hover:text-gray-400'>
                            <Pencil className='w-4' /> <span>Edit</span>
                        </button>
                    </DropdownMenuItem>
                )}

                {canDelete && (
                    <DropdownMenuItem>
                        <button type='button' onClick={onDelete} className='flex items-center w-full space-x-2 h-5 hover:text-gray-600 dark:hover:text-gray-400'>
                            <Trash className='w-4' /> <span>Delete</span>
                        </button>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )

};


export default PermissionTableActions;