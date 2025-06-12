import usePrescription from "@/pages/OPD/prescription/prescription-handlers"
import PrescriptionDetailsModel from "@/pages/OPD/prescription/prescriptionDetailsModel"
import AlertModel from "@/components/alertModel"
import CustomTooltip from "@/components/customTooltip"
import EmptyList from "@/components/emptyList"
import PrescriptionFormModal from "@/components/form-modals/prescription-form-modal"
import PermissionProtectedAction from "@/components/permission-protected-actions"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Syringe } from "lucide-react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"




const IpdPrescription = () => {

    const { ipdId } = useParams()

    const { current, setCurrent, prescriptions, refresh, getPrescriptionInfo, getPrescriptions, form, setForm, isPending, handleSubmit, onDelete, confirmationProps } = usePrescription({ ipdId })


    useEffect(() => {
        getPrescriptions()
    }, [refresh])



    return (
        <>
            <section className="flex flex-col gap-y-5">

                <div className="flex justify-between">
                    <h1 className="text-lg text-gray-800 dark:text-white font-semibold">Prescription</h1>
                    <PermissionProtectedAction action="create" module="Prescription">
                        {prescriptions.length < 1 &&
                            (<Button size='sm' onClick={() => setForm(true)}>
                                <Plus /> Add Prescription
                            </Button>)}
                    </PermissionProtectedAction>
                </div>


                <Separator />

                {/* pagination */}
                <section className="flex flex-col gap-y-5 min-h-[60vh]">
                    <div className="flex-1">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Pres ID</TableHead>
                                    <TableHead>Finding Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {
                                    prescriptions.map((pres, i) => (
                                        <TableRow key={i}>

                                            <TableCell >{pres.id}</TableCell>

                                            <TableCell>
                                                {pres.prescFindings.map((item, i) => (
                                                    <p key={i} className="mt-2 truncate">• {item.findingName.name}</p>
                                                ))}
                                            </TableCell>

                                            <TableCell>
                                                {pres.prescFindings.map((item, i) => (
                                                    <p key={i} className="mt-2 truncate">• {item.description}</p>
                                                ))}
                                            </TableCell>

                                            <TableCell>
                                                <CustomTooltip message="View Prescription">
                                                    <Syringe className="h-5 w-5 cursor-pointer text-gray-600 dark:text-gray-400"
                                                        onClick={async () => {
                                                            await getPrescriptionInfo(pres.id)
                                                        }}
                                                    />
                                                </CustomTooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>

                        <EmptyList length={prescriptions.length} message="No Prescriptions Found" />
                    </div>
                </section>
            </section>


            {
                form && (
                    <PrescriptionFormModal Submit={handleSubmit} isPending={isPending}
                        prescDetails={current!}
                        onClick={() => { setForm(false); setCurrent(null) }}
                    />
                )
            }


            {(current && !form) && (
                <PrescriptionDetailsModel
                    prescriptionDetails={current!}
                    onClick={() => setCurrent(null)}
                    Delete={onDelete}
                    Edit={() => { setForm(true) }}
                />
            )}


            {/* Alert model */}

            {confirmationProps.isOpen && (
                <AlertModel
                    cancel={() => confirmationProps.onCancel()}
                    continue={() => { confirmationProps.onConfirm(), setCurrent(null) }}
                />
            )}

        </>
    )
}





export default IpdPrescription