
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
import { page_limit } from "@/globalData"
import { currencySymbol } from "@/helpers/currencySymbol"
import { currencyFormat } from "@/lib/utils"
import { Plus } from "lucide-react"
import { parseAsInteger, useQueryState } from "nuqs"
import { useEffect } from "react"
import useChargeHandlers from "./charge-handlers"
import ChargeDetailsModel from "./chargeDetailsModel"
import ChargeFormModel from "../../../../components/form-modals/charge-form-modal"




const CahrgesList = () => {

  // Query params
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [search, setSearch] = useQueryState('search')

  const { charges, getCharges, current, setCurrent, getDetails, isPending, modalLoading, form, setForm, handleSubmit, onDelete, confirmationProps } = useChargeHandlers({ page, search, limit: page_limit })



  const onSearch = async (date: string) => {
    date ? setSearch(date) : setSearch(null)
    setPage(1)
  }


  useEffect(() => {
    getCharges()
  }, [page, search])


  return (
    <section className="flex flex-col gap-y-5">

      <div className="flex justify-between">
        <h1 className="text-lg text-gray-800 dark:text-gray-100 font-semibold">Charges</h1>
        <PermissionProtectedAction action='create' module='Charges'>
          <Button size='sm' onClick={() => setForm(true)} >
            <Plus /> Add Charge
          </Button>
        </PermissionProtectedAction>
      </div>

      <Separator />

      <div className="sm:w-48 space-y-1">
        <p className="text-sm text-gray-700 dark:text-gray-400">Search by date</p>
        <Input type="date" onChange={(e) => { onSearch(e.target.value) }} defaultValue={search!} />
      </div>

      <Separator />

      <div className="flex flex-col min-h-[58vh] mb-20">
        <div className="flex-1">
          <ProtectedTable
            module="Charges"
            renderTable={(show, canUpdate, canDelete) => (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Charge Name</TableHead>
                    <TableHead>Charge Type</TableHead>
                    <TableHead>Standard Charge {currencySymbol()}</TableHead>
                    <TableHead>TPA Charge {currencySymbol()}</TableHead>
                    <TableHead>Net Amount {currencySymbol()}</TableHead>
                    {show && <TableHead>Action</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {charges?.data.map((charge, i) => {
                    return <TableRow key={i}>
                      <TableCell>{charge.date}</TableCell>
                      {/* to view details model */}
                      <TableCell className="text-blue-500 cursor-pointer hover:text-blue-400 font-semibold" onClick={async () => {
                        await getDetails(charge.id);
                      }} >
                        {charge.chargeNames.name}
                      </TableCell>
                      <TableCell>{charge.chargeType.charge_type}</TableCell>
                      <TableCell>{currencyFormat(charge.standard_charge)}</TableCell>
                      <TableCell>{currencyFormat(charge.tpa)}</TableCell>
                      <TableCell>{currencyFormat(charge.net_amount)}</TableCell>
                      <TableActions
                        show={show}
                        canUpdate={canUpdate}
                        canDelete={canDelete}
                        onDelete={() => onDelete(charge.id)}
                        onEdit={async () => { await getDetails(charge.id); setForm(true) }}
                      />
                    </TableRow>
                  })}
                </TableBody>
              </Table>
            )}
          />

          <EmptyList length={charges.data.length} message="No charges found" />

        </div>

        {/* Pagination */}

        <div>
          <section>
            <CustomPagination
              total_pages={charges?.total_pages!}
              currentPage={page}
              previous={(p) => setPage(p)}
              goTo={(p) => setPage(p)}
              next={(p) => setPage(p)}
            />
          </section>
        </div>
      </div>


      {/* MODEL */}

      {form && <ChargeFormModel isPending={isPending} chargeDetails={current!} Submit={handleSubmit} module="opd"
        onClick={() => { setForm(false); setCurrent(null) }}
      />}


      {/* Alert Model */}

      {confirmationProps.isOpen && (
        <AlertModel
          cancel={() => confirmationProps.onCancel()}
          continue={() => confirmationProps.onConfirm()}
        />
      )}

      {/* Details Model */}
      {current && !form && <ChargeDetailsModel chargeDetails={current!}
        onClick={() => { setCurrent(null) }}
      />}

      {/* loader */}
      {modalLoading && <LoaderModel />}

    </section>
  )
}

export default CahrgesList