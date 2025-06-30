import AlertModel from '@/components/alertModel'
import CustomPagination from '@/components/customPagination'
import EmptyList from '@/components/emptyList'
import LoaderModel from '@/components/loader'
import PermissionProtectedAction from '@/components/permission-protected-actions'
import ProtectedTable from '@/components/protected-table'
import TableActions from '@/components/table-actions'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import UserImage from '@/components/user-image'
import { createPharmacyBillSchema } from '@/formSchemas/createPharmBillSchema'
import { page_limit } from '@/globalData'
import { useConfirmation } from '@/hooks/useConfirmation'
import { currencyFormat } from '@/lib/utils'
import PharmacyApi from '@/services/pharmacy-api'
import { pharmacyBillDetail, pharmacyBills } from '@/types/pharmacy/pharmacy'
import { ListMinus, Plus } from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'
import { z } from 'zod'
import CreatePharmacyBill from './createPharmacyBill'
import GeneratePharmacyBillPdf from './pdf-template/print-pharmacy-invoice'
import PharmacyBillDetailsModal from './pharmacyBillDetailsModal'




const Bill = () => {

    // custom hooks
    const { confirm, confirmationProps } = useConfirmation()

    // query params
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
    const [search, setSearch] = useQueryState('search')

    //model states
    const [form, setForm] = useState(false)
    const [print, setPrint] = useState(false)

    // loading states
    const [isLodaing, setLoading] = useState({ inline: false, model: false, })

    // API states
    const [pharmBills, setPharmBills] = useState<pharmacyBills>({ data: [], total_pages: 0 })
    const [current, setCurrent] = useState<pharmacyBillDetail | null>(null)



    // list of bills
    const fetchParmacyBills = async () => {
        try {
            const data = await PharmacyApi.getPharmacyBills({ page, limit: page_limit, search: search! })
            setPharmBills(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }



    const onSearch = useDebouncedCallback((value: string) => {
        value ? (setSearch(value)) : setSearch(null)
        setPage(1)
    }, 400)


    // bill deatils
    const fetchPharmacyBillDetails = async (id: string) => {
        try {
            setLoading(prev => ({ ...prev, model: true }))
            const data = await PharmacyApi.getPharmacyBillById(id)
            setCurrent(data)
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setLoading(prev => ({ ...prev, model: false }))
        }
    }


    // handling form data
    const handleSubmit = async (formData: z.infer<typeof createPharmacyBillSchema>) => {
        try {
            setLoading(pre => ({ ...pre, inline: true }))
            const data = await PharmacyApi.createPharmacyBill(formData)
            toast.success(data.message)
            setForm(false)
            fetchParmacyBills()
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setLoading(pre => ({ ...pre, inline: false }))
        }
    }


    // deleting a particular bill
    const onDelete = async (id: string) => {
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await PharmacyApi.deletePharmacyBill(id)
            toast.success(data.message)
            fetchParmacyBills()
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    useEffect(() => {
        fetchParmacyBills()
    }, [page, search])


    return (
        <>
            <div className='my-2 flex flex-col'>

                {/* top bar */}
                <div className='flex py-3 flex-col md:flex-row gap-y-2 md:items-center md:justify-between'>
                    <h1 className='font-semibold tracking-tight'>Pharmacy Bill</h1>
                    <div className='flex gap-x-2 overflow-x-auto'>

                        <PermissionProtectedAction action='create' module='Pharmacy Bill'>
                            <Button
                                size={'sm'}
                                onClick={() => setForm(true)}
                            > <Plus /> Generate Bill</Button>
                        </PermissionProtectedAction>

                        <PermissionProtectedAction action='view' module='Medicines'>
                            < Link to={'medicines'} className={buttonVariants({
                                variant: 'default',
                                size: 'sm',
                                className: 'flex gap-x-1'
                            })}>
                                <ListMinus />
                                Medicines
                            </Link>
                        </PermissionProtectedAction>

                    </div>
                </div>

                <Separator />

                {/* search bar */}

                <div className='flex py-3 flex-col md:flex-row gap-y-4 md:items-center md:justify-between'>
                    <div className='flex gap-x-2'>
                        <Input type='text' height='10px' placeholder='Bill No. , Date , Patient' onChange={(e) => { onSearch(e.target.value) }} defaultValue={search!} />
                    </div>
                </div>

                <Separator />


                <div className="flex flex-col pb-16 gap-y-10 min-h-[80vh] mt-5">
                    <div className="flex-1 space-y-3">
                        <ProtectedTable module='Pharmacy Bill' renderTable={(show, canUpdate, canDelete) => (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Bill No.</TableHead>
                                        <TableHead>Invoice Date</TableHead>
                                        <TableHead>OPD ID</TableHead>
                                        <TableHead>Patient Name</TableHead>
                                        <TableHead>Doctor Name</TableHead>
                                        <TableHead>Discount%</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {pharmBills.data.map((bill) => (
                                        <TableRow key={bill.id}>
                                            <TableCell
                                                className='text-blue-500 hover:text-blue-400 cursor-pointer font-medium'
                                                onClick={async () => {
                                                    await fetchPharmacyBillDetails(bill.id)
                                                }}
                                            >{bill.id}
                                            </TableCell>
                                            <TableCell>{bill.date}</TableCell>
                                            <TableCell>{bill.opdId}</TableCell>
                                            <TableCell>
                                                <UserImage url={bill.patient.image} name={bill.patient.name} gender={bill.patient.gender} />
                                            </TableCell>
                                            <TableCell>{bill.doctor}</TableCell>
                                            <TableCell>{bill.discount} %</TableCell>
                                            <TableCell>{currencyFormat(bill.net_amount)}</TableCell>
                                            <TableActions
                                                show={show}
                                                canUpdate={canUpdate}
                                                canDelete={canDelete}
                                                onDelete={() => onDelete(bill.id)}
                                                exclude={{ edit: true }}
                                                incluePrint={{
                                                    include: true,
                                                    print: async () => {
                                                        await fetchPharmacyBillDetails(bill.id)
                                                        setPrint(true)
                                                    }
                                                }}
                                            />

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}

                        />

                        <EmptyList length={pharmBills.data.length} message='No bills found' />
                    </div>

                    {/* pagination buttons */}

                    <section>
                        <CustomPagination
                            total_pages={pharmBills?.total_pages!}
                            currentPage={page}
                            next={(p) => setPage(p)}
                            goTo={(p) => setPage(p)}
                            previous={(p) => setPage(p)}
                        />
                    </section>
                </div>
            </div >


            {/* Models */}

            {form && (
                < CreatePharmacyBill
                    Submit={handleSubmit}
                    isPending={isLodaing.inline}
                    onClick={() => { setForm(false) }}
                />
            )}

            {(current && !print) && (
                <PharmacyBillDetailsModal
                    details={current!}
                    onClick={() => setCurrent(null)}
                />
            )}


            {isLodaing.model && <LoaderModel />}

            {confirmationProps.isOpen && (
                <AlertModel
                    continue={() => confirmationProps.onConfirm()}
                    cancel={() => confirmationProps.onCancel()}
                />
            )}

            {/* To print bill */}
            {print && <GeneratePharmacyBillPdf Info={current!} afterGenerate={() => { setCurrent(null); setPrint(false) }} />}
        </>

    )
}

export default Bill