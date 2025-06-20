import PermissionProtectedAction from "@/components/permission-protected-actions"
import { buttonVariants } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { ChartBarStacked, ReceiptText, Ruler, FlaskConical } from "lucide-react"
import { Link, Outlet } from "react-router-dom"

const SetupRadiologyLayout = () => {
  return (
    <div className='space-y-4 pt-4 pb-10 px-2.5'>

      <div className="w-full h-12 ring-1 ring-zinc-200 dark:ring-zinc-800 rounded px-2">
        <ScrollArea className='h-full w-full'>
          <div className="flex h-12 gap-x-3 items-center">

            {/* we provide relative path like this */}

            <PermissionProtectedAction action='view' module='Setup Radiology'>
              <Link to={``} className={buttonVariants({
                variant: 'outline'
              })}>
                <FlaskConical /> Test Names
              </Link>
            </PermissionProtectedAction>


            <PermissionProtectedAction action='view' module='Radiology Category'>
              <Link to={`category`} className={buttonVariants({
                variant: 'outline'
              })}>
                <ChartBarStacked /> Categories
              </Link>
            </PermissionProtectedAction>


            <PermissionProtectedAction action='view' module='Radiology Parameter'>
              <Link to={`parameter`} className={buttonVariants({
                variant: 'outline'
              })}>
                <ReceiptText /> Parameters
              </Link>
            </PermissionProtectedAction>

            <PermissionProtectedAction action='view' module='Radiology Unit'>
              <Link to={`units`} className={buttonVariants({
                variant: 'outline'
              })}>
                <Ruler /> Units
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

export default SetupRadiologyLayout