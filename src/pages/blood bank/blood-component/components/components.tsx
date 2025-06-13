import AlertModel from '@/components/alertModel'
import CustomPagination from '@/components/customPagination'
import EmptyList from '@/components/emptyList'
import PermissionProtectedAction from '@/components/permission-protected-actions'
import ProtectedTable from '@/components/protected-table'
import TableActions from '@/components/table-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { page_limit } from '@/globalData'
import { Plus } from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import BloodComponentForm from './form'
import useBloodComponent from './handlers'




const BloodComponents = () => {

  // params
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [search, setSearch] = useQueryState('search')

  const onSearch = useDebouncedCallback(async (value: string) => {
    value ? (setSearch(value)) : (setSearch(null))
    setPage(1) // always should execute
  }, 400)

  const { bloodComponents, getBloodComponents, handleSubmit, onDelete, confirmationProps, form, setForm } = useBloodComponent({ page, limit: page_limit, search })


  useEffect(() => {
    getBloodComponents()
  }, [page, search])


  return (

    <>
      <div className='my-2 flex flex-col'>

        {/* top bar */}
        <div className='flex py-3 flex-col md:flex-row gap-y-2 md:items-center md:justify-between border-b border-gray-200 dark:border-gray-800'>
          <h1 className='font-semibold tracking-tight'>Blood Components</h1>
          <div className='flex gap-x-2 overflow-x-auto'>

            <PermissionProtectedAction action='create' module='Blood Component'>
              <Button type='button' size={'sm'}
                onClick={() => { setForm(true) }} >
                <Plus /> Add Component
              </Button>
            </PermissionProtectedAction>

          </div>
        </div>


        {/* search bar */}

        <div className='flex py-3 flex-col md:flex-row gap-y-4 md:items-center md:justify-between border-b border-gray-200 dark:border-gray-800'>
          <div className='flex gap-x-2'>
            <Input type='text' height='10px' placeholder='search' defaultValue={search!} onChange={(e) => { onSearch(e.target.value) }} />
          </div>
        </div>


        <div className="flex flex-col gap-y-5 min-h-[75vh] mb-16 mt-5">
          <div className="flex-1">
            <ProtectedTable module='Blood Component' renderTable={(show, canUpdate, canDelete) => (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Component</TableHead>
                    <TableHead>Bag</TableHead>
                    <TableHead>Blood Group</TableHead>
                    <TableHead>Lot</TableHead>
                    <TableHead>Institution</TableHead>
                    <TableHead>Status</TableHead>
                    {show && <TableHead>Actions</TableHead>}
                  </TableRow>
                </TableHeader>


                <TableBody>
                  {bloodComponents.data.map((item) => {
                    return <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.bag}</TableCell>
                      <TableCell>{item.blood_group}</TableCell>
                      <TableCell>{item.lot}</TableCell>
                      <TableCell>{item.institution}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableActions
                        show={show}
                        canUpdate={canUpdate}
                        canDelete={canDelete}
                        onDelete={() => onDelete(item.id)}
                        exclude={{ edit: true }}
                      />
                    </TableRow>
                  })}
                </TableBody>
              </Table>
            )} />

            {/* if no data will be recive */}
            <EmptyList length={bloodComponents.data.length} message='No data found' />
          </div>

          {/* Pagination */}

          <CustomPagination
            total_pages={bloodComponents?.total_pages}
            currentPage={+page}
            previous={setPage}
            goTo={setPage}
            next={setPage}
          />
        </div>
      </div>


      {/* Alert Model */}
      {confirmationProps.isOpen && <AlertModel
        cancel={() => confirmationProps.onCancel()}
        continue={() => confirmationProps.onConfirm()}
      />}

      {form && (
        <BloodComponentForm
          Submit={handleSubmit}
          isPending={false}
          onClick={() => setForm(false)}
        />
      )}


    </>

  )
}








export default BloodComponents