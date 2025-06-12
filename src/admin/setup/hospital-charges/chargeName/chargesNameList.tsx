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
import { chargeNameFormSchema } from "@/formSchemas/setupSectionSchemas/ChargeNameFormSchema"
import { currencySymbol } from "@/helpers/currencySymbol"
import { useConfirmation } from "@/hooks/useConfirmation"
import { currencyFormat } from "@/lib/utils"
import { chargeNameDetailsType, chargeNamesType } from "@/types/setupTypes/chargeName"
import { Plus } from "lucide-react"
import { parseAsInteger, useQueryState } from "nuqs"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useDebouncedCallback } from "use-debounce"
import { z } from "zod"
import hospitalChargeApi from "../../services/charge"
import AddChargesFormModel from "./addChargeNameFormModel"






const ChargesList = () => {

  // my custom hook
  const { confirm, confirmationProps } = useConfirmation()

  // params
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [search, setSearch] = useQueryState('search')

  // Loaders
  const [isPending, setPending] = useState<boolean>(false)

  // model states
  const [isChargeNameFormVisible, setChargeNameFormVisible] = useState<boolean>(false)
  const [loaderModel, setLoaderModel] = useState<boolean>(false)

  // API States
  const [chargeNameDetails, setChargeNameDetails] = useState<chargeNameDetailsType | undefined>(undefined)
  const [chargeNames, setchargeNames] = useState<chargeNamesType>({ data: [], total_pages: 0 })



  // performing both
  const handleSubmit = async (formData: z.infer<typeof chargeNameFormSchema>) => {
    try {
      setPending(true);
      let data;
      if (chargeNameDetails) {
        data = await hospitalChargeApi.updateChargeName(chargeNameDetails.id, formData)
        setChargeNameDetails(undefined)
      } else {
        data = await hospitalChargeApi.createChargeName(formData)
      }
      setChargeNameFormVisible(false)
      fetChargeNames()
      toast.success(data.message)
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setPending(false)
    }
  }


  const fetchChargeNameDetails = async (id: number) => {
    try {
      setLoaderModel(true)
      const data = await hospitalChargeApi.getChargeNameDetails(id)
      setChargeNameDetails(data)
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setLoaderModel(false)
    }
  }


  const fetChargeNames = async () => {
    try {
      const data = await hospitalChargeApi.getChargeNames({ page, limit: search ? 100 : 10, search: search! })
      setchargeNames(data)

    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  const onDelete = async (id: number) => {
    try {
      const isConfirmed = await confirm()
      if (!isConfirmed) return null
      const data = await hospitalChargeApi.deleteChargeName(id)
      toast.success(data.message)
      fetChargeNames()
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  const onSearch = useDebouncedCallback(async (value: string) => {
    if (value) {
      setPage(1)
      setSearch(value)
      return null
    }
    setSearch(null) // if no value then null
  }, 400)


  useEffect(() => {
    fetChargeNames()
  }, [page, search])



  return (

    <section className="flex flex-col gap-y-5 pb-16">

      <div className="flex justify-between">
        <h1 className="text-lg font-semibold">Charges</h1>

        <PermissionProtectedAction action='create' module='Setup Hospital Charges'>
          <Button size='sm' onClick={() => { setChargeNameFormVisible(true) }}>
            <Plus /> Add Charge
          </Button>
        </PermissionProtectedAction>

      </div>

      <Separator />

      <div className="sm:w-48 space-y-1">
        <p className="text-sm text-gray-400">Search</p>
        <Input type="text" onChange={(e) => { onSearch(e.target.value) }} placeholder="name , category" />
      </div>

      <Separator />

      <div className="flex flex-col min-h-[58vh] gap-y-16">
        {/* child 1 */}
        <div className="flex-1">
          <ProtectedTable module='Setup Hospital Charges' renderTable={(show, canUpdate, canDelete) => (
            <Table>
              <TableHeader>
                <TableRow >
                  <TableHead>Name</TableHead>
                  <TableHead>Charge Category</TableHead>
                  <TableHead>Charge Type</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Tax%</TableHead>
                  <TableHead>Standard Charge {currencySymbol()}</TableHead>
                  <TableHead>TPA Charge {currencySymbol()}</TableHead>
                  {show && <TableHead>Action</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {chargeNames?.data.map((chargeName) => {
                  return <TableRow key={chargeName.id}>
                    <TableCell>{chargeName.name}</TableCell>
                    <TableCell>{chargeName.chargeCategory.category}</TableCell>
                    <TableCell>{chargeName.chargeCategory.chargeType.charge_type}</TableCell>
                    <TableCell>{chargeName.unitId}</TableCell>
                    <TableCell>{chargeName.tax_percentage} %</TableCell>
                    <TableCell>{currencyFormat(chargeName.standard_charge)}</TableCell>
                    <TableCell>{currencyFormat(chargeName.tpa)}</TableCell>
                    <TableActions
                      show={show}
                      canUpdate={canUpdate}
                      canDelete={canDelete}
                      onEdit={async () => {
                        await fetchChargeNameDetails(chargeName.id)
                        setChargeNameFormVisible(true)
                      }}
                      onDelete={() => onDelete(chargeName.id)}
                    />
                  </TableRow>
                })}
              </TableBody>
            </Table>
          )} />


          {/* On no data */}

          <EmptyList length={chargeNames.data.length} />

        </div>

        {/* Pagination */}

        <CustomPagination
          total_pages={chargeNames?.total_pages}
          currentPage={+page}
          previous={(p) => setPage(p)}
          goTo={(p) => setPage(p)}
          next={(p) => setPage(p)}
        />
      </div>


      {/* Models */}

      {/* Form model */}

      {
        isChargeNameFormVisible && (
          <AddChargesFormModel
            chargeNameDetails={chargeNameDetails!}
            Submit={handleSubmit}
            isPending={isPending}
            onClick={() => {
              setChargeNameFormVisible(false);
              setChargeNameDetails(undefined)
            }}
          />
        )
      }


      {/* Alert Model */}

      {
        confirmationProps.isOpen && <AlertModel
          cancel={() => confirmationProps.onCancel()}
          continue={confirmationProps.onConfirm}
        />
      }

      {/* Loader */}

      {loaderModel && <LoaderModel />}
    </section >
  )
}

export default ChargesList