import AlertModel from '@/components/alertModel'
import CustomPagination from '@/components/customPagination'
import CustomTooltip from '@/components/customTooltip'
import EmptyList from '@/components/emptyList'
import LoaderModel from '@/components/loader'
import PermissionProtectedAction from '@/components/permission-protected-actions'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import UserImage from '@/components/user-image'
import { page_limit } from '@/globalData'
import CreateIpdFormModal from "@/pages/ipd/ipds/create-ipd-form-modal.tsx"
import useIpdHandlers from "@/pages/ipd/ipds/ipd-handlers.tsx"
import OpdApi from '@/services/opd-api'
import { IpdInfo } from "@/types/IPD/ipd.ts"
import { OPDs, } from '@/types/opd_section/opd'
import { ClipboardPlus, MoveUpRight, Syringe } from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'
import CreatePrescriptionFormModel from '../../components/form-modals/prescription-form-modal'
import PrintOpdBill from './pdf/bill'
import OpdsPdf from './pdf/opds'
import usePrescription from './prescription/prescription-handlers'
import PrescriptionDetailsModel from './prescription/prescriptionDetailsModel'



const OPDLIST = () => {

    // Query params
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
    const [search, setSearch] = useQueryState('search')
    // because we cant get here params
    const opdId = useRef('')
    const [move, setMove] = useState<{
        opdId: string,
        doctorId: number,
        patientId: number,
        reference: string
    } | null>(null)

    // API states
    const [OPD_list, setOPD_list] = useState<OPDs>({ data: [], total_pages: 0 })

    const {
        current,
        setCurrent,
        form,
        setForm,
        isPending,
        setPending,
        onDelete,
        getPrescriptionInfo,
        handleSubmit,
        confirmationProps,
        refresh
    } = usePrescription({ opdId: opdId.current })

    const {
        isPending: isPendingIpd,
        form: formIpd,
        setForm: setFormIpd,
        handleSubmit: handleSubmitIpd
    } = useIpdHandlers()


    // fetching opd Details
    const getOpds = async () => {
        try {
            const data = await OpdApi.getOPDs({ search: search!, page, limit: page_limit })
            setOPD_list(data)
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unexpected error occurred");
                console.error("Non-Error object caught:", error);
            }
        }
    }


    // searching list
    const onSerach = useDebouncedCallback(async (value: string) => {
        value ? setSearch(value) : setSearch(null)
        setPage(1)
    }, 400)


    useEffect(() => {
        getOpds()
    }, [page, search, refresh])


    return (

        <div className='my-2 flex flex-col'>

            {/* top bar */}

            <div className='flex py-3 flex-col md:flex-row gap-y-2 md:items-center md:justify-between'>
                <h1 className='font-semibold tracking-tight'>OPD - out patient list</h1>
                <div className='flex gap-x-2 overflow-x-auto'>

                    {/* <Button size="sm"
            onClick={() => setModel(prev => ({ ...prev, appointmentForm: true }))}
          ><Plus />Add Patient</Button> */}

                </div>
            </div>

            <Separator />

            {/* search bar */}

            <div className='flex py-3 flex-col md:flex-row gap-y-4 md:items-center md:justify-between'>

                <div className='flex gap-x-2'>
                    <Input type='text' height='10px' placeholder='opdId , patient , doctor' onChange={(e) => {
                        onSerach(e.target.value)
                    }} defaultValue={search!} />
                    {/* use debounce to prevent api call */}
                </div>

                <div className='flex gap-x-2'>
                    {/* will print all list */}
                    <OpdsPdf opds={OPD_list['data']} />
                </div>
            </div>

            <Separator />

            {/* pagination */}
            <section className="flex flex-col mb-16 gap-y-5 min-h-[75vh] mt-5">
                <div className="flex-1 space-y-5">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>OPD No.</TableHead>
                                <TableHead>Patient Name</TableHead>
                                <TableHead>Appointment Date</TableHead>
                                <TableHead>Consultant</TableHead>
                                <TableHead>Specialist</TableHead>
                                <TableHead>Reference</TableHead>
                                <TableHead>Previous medical Issue</TableHead>
                                <TableHead className='print:hidden'>Action</TableHead>
                            </TableRow>
                        </TableHeader>


                        <TableBody>

                            {OPD_list?.data.map((opd, i) => {
                                return <TableRow key={i}>
                                    <TableCell>
                                        <Link to={`${opd.id}`}
                                            className="font-medium text-blue-500 hover:text-blue-400 cursor-pointer">
                                            {opd?.id}
                                        </Link>
                                    </TableCell>
                                    <TableCell className='whitespace-nowrap'>
                                        <UserImage url={opd.patient.image} name={opd.patient.name} gender={opd.patient.gender} />
                                    </TableCell>
                                    <TableCell>{opd.appointment.appointment_date}</TableCell>
                                    <TableCell>
                                        <UserImage url={opd.doctor.image} name={opd.doctor.name} gender={opd.doctor.gender} />
                                    </TableCell>
                                    <TableCell>{opd.appointment.specialist.name}</TableCell>
                                    <TableCell>{opd.appointment.reference}</TableCell>
                                    <TableCell className='text-center'>{opd.appointment.previous_medical_issue}</TableCell>

                                    <TableCell className='flex gap-x-2 items-center print:hidden'>

                                        {opd.prescriptions?.id ?
                                            <PermissionProtectedAction action='view' module='Prescription'>
                                                <CustomTooltip message='prescription'>
                                                    <Syringe
                                                        className='cursor-pointer text-gray-600 dark:text-neutral-300 w-5 h-5'
                                                        onClick={async () => {
                                                            await getPrescriptionInfo(opd.prescriptions.id)
                                                        }}
                                                    />
                                                </CustomTooltip>
                                            </PermissionProtectedAction> :
                                            <PermissionProtectedAction action='create' module='Prescription'>
                                                <CustomTooltip message='Add prescription'>
                                                    <ClipboardPlus
                                                        className='cursor-pointer text-gray-600 dark:text-neutral-300 w-5 h-5'
                                                        onClick={() => {
                                                            opdId.current = opd.id;
                                                            setForm(true)
                                                        }}
                                                    />
                                                </CustomTooltip>
                                            </PermissionProtectedAction>
                                        }

                                        {/* prints bill */}
                                        <PrintOpdBill opdId={opd.id} onPending={setPending} />

                                        <PermissionProtectedAction action='create' module='Move To Ipd'>
                                            <CustomTooltip message='Move To IPD'>
                                                <MoveUpRight
                                                    className='cursor-pointer text-gray-600 dark:text-neutral-300 w-5 h-5'
                                                    onClick={() => {
                                                        setMove({
                                                            opdId: opd.id,
                                                            doctorId: opd.doctorId,
                                                            patientId: opd.patientId,
                                                            reference: opd.appointment.reference
                                                        })
                                                        setFormIpd(true)
                                                    }}
                                                />
                                            </CustomTooltip>
                                        </PermissionProtectedAction>

                                    </TableCell>

                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                    {/* error on emply list */}

                    <EmptyList length={OPD_list.data.length} message='No opd found' />
                </div>


                {/* pagination buttons */}
                <section>
                    <CustomPagination
                        total_pages={OPD_list?.total_pages!}
                        currentPage={page}
                        previous={(p) => setPage(p)}
                        goTo={(p) => setPage(p)}
                        next={(p) => setPage(p)}
                    />
                </section>
            </section>

            {/* {model.appointmentForm && <AddAppointment  onClick={() => {  }} />} */}

            {/* Prescription Model */}

            {form &&
                (<CreatePrescriptionFormModel
                    Submit={handleSubmit} isPending={isPending}
                    prescDetails={current!}
                    onClick={() => {
                        setForm(false);
                        setCurrent(null)
                    }}
                />)}

            {/* Loader Model */}

            {isPending && (<LoaderModel />)}


            {/* prescription detais */}

            {(current && !form) && (<PrescriptionDetailsModel
                prescriptionDetails={current!}
                onClick={() => setCurrent(null)}
                Delete={onDelete}
                Edit={() => {
                    setForm(true)
                }}
            />)}


            {/* Alert model */}

            {confirmationProps.isOpen && (<AlertModel
                cancel={() => confirmationProps.onCancel()}
                continue={() => {
                    confirmationProps.onConfirm();
                    setCurrent(null)
                }}
            />)}


            {formIpd && (
                <CreateIpdFormModal
                    Submit={handleSubmitIpd}
                    isPending={isPendingIpd}
                    editDetails={move as IpdInfo}
                    onClick={() => setFormIpd(false)}
                />
            )}

        </div>
    )
}

export default OPDLIST