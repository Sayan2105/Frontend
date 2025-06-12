import FormModal from '@/components/form-modals/form-modal'
import PermissionProtectedAction from '@/components/permission-protected-actions'
import ProtectedTable from '@/components/protected-table'
import TableActions from '@/components/table-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { bloodDonorSchema } from '@/formSchemas/blood-bank'
import { page_limit } from '@/globalData'
import { Plus } from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import donorFormFields from './form-fields'
import useBloodDonor from './handlers'
import AlertModel from '@/components/alertModel'
import CustomPagination from '@/components/customPagination'
import EmptyList from '@/components/emptyList'




const BloodDonors = () => {

    // params
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
    const [search, setSearch] = useQueryState('search')

    const { donors, current, setCurrent, form, setForm, handleSubmit, isPending, onDelete, getBloodDonors, confirmationProps } = useBloodDonor({ page, limit: page_limit, search })




    const onSearch = useDebouncedCallback(async (value: string) => {
        value ? (setSearch(value)) : (setSearch(null))
        setPage(1) // always should execute
    }, 400)




    useEffect(() => {
        getBloodDonors()
    }, [page, search])


    return (

        <>
            <div className='my-2 flex flex-col'>

                {/* top bar */}
                <div className='flex py-3 flex-col md:flex-row gap-y-2 md:items-center md:justify-between border-b border-gray-200 dark:border-gray-800'>
                    <h1 className='font-semibold tracking-tight'>Blood Donors</h1>
                    <div className='flex gap-x-2 overflow-x-auto'>

                        <PermissionProtectedAction action='create' module='Blood Donors'>
                            <Button type='button' size={'sm'}
                                onClick={() => { setForm(true) }} >
                                <Plus /> Add Doner
                            </Button>
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
                        <ProtectedTable module='Blood Donors' renderTable={(show, canUpdate, canDelete) => (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>DOB</TableHead>
                                        <TableHead>Blood Group</TableHead>
                                        <TableHead>Gender</TableHead>
                                        <TableHead>Contact</TableHead>
                                        <TableHead>Father</TableHead>
                                        {show && <TableHead>Action</TableHead>}
                                    </TableRow>
                                </TableHeader>


                                <TableBody>
                                    {donors.data.map((donor) => {
                                        return <TableRow key={donor.id}>
                                            <TableCell>{donor.name}</TableCell>
                                            <TableCell>{donor.dob}</TableCell>
                                            <TableCell>{donor.blood_group}</TableCell>
                                            <TableCell>{donor.gender}</TableCell>
                                            <TableCell>{donor.contact}</TableCell>
                                            <TableCell>{donor.father_name}</TableCell>
                                            {show && <TableActions
                                                show={show}
                                                canUpdate={canUpdate}
                                                canDelete={canDelete}
                                                onDelete={() => onDelete(donor.id)}
                                                onEdit={() => { setCurrent(donor), setForm(true) }}
                                            />}
                                        </TableRow>
                                    })}
                                </TableBody>
                            </Table>
                        )} />

                        {/* if no data will be recive */}
                        <EmptyList length={donors.data.length} message='No data found' />
                    </div>

                    {/* Pagination */}

                    <CustomPagination
                        total_pages={donors?.total_pages}
                        currentPage={page}
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


            {form && (
                <FormModal
                    title={false ? 'Edit Donor' : 'Add Donor'}
                    Submit={handleSubmit}
                    isPending={isPending}
                    schema={bloodDonorSchema}
                    fields={donorFormFields}
                    height='h-[60vh]'
                    defaultValues={current!}
                    onClick={() => { setForm(false), setCurrent(null) }}
                />
            )}

        </>

    )
}








export default BloodDonors