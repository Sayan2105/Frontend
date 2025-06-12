import PermissionProtectedAction from "@/components/permission-protected-actions"
import { buttonVariants } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { ChartBarStacked, EllipsisVertical, Menu, ReceiptText } from "lucide-react"
import { Link, Outlet } from "react-router-dom"

const ChargesLayout = () => {
    return (
        <div className='space-y-4 pt-4 pb-10 px-2.5'>

            <div className="w-full h-12 ring-1 ring-zinc-200 dark:ring-zinc-800 rounded px-2">
                <ScrollArea className='h-full w-full'>
                    <div className="flex h-12 gap-x-3 items-center">

                        {/* we provide relative path like this */}

                        <PermissionProtectedAction action='view' module='Setup Hospital Charges'>
                            <Link to={``} className={buttonVariants({
                                variant: 'outline'
                            })}>
                                <Menu /> Charges
                            </Link>
                        </PermissionProtectedAction>

                        <PermissionProtectedAction action="view" module="Charge Category">
                            <Link to={`category`} className={buttonVariants({
                                variant: 'outline'
                            })}>
                                <ChartBarStacked /> Categories
                            </Link>
                        </PermissionProtectedAction>

                        <PermissionProtectedAction action='view' module='Charge Type'>
                            <Link to={`types`} className={buttonVariants({
                                variant: 'outline'
                            })}>
                                <EllipsisVertical />Charge Types
                            </Link>
                        </PermissionProtectedAction>

                        <PermissionProtectedAction action='view' module='Charge Tax'>
                            <Link to={`tax`} className={buttonVariants({
                                variant: 'outline'
                            })}>
                                <ReceiptText /> Taxes
                            </Link>
                        </PermissionProtectedAction>

                        <PermissionProtectedAction action='view' module='Charge Unit'>
                            <Link to={`units`} className={buttonVariants({
                                variant: 'outline'
                            })}>
                                <ReceiptText /> Units
                            </Link>
                        </PermissionProtectedAction>

                    </div>

                    <ScrollBar orientation='horizontal' />
                </ScrollArea>
            </div>

            <Outlet></Outlet>
        </div>
    )
}

export default ChargesLayout