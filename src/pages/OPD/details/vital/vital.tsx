import AlertModel from "@/components/alertModel";
import CustomTooltip from "@/components/customTooltip";
import EmptyList from "@/components/emptyList";
import PermissionProtectedAction from "@/components/permission-protected-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import groupedBYdate from "@/helpers/groupVitals";
import { Plus, Trash } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import useVitalHandlers from "./vital-handlers";
import VitalFormModel from "../../../../components/form-modals/vital-form-modal";


const Vital = () => {


    const { vitals, getVitals, getSetupVitals, setupVitals, form, setForm, isPending, handleSubmit, onDelete, confirmationProps } = useVitalHandlers()


    // this handles filtering by date

    const onSearch = async (date: string) => {
        try {
            await getVitals(date)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }

    useEffect(() => {
        getVitals()
        getSetupVitals()
    }, [])


    return (
        <section className="flex flex-col gap-y-5 pb-16 flex-1 ">

            <div className="flex justify-between">
                <h1 className="text-lg text-gray-800 dark:text-gray-100 font-semibold">Vitals</h1>
                <PermissionProtectedAction action='create' module='Vitals'>
                    <Button size='sm' onClick={() => { setForm(true) }}>
                        <Plus /> Add Vital
                    </Button>
                </PermissionProtectedAction>
            </div>

            <Separator />

            <div className="sm:w-48 space-y-1">
                <p className="text-sm text-gray-700 dark:text-gray-400">Search by date</p>
                <Input type="date" onChange={(e) => { onSearch(e.target.value) }} />
            </div>

            <Separator />

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Height (1-200 CM)</TableHead>
                        <TableHead>Weight (kg)</TableHead>
                        <TableHead>BP (mm Hg)</TableHead>
                        <TableHead>Temp (°C)</TableHead>
                        <TableHead>RR (breaths/min)</TableHead>
                        <TableHead>O2 Sat (%)</TableHead>
                        <TableHead>Blood Sugar (mg/dL)</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {groupedBYdate(vitals).map((vital, i) => {
                        return (
                            <TableRow key={i}>
                                <TableCell>{vital.date}</TableCell>

                                {/* Render each specific value under its respective column */}

                                {setupVitals.map((measure) => {  // Vitals is from select options
                                    const detail = vital.measure.find((item) => item.vital.name === measure.name);

                                    return (
                                        <TableCell key={measure.name} className="text-nowrap">
                                            {detail ? (
                                                <div className="flex space-x-1 group">
                                                    <span>{detail.vital.name} {detail.value}</span>
                                                    <PermissionProtectedAction action='delete' module='Vitals'>
                                                        <CustomTooltip message="DELETE">
                                                            <Trash className="w-3 text-gray-700 dark:text-gray-400 active:scale-95 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                                                                onClick={() => onDelete(detail.id)}
                                                            />
                                                        </CustomTooltip>
                                                    </PermissionProtectedAction>
                                                </div>
                                            )
                                                : ""} {/* Render the value or an empty string if missing */}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>


            {/* error on emply list */}

            <EmptyList length={vitals.length} message="No vitals found" />

            {/* model */}

            {form && <VitalFormModel
                vitalOptions={setupVitals}
                Submit={handleSubmit}
                isPending={isPending}
                onClick={() => setForm(false)}
            />}


            {/* Alert model */}

            {confirmationProps.isOpen && <AlertModel
                cancel={() => confirmationProps.onCancel()}
                continue={() => confirmationProps.onConfirm()}
            />}

        </section>
    )
}

export default Vital