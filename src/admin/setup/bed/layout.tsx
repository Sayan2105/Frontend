import PermissionProtectedAction from "@/components/permission-protected-actions"
import { buttonVariants } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Bed, ChartBarStacked, Hospital } from "lucide-react"
import { Link, Outlet } from "react-router-dom"




const SetupBedLayout = () => {


    return (
        <div className='space-y-4 pt-4 pb-10 px-2.5'>

            <div className="w-full h-12 ring-1 ring-zinc-200 dark:ring-zinc-800 rounded px-2">
                <ScrollArea className='h-full w-full'>
                    <div className="flex h-12 gap-x-3 items-center">

                        {/* we provide relative path like this */}

                        <PermissionProtectedAction action='view' module='Setup Bed'>
                            <Link to={` `} className={buttonVariants({
                                variant: 'outline'
                            })}>
                                <Bed /> Bed
                            </Link>
                        </PermissionProtectedAction>


                        <PermissionProtectedAction action='view' module='Bed Group'>
                            <Link to={`groups`} className={buttonVariants({
                                variant: 'outline'
                            })}>
                                <ChartBarStacked /> Group
                            </Link>
                        </PermissionProtectedAction>

                        <PermissionProtectedAction action='view' module='Bed Floor'>
                            <Link to={`floors`} className={buttonVariants({
                                variant: 'outline'
                            })}>
                                <Hospital /> Floor
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




export default SetupBedLayout