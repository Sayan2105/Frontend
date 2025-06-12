import AlertModel from "@/components/alertModel"
import CustomPagination from "@/components/customPagination"
import EmptyList from "@/components/emptyList"
import FormModal from "@/components/form-modals/form-modal"
import PermissionProtectedAction from "@/components/permission-protected-actions"
import ProtectedTable from "@/components/protected-table"
import TableActions from "@/components/table-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { createAmbulanceSchema } from "@/formSchemas/ambulance"
import { page_limit } from "@/globalData"
import { Plus } from "lucide-react"
import { parseAsInteger, useQueryState } from "nuqs"
import { useEffect } from "react"
import { useDebouncedCallback } from "use-debounce"
import { CreateAmbulanceFields } from "./form-fileds"
import useAmbulances from "./handlers"

const Ambulances = () => {

  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [search, setSearch] = useQueryState('search')

  const { ambulances, getAmbulances, isPending, form, handleSubmit, setForm, onDelete, current, setCurrent, confirmationProps } = useAmbulances({ page, limit: page_limit, search })

  const onSearch = useDebouncedCallback(async (value: string) => {
    value ? (setSearch(value)) : (setSearch(null))
    setPage(1) // always should execute
  }, 400)


  useEffect(() => {
    getAmbulances()
  }, [page, search])


  return (
    <>
      <div className='my-2 flex flex-col'>

        {/* top bar */}
        <div className='flex py-3 flex-col md:flex-row gap-y-2 md:items-center md:justify-between border-b border-gray-200 dark:border-gray-800'>
          <h1 className='font-semibold tracking-tight'>Ambulances</h1>
          <div className='flex gap-x-2 overflow-x-auto'>

            <PermissionProtectedAction action='create' module='Ambulance'>
              <Button type='button' size={'sm'}
                onClick={() => setForm(true)} >
                <Plus /> Add Ambulance
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
            <ProtectedTable module='Ambulance' renderTable={(show, canUpdate, canDelete) => (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Vehicle Number</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Color</TableHead>
                    <TableHead>Year Made</TableHead>
                    <TableHead>Driver Name</TableHead>
                    <TableHead>Driver Contact</TableHead>
                    <TableHead>Driver License Number</TableHead>
                    <TableHead>Vehicle Type</TableHead>
                    {show && <TableHead>Action</TableHead>}
                  </TableRow>
                </TableHeader>


                <TableBody>
                  {ambulances.data.map((amb) => {
                    return <TableRow key={amb.id}>
                      <TableCell>{amb.id}</TableCell>
                      <TableCell className='whitespace-nowrap'>{amb.vehicleNumber}</TableCell>
                      <TableCell>{amb.model}</TableCell>
                      <TableCell>{amb.color}</TableCell>
                      <TableCell>{amb.yearMade}</TableCell>
                      <TableCell>{amb.driverName}</TableCell>
                      <TableCell>{amb.driverContact}</TableCell>
                      <TableCell>{amb.driverLicenseNumber}</TableCell>
                      <TableCell>{amb.vehicleType}</TableCell>
                      <TableActions
                        show={show}
                        canUpdate={canUpdate}
                        canDelete={canDelete}
                        onDelete={() => onDelete(amb.id)}
                        onEdit={() => { setCurrent(amb); setForm(true) }}
                      />
                    </TableRow>
                  })}
                </TableBody>
              </Table>
            )} />

            <EmptyList length={ambulances?.data?.length} message='No data found' />
          </div>

          {/* Pagination */}

          <CustomPagination
            total_pages={ambulances?.total_pages}
            currentPage={page}
            previous={setPage}
            goTo={setPage}
            next={setPage}
          />
        </div>


      </div>



      {form && (
        < FormModal
          title={current ? 'Edit Ambulance' : 'Add Ambulance'}
          Submit={handleSubmit}
          schema={createAmbulanceSchema}
          fields={CreateAmbulanceFields}
          height="h-[60vh] sm:h-[50vh]"
          isPending={isPending}
          defaultValues={current!}
          onClick={() => (setForm(false), setCurrent(null))}
        />
      )}


      {/* Alert Model */}
      {confirmationProps.isOpen && <AlertModel
        cancel={() => confirmationProps.onCancel()}
        continue={() => confirmationProps.onConfirm()}
      />}

    </>
  )

}




export default Ambulances





