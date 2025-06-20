import { ROLE } from '@/admin/setup/Authorization/role/role'
import AuthzApi from '@/admin/setup/services/authorization'
import CustomPagination from '@/components/customPagination'
import EmptyList from '@/components/emptyList'
import PermissionProtectedAction from '@/components/permission-protected-actions'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import UserImage from '@/components/user-image'
import { page_limit } from '@/globalData'
import StaffApi from '@/services/staff-api'
import { staffs } from '@/types/staff/staff'
import { Plus } from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'



const Staff = () => {


  // query params
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [search, setSearch] = useQueryState('search')
  const [roles, setRoles] = useState<ROLE[]>([])


  // API state
  const [staffList, setStaffs] = useState<staffs>({ data: [], total_pages: 0 })


  const fetchRoles = async () => {
    try {
      const data = await AuthzApi.getRoles()
      setRoles(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  // setting values to queryParams for seacrh
  const onSearch = useDebouncedCallback(async (value: any) => {
    value ? setSearch(value) : setSearch(null)
    setPage(1)
  }, 400)


  // fetching staffs list
  const fetchStaffs = async () => {
    try {
      const data = await StaffApi.getStaffs({ page, limit: page_limit, search: search! })
      setStaffs(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  useEffect(() => {
    fetchStaffs()
    fetchRoles()
  }, [page, search])

  useEffect(() => {
    fetchRoles()
  }, [])


  return (
    <>
      <div className='my-2 flex flex-col'>

        {/* top bar */}
        <div className='flex py-3 justify-between gap-y-2 md:items-center md:justify-between'>
          <h1 className='font-semibold tracking-tight'>Staff List</h1>
          <div className='flex gap-x-2 overflow-x-auto'>

            <PermissionProtectedAction action='create' module='Human Resource'>
              <Link to={'create'}
                className={buttonVariants({ variant: 'default', size: 'sm', className: 'flex gap-x-1' })}>
                <Plus />Add Staff
              </Link>
            </PermissionProtectedAction>

          </div>
        </div>


        <Separator />


        {/* search section */}

        <div className='pt-2 pb-5 space-y-2'>

          <Label>Search by keyword</Label>

          <div className='flex items-center gap-2 w-72 sm:w-96'>

            <Input onChange={(e) => onSearch(e.target.value)} placeholder='Search' />

            <Select defaultValue={search!} onValueChange={(value) => { onSearch(value) }}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {roles?.filter(R => R.name !== 'patient').map((role, index) => {
                  return <SelectItem key={index} value={role.name}>{`${role.name} (${role._count})`}</SelectItem>
                })}

                <SelectSeparator />
                <SelectItem value={null as any}>
                  All ({roles?.reduce((acc, role) => acc + role._count, 0)})
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

        </div>

        <Separator />

        {/* pagination layout */}
        <div className="flex flex-col pb-16 min-h-[77vh]">
          <div className="flex-1">
            {/* grid for staffs */}
            <div className='grid xl:grid-cols-4 gap-4 lg:grid-cols-3 sm:grid-cols-2 py-5'>
              {/* staff card */}
              {staffList?.data.map((staff, i) => (
                <div className="mx-auto w-full h-28" key={i}>
                  <Link to={`${staff.id}`} className='flex items-center p-2.5 active:scale-95 rounded-lg ring-1 transition-all ring-gray-200 dark:ring-zinc-800 hover:shadow-lg dark:hover:shadow-zinc-800 '>
                    <UserImage url={staff.image!} gender={staff.gender!}
                      width='w-fit'
                      imageClass='w-24 h-24'
                    />
                    <span>
                      <p className='font-semibold'>{staff.name}</p>
                      <p className='text-sm'>{staff.id}</p>
                      <p className='text-sm'>{staff.phone}</p>
                      <p className='bg-gray-200 dark:bg-gray-700 w-fit rounded-sm px-1 text-sm'>{staff.role}</p>
                    </span>

                  </Link>
                </div>
              ))}
            </div>

            <EmptyList length={staffList.data.length} message='No staffs found' />

          </div>

          {/* Pagination */}

          <section>
            <CustomPagination
              total_pages={staffList?.total_pages}
              currentPage={+page}
              previous={(p) => setPage(p)}
              goTo={(p) => setPage(p)}
              next={(p) => setPage(p)}
            />
          </section>
        </div>

      </div>

    </>
  )
}

export default Staff