import AlertModel from '@/components/alertModel'
import CustomPagination from '@/components/customPagination'
import EmptyList from '@/components/emptyList'
import LoaderModel from '@/components/loader'
import PermissionProtectedAction from '@/components/permission-protected-actions'
import ProtectedTable from '@/components/protected-table'
import TableActions from '@/components/table-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import UserImage from '@/components/user-image'
import { page_limit } from '@/globalData'
import { currencySymbol } from '@/helpers/currencySymbol'
import { currencyFormat } from '@/lib/utils'
import { Plus } from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import CreatePathologyBill from './create-pathology-bill'
import usePathology from './handlers'
import PathologyBillDetailsModal from './pathology-bill-details'




const PathologyBills = () => {


  // query params
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [search, setSearch] = useQueryState('search')
  const [ID, setID] = useState('')

  const { getPathologyBills, getPathologyBillDetails, current, setCurrent, onDelete, pathoBills, form, setForm, handleSubmit, confirmationProps, isLodaing } = usePathology({ page, search, limit: page_limit })

  const onSearch = useDebouncedCallback((value: string) => {
    value ? (setSearch(value)) : setSearch(null)
    setPage(1)
  }, 400)


  useEffect(() => {
    getPathologyBills()
  }, [page, search])



  return (
    <>
      <div className='my-2 flex flex-col px-2.5'>

        {/* top bar */}
        <div className='flex py-3 flex-col md:flex-row gap-y-2 md:items-center md:justify-between'>
          <h1 className='font-semibold tracking-tight'>Pathology Bill</h1>
          <div className='flex gap-x-2 overflow-x-auto'>

            <PermissionProtectedAction action='create' module='Pathology Bill'>
              <Button
                size={'sm'}
                onClick={() => setForm(true)}
              > <Plus /> Generate Bill</Button>
            </PermissionProtectedAction>

          </div>
        </div>

        <Separator />

        {/* search bar */}

        <div className='flex py-3 flex-col md:flex-row gap-y-4 md:items-center md:justify-between'>

          <div className='flex gap-x-2'>
            <Input type='text' height='10px' placeholder='Bill No. , Date , Patient' onChange={(e) => { onSearch(e.target.value) }} defaultValue={search!} />
          </div>

          {/* radiology bills */}
          <div className='flex gap-x-2'>

          </div>
        </div>

        <Separator />


        <div className="flex flex-col pb-16 gap-y-10 min-h-[80vh] mt-5">
          <div className="flex-1 space-y-3">
            <ProtectedTable module='Pathology Bill' renderTable={(show, canUpdate, canDelete) => (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bill No.</TableHead>
                    <TableHead>Invoice Date</TableHead>
                    <TableHead>IPD/OPD</TableHead>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Doctor Name</TableHead>
                    <TableHead>Discount%</TableHead>
                    <TableHead>Net Amount {currencySymbol()}</TableHead>
                    <TableHead>Payment Mode</TableHead>
                    {show && <TableHead>Action</TableHead>}
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {pathoBills.data.map((bill) => (
                    <TableRow key={bill.id}>
                      <TableCell
                        className='text-blue-500 hover:text-blue-400 cursor-pointer font-medium'
                        onClick={() => setID(bill.id)}
                      >{bill.id}
                      </TableCell>
                      <TableCell>{bill.date}</TableCell>
                      <TableCell>{bill.moduleId}</TableCell>
                      <TableCell>
                        <UserImage url={bill.patient.image} name={bill.patient.name} gender={bill.patient.gender} />
                      </TableCell>
                      <TableCell>{bill.doctor}</TableCell>
                      <TableCell>{bill.discount} %</TableCell>
                      <TableCell>{currencyFormat(bill.net_amount)}</TableCell>
                      <TableCell>{bill.payment_mode}</TableCell>
                      <TableActions
                        show={show}
                        canUpdate={canUpdate}
                        canDelete={canDelete}
                        onEdit={async () => {
                          await getPathologyBillDetails(bill.id)
                          setForm(true)
                        }}
                        onDelete={() => onDelete(bill.id)}
                      />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )} />

            <EmptyList length={pathoBills.data.length} message='No bills found' />
          </div>

          {/* pagination buttons */}

          <section>
            <CustomPagination
              total_pages={pathoBills?.total_pages!}
              currentPage={page}
              next={(p) => setPage(p)}
              goTo={(p) => setPage(p)}
              previous={(p) => setPage(p)}
            />
          </section>
        </div>
      </div >


      {/* Models */}

      {
        form && (
          < CreatePathologyBill
            Submit={handleSubmit}
            isPending={isLodaing}
            editDetails={current!}
            onClick={() => { setForm(false); setCurrent(undefined) }}
          />
        )
      }


      {/*  */}

      {ID && (
        <PathologyBillDetailsModal
          ID={ID}
          onClick={() => { setID('') }}
        />
      )}


      {isLodaing && <LoaderModel />}

      {
        confirmationProps.isOpen && (
          <AlertModel
            continue={() => confirmationProps.onConfirm()}
            cancel={() => confirmationProps.onCancel()}
          />
        )
      }
    </>

  )
}






export default PathologyBills