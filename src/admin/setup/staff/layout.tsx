import PermissionProtectedAction from "@/components/permission-protected-actions"
import { buttonVariants } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Brain, Building, ChartBarStacked } from "lucide-react"
import { Link, Outlet } from "react-router-dom"

const SetupStaffLayout = () => {
    return (
        <div className='space-y-4 pt-4 pb-10 px-2.5'>

            <div className="w-full h-12 ring-1 ring-zinc-200 dark:ring-zinc-800 rounded px-2">
                <ScrollArea className='h-full w-full'>
                    <div className="flex h-12 gap-x-3 items-center">

                        {/* we provide relative path like this */}

                        <PermissionProtectedAction action='view' module='Staff Designation'>
                            <Link to={`designation`} className={buttonVariants({
                                variant: 'outline'
                            })}>
                                <ChartBarStacked /> Designation
                            </Link>
                        </PermissionProtectedAction>

                        <PermissionProtectedAction action='view' module='Staff Specialization'>
                            <Link to={`specialization`} className={buttonVariants({
                                variant: 'outline'
                            })}>
                                <Brain /> Specialization
                            </Link>
                        </PermissionProtectedAction>

                        <PermissionProtectedAction action='view' module='Staff Department'>
                            <Link to={`department`} className={buttonVariants({
                                variant: 'outline'
                            })}>
                                <Building /> Department
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

export default SetupStaffLayout