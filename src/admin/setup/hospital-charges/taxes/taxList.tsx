import AlertModel from "@/components/alertModel"
import LoaderModel from "@/components/loader"
import PermissionProtectedAction from "@/components/permission-protected-actions"
import ProtectedTable from "@/components/protected-table"
import TableActions from "@/components/table-actions"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useConfirmation } from "@/hooks/useConfirmation"
import { Plus, } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { z } from "zod"
import hospitalChargeApi from "../../services/charge"
import AddTaxformModel, { taxFormSchema } from "./addTaxformModel"

export interface TaxType {
  id: number,
  name: string,
  percentage: number
}


const TaxList = () => {

  const { confirm, confirmationProps } = useConfirmation()

  // Loaders
  const [isPending, setPending] = useState<boolean>(false)
  const [isLoader, setLoader] = useState<boolean>(false)

  // model states
  const [isAddTaxFormVisible, setAddTaxFormVisible] = useState<boolean>(false)

  // API States
  const [taxestList, setTaxlist] = useState<TaxType[]>([])
  const [taxDetails, setTaxDetails] = useState<TaxType | undefined>(undefined)


  const handleSubmit = async (formData: z.infer<typeof taxFormSchema>) => {
    try {

      let data;
      setPending(true);

      if (taxDetails) {
        data = await hospitalChargeApi.updateTax(taxDetails.id, formData);
        setTaxDetails(undefined);
      } else {
        data = await hospitalChargeApi.createTax(formData);
      }

      fetchTaxesList();
      toast.success(data.message);
      setAddTaxFormVisible(false);
    } catch ({ message }: any) {
      toast.error(message);
    } finally {
      setPending(false);
    }
  }


  const fetchTaxdetails = async (id: number) => {
    try {
      setLoader(true)
      const data = await hospitalChargeApi.getTaxDetails(id)
      setTaxDetails(data)
      setLoader(false)
    } catch ({ message }: any) {
      toast.error(message)
      setLoader(false)
    }
  }


  const fetchTaxesList = async () => {
    try {
      const data = await hospitalChargeApi.getTaxesList()
      setTaxlist(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  const onDelete = async (id: number) => {
    try {
      const isConfirmed = await confirm()
      if (!isConfirmed) return null
      const data = await hospitalChargeApi.deleteTax(id)
      fetchTaxesList();
      toast.success(data.message);
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  useEffect(() => {
    fetchTaxesList()
  }, [])



  return (
    <section className="flex flex-col pb-16 gap-y-5">

      <div className="flex justify-between">
        <h1 className="text-lg  font-semibold">Taxes List</h1>
        <PermissionProtectedAction action='create' module='Charge Tax'>
          <Button size='sm' onClick={() => setAddTaxFormVisible(true)}>
            <Plus /> Add Tax
          </Button>
        </PermissionProtectedAction>
      </div>

      <Separator />

      <ProtectedTable module='Charge Tax' renderTable={(show, canUpdate, canDelete) => (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead >Name</TableHead>
              <TableHead >Percentage %</TableHead>
              {show && <TableHead>Action</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {taxestList.map((tax) => {
              return <TableRow key={tax.id}>
                <TableCell>{tax.name}</TableCell>
                <TableCell>{tax.percentage}%</TableCell>
                {/* has both edit and delete */}
                <TableActions
                  show={show}
                  canUpdate={canUpdate}
                  canDelete={canDelete}
                  onEdit={async () => {
                    await fetchTaxdetails(tax.id)
                    setAddTaxFormVisible(true)
                  }}
                  onDelete={() => onDelete(tax.id)}
                />
              </TableRow>
            })}
          </TableBody>
        </Table>
      )} />


      {/* Models */}


      {/* Form model */}

      {isAddTaxFormVisible && (
        <AddTaxformModel Submit={handleSubmit}
          isPending={isPending}
          taxDetails={taxDetails!}
          onClick={() => {
            setAddTaxFormVisible(false);
            setTaxDetails(undefined)
          }}
        />
      )}


      {/* alert model */}
      {confirmationProps.isOpen && (
        <AlertModel
          cancel={() => confirmationProps.onCancel()}
          continue={() => confirmationProps.onConfirm()}
        />
      )}

      {/* loader model */}
      {isLoader && <LoaderModel />}
    </section>
  )
}

export default TaxList