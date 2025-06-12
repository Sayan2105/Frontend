import PermissionProtectedAction from "@/components/permission-protected-actions"
import { buttonVariants } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Calendar, Calendar1, Newspaper } from "lucide-react"
import { Link, Outlet } from "react-router-dom"

const SetupHomepageLayout = () => {
    return (
        <div className='space-y-4 pt-4 px-2.5'>
            <div className="w-full h-12 ring-1 ring-zinc-200 dark:ring-zinc-800 rounded px-2">
                <ScrollArea className='h-full w-full'>
                    <div className="flex h-12 gap-x-3 items-center">
                        <PermissionProtectedAction action='view' module='News'>
                            <Link to={`news`} className={buttonVariants({
                                variant: 'outline'
                            })}>
                                <Newspaper /> Latest News
                            </Link>
                        </PermissionProtectedAction>

                        <PermissionProtectedAction action='view' module='Annual Calendar'>
                            <Link to={`annual-calendar`} className={buttonVariants({
                                variant: 'outline'
                            })}>
                                <Calendar /> Annual Calendar
                            </Link>
                        </PermissionProtectedAction>

                        <PermissionProtectedAction action='view' module='Home Event'>
                            <Link to={`events`} className={buttonVariants({
                                variant: 'outline'
                            })}>
                                <Calendar1 /> Events
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

export default SetupHomepageLayout