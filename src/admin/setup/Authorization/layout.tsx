import { buttonVariants } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Flag, UserPen } from 'lucide-react'
import { Link, Outlet } from 'react-router-dom'

const PermissionLayout = () => {


  return (
    <>
      <div className='space-y-4 pt-4 pb-10 px-2.5'>
        <div className="w-full h-12 ring-1 ring-zinc-200 dark:ring-zinc-800 rounded px-2">
          <ScrollArea className='h-full w-full'>
            <div className="flex h-12 gap-x-3 items-center">

              {/* we provide relative path like this */}

              <Link to={``} className={buttonVariants({
                variant: 'outline'
              })}>
                <Flag />  Permissions
              </Link>

              <Link to={`role`} className={buttonVariants({
                variant: 'outline'
              })}>
                <UserPen /> Roles
              </Link>
            </div>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        </div>
        <Outlet></Outlet>
      </div>
    </>

  )
}

export default PermissionLayout