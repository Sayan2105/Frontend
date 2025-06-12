import AlertModel from "@/components/alertModel"
import LoaderModel from "@/components/loader"
import PermissionProtectedAction from "@/components/permission-protected-actions"
import ProtectedTable from "@/components/protected-table"
import TableActions from "@/components/table-actions"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useConfirmation } from "@/hooks/useConfirmation"
import { findingName } from "@/types/setupTypes/finding"
import { Plus, } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { z } from "zod"
import findingApi from "../../services/finding"
import FindingNameForm, { FindingNameFormSchema } from "./findingNameForm"

const FindingNames = () => {

  const { confirm, confirmationProps } = useConfirmation()

  // Loaders
  const [isPending, setPending] = useState<boolean>(false)

  // model states
  const [isFindingNameFormVisible, setFindingNameFormVisible] = useState<boolean>(false)
  const [loaderModel, setLoaderModel] = useState<boolean>(false)

  // API States
  const [findingNameDetails, setfindingNameDetails] = useState<findingName | undefined>(undefined)
  const [findingNames, setFindingNames] = useState<findingName[]>([])


  // handles both upsert
  const handleSubmit = async (formData: z.infer<typeof FindingNameFormSchema>) => { //
    try {
      let data;
      setPending(true)
      if (findingNameDetails) {
        data = await findingApi.updateName(findingNameDetails.id, formData)
        setfindingNameDetails(undefined)
      } else {
        data = await findingApi.createName(formData)
      }
      toast.success(data.message)
      setPending(false)
      setFindingNameFormVisible(false)
      fetchFindingNames()
    } catch ({ message }: any) {
      toast.error(message)
      setPending(false)
    }
  }


  const fetchFindingNames = async () => {
    try {
      const data = await findingApi.getNames()
      setFindingNames(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  const fetchFindingNameDetails = async (id: number) => {
    try {
      setLoaderModel(true)
      const data = await findingApi.getNameDetails(id)
      setfindingNameDetails(data)
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setLoaderModel(false)
    }
  }


  const onDelete = async (id: number) => {
    try {
      const isConfirmed = await confirm()
      if (!isConfirmed) return null
      const data = await findingApi.deleteName(id)
      toast.success(data.message)
      fetchFindingNames()
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  useEffect(() => {
    fetchFindingNames()
  }, [])


  return (
    <section className="flex flex-col pb-16 gap-y-5">

      <div className="flex justify-between">
        <h1 className="text-lg font-semibold">Findigs</h1>
        <PermissionProtectedAction action='create' module='Setup Finding'>
          <Button size='sm' onClick={() => { setFindingNameFormVisible(true) }}>
            <Plus /> Add Finding
          </Button>
        </PermissionProtectedAction>
      </div>

      <Separator />

      <ProtectedTable module="Setup Finding" renderTable={(show, canUpdate, canDelete) => (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Finding</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              {show && <TableHead>Action</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {findingNames.map((name) => {
              return <TableRow key={name.id}>
                <TableCell>{name.name}</TableCell>
                <TableCell>{name.category.name}</TableCell>
                <TableCell>{name.description}</TableCell>
                <TableActions
                  show={show}
                  canUpdate={canUpdate}
                  canDelete={canDelete}
                  onEdit={async () => {
                    await fetchFindingNameDetails(name.id)
                    setFindingNameFormVisible(true)
                  }}
                  onDelete={() => onDelete(name.id)}
                />
              </TableRow>
            })}
          </TableBody>
        </Table>
      )} />


      {/* Finding name form */}

      {isFindingNameFormVisible && (
        <FindingNameForm
          nameDetails={findingNameDetails!}
          Submit={handleSubmit}
          isPending={isPending}
          onClick={() => {
            setFindingNameFormVisible(false)
            setfindingNameDetails(undefined)
          }}
        />
      )}


      {/* Loder model */}

      {loaderModel && (
        <LoaderModel />
      )}

      {/* Alert model */}

      {confirmationProps.isOpen && (
        <AlertModel
          cancel={() => confirmationProps.onCancel()}
          continue={() => confirmationProps.onConfirm()} />
      )}

    </section>
  )
}

export default FindingNames