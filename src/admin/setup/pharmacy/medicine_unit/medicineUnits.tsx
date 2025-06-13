import AlertModel from "@/components/alertModel"
import EmptyList from "@/components/emptyList"
import PermissionProtectedAction from "@/components/permission-protected-actions"
import ProtectedTable from "@/components/protected-table"
import TableActions from "@/components/table-actions"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useConfirmation } from "@/hooks/useConfirmation"
import { medicineUnit } from "@/types/setupTypes/pharmacy"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { createMedicineUnit, deleteMedicineUnit, getMedicineUnits } from "../service"
import MedicineUnitForm from "./medicineUnitForm"




const MedicineUnits = () => {

  const { confirm, confirmationProps } = useConfirmation()

  // Loaders
  const [isPending, setPending] = useState<boolean>(false)

  const [form, setForm] = useState(false)

  // API States
  const [medicineUnits, setMedicineUnits] = useState<medicineUnit[]>([])



  const handleSubmit = async (formData: any) => {
    try {
      setPending(true)
      const data = await createMedicineUnit(formData)
      toast.success(data.message)
      setForm(false)
      fetchMedicineUnits()
    } catch ({ message }: any) {
      toast.error(message);
    } finally {
      setPending(false);
    }
  }


  const onDelete = async (id: number) => {
    try {
      const isConfirmed = await confirm()
      if (!isConfirmed) return null
      const data = await deleteMedicineUnit(id)
      toast.success(data.message)
      fetchMedicineUnits()
    } catch ({ message }: any) {
      toast.error(message);
    }
  }


  const fetchMedicineUnits = async () => {
    try {
      const data = await getMedicineUnits()
      setMedicineUnits(data)
    } catch ({ message }: any) {
      toast.error(message);
    }
  }


  useEffect(() => {
    fetchMedicineUnits()
  }, [])



  return (
    <section className="flex flex-col gap-y-5 pb-16">

      <div className="flex justify-between">
        <h1 className="text-lg font-semibold">Units</h1>
        <PermissionProtectedAction action='create' module='Medicine Unit'>
          <Button size='sm' onClick={() => setForm(true)}>
            <Plus /> Add Unit
          </Button>
        </PermissionProtectedAction>
      </div>

      <Separator />

      <ProtectedTable module='Medicine Unit' renderTable={(show, canUpdate, canDelete) => (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              {show && <TableHead>Action</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {medicineUnits.map((unit) => (
              <TableRow key={unit.id}>
                <TableCell>{unit.id}</TableCell>
                <TableCell>{unit.name}</TableCell>
                <TableActions
                  show={show}
                  canUpdate={canUpdate}
                  canDelete={canDelete}
                  onDelete={() => onDelete(unit.id)}
                  exclude={{ edit: true }}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>

      )} />

      <EmptyList length={medicineUnits.length} />


      {/* Models */}

      {form && (
        <MedicineUnitForm
          isPending={isPending}
          Submit={handleSubmit}
          onClick={() => setForm(false)}
        />
      )}


      {/* Alert mdoel */}

      {confirmationProps.isOpen && (
        <AlertModel
          continue={() => confirmationProps.onConfirm()}
          cancel={() => confirmationProps.onCancel()}
        />
      )}

    </section>
  )
}

export default MedicineUnits