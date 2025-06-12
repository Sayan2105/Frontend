import AlertModel from "@/components/alertModel"
import CustomPagination from "@/components/customPagination"
import EmptyList from "@/components/emptyList"
import FormModal, { FormField } from "@/components/form-modals/form-modal"
import PermissionProtectedAction from "@/components/permission-protected-actions"
import ProtectedTable from "@/components/protected-table"
import TableActions from "@/components/table-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { page_limit } from "@/globalData"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { parseAsInteger, useQueryState } from "nuqs"
import { useEffect } from "react"
import { useDebouncedCallback } from "use-debounce"
import { z } from "zod"
import useConsultantRegister from "./consultant-register-handlers"



export const ConsultantRegisterSchema = z.object({
  applied_date: z.string().nonempty("Applied date is required"),
  consultant_date: z.string().nonempty("Consultant date is required"),
  doctorId: z.coerce.number().min(1, { message: 'Doctor id is required' }).default(0),
  instructions: z.string().nonempty("Instructions is required"),
})

const IpdCounsultantRegisters = () => {

  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [search, setSearch] = useQueryState('search')
  const { doctors, getDoctors, registers, getRegisters, current, setCurrent, handleSubmit, onDelete, confirmationProps, isPending, form, setForm } = useConsultantRegister({ page, search, limit: page_limit })


  const formFields: FormField[] = [
    { name: "applied_date", type: "date", label: "Applied Date" },
    { name: "consultant_date", type: "date", label: "Consultant Date" },
    { name: "doctorId", type: "select", label: "Doctor", selectOptions: doctors.map((doctor) => ({ value: doctor.id, label: doctor.name })) },
    { name: "instructions", type: "textarea", label: "Instructions" },
  ]


  const onSearch = useDebouncedCallback((value: string) => {
    value ? setSearch(value) : setSearch(null)
    setPage(1)
  }, 400)


  useEffect(() => {
    getDoctors()
  }, [])

  useEffect(() => {
    getRegisters()
  }, [page, search])




  return (

    <section className="flex flex-col pb-16 gap-y-5">
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold">Consultant Registers</h1>
        <PermissionProtectedAction action="create" module="Consultant Reg">
          <Button size="sm" onClick={() => { setForm(true); }} > <Plus /> Add Consultant Register </Button>
        </PermissionProtectedAction>
      </div>

      <Separator />

      <div className="sm:w-48 space-y-1">
        <p className="text-sm text-gray-400">Search</p>
        <Input type="text" defaultValue={search!} onChange={(e) => { onSearch(e.target.value) }} placeholder="date , doctor" />
      </div>

      <Separator />

      <div className="flex flex-col gap-y-10 min-h-[60vh]">
        <div className="flex-1">
          <ProtectedTable
            module="Consultant Reg"
            renderTable={(show, canUpdate, canDelete) => (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Consultant Date</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Instructions</TableHead>
                    {show && <TableHead>Action</TableHead>}
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {registers.data.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell>{item.applied_date}</TableCell>
                      <TableCell>{item.consultant_date}</TableCell>
                      <TableCell>{item.doctor.name}</TableCell>
                      <TableCell>{item.instructions}</TableCell>
                      <TableActions
                        show={show}
                        canUpdate={canUpdate}
                        canDelete={canDelete}
                        onEdit={() => { setCurrent(item); setForm(true) }}
                        onDelete={() => onDelete(item.id)}
                      />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          />

          {<EmptyList length={registers.data.length} message="No Consultant Registers Found" />}
        </div>

        {/* Pagination */}

        <CustomPagination
          currentPage={page}
          total_pages={registers?.total_pages}
          next={setPage}
          goTo={setPage}
          previous={setPage}
        />
      </div>


      {/* form model */}
      {
        form && (
          <FormModal
            title={current ? 'Update' : "Consultant Register"}
            schema={ConsultantRegisterSchema}
            fields={formFields}
            Submit={handleSubmit}
            isPending={isPending}
            defaultValues={current!}
            onClick={() => { setForm(false); setCurrent(null) }}
          />
        )
      }


      {/* Alert model */}
      {
        confirmationProps.isOpen && (
          <AlertModel
            cancel={() => confirmationProps.onCancel()}
            continue={() => confirmationProps.onConfirm()}
          />
        )
      }

    </section >
  )
}



export default IpdCounsultantRegisters

