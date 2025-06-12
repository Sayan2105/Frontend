import AlertModel from "@/components/alertModel"
import CustomPagination from "@/components/customPagination"
import EmptyList from "@/components/emptyList"
import LoaderModel from "@/components/loader"
import PermissionProtectedAction from "@/components/permission-protected-actions"
import ProtectedTable from "@/components/protected-table"
import TableActions from "@/components/table-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { page_limit } from "@/globalData"
import { Plus } from "lucide-react"
import { parseAsInteger, useQueryState } from "nuqs"
import { useEffect } from "react"
import useMedicationHandlers from "./medication-handlers"
import MedicationForm from "@/components/form-modals/medication-form"




const Medication = () => {

  // Query params
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [search, setSearch] = useQueryState('search')

  const { medications, isPending,modalLoading, form, getMedications, getMedicationDetails, handleSubmit, setForm, onDelete, current, setCurrent, confirmationProps } = useMedicationHandlers({ page, search, limit: page_limit })


  const onSearch = (date: string) => {
    date ? setSearch(date) : setSearch(null)
    setPage(1)
  }

  useEffect(() => {
    getMedications()
  }, [page, search])



  return (
    <>
      <section className="flex flex-col gap-y-5">

        <div className="flex justify-between">
          <h1 className="text-lg text-gray-800 dark:text-white font-semibold">Medication</h1>
          <PermissionProtectedAction action="create" module="Medication">
            <Button size='sm' onClick={() => setForm(true)}>
              <Plus /> Add Medication
            </Button>
          </PermissionProtectedAction>
        </div>

        <Separator />

        <div className="sm:w-48 space-y-1">
          <p className="text-sm text-gray-700 dark:text-gray-300">Search by date</p>
          <Input type="date" onChange={(e) => { onSearch(e.target.value) }} defaultValue={search!} />
        </div>

        <Separator />

        {/* pagination */}
        <section className="flex flex-col gap-y-5 min-h-[60vh]">
          <div className="flex-1">
            <ProtectedTable
              module="Medication"
              renderTable={(show, canUpdate, canDelete) => (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Medicine Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Dose</TableHead>
                      {show && <TableHead>Action</TableHead>}
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {medications.data.map((medication, i) => {
                      return <TableRow key={i}>
                        <TableCell >{medication.date}</TableCell>
                        <TableCell>{medication.medicine.name}</TableCell>
                        <TableCell>{medication.category.name}</TableCell>
                        <TableCell>{medication.medicine.unit.name}</TableCell>
                        <TableCell>{medication.time}</TableCell>
                        <TableCell>{medication.dose}</TableCell>
                        <TableActions
                          show={show}
                          canUpdate={canUpdate}
                          canDelete={canDelete}
                          onEdit={async () => {
                            await getMedicationDetails(medication.id)
                            setForm(true)
                          }}
                          onDelete={() => onDelete(medication.id)}
                        />
                      </TableRow>
                    })}
                  </TableBody>
                </Table>
              )}
            />

            <EmptyList length={medications.data.length} message="No medications found" />
          </div>

          {/* pagination buttons */}
          <section>
            <CustomPagination
              total_pages={medications?.total_pages!}
              currentPage={page}
              previous={(p) => setPage(p)}
              goTo={(p) => setPage(p)}
              next={(p) => setPage(p)}
            />
          </section>
        </section>
      </section>



      {/* models */}

      {
        form && <MedicationForm
          medicationDetails={current!}
          Submit={handleSubmit}
          isPending={isPending}
          onClick={() => {
            setForm(false);
            setCurrent(undefined)
          }}
        />
      }


      {/* Alert Model */}

      {
        confirmationProps.isOpen && <AlertModel
          cancel={() => { confirmationProps.onCancel() }}
          continue={() => { confirmationProps.onConfirm() }}
        />
      }


      {/* Loader model */}

      {modalLoading && (<LoaderModel />)}

    </>
  )
}

export default Medication