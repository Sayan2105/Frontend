import AlertModel from '@/components/alertModel'
import CustomPagination from '@/components/customPagination'
import EmptyList from '@/components/emptyList'
import PermissionProtectedAction from '@/components/permission-protected-actions'
import ProtectedTable from '@/components/protected-table'
import TableActions from '@/components/table-actions'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { page_limit } from '@/globalData'
import { HeartHandshake, Plus } from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'
import DonationsForm from './form'
import useDonations from './handlers'




const BloodDonations = () => {

    // params
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
    const [search, setSearch] = useQueryState('search')
    const { donations, current, setCurrent, form, setForm, handleSubmit, isPending, onDelete, getDonations, confirmationProps } = useDonations({ page, limit: page_limit, search })


    const onSearch = useDebouncedCallback(async (value: string) => {
        value ? (setSearch(value)) : (setSearch(null))
        setPage(1) // always should execute
    }, 400)


    useEffect(() => {
        getDonations()
    }, [page, search])


    return (

        <>
            <div className='my-2 flex flex-col'>

                {/* top bar */}
                <div className='flex py-3 flex-col md:flex-row gap-y-2 md:items-center md:justify-between border-b border-gray-200 dark:border-gray-800'>
                    <h1 className='font-semibold tracking-tight'>Blood Donations</h1>
                    <div className='flex gap-x-2 overflow-x-auto'>

                        <PermissionProtectedAction action='create' module='Blood Donation'>
                            <Button type='button' size={'sm'}
                                onClick={() => { setForm(true) }} >
                                <Plus /> Add Donation
                            </Button>
                        </PermissionProtectedAction>

                        <PermissionProtectedAction action='view' module='Blood Donors'>
                            <Link to={'../blood-donors'} className={buttonVariants({
                                variant: 'default', size: 'sm', className: 'flex gap-x-1'
                            })}>
                                <HeartHandshake /> Donors </Link>
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
                        <ProtectedTable module='Blood Donation' renderTable={(show, canUpdate, canDelete) => (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Donor</TableHead>
                                        <TableHead>Gender</TableHead>
                                        <TableHead>Contact</TableHead>
                                        <TableHead>Bag</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Blood Group</TableHead>
                                        <TableHead>Expiry</TableHead>
                                        {show && <TableHead>Action</TableHead>}
                                    </TableRow>
                                </TableHeader>


                                <TableBody>
                                    {donations.data.map((donation) => {
                                        return <TableRow key={donation.id}>
                                            <TableCell>{donation.donor.name}</TableCell>
                                            <TableCell>{donation.donor.gender}</TableCell>
                                            <TableCell>{donation.donor.contact}</TableCell>
                                            <TableCell>{donation.bag}</TableCell>
                                            <TableCell>{donation.status}</TableCell>
                                            <TableCell>{donation.blood_group}</TableCell>
                                            <TableCell>
                                                <div className="dark:bg-blue-900/20 bg-blue-100 dark:text-blue-600 text-blue-600 w-fit py-1 px-2 rounded">
                                                    {new Date(donation.expiry).toLocaleDateString('en-US', { weekday: 'short' })}{", "}
                                                    {new Date(donation.expiry).toLocaleDateString('en-US', { day: 'numeric' })}{", "}
                                                    {new Date(donation.expiry).toLocaleDateString('en-US', { month: 'short' })}
                                                </div>
                                            </TableCell>
                                            {show && <TableActions
                                                show={show}
                                                canUpdate={canUpdate}
                                                canDelete={canDelete}
                                                onDelete={() => onDelete(donation.id)}
                                                onEdit={() => { setCurrent(donation), setForm(true) }}
                                            />}
                                        </TableRow>
                                    })}
                                </TableBody>
                            </Table>
                        )} />

                        {/* if no data will be recive */}
                        <EmptyList length={donations.data.length} message='No data found' />
                    </div>

                    {/* Pagination */}

                    <CustomPagination
                        total_pages={donations?.total_pages}
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

            {/* Form Modal */}

            {form && (
                <DonationsForm
                    Submit={handleSubmit}
                    isPending={isPending}
                    defaultValues={current!}
                    onClick={() => { setForm(false), setCurrent(null) }}
                />
            )}

        </>

    )
}







export default BloodDonations