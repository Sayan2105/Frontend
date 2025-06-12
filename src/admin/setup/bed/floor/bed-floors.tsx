import AlertModel from '@/components/alertModel'
import EmptyList from '@/components/emptyList'
import PermissionProtectedAction from '@/components/permission-protected-actions'
import ProtectedTable from '@/components/protected-table'
import TableActions from '@/components/table-actions'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus } from 'lucide-react'
import { Fragment, useEffect } from 'react'
import { z } from 'zod'
import CreateBedModal, { FormField } from '../../../../components/form-modals/form-modal'
import useFloorHandlers from './floor-handlers'





export const SetupFloorSchema = z.object({
  name: z.string().nonempty('Floor name is required'),
  description: z.string()
})


const Fileds: FormField[] = [
  { name: 'name', type: 'text', label: 'Name' },
  { name: 'description', type: 'textarea', label: 'Description' }
]



const SetupBedFloors = () => {


  const {
    floors,
    isPending,
    form,
    handleSubmit,
    fetchFloors,
    setForm, onDelete,
    confirmationProps } = useFloorHandlers()



  useEffect(() => {
    fetchFloors()
  }, [])



  return (
    <section className="flex flex-col pb-16 gap-y-5">

      <div className="flex justify-between">
        <h1 className="text-lg font-semibold">Floors</h1>
        <PermissionProtectedAction action='create' module='Bed Floor'>
          <Button size='sm' onClick={() => { setForm(true) }}>
            <Plus /> Add Floor
          </Button>
        </PermissionProtectedAction>
      </div>

      <Separator />

      <ProtectedTable module='Bed Floor' renderTable={(show, canUpdate, canDelete) => (
        <Table>
          <TableHeader>
            <TableRow>
              {['Name', 'Description', 'Action'].map((item, index) => (
                <Fragment key={index}>
                  {item === 'Action' ? (show && <TableHead>{item}</TableHead>) : <TableHead>{item}</TableHead>}
                </Fragment>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {floors.map((floor) => {
              return <TableRow key={floor.id}>
                <TableCell>{floor.name}</TableCell>
                <TableCell>{floor.description}</TableCell>
                <TableActions
                  show={show}
                  canUpdate={canUpdate}
                  canDelete={canDelete}
                  onDelete={() => onDelete(floor.id)}
                  exclude={{ edit: true }}
                />
              </TableRow>
            })}
          </TableBody>
        </Table>
      )} />

      {/* Models */}

      {<EmptyList length={floors.length} message='No Floors Found' />}


      {/* form model */}
      {form && (
        <CreateBedModal
          title='Add Floor'
          isPending={isPending}
          Submit={handleSubmit}
          schema={SetupFloorSchema}
          fields={Fileds}
          onClick={() => setForm(false)}
        />
      )}


      {/* Alert model */}
      {confirmationProps.isOpen && <AlertModel
        cancel={() => confirmationProps.onCancel()}
        continue={() => confirmationProps.onConfirm()}
      />}

    </section>
  )

}





export default SetupBedFloors










