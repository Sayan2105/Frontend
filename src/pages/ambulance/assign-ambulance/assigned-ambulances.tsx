import AlertModel from "@/components/alertModel"
import CustomPagination from "@/components/customPagination"
import EmptyList from "@/components/emptyList"
import LoaderModel from "@/components/loader"
import PermissionProtectedAction from "@/components/permission-protected-actions"
import ProtectedTable from "@/components/protected-table"
import TableActions from "@/components/table-actions"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import UserImage from "@/components/user-image"
import { page_limit } from "@/globalData"
import { currencySymbol } from "@/helpers/currencySymbol"
import { currencyFormat } from "@/lib/utils"
import { Ambulance, Plus } from "lucide-react"
import { parseAsInteger, useQueryState } from "nuqs"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDebouncedCallback } from "use-debounce"
import AssignAmbulanceForm from "./form"
import useAssignAmbulance from "./handlers"
import AssAmbModal from "./info-modal"


const AssignedAmbulances = () => {

    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
    const [search, setSearch] = useQueryState('search')
    const router = useNavigate()

    const { assigned, getAssignedAmbulances, getAssignedAmbulanceInfo, current, setCurrent, handleSubmit, onDelete, form, setForm, isPending, confirmationProps } = useAssignAmbulance({ page, limit: page_limit, search })

    const onSearch = useDebouncedCallback(async (value: string) => {
        value ? (setSearch(value)) : (setSearch(null))
        setPage(1) // always should execute
    }, 400)


    useEffect(() => {
        getAssignedAmbulances()
    }, [page, search])

    return (
        <>
            <div className='my-2 flex flex-col'>

                {/* top bar */}
                <div className='flex py-3 flex-col md:flex-row gap-y-2 md:items-center md:justify-between border-b border-gray-200 dark:border-gray-800'>
                    <h1 className='font-semibold tracking-tight'>Assigned Ambulances</h1>
                    <div className='flex gap-x-2 overflow-x-auto'>

                        <PermissionProtectedAction action='create' module='Assign Ambulance'>
                            <Button type='button' size={'sm'}
                                onClick={() => { setForm(true) }} >
                                <Plus /> Assign Ambulance
                            </Button>
                        </PermissionProtectedAction>

                        <PermissionProtectedAction action='view' module='Ambulance'>
                            <Link to={'create'} className={buttonVariants({
                                variant: 'default', size: 'sm', className: 'flex gap-x-1'
                            })}>
                                <Ambulance /> Ambulances </Link>
                        </PermissionProtectedAction>

                    </div>
                </div>


                {/* search bar */}

                <div className='flex py-3 flex-col md:flex-row gap-y-4 md:items-center md:justify-between border-b border-gray-200 dark:border-gray-800'>

                    <div className='flex gap-x-2'>
                        <Input type='text' height='10px' placeholder='search' defaultValue={search!} onChange={(e) => { onSearch(e.target.value) }} />
                    </div>

                    <div className='flex gap-x-2'>
                        {/* printing appointments list */}
                        {/* <AppointmentListPDF appointments={Appointments['data']} /> */}
                    </div>
                </div>

                <div className="flex flex-col gap-y-5 min-h-[75vh] mb-16 mt-5">
                    <div className="flex-1">
                        <ProtectedTable module='Assign Ambulance' renderTable={(show, canUpdate, canDelete) => (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Invoice</TableHead>
                                        <TableHead>Vehicle Number</TableHead>
                                        <TableHead>Model</TableHead>
                                        <TableHead>Driver</TableHead>
                                        <TableHead>Driver Contact</TableHead>
                                        <TableHead>Patient</TableHead>
                                        <TableHead>Patient Contact</TableHead>
                                        <TableHead>Standard Charge/PKM {currencySymbol()}</TableHead>
                                        <TableHead>KM</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead>Tax%</TableHead>
                                        <TableHead>Discount%</TableHead>
                                        <TableHead>Net Amount {currencySymbol()}</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>


                                <TableBody>
                                    {assigned.data.map((ass) => {
                                        return <TableRow key={ass.id}>
                                            <TableCell className="font-semibold cursor-pointer text-blue-500 hover:text-blue-400" onClick={async () => {
                                                await getAssignedAmbulanceInfo(ass.id)
                                            }}>
                                                {ass.id}
                                            </TableCell>
                                            <TableCell className='whitespace-nowrap'>{ass.ambulance.vehicleNumber}</TableCell>
                                            <TableCell>{ass.ambulance.model}</TableCell>
                                            <TableCell>{ass.ambulance.driverName}</TableCell>
                                            <TableCell>{ass.ambulance.driverContact}</TableCell>
                                            <TableCell>
                                                <UserImage url={ass.patient.image} name={ass.patient.name} gender={ass.patient.gender} />
                                            </TableCell>
                                            <TableCell>{ass.patient.phone}</TableCell>
                                            <TableCell>{currencyFormat(+ass.standard_charge)}</TableCell>
                                            <TableCell>{ass.kilometers}</TableCell>
                                            <TableCell>{currencyFormat(+ass.total)}</TableCell>
                                            <TableCell>{ass.tax}%</TableCell>
                                            <TableCell>{ass.discount}%</TableCell>
                                            <TableCell>{currencyFormat(ass.net_amount)}</TableCell>
                                            <TableActions
                                                show={show}
                                                canUpdate={canUpdate}
                                                canDelete={canDelete}
                                                onDelete={() => onDelete(ass.id)}
                                                onEdit={async () => {
                                                    await getAssignedAmbulanceInfo(ass.id)
                                                    setForm(true)
                                                }}
                                                incluePrint={{
                                                    include: true,
                                                    print: async () => { router(`print/${ass.id}`) }
                                                }}
                                            />
                                        </TableRow>
                                    })}
                                </TableBody>
                            </Table>
                        )} />

                        {/* if no data will be recive */}
                        <EmptyList length={assigned.data.length} message='No data found' />
                    </div>

                    {/* Pagination */}

                    <CustomPagination
                        total_pages={assigned?.total_pages}
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


            {form && (
                <AssignAmbulanceForm
                    isPending={isPending}
                    Submit={handleSubmit}
                    editDetails={current!}
                    onClick={() => { setForm(false); setCurrent(null) }}
                />
            )}

            {/* Information Modal */}
            {(current && !form && !print) && <AssAmbModal info={current!} onClick={() => setCurrent(null)} />}
        </>
    )
}

export default AssignedAmbulances