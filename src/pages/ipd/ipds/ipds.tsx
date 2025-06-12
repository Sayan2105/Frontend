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
import { Plus } from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'
import PrintIpdInvoice from '../invoice/print-invoice'
import CreateIpdModal from './create-ipd-form-modal'
import useIpdHandlers from './ipd-handlers'



const Ipds = () => {

    // Query params
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
    const [search, setSearch] = useQueryState('search')

    const { ipds, isPending, invoice, setInvoice, form, fetchIpds, fetchIpdInfo, handleSubmit, setForm, onDelete, current, setCurrent, confirmationProps, getIpdInvoice } = useIpdHandlers()

    const onSerach = useDebouncedCallback(async (value: string) => {
        value ? setSearch(value) : setSearch(null)
        setPage(1)
    }, 400)

    useEffect(() => {
        fetchIpds({ page, limit: page_limit, search })
    }, [page, search])


    return (
        <div className='my-2 flex flex-col'>

            {/* top bar */}

            <div className='flex py-3 flex-col md:flex-row gap-y-2 md:items-center md:justify-between'>
                <h1 className='font-semibold tracking-tight'>IPD - In patient</h1>
                <div className='flex gap-x-2 overflow-x-auto'>
                    <PermissionProtectedAction action='create' module='Ipd'>
                        <Button size="sm"
                            onClick={() => setForm(true)}
                        ><Plus />Add IPD</Button>
                    </PermissionProtectedAction>

                </div>
            </div>

            <Separator />

            {/* search bar */}

            <div className='flex py-3 flex-col md:flex-row gap-y-4 md:items-center md:justify-between'>

                <div className='flex gap-x-2'>
                    <Input type='text' height='10px' placeholder='ipdId , patient , doctor' onChange={(e) => { onSerach(e.target.value) }} defaultValue={search!} />
                    {/* use debounce to prevent api call */}
                </div>

                <div className='flex gap-x-2'>
                    {/* will print all list */}
                    {/* <OpdsPdf opds={OPD_list['data']} /> */}
                </div>
            </div>

            <Separator />

            {/* pagination */}
            <section className="flex flex-col mb-16 gap-y-5 min-h-[75vh] mt-4">
                <div className="flex-1 space-y-5">
                    <ProtectedTable
                        module='Ipd'
                        renderTable={(show, canUpdate, canDelete) => (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>IPD ID</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Patient</TableHead>
                                        <TableHead>Phone</TableHead>
                                        <TableHead>Doctor</TableHead>
                                        <TableHead>Bed Group</TableHead>
                                        <TableHead>Bed</TableHead>
                                        <TableHead>Symptom Type</TableHead>
                                        <TableHead>Casualty</TableHead>
                                        {show && <TableHead>Action</TableHead>}
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {ipds.data.map((item, i) => (
                                        <TableRow key={i}>
                                            <TableCell>
                                                <Link className='text-blue-500 font-semibold hover:underline' to={`/ipd/${item.id}`}>{item.id}</Link>
                                            </TableCell>
                                            <TableCell>{item.date}</TableCell>
                                            <TableCell>
                                                <UserImage url={item.patient.image} name={item.patient.name} gender={item.patient.gender} />
                                            </TableCell>
                                            <TableCell>{item.patient.phone}</TableCell>
                                            <TableCell>
                                                <UserImage url={item.doctor.image} name={item.doctor.name} gender={item.doctor.gender} />
                                            </TableCell>
                                            <TableCell>{item.bedGroup.name}</TableCell>
                                            <TableCell>{item.bed.name}</TableCell>
                                            <TableCell>{item.symptom_type}</TableCell>
                                            <TableCell>{item.casualty}</TableCell>
                                            <TableActions
                                                show={show}
                                                canUpdate={canUpdate}
                                                canDelete={canDelete}
                                                onEdit={async () => { await fetchIpdInfo(item.id); setForm(true) }}
                                                onDelete={() => onDelete(item.id)}
                                                incluePrint={{
                                                    include: true,
                                                    print() {
                                                        getIpdInvoice(item.id)
                                                    },
                                                }}
                                            />
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    />

                    <EmptyList length={ipds.data.length} message="No IPD Found" />
                </div>


                {/* pagination buttons */}
                <section>
                    <CustomPagination
                        currentPage={page}
                        total_pages={ipds?.total_pages!}
                        previous={setPage}
                        goTo={setPage}
                        next={setPage}
                    />
                </section>
            </section>


            {/* form model */}

            {form && (
                <CreateIpdModal
                    Submit={handleSubmit}
                    editDetails={current!}
                    isPending={isPending}
                    onClick={() => {
                        setForm(false)
                        setCurrent(null)
                    }}
                />
            )}


            {/* Alert model */}
            {confirmationProps.isOpen && (
                <AlertModel
                    cancel={() => { confirmationProps.onCancel() }}
                    continue={() => { confirmationProps.onConfirm() }}
                />
            )}

            {isPending && <LoaderModel />}

            {invoice && <PrintIpdInvoice afterPrint={() => setInvoice(null)} info={invoice} />}

        </div >
    )
}



export default Ipds