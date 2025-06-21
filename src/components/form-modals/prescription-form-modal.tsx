import { getDoseDurations, getDoseIntervals, getMedicineCategories } from "@/admin/setup/pharmacy/service"
import findingApi from "@/admin/setup/services/finding"
import Dialog from "@/components/Dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { createPrescriptionFormSchema, valuesASdefault } from "@/formSchemas/createPrescriptionFormSchema"
import PharmacyApi from "@/services/pharmacy-api"
import { prescriptionDetail } from "@/types/opd_section/prescription"
import { medicinesBYcategory } from "@/types/pharmacy/pharmacy"
import { findingCategory, findingName } from "@/types/setupTypes/finding"
import { doseDuration, doseInterval, medicineCategory } from "@/types/setupTypes/pharmacy"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader, Plus, X } from "lucide-react"
import { HTMLAttributes, useEffect, useState } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"



interface PrescriptionFormModelProps extends HTMLAttributes<HTMLDivElement> {
    Submit: (formData: any) => void;
    isPending: boolean
    prescDetails: prescriptionDetail
}



const PrescriptionFormModal = ({ prescDetails: details, isPending, Submit, ...props }: PrescriptionFormModelProps) => {

    // form select options state
    const [findingCategories, setFindingCategories] = useState<findingCategory[]>([])
    const [findingNames, setFindingNames] = useState<{ [key: number]: findingName[] }>([])
    const [medicineCategories, setMedicineCategories] = useState<medicineCategory[]>([])
    const [medicineNames, setMedicineNames] = useState<{ [key: number]: medicinesBYcategory[] }>([])
    const [medicineQuantity, setMedicineQuantity] = useState<{ [key: number]: number }>([])
    const [doseOption, setDoseOptions] = useState<{ doseIntervals: doseInterval[], doseDurations: doseDuration[] }>({
        doseDurations: [],
        doseIntervals: []
    })



    const { control, handleSubmit, setValue, register, formState: { errors } } = useForm<z.infer<typeof createPrescriptionFormSchema>>({
        resolver: zodResolver(createPrescriptionFormSchema),
        defaultValues: details ? {
            ...details,
            medicine: details?.prescMedicines,
            finding: details?.prescFindings
        } : valuesASdefault
    })


    const { fields: medicineFields, append: addMedicineFields, remove: removeMedicineFields } = useFieldArray({
        name: 'medicine',
        control
    })


    const { fields: findingFields, append: addFindingFields, remove: removeFindingFields } = useFieldArray({
        name: 'finding',
        control
    })


    // fetching all medicine categories
    const fetchMedCategories = async () => {
        try {
            const data = await getMedicineCategories()
            setMedicineCategories(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }

    // handling category change
    const handleMedCategoryChange = async (categroyId: number, index: number,) => {
        try {
            const data = await PharmacyApi.getMedicinesBYcategory(categroyId)
            setMedicineNames(rest => ({ ...rest, [index]: data }))
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    // fetch finding categories
    const fetchFindinCategories = async () => {
        try {
            const data = await findingApi.getCategories()
            setFindingCategories(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    // handling finding category change or binding Finding names
    const handleFindingCategoryChange = async (categoryId: string, index: number) => {
        try {
            const data = await findingApi.getNames(categoryId)
            setFindingNames(rest => ({ ...rest, [index]: data }))
        } catch ({ message }: any) {
            toast.error(message)
        }
    }

    // setting description
    const handleFindingNameChange = async (id: number, index: number) => {
        try {
            const data = await findingApi.getNameDetails(id)
            // setFindingDescription(rest => ({ ...rest, [index]: data.description }))
            setValue(`finding.${index}.description`, data.description)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    // fetching dose options
    const fetchDoseOptions = async () => {
        try {
            const [Intervals, Durations] = await Promise.all([
                getDoseIntervals(),
                getDoseDurations()
            ])
            setDoseOptions({
                doseIntervals: Intervals,
                doseDurations: Durations
            })
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const onMedicineFields = () => {
        addMedicineFields(valuesASdefault.medicine)
    }

    const onFindingFields = () => {
        addFindingFields(valuesASdefault.finding)
    }

    // setting medicine quantity
    const handleMedNameChange = (medicineId: number, index: number) => {
        const medicineObject = medicineNames[index].find(item => (item.id === medicineId))
        setMedicineQuantity(rest => ({ ...rest, [index]: medicineObject?.quantity! }))
    }



    useEffect(() => {
        console.log(details);
        fetchFindinCategories()
        fetchMedCategories()
        fetchDoseOptions()
        // on edit mode rebinding data
        if (details) {
            details.prescMedicines.forEach((elem, i) => {
                handleMedCategoryChange(elem.categoryId, i)
            })
            details.prescFindings.forEach((elem, i) => {
                handleFindingCategoryChange(String(elem.findingCategoryId), i)
            })
        }
    }, [])


    return (
        <Dialog pageTitle="Add Prescription" {...props}>
            <form onSubmit={handleSubmit(Submit)}>
                <ScrollArea className={'relative h-[50vh] sm:h-[65vh] w-full'}>
                    <div className="grid lg:grid-cols-4 sm:grid-cols-3 gap-4 mt-1 px-3 pb-5 ">

                        {/* Header Note */}

                        <div className="w-full flex flex-col gap-y-2 sm:col-span-full">
                            <Label>Header Note</Label>
                            <Textarea  {...register('header_note')} placeholder="Write note here.." />
                            {errors.header_note && <p className='text-sm text-red-500'>{errors.header_note.message}</p>}
                        </div>


                        {/* Findings Array Section */}

                        {findingFields.map((field, index) => (
                            <section key={field.id} className="sm:col-span-full grid px-2 py-4 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-md gap-2 sm:grid-cols-3">

                                {/* Finding */}

                                <div className="w-full flex flex-col gap-y-2">
                                    <Controller control={control} name={`finding.${index}.findingCategoryId`} render={({ field }) => {
                                        return <>
                                            <Label>Finding Category</Label>
                                            {/* cause value was initialy 0 that was then converted "0" so field was gets true that why place holder was not displaying */}
                                            <Select value={field.value === 0 ? undefined : field.value.toString()} onValueChange={(value) => { handleFindingCategoryChange(value, index); field.onChange(Number(value)) }}>
                                                <SelectTrigger >
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>

                                                <SelectContent className='z-[200]'>
                                                    {findingCategories?.map((category, i) => {
                                                        return <SelectItem key={i} value={String(category.id)}>{category.name}</SelectItem>
                                                    })}
                                                </SelectContent>
                                            </Select>
                                        </>
                                    }} />
                                    {errors.finding?.[index]?.findingCategoryId && <p className='text-sm text-red-500'>{errors.finding?.[index]?.findingCategoryId.message}</p>}

                                </div>


                                {/* Finding List */}

                                <div className="w-full flex flex-col gap-y-2">
                                    <Controller control={control} name={`finding.${index}.findingNameId`} render={({ field }) => {
                                        const findNames = findingNames?.[index]
                                        return <>
                                            <Label>Finding List</Label>
                                            <Select value={field.value === 0 ? undefined : field.value.toString()} onValueChange={(value) => { handleFindingNameChange(Number(value), index); field.onChange(Number(value)) }}>
                                                <SelectTrigger >
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>

                                                <SelectContent className='z-[200]'>
                                                    {findNames?.map((name) => {
                                                        return <SelectItem key={name.id} value={String(name.id)}>{name.name}</SelectItem>
                                                    })}
                                                </SelectContent>
                                            </Select>
                                        </>
                                    }} />
                                    {errors.finding?.[index]?.findingNameId && <p className='text-sm text-red-500'>{errors.finding?.[index].findingNameId.message}</p>}
                                </div>

                                {/* Description */}

                                <div className="w-full flex flex-col gap-y-2">
                                    <Label>Description</Label>
                                    <Textarea  {...register(`finding.${index}.description`)} placeholder="Write descroption" />
                                    {errors?.finding?.[index]?.description && <p className='text-sm text-red-500'>{errors?.finding?.[index].description.message}</p>}
                                </div>



                                {/* Remove fields button */}

                                <div className="h-full flex items-center gap-x-2 col-span-full sm:col-span-1 justify-center sm:justify-normal">
                                    {findingFields.length > 1 && <TooltipProvider delayDuration={200}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className="p-1 bg-red-500 rounded-full text-white mt-2 sm:mt-4">
                                                    <X className="w-4 h-4 cursor-pointer" onClick={() => { removeFindingFields(index) }} />
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent className="z-[200]">Remove</TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>}
                                </div>

                            </section>
                        ))}




                        {/* add more finding fields button */}

                        <div className="h-full flex col-span-full justify-end mr-2">
                            <TooltipProvider delayDuration={200}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="p-1 bg-slate-500 rounded-full active:scale-90 text-white mt-2 sm:mt-4">
                                            <Plus className="w-4 h-4 cursor-pointer " onClick={onFindingFields} />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent className="z-[200]">Add more finding fields</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>





                        {/* Medicine Array section */}

                        {medicineFields.map((field, index) => {
                            return <section key={field.id} className="sm:col-span-full grid-cols-2 grid px-2 py-4 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-md gap-2 sm:grid-cols-5">

                                {/* Medicine Category */}

                                <div className="w-full flex flex-col gap-y-2">
                                    <Controller control={control} name={`medicine.${index}.categoryId`} render={({ field }) => {
                                        return <>
                                            <Label>Medicine Category</Label>
                                            <Select value={field.value === 0 ? undefined : field.value.toString()} onValueChange={(value) => { handleMedCategoryChange(Number(value), index); field.onChange(Number(value)) }}>
                                                <SelectTrigger >
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>

                                                <SelectContent className='z-[200]'>
                                                    {medicineCategories.map((category, i) => {
                                                        return <SelectItem key={i} value={String(category.id)}>{category.name}</SelectItem>
                                                    })}
                                                </SelectContent>
                                            </Select>
                                        </>
                                    }} />
                                    {errors.medicine?.[index]?.categoryId && <p className='text-sm text-red-500'>{errors.medicine?.[index]?.categoryId?.message}</p>}
                                </div>


                                {/* Medicine Name */}

                                <div className="w-full flex flex-col gap-y-2">
                                    <Controller control={control} name={`medicine.${index}.medicineId`} render={({ field }) => {
                                        const Names = medicineNames[index]
                                        return <>
                                            <Label>Medicine Name</Label>
                                            <Select value={field.value === 0 ? undefined : field.value.toString()} onValueChange={(value) => { handleMedNameChange(Number(value), index); field.onChange(Number(value)) }}>
                                                <SelectTrigger >
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>

                                                <SelectContent className='z-[200]'>
                                                    {Names?.map((medName) => {
                                                        return <SelectItem key={medName.id} value={String(medName.id)}>{medName.name}</SelectItem>
                                                    })}
                                                </SelectContent>
                                            </Select>
                                        </>
                                    }} />
                                    {medicineQuantity[index] === 0 && <p className="text-sm text-red-500 italic">out of stock</p>}
                                    {medicineQuantity[index] ? <p className="text-sm text-primary italic">Available Qty {medicineQuantity[index]}</p> : null}
                                    {errors.medicine?.[index]?.medicineId && <p className='text-sm text-red-500'>{errors.medicine?.[index]?.medicineId?.message}</p>}
                                </div>


                                {/* Dose Interval */}

                                <div className="w-full flex flex-col gap-y-2 ">
                                    <Controller control={control} name={`medicine.${index}.doseIntervalId`} render={({ field }) => {
                                        return <>
                                            <Label>Dose Interval</Label>
                                            <Select value={field.value === 0 ? undefined : field.value.toString()} onValueChange={(value) => { field.onChange(Number(value)) }}>
                                                <SelectTrigger >
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>

                                                <SelectContent className='z-[200]'>
                                                    {doseOption.doseIntervals?.map((interval) => {
                                                        return <SelectItem key={interval.id} value={String(interval.id)}>{interval.interval}</SelectItem>
                                                    })}
                                                </SelectContent>
                                            </Select>

                                        </>
                                    }} />
                                    {errors.medicine?.[index]?.doseIntervalId && <p className='text-sm text-red-500'>{errors.medicine?.[index]?.doseIntervalId.message}</p>}
                                </div>

                                {/* Dose Duration */}

                                <div className="w-full flex flex-col gap-y-2 ">
                                    <Controller control={control} name={`medicine.${index}.doseDurationId`} render={({ field }) => {
                                        return <>
                                            <Label>Dose Duration</Label>
                                            <Select value={field.value === 0 ? undefined : field.value.toString()} onValueChange={(value) => { field.onChange(Number(value)) }}>
                                                <SelectTrigger >
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>

                                                <SelectContent className='z-[200]'>
                                                    {doseOption.doseDurations?.map((duration) => {
                                                        return <SelectItem key={duration.id} value={String(duration.id)}>{duration.duration}</SelectItem>
                                                    })}
                                                </SelectContent>
                                            </Select>

                                        </>
                                    }} />
                                    {errors.medicine?.[index]?.doseDurationId && <p className='text-sm text-red-500'>{errors.medicine?.[index]?.doseDurationId.message}</p>}
                                </div>

                                {/* Instruction */}

                                <div className="w-full flex flex-col gap-y-2 col-span-full sm:col-span-1">
                                    <Label>Instruction</Label>
                                    <Input {...register(`medicine.${index}.instruction`)} />
                                    {errors.medicine?.[index]?.instruction && <p className='text-sm text-red-500'>{errors.medicine?.[index]?.instruction.message}</p>}
                                </div>

                                {/* Remove fields button */}

                                <div className="h-full flex items-center gap-x-2 col-span-full sm:col-span-1 justify-center sm:justify-normal">
                                    {medicineFields.length > 1 && <TooltipProvider delayDuration={200}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className="p-1 bg-red-500 rounded-full text-white mt-2 sm:mt-4">
                                                    <X className="w-4 h-4 cursor-pointer" onClick={() => { removeMedicineFields(index) }} />
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent className="z-[200]">Remove</TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>}
                                </div>
                            </section>
                        })}


                        {/* add more medicine fiels button */}

                        <div className="h-full flex col-span-full justify-end mr-2">
                            <TooltipProvider delayDuration={200}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="p-1 bg-slate-500 rounded-full active:scale-90 text-white mt-2 sm:mt-4">
                                            <Plus className="w-4 h-4 cursor-pointer " onClick={onMedicineFields} />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent className="z-[200]">Add more medicine fields</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>



                    </div>
                </ScrollArea>
                <div className="flex mt-5 p-3 gap-x-2 sm:justify-end">
                    <Button type='submit' className='flex-1 sm:flex-none'>{details ? 'Update' : 'Save Prescription'} {isPending && <Loader className='animate-spin' />}</Button>
                </div>
            </form>
        </Dialog>
    )
}

export default PrescriptionFormModal