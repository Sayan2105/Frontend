import AlertModel from '@/components/alertModel'
import FormModal from '@/components/form-modals/form-modal'
import PermissionProtectedAction from '@/components/permission-protected-actions'
import ProtectedTable from '@/components/protected-table'
import TableActions from '@/components/table-actions'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { StaffDepartmentSchema } from '@/formSchemas/setupSectionSchemas/setup-staff'
import { Plus } from 'lucide-react'
import { useEffect } from 'react'
import departmentFields from './form-fields'
import useStaffDepartment from './handlers'
import EmptyList from '@/components/emptyList'

const StaffDepartments = () => {


  const { departments, getDepartments, current, setCurrent, isPending, form, setForm, handleSubmit, onDelete, confirmationProps } = useStaffDepartment()


  useEffect(() => {
    getDepartments()
  }, [])


  return (
    <>

      <section className="flex flex-col pb-16 gap-y-5">

        <div className="flex justify-between">
          <h1 className="text-lg font-semibold">Departments</h1>
          <PermissionProtectedAction action='create' module='Staff Department'>
            <Button size='sm' onClick={() => { setForm(true) }}>
              <Plus /> Add Department
            </Button>
          </PermissionProtectedAction>
        </div>

        <Separator />

        <ProtectedTable
          module='Staff Department'
          renderTable={(show, canUpdate, canDelete) => (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Department</TableHead>
                  {show && <TableHead>Action</TableHead>}
                </TableRow>
              </TableHeader>

              <TableBody>
                {departments.map((item, i) => (
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


        <EmptyList length={departments.length} message='No departments found' />

        {/* Alert model */}
        {confirmationProps.isOpen && <AlertModel
          cancel={() => confirmationProps.onCancel()}
          continue={confirmationProps.onConfirm}
        />}

      </section>

      {form && (
        <FormModal
          title="Department"
          schema={StaffDepartmentSchema}
          fields={departmentFields}
          isPending={isPending}
          Submit={handleSubmit}
          defaultValues={current!}
          onClick={() => { setForm(false) }}
        />
      )}
    </>
  )
}

export default StaffDepartments