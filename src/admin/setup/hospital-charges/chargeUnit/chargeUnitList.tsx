import AlertModel from '@/components/alertModel'
import PermissionProtectedAction from '@/components/permission-protected-actions'
import ProtectedTable from '@/components/protected-table'
import TableActions from '@/components/table-actions'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useConfirmation } from '@/hooks/useConfirmation'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { z } from 'zod'
import hospitalChargeApi from '../../services/charge'
import AddUnitFormModel, { unitFormSchema } from './addUnitFormModel'


export interface unitType {
  "id": number,
  "unit_type": string
}


const ChargeUnitList = () => {

  const { confirm, confirmationProps } = useConfirmation()

  // Loaders
  const [isPending, setPending] = useState<boolean>(false)


  // model states
  const [isAddUnitFormVisible, setAddUnitFormVisible] = useState<boolean>(false)

  // API States
  const [unitDetails, setUnitdetails] = useState<unitType | undefined>(undefined)
  const [unitsList, setUnitsList] = useState<unitType[]>([])


  // performing upsert
  const handleSubmit = async (formData: z.infer<typeof unitFormSchema>) => {
    try {
      let data;
      setPending(true)
      if (unitDetails) {
        data = await hospitalChargeApi.updateUnit(unitDetails.id, formData)
        setUnitdetails(undefined)
      } else {
        data = await hospitalChargeApi.createUnit(formData)
      }
      toast.success(data.message)
      setAddUnitFormVisible(false)
      fetchUnitsList()
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setPending(false)
    }
  }


  // fetching list
  const fetchUnitsList = async () => {
    try {
      const data = await hospitalChargeApi.getUnitList()
      setUnitsList(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  // fetching details for update mode
  const fetchUnitdetails = async (id: number) => {
    try {
      const data = await hospitalChargeApi.getUnitDetails(id)
      setUnitdetails(data)
      setAddUnitFormVisible(true)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  // deleting details
  const onDelete = async (id: number) => {
    try {
      const isConfirmed = await confirm()
      if (!isConfirmed) return null
      const data = await hospitalChargeApi.deleteUnit(id)
      toast.success(data.message)
      fetchUnitsList()
    } catch ({ message }: any) {
      toast.error(message)
    }
  }



  useEffect(() => {
    fetchUnitsList()
  }, [])


  return (
    <section className="flex flex-col pb-16 gap-y-5">

      <div className="flex justify-between">
        <h1 className="text-lg font-semibold">Unit List</h1>
        <PermissionProtectedAction action='create' module='Charge Unit'>
          <Button size='sm' onClick={() => { setAddUnitFormVisible(true) }}>
            <Plus /> Add Unit
          </Button>
        </PermissionProtectedAction>
      </div>

      <Separator />

      <ProtectedTable
        module='Charge Unit'
        renderTable={(show, canUpdate, canDelete) => (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Unit Type</TableHead>
                {show && <TableHead>Action</TableHead>}
              </TableRow>
            </TableHeader>

            <TableBody>
              {unitsList.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>{item.unit_type}</TableCell>
                  {/* has own table cell */}
                  <TableActions
                    show={show}
                    canUpdate={canUpdate}
                    canDelete={canDelete}
                    onEdit={async () => { await fetchUnitdetails(item.id), setAddUnitFormVisible(true) }}
                    onDelete={() => onDelete(item.id)}
                    exclude={{ edit: true }}
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      />

      {/* Models */}

      {/* form model */}
      {isAddUnitFormVisible && (
        <AddUnitFormModel isPending={isPending} Submit={handleSubmit} unitDetails={unitDetails!}
          onClick={() => { setAddUnitFormVisible(false); setUnitdetails(undefined) }}
        />
      )}


      {/* Alert model */}
      {confirmationProps.isOpen && <AlertModel
        cancel={() => confirmationProps.onCancel()}
        continue={confirmationProps.onConfirm}
      />}

    </section>
  )
}

export default ChargeUnitList