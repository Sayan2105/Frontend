import AlertModel from "@/components/alertModel"
import LoaderModel from "@/components/loader"
import PermissionProtectedAction from "@/components/permission-protected-actions"
import ProtectedTable from "@/components/protected-table"
import TableActions from "@/components/table-actions"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useConfirmation } from "@/hooks/useConfirmation"
import { operationCategoryType } from "@/types/setupTypes/setupOpeartion"
import { Plus, } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { z } from "zod"
import { createOperationCategory, deleteOperationCategory, getOperationCategories, getOperationCategoryDetails, updateOperationCategory } from "../service"
import AddOperationCategoryForm, { AddOperationCategoryFormSchema } from "./addOperationCategoryForm"

const OperationCategories = () => {

  const { confirm, confirmationProps } = useConfirmation()

  // Loaders
  const [isPending, setPending] = useState<boolean>(false)
  const [isLoader, setLoader] = useState<boolean>(false)


  // model states
  const [isAddOpCatFormVisible, setAddOpCatFormVisible] = useState<boolean>(false)

  // API States
  const [operationCategories, setoperationCategories] = useState<operationCategoryType[]>([])
  const [operationCategoryDetails, setOperationCategoryDetails] = useState<operationCategoryType | undefined>(undefined)



  const handleSubmit = async (formData: z.infer<typeof AddOperationCategoryFormSchema>) => {
    try {
      setPending(true)
      let data;
      if (operationCategoryDetails) {
        data = await updateOperationCategory(operationCategoryDetails.id, formData)
        setOperationCategoryDetails(undefined)
      } else {
        data = await createOperationCategory(formData)
      }
      fetchOperationCategories()
      setAddOpCatFormVisible(false)
      toast.success(data.message)
    } catch ({ message }: any) {
      toast.error(message);
    } finally {
      setPending(false);
    }
  }


  const fetchOperationCategories = async () => {
    try {
      const data = await getOperationCategories()
      setoperationCategories(data)
    } catch ({ message }: any) {
      toast.error(message);
    } finally {
      setPending(false);
    }
  }


  const fetchOperationCategoryDetails = async (id: number) => {
    try {
      setLoader(true)
      const data = await getOperationCategoryDetails(id)
      setOperationCategoryDetails(data)
    } catch ({ message }: any) {
      toast.error(message);
    } finally {
      setLoader(false)
    }
  }


  const onDelete = async (id: number) => {
    try {
      const isConfirmed = await confirm()
      if (!isConfirmed) return null
      const data = await deleteOperationCategory(id)
      toast.success(data.message)
      fetchOperationCategories()
    } catch ({ message }: any) {
      toast.error(message);
    }
  }


  useEffect(() => {
    fetchOperationCategories()
  }, [])


  return (
    <section className="flex flex-col gap-y-5 pb-16">

      <div className="flex justify-between">
        <h1 className="text-lg font-semibold">Category List</h1>
        <PermissionProtectedAction action='create' module='Operation Category'>
          <Button size='sm' onClick={() => { setAddOpCatFormVisible(true) }}>
            <Plus /> Add Category
          </Button>
        </PermissionProtectedAction>
      </div>

      <Separator />

      <ProtectedTable module='Operation Category' renderTable={(show, canUpdate, canDelete) => (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              {show && <TableHead>Action</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {operationCategories.map((category) => {
              return <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableActions
                  show={show}
                  canUpdate={canUpdate}
                  canDelete={canDelete}
                  onEdit={async () => {
                    await fetchOperationCategoryDetails(category.id)
                    setAddOpCatFormVisible(true)
                  }}
                  onDelete={() => onDelete(category.id)}
                />
              </TableRow>
            })}
          </TableBody>
        </Table>
      )} />

      {/* Model */}

      {isAddOpCatFormVisible && (
        <AddOperationCategoryForm
          Submit={handleSubmit}
          categoryDetails={operationCategoryDetails!}
          isPending={isPending}
          onClick={() => {
            setAddOpCatFormVisible(false);
            setOperationCategoryDetails(undefined)
          }}
        />
      )}


      {/* Alert Model */}

      {confirmationProps.isOpen && (
        <AlertModel
          cancel={() => confirmationProps.onCancel()}
          continue={() => confirmationProps.onConfirm()}
        />
      )}

      {/* Loader model */}
      {isLoader && <LoaderModel />}

    </section>
  )
}

export default OperationCategories