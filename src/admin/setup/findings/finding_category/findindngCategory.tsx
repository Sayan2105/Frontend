import AlertModel from "@/components/alertModel"
import LoaderModel from "@/components/loader"
import PermissionProtectedAction from "@/components/permission-protected-actions"
import ProtectedTable from "@/components/protected-table"
import TableActions from "@/components/table-actions"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useConfirmation } from "@/hooks/useConfirmation"
import { findingCategory } from "@/types/setupTypes/finding"
import { Plus, } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { z } from "zod"
import findingApi from "../../services/finding"
import FindingCategoryForm, { FindingCategoryFormSchema } from "./findingCategoryForm"



const FindindngCategories = () => {

  const { confirm, confirmationProps } = useConfirmation()

  // Loaders
  const [isPending, setPending] = useState<boolean>(false)

  // model states
  const [isFindingFormVisible, setFindingFormVisible] = useState<boolean>(false)
  const [loaderModel, setLoaderModel] = useState<boolean>(false)

  // API States
  const [findingDetails, setfindingDetails] = useState<findingCategory | undefined>(undefined)
  const [findings, setFindings] = useState<findingCategory[]>([])


  const handleSubmit = async (formData: z.infer<typeof FindingCategoryFormSchema>) => {
    try {
      let data;
      setPending(true)
      if (findingDetails) {
        data = await findingApi.updateCategory(findingDetails.id, formData)
      } else {
        data = await findingApi.createCategory(formData)
      }
      toast.success(data.message)
      setPending(false)
      setFindingFormVisible(false)
      fetchFindingCategories()
    } catch ({ message }: any) {
      toast.error(message)
      setPending(false)
    }
  }


  const fetchFindingCategories = async () => {
    try {
      const data = await findingApi.getCategories()
      setFindings(data)
    } catch ({ message }: any) {
      toast.error(message)
      setPending(false)
    }
  }


  const fetchFindingCategoryDetails = async (id: number) => {
    try {
      setLoaderModel(true)
      const data = await findingApi.getCategoryDetails(id)
      setfindingDetails(data)
    } catch ({ message }: any) {
      toast.error(message)
      setPending(false)
    } finally {
      setLoaderModel(false)
    }
  }


  const onDelete = async (id: number) => {
    try {
      const isConfirmed = await confirm()
      if (!isConfirmed) return null
      const data = await findingApi.deleteCategory(id)
      toast.success(data.message)
      fetchFindingCategories()
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  useEffect(() => {
    fetchFindingCategories()
  }, [])


  return (
    <section className="flex flex-col pb-16 gap-y-5">

      <div className="flex justify-between">
        <h1 className="text-lg font-semibold">Categories</h1>
        <PermissionProtectedAction action='create' module='Finding Category'>
          <Button size='sm' onClick={() => { setFindingFormVisible(true) }}>
            <Plus /> Add Category
          </Button>
        </PermissionProtectedAction>
      </div>

      <Separator />

      <ProtectedTable module="Finding Category" renderTable={(show, canUpdate, canDelete) => (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              {show && <TableHead>Action</TableHead>}
            </TableRow>
          </TableHeader>

          <TableBody>
            {findings.map((finding) => {
              return <TableRow key={finding.id}>
                <TableCell>{finding.id}</TableCell>
                <TableCell>{finding.name}</TableCell>
                <TableActions
                  show={show}
                  canUpdate={canUpdate}
                  canDelete={canDelete}
                  onEdit={async () => {
                    await fetchFindingCategoryDetails(finding.id)
                    setFindingFormVisible(true)
                  }}
                  onDelete={() => onDelete(finding.id)}
                />
              </TableRow>
            })}
          </TableBody>
        </Table>
      )} />


      {/* Form Model */}

      {isFindingFormVisible && (
        <FindingCategoryForm
          categoryDetails={findingDetails!}
          Submit={handleSubmit}
          isPending={isPending}
          onClick={() => {
            setFindingFormVisible(false)
          }}
        />
      )}


      {/* Loader Model */}

      {loaderModel && <LoaderModel />}

      {/* Alert Model */}

      {confirmationProps.isOpen && (
        <AlertModel
          cancel={() => confirmationProps.onCancel()}
          continue={() => confirmationProps.onConfirm()}
        />
      )}



    </section>
  )
}

export default FindindngCategories