import PermissionProtectedAction from '@/components/permission-protected-actions'
import ProtectedTable from '@/components/protected-table'
import TableActions from '@/components/table-actions'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { page_limit } from '@/globalData'
import { currencySymbol } from '@/helpers/currencySymbol'
import { currencyFormat } from '@/lib/utils'
import { Component, HeartHandshake, Plus } from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'
import IssueBloodForm from './form'
import useIssueBlood from './handlers'
import EmptyList from '@/components/emptyList'
import CustomPagination from '@/components/customPagination'
import AlertModel from '@/components/alertModel'
import LoaderModel from '@/components/loader'
import IssueBloodInfoModal from './info-modal'
import UserImage from '@/components/user-image'
import GenerateBloodIssueInvoice from './pdf-template/invoice'




const BloodIssues = () => {

    // params
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
    const [search, setSearch] = useQueryState('search')
    const [print, setPrint] = useState(false)

    const { issues, current, setCurrent, form, setForm, handleSubmit, isPending, onDelete, getIssueBloods, confirmationProps, getIssuedBloodInfo } = useIssueBlood({ page, limit: page_limit, search })



    const onSearch = useDebouncedCallback(async (value: string) => {
        value ? (setSearch(value)) : (setSearch(null))
        setPage(1) // always should execute
    }, 400)




    useEffect(() => {
        getIssueBloods()
    }, [page, search])


    return (

        <>
            <div className='my-2 flex flex-col'>

                {/* top bar */}
                <div className='flex py-3 flex-col md:flex-row gap-y-2 md:items-center md:justify-between border-b border-gray-200 dark:border-gray-800'>
                    <h1 className='font-semibold tracking-tight'>Blood Issues</h1>
                    <div className='flex gap-x-2 overflow-x-auto'>

                        <PermissionProtectedAction action='create' module='Issue Blood'>
                            <Button type='button' size={'sm'}
                                onClick={() => { setForm(true) }} >
                                <Plus /> Issue Blood
                            </Button>
                        </PermissionProtectedAction>

                        <PermissionProtectedAction action='view' module='Blood Donors'>
                            <Link to={'../doner/blood-donations'} className={buttonVariants({
                                variant: 'default', size: 'sm', className: 'flex gap-x-1'
                            })}>
                                <HeartHandshake /> Donations </Link>
                        </PermissionProtectedAction>

                        <PermissionProtectedAction action='view' module='Issue Blood Component'>
                            <Link to={'../components/issue-components'} className={buttonVariants({
                                variant: 'destructive', size: 'sm', className: 'flex gap-x-1'
                            })}><Component /> Issued Components </Link>
                        </PermissionProtectedAction>

                    </div>
                </div>


                {/* search bar */}

                <div className='flex py-3 flex-col md:flex-row gap-y-4 md:items-center md:justify-between border-b border-gray-200 dark:border-gray-800'>
                    <div className='flex gap-x-2'>
                        <Input type='text' height='10px' placeholder='search' defaultValue={search!} onChange={(e) => { onSearch(e.target.value) }} />
                    </div>
                </div>


                <div className="flex flex-col gap-y-5 min-h-[75vh] mb-16 mt-5">
                    <div className="flex-1">
                        <ProtectedTable module='Issue Blood' renderTable={(show, canUpdate, canDelete) => (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Invoice No</TableHead>
                                        <TableHead>Patient Name</TableHead>
                                        <TableHead>Gender</TableHead>
                                        <TableHead>Issued Date</TableHead>
                                        <TableHead>Blood Group</TableHead>
                                        <TableHead>Bag</TableHead>
                                        <TableHead>Standard Charge {currencySymbol()}</TableHead>
                                        <TableHead>Tax%</TableHead>
                                        <TableHead>Discount%</TableHead>
                                        <TableHead>Net Amount {currencySymbol()}</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>


                                <TableBody>
                                    {issues.data.map((IB) => {
                                        return <TableRow key={IB.id}>
                                            <TableCell className="font-semibold cursor-pointer text-blue-500 hover:text-blue-400 hover:underline"
                                                onClick={async () => {
                                                    await getIssuedBloodInfo(IB.id)
                                                }}>
                                                {IB.id}
                                            </TableCell>
                                            <TableCell>
                                                <UserImage url={IB.patient.image} name={IB.patient.name} gender={IB.patient.gender} />
                                            </TableCell>
                                            <TableCell>{IB.patient.gender}</TableCell>
                                            <TableCell>{IB.date}</TableCell>
                                            <TableCell>{IB.blood_group}</TableCell>
                                            <TableCell>{IB.bag}</TableCell>
                                            <TableCell>{currencyFormat(IB.standard_charge)}</TableCell>
                                            <TableCell>{IB.tax}%</TableCell>
                                            <TableCell>{IB.discount}%</TableCell>
                                            <TableCell>{currencyFormat(IB.net_amount)}</TableCell>
                                            <TableActions
                                                show={show}
                                                canUpdate={canUpdate}
                                                canDelete={canDelete}
                                                onDelete={() => onDelete(IB.id)}
                                                onEdit={async () => {
                                                    await getIssuedBloodInfo(IB.id)
                                                    setForm(true)
                                                }}
                                                incluePrint={{
                                                    include: true,
                                                    print: async () => {
                                                        await getIssuedBloodInfo(IB.id)
                                                        setPrint(true)
                                                    }
                                                }}
                                            />
                                        </TableRow>
                                    })}
                                </TableBody>
                            </Table>
                        )} />

                        {/* if no data will be recive */}
                        <EmptyList length={issues.data.length} message='No data found' />
                    </div>

                    {/* Pagination */}

                    <CustomPagination
                        total_pages={issues?.total_pages}
                        currentPage={+page}
                        previous={setPage}
                        goTo={setPage}
                        next={setPage}
                    />
                </div>
            </div>


            {/* Alert Model */}
            {confirmationProps.isOpen && <AlertModel
                cancel={() => confirmationProps.onCancel()}
                continue={() => confirmationProps.onConfirm()}
            />}


            {/* Loader model */}
            {isPending && (<LoaderModel />)}


            {/* form Modal */}
            {form && (
                <IssueBloodForm
                    Submit={handleSubmit}
                    isPending={false}
                    defaultValues={current!}
                    onClick={() => { setForm(false), setCurrent(null) }}
                />
            )}

            {/* Info Modal */}
            {(current && !form && !print) && (
                <IssueBloodInfoModal
                    info={current}
                    onClick={() => { setCurrent(null) }}
                />
            )}

            {/* Print Modal */}
            {print && (
                <GenerateBloodIssueInvoice
                    info={current!}
                    afterGenerate={() => { setPrint(false), setCurrent(null) }}
                />
            )}

        </>

    )
}






export default BloodIssues