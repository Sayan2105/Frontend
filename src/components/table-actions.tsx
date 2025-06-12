import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu"
import { MoreHorizontal, Pencil, Printer, Trash } from "lucide-react"
import { Button } from "./ui/button"
import { ReactNode } from "react";
import { TableCell } from "./ui/table";

interface TableActionsProps {
    onEdit?: () => void;
    onDelete?: () => void;

    show: boolean;
    includeAction?: ReactNode,
    incluePrint?: {
        include: boolean,
        print: () => void,
    },
    exclude?: {
        edit?: boolean;
        delete?: boolean;
    },
    canUpdate: boolean;
    canDelete: boolean;
}

const TableActions = ({ exclude = { edit: false, delete: false }, incluePrint, show, canUpdate, canDelete, onDelete, onEdit, includeAction }: TableActionsProps) => {

    if (!show && !includeAction && !incluePrint) return null

    return (
        <TableCell>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='outline' className='active:scale-95 transition-all' size='sm'>
                        <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='p-0.5 dark:border-gray-800 z-[200]'>
                    {includeAction && (
                        <DropdownMenuItem onSelect={(e) => e.stopPropagation()}>
                            <button type='button' className='relative flex items-center w-full space-x-2 h-5 hover:text-gray-600 dark:hover:text-gray-400'>
                                {includeAction}
                            </button>
                        </DropdownMenuItem>
                    )}

                    {incluePrint?.include && (
                        <DropdownMenuItem>
                            <button type='button' onClick={incluePrint.print} className='flex items-center w-full space-x-2 h-5 hover:text-gray-600 dark:hover:text-gray-400'>
                                <Printer className='w-4' /> <span>Print</span>
                            </button>
                        </DropdownMenuItem>
                    )}

                    {(canUpdate && !exclude.edit) && (
                        <DropdownMenuItem>
                            <button type='button' onClick={onEdit} className='flex items-center w-full space-x-2 h-5 hover:text-gray-600 dark:hover:text-gray-400'>
                                <Pencil className='w-4' /> <span>Edit</span>
                            </button>
                        </DropdownMenuItem>
                    )}

                    {(canDelete && !exclude.delete) && (
                        <DropdownMenuItem>
                            <button type='button' onClick={onDelete} className='flex items-center w-full space-x-2 h-5 hover:text-gray-600 dark:hover:text-gray-400'>
                                <Trash className='w-4' /> <span>Delete</span>
                            </button>
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </TableCell>
    )
}

export default TableActions