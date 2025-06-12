import AlertModel from '@/components/alertModel'
import EmptyList from '@/components/emptyList'
import FormModal from '@/components/form-modals/form-modal'
import PermissionProtectedAction from '@/components/permission-protected-actions'
import ProtectedTable from '@/components/protected-table'
import TableActions from '@/components/table-actions'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { StaffDesignationSchema } from '@/formSchemas/setupSectionSchemas/setup-staff'
import { Plus } from 'lucide-react'
import { useEffect } from 'react'
import specializationFields from './form-fields'
import useSpecialization from './handlers'



const StaffSpecializations = () => {


  const { specializations, getSpecializations, current, setCurrent, isPending, form, setForm, handleSubmit, onDelete, confirmationProps } = useSpecialization()


  useEffect(() => {
    getSpecializations()
  }, [])


  return (
    <>

      <section className="flex flex-col pb-16 gap-y-5">

        <div className="flex justify-between">
          <h1 className="text-lg font-semibold">Specilizations</h1>
          <PermissionProtectedAction action='create' module='Staff Specialization'>
            <Button size='sm' onClick={() => { setForm(true) }}>
              <Plus /> Add Specialization
            </Button>
          </PermissionProtectedAction>
        </div>

        <Separator />

        <ProtectedTable
          module='Staff Specialization'
          renderTable={(show, canUpdate, canDelete) => (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Specialization</TableHead>
                  {show && <TableHead>Action</TableHead>}
                </TableRow>
              </TableHeader>

              <TableBody>
                {specializations.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>{item.name}</TableCell>
                    {/* has own table cell */}
                    <TableActions
                      show={show}
                      canUpdate={canUpdate}
                      canDelete={canDelete}
                      onDelete={() => onDelete(item.id)}
                      onEdit={async () => { setCurrent(item), setForm(true) }}
                    />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        />


        <EmptyList length={specializations.length} message='No specializations found' />

        {/* Alert model */}
        {confirmationProps.isOpen && <AlertModel
          cancel={() => confirmationProps.onCancel()}
          continue={confirmationProps.onConfirm}
        />}

      </section>

      {form && (
        <FormModal
          title="Designation"
          schema={StaffDesignationSchema}
          fields={specializationFields}
          isPending={isPending}
          Submit={handleSubmit}
          defaultValues={current!}
          onClick={() => { setForm(false) }}
        />
      )}
    </>
  )
}




export default StaffSpecializations