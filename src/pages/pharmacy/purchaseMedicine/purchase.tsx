import AlertModel from '@/components/alertModel'
import CustomPagination from '@/components/customPagination'
import LoaderModel from '@/components/loader'
import PermissionProtectedAction from '@/components/permission-protected-actions'
import ProtectedTable from '@/components/protected-table'
import TableActions from '@/components/table-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PurchaseMedicineFormSchema } from '@/formSchemas/purchaseMedicineFormSchema'
import { page_limit } from '@/globalData'
import { currencySymbol } from '@/helpers/currencySymbol'
import { useConfirmation } from '@/hooks/useConfirmation'
import { currencyFormat } from '@/lib/utils'
import PharmacyApi from '@/services/pharmacy-api'
import { medicinePurchaseDetails, medicinePurchases } from '@/types/opd_section/purchaseMedicine'
import { Plus, SearchX } from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDebouncedCallback } from 'use-debounce'
import { z } from 'zod'
import GeneratePurchaseMedicineInvoice from './pdf-template/invoice'
import PrintMedicinePurchases from './pdf-template/print-list'
import PurchaseMedicineForm from './purchaseMedicine'
import PurchaseMedicineDetailsModel from './purchaseMedicineDetailsModel'




const Purchase = () => {

  // custom hooks
  const { confirm, confirmationProps } = useConfirmation()

  // query params
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [search, setSearch] = useQueryState('search')

  // loading state
  const [loading, setLoading] = useState({ inline: false, model: false })


  // API state
  const [purcahseList, setPurchaseList] = useState<medicinePurchases>({ data: [], total_pages: 0 })
  const [current, setCurrent] = useState<medicinePurchaseDetails | null>(null)
  const [form, setForm] = useState(false)
  const [print, setPrint] = useState(false)


  // performing only insert
  const handleSubmit = async (formData: z.infer<typeof PurchaseMedicineFormSchema>) => {
    try {
      const data = await PharmacyApi.createPurchase(formData)
      toast.success(data.message)
      fetchPurchases()
      setForm(false)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  // just passing queries

  const onSearch = useDebouncedCallback(async (value: string) => {
    value ? setSearch(value) : setSearch(null)
    setPage(1)
  }, 400)


  const fetchPurchases = async () => {
    try {
      const data = await PharmacyApi.getPurchases({
        page,
        limit: page_limit,
        search: search! // dont have to use string object otherwise null will become string
      })
      setPurchaseList(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  //deleting
  const onDelete = async (id: string) => {
    try {
      const isConfirm = await confirm()
      if (!isConfirm) return null
      const data = await PharmacyApi.deletePurchaseMedicine(id)
      toast.success(data.message)
      fetchPurchases()
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  const fetchPurchaseDetails = async (id: string) => {
    try {
      setLoading(rest => ({ ...rest, model: true }))
      const data = await PharmacyApi.getMedicinePurchaseById(id)
      setCurrent(data)
    } catch ({ message }: any) {
      toast.success(message)
    } finally {
      setLoading(rest => ({ ...rest, model: false }))
    }
  }


  useEffect(() => {
    fetchPurchases()
  }, [page, search])



  return (
    <>
      <div className='my-2 flex flex-col'>

        {/* top bar */}
        <div className='flex py-3 flex-col md:flex-row gap-y-2 md:items-center md:justify-between'>
          <h1 className='font-semibold tracking-tight'>Medicine Purchases</h1>
          <div className='flex gap-x-2 overflow-x-auto'>

            <PermissionProtectedAction action='create' module='Purchase Medicine'>
              <Button className='flex gap-x-1' size={'sm'}
                onClick={() => setForm(true)}>
                <Plus />
                Create Purchase
              </Button>
            </PermissionProtectedAction>

          </div>
        </div>

        <Separator />

        {/* search bar */}

        <div className='flex py-3 flex-col md:flex-row gap-y-4 md:items-center md:justify-between'>

          <div className='flex gap-x-2'>
            <Input type='text' height='10px' placeholder='search' onChange={(e) => onSearch(e.target.value)} defaultValue={search!} />
          </div>

          <div className='flex gap-x-2'>
            {/* Printing purcahse list */}
            <PrintMedicinePurchases purchases={purcahseList['data']} />
          </div>
        </div>

        <Separator />



        {/* Paginated layout */}

        <div className="flex flex-col space-y-5 min-h-[75vh] mb-20 mt-5">
          <div className='flex-1'>
            <ProtectedTable module='Purchase Medicine' renderTable={(show, canUpdate, canDelete) => (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Purchase No.</TableHead>
                    <TableHead>Medicine Name</TableHead>
                    <TableHead>Purchase Date</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Supplier Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total {currencySymbol()}</TableHead>
                    <TableHead>Tax</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Net Amount {currencySymbol()}</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {purcahseList?.data.map((purchase) => (
                    <TableRow key={purchase.id as any} >
                      <TableCell className="font-medium cursor-pointer text-blue-500 hover:text-blue-400"
                        onClick={async () => {
                          await fetchPurchaseDetails(purchase.id)
                        }}
                      >
                        {purchase.id}
                      </TableCell>
                      <TableCell>{purchase.medicine.name}</TableCell>
                      <TableCell>
                        <div className="dark:bg-rose-900/20 bg-rose-100 dark:text-rose-600 text-rose-600 py-1 px-2 rounded">
                          {new Date(purchase.date).toLocaleDateString('en-US', { weekday: 'short' })}{", "}
                          {new Date(purchase.date).toLocaleDateString('en-US', { day: 'numeric' })}{", "}
                          {new Date(purchase.date).toLocaleDateString('en-US', { month: 'short' })}{", "}
                          {new Date(purchase.date).toLocaleDateString('en-US', { year: 'numeric' })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="dark:bg-amber-900/20 bg-amber-100 dark:text-amber-600 text-amber-600 py-1 px-2 rounded">
                          {new Date(purchase.expiry_date).toLocaleDateString('en-US', { weekday: 'short' })}{", "}
                          {new Date(purchase.expiry_date).toLocaleDateString('en-US', { day: 'numeric' })}{", "}
                          {new Date(purchase.expiry_date).toLocaleDateString('en-US', { month: 'short' })}{", "}
                          {new Date(purchase.expiry_date).toLocaleDateString('en-US', { year: 'numeric' })}
                        </div>
                      </TableCell>
                      <TableCell>
                        {purchase.supplier_name}
                      </TableCell>
                      <TableCell>{purchase.quantity}</TableCell>
                      <TableCell>{currencyFormat(purchase.amount)}</TableCell>
                      <TableCell>{purchase.tax}%</TableCell>
                      <TableCell>{purchase.discount}%</TableCell>
                      <TableCell>{currencyFormat(purchase.total_amount)}</TableCell>
                      <TableActions
                        show={show}
                        canUpdate={canUpdate}
                        canDelete={canDelete}
                        onDelete={() => onDelete(purchase.id)}
                        exclude={{ edit: true }}
                        incluePrint={{
                          include: true,
                          print: async () => {
                            await fetchPurchaseDetails(purchase.id)
                            setPrint(true)
                          }
                        }}
                      />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )} />



            {/* if no data will be recive */}

            {purcahseList?.data.length! < 1 && <h1 className='text-gray-900 mt-4 sm:mt-1 font-semibold text-lg flex items-center gap-1'>No data found <SearchX className='h-5 w-5' /></h1>}
          </div>

          <section>
            <CustomPagination
              total_pages={purcahseList?.total_pages!}
              currentPage={page}
              next={(p) => setPage(p)}
              goTo={(p) => setPage(p)}
              previous={(p) => setPage(p)}
            />
          </section>
        </div>



        {/* Model */}

        {form && (
          <PurchaseMedicineForm
            Submit={handleSubmit}
            isPending={loading.inline}
            onClick={() => setForm(false)}
          />
        )}


        {confirmationProps.isOpen && (
          <AlertModel
            continue={() => confirmationProps.onConfirm()}
            cancel={() => confirmationProps.onCancel()}
          />
        )}


        {loading.model && (<LoaderModel />)}

        {/* details model */}

        {(current && !print) && (<PurchaseMedicineDetailsModel
          purchaseDetails={current!}
          onClick={() => setCurrent(null)}
        />)}

        {/* print */}

        {print && <GeneratePurchaseMedicineInvoice afterGenerate={() => { setPrint(false); setCurrent(null) }} Info={current!} />}

      </div >
    </>

  )
}

export default Purchase

