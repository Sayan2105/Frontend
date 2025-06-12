import CardBox from "@/components/card-box";
import PermissionProtectedAction from "@/components/permission-protected-actions";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import UserImage from "@/components/user-image";
import { currencySymbol } from "@/helpers/currencySymbol";
import groupedBYdate from "@/helpers/groupVitals";
import { currencyFormat } from "@/lib/utils";
import OpdApi from "@/services/opd-api";
import { opdDetails } from "@/types/opd_section/opd";
import { Calendar, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";




const VisitDetails = () => {

    const { opdId } = useParams()
    const [current, setCurrent] = useState<opdDetails>()


    const getOpdById = async () => {
        try {
            const data = await OpdApi.getOpdById(opdId!)
            setCurrent(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    useEffect(() => {
        getOpdById()
    }, [])



    return (

        // main grid
        <section className="grid lg:grid-cols-2 pb-10 gap-8">

            {/*  grid col 1 */}

            <div className="grid sm:grid-cols-2 gap-2">

                {/* patient name / image */}

                <div className="sm:col-span-2 flex items-center mb-3">

                    <UserImage
                        width='w-fit'
                        imageClass='w-20 h-20'
                        url={current?.appointment?.patient?.image!}
                        gender={current?.appointment?.patient?.gender!}
                    />

                    <div className=''>
                        <p className='font-semibold text-lg text-gray-900 dark:text-white'>{current?.appointment?.patient.name}</p>
                        <p className='text-sm text-gray-500'>OPD No : {current?.id}</p>
                    </div>
                </div>


                {/* patient Details */}

                <CardBox className="dark:bg-background dark:border-border" borderType="solid" title="Gender" value={current?.appointment?.patient.gender} />
                <CardBox className="dark:bg-background dark:border-border" borderType="solid" title="Guardian Name" value={current?.appointment?.patient.guardian_name} />
                <CardBox className="dark:bg-background dark:border-border" borderType="solid" title="Age" value={current?.appointment?.patient.age} />
                <CardBox className="dark:bg-background dark:border-border" borderType="solid" title="Blood Group" value={current?.appointment?.patient.blood_group} />
                <CardBox className="dark:bg-background dark:border-border" borderType="solid" title="Aadhar" value={current?.appointment?.patient.aadhar} />
                <CardBox className="dark:bg-background dark:border-border" borderType="solid" title="Phone" value={current?.appointment?.patient.phone} />
                <CardBox className="dark:bg-background dark:border-border" borderType="solid" title="Address" value={current?.appointment?.patient.address} />
                <CardBox className="dark:bg-background dark:border-border" borderType="solid" title="Alergies" value={current?.appointment?.patient.alergies} />

                <Separator className="sm:col-span-full my-8" />

                {/* Vital section */}

                <h1 className="sm:col-span-full font-semibold text-gray-800 dark:text-neutral-100">Vitals</h1>

                {/* Can be add Vitals Here */}

                {groupedBYdate(current?.Vitals ?? []).map((vital, i) => (
                    <div key={i} className='space-y-1 p-2  ring-1 ring-zinc-200 dark:ring-border rounded-sm'>
                        <div className="flex justify-between">
                            <p className='text-gray-700 dark:text-gray-300'>Date</p>
                            <p className="text-sm text-gray-500">{vital?.date}</p>
                        </div>
                        <Separator />
                        {vital?.measure.map((measure, i) => (
                            <div key={i} className='flex justify-between'>
                                <p className='text-gray-700 dark:text-gray-300 text-sm'>{measure.vital?.name}</p>
                                <p className='font-semibold'>{measure?.value}</p>
                            </div>
                        ))}
                    </div>
                ))}


                <Separator className="sm:col-span-full my-8" />

                {/* Symptoms */}

                <h1 className="sm:col-span-full font-semibold text-gray-800 dark:text-neutral-100">Symptoms</h1>
                <p className="text-sm text-gray-500 sm:col-span-full">{current?.appointment?.symptom_description}</p>

                <Separator className="sm:col-span-full my-8" />

                {/* Doctors */}

                <h1 className="sm:col-span-full font-semibold text-gray-800 dark:text-neutral-100">Consultant</h1>

                <div className="sm:col-span-full flex items-center">
                    <UserImage url={current?.appointment?.doctor.image!} gender={current?.appointment?.doctor.gender!}
                        width='w-fit'
                        imageClass='w-16 h-16'
                    />

                    <div className=''>
                        <p className='font-semibold text-lg text-gray-900 dark:text-white'>{current?.appointment?.doctor.name}</p>
                        <p className='text-sm text-gray-500'>ID : {current?.appointment?.doctor.id}</p>
                    </div>

                </div>

                <Separator className="sm:col-span-full my-8" />


                {/* Timeline */}

                <h1 className="sm:col-span-full font-semibold mb-2 text-gray-800 dark:text-neutral-100">Timeline</h1>

                {current?.timelines?.length! > 0 ? (<ul className="sm:col-span-full relative before:absolute space-y-5 before:w-1 w-64 sm:w-[400px] mx-auto gap-3 before:h-full before:bg-yellow-700 before:top-0 before:block">

                    {current?.timelines?.map((timeline, i) => {
                        return <li className="space-y-4" key={i}>

                            {/* Time section */}
                            <span className="relative  text-sm my-2 -top-1 bg-yellow-500 -left-[10%] sm:-left-[8%] text-yellow-900 py-1 px-3 rounded-md">{timeline.date}</span>

                            <div className="relative flex items-center space-x-3 -ml-3 z-10">

                                {/* Calendor section */}
                                <div className="p-1.5 bg-yellow-500 rounded-full ">
                                    <span ><Calendar className="w-4 h-4 text-yellow-900" /></span>
                                </div>

                                <div className="space-y-2 flex-1 border-2 border-dashed border-yellow-500 dark:border-yellow-700 p-2 rounded-lg">

                                    <p className=" font-semibold text-gray-800 dark:text-neutral-100">{timeline.title}</p>

                                    <Separator className="bg-yellow-500/50 dark:bg-yellow-500/20" />

                                    {/* Description */}
                                    <p className="text-sm text-gray-700 dark:text-neutral-400">{timeline.description}</p>

                                </div>
                            </div>
                        </li>
                    })}

                    {/* Static Secttion */}

                    <li className="relative flex items-center space-x-2 -ml-3 z-10">
                        <div className="p-1.5 bg-yellow-500 rounded-full">
                            <Clock className="w-4 h-4 text-yellow-900" />
                        </div>
                    </li>
                </ul>)
                    :
                    // error message
                    <h1 className="text-sm text-gray-600">No data found</h1>
                }

                <Separator className="sm:col-span-full my-8 lg:hidden" />

            </div>







            {/* grid col 2 */}

            <div className="flex flex-col gap-2 overflow-x-auto">

                {/* Medication */}

                <PermissionProtectedAction action="view" module="Medication">
                    <h1 className="font-semibold text-gray-800 dark:text-neutral-100 mb-2">Medication</h1>

                    <Table>
                        <TableHeader >
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Medicine Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Dose</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Note</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {current?.medications?.map((medication, i) => (
                                <TableRow key={i}>
                                    <TableCell className="text-gray-800 dark:text-neutral-100 whitespace-nowrap">{medication.date}</TableCell>
                                    <TableCell>{medication?.medicine.name}</TableCell>
                                    <TableCell>{medication?.category.name}</TableCell>
                                    <TableCell>{medication.dose}</TableCell>
                                    <TableCell>{medication.time}</TableCell>
                                    <TableCell className="text-gray-600 dark:text-gray-400">{medication.note}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>


                    {current?.medications?.length! < 1 && <p className="text-sm text-gray-600">No data found</p>}

                    <Separator className="sm:col-span-full my-8" />

                </PermissionProtectedAction>

                {/* Operation */}

                <PermissionProtectedAction action="view" module="Operation">
                    <h1 className="font-semibold text-gray-800 dark:text-neutral-100 mb-2">Operation</h1>

                    <Table>
                        <TableHeader >
                            <TableRow>
                                <TableHead>Reference No</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Operation Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>OT Technician</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {current?.Operations?.map((operation, i) => {
                                return <TableRow key={i}>
                                    <TableCell className="text-gray-700 dark:text-neutral-300">{operation.id}</TableCell>
                                    <TableCell className="text-sm">{operation.date}</TableCell>
                                    <TableCell>{operation.operationName.name}</TableCell>
                                    <TableCell>{operation.operationCategory.name}</TableCell>
                                    <TableCell>{operation.ot_technician}</TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>

                    {current?.Operations?.length! < 1 && <p className="text-sm text-gray-600">No data found</p>}

                    <Separator className="sm:col-span-full my-8" />
                </PermissionProtectedAction>


                {/* Charges */}

                <PermissionProtectedAction action="view" module="Charges">
                    <h1 className="font-semibold text-gray-800 dark:text-neutral-100 mb-2">Charges</h1>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Charge Date</TableHead>
                                <TableHead>Charge Name</TableHead>
                                <TableHead>Std Charge {currencySymbol()}</TableHead>
                                <TableHead>TPA {currencySymbol()}</TableHead>
                                <TableHead>Net Amount {currencySymbol()}</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {current?.charges?.map((charge, i) => {
                                return <TableRow key={i}>
                                    <TableCell className="whitespace-nowrap">{charge.date}</TableCell>
                                    <TableCell>{charge.chargeNames.name}</TableCell>
                                    <TableCell>{currencyFormat(charge.standard_charge)}</TableCell>
                                    <TableCell>{currencyFormat(charge.tpa)}</TableCell>
                                    <TableCell>{currencyFormat(charge.net_amount)}</TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>

                    {current?.charges?.length! < 1 && <p className="text-sm text-gray-600">No data found</p>}

                    <Separator className="sm:col-span-full my-8" />
                </PermissionProtectedAction>


                {/* Payments */}

                <PermissionProtectedAction action="view" module="Payments">
                    <h1 className="font-semibold text-gray-800 dark:text-neutral-100 mb-2">Payments</h1>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Transaction ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Payment Mode</TableHead>
                                <TableHead>Paid Amount {currencySymbol()}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {current?.Payments?.map((payment) => {
                                return <TableRow key={payment.id}>
                                    <TableCell className="font-semibold">{payment.id}</TableCell>
                                    <TableCell className="whitespace-nowrap">{payment.date}</TableCell>
                                    <TableCell >{payment.payment_mode}</TableCell>
                                    <TableCell >{currencyFormat(payment.amount)}</TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>

                    {current?.Payments?.length! < 1 && <p className="text-sm text-gray-600">No data found</p>}
                </PermissionProtectedAction>
            </div>
        </section>
    )
}

export default VisitDetails