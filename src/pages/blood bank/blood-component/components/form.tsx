import Dialog from "@/components/Dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { bloodComponentSchema, defaultBCFields } from "@/formSchemas/blood-bank"
import { bloodComponents, bloodGroups } from "@/helpers/formSelectOptions"
import bloodBankApi from "@/services/blood-bank-api"
import { bagType } from "@/types/blood-bank/blood-bank"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader, Plus, X } from "lucide-react"
import { HTMLAttributes, useEffect, useState } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"


interface BloodComponentFormProps extends HTMLAttributes<HTMLDivElement> {
    isPending: boolean;
    Submit: (formData: any) => void
}


const BloodComponentForm = ({ Submit, isPending, ...props }: BloodComponentFormProps) => {

    const [bags, setBegs] = useState<bagType>([])


    const { register, control, reset, handleSubmit, formState: { errors } } = useForm<z.infer<typeof bloodComponentSchema>>({
        resolver: zodResolver(bloodComponentSchema),
        defaultValues: defaultBCFields
    })


    const { fields, append: AppendField, remove: RemoveField } = useFieldArray({
        name: 'components',
        control
    })


    const AppendFields = () => {
        AppendField(defaultBCFields.components[0])
    }


    const HandleBloodGroupChange = async (group: string) => {
        try {
            const data = await bloodBankApi.getBloodBags(group)
            setBegs(data)
            console.log(data);

        } catch ({ message }: any) { toast.error(message) }
    }



    useEffect(() => {


    }, [])






    return (
        <Dialog pageTitle="Blood Components" {...props}>

            <form onSubmit={handleSubmit(Submit)}>

                <ScrollArea className='h-[60vh] sm:h-[55vh]'>

                    <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-5 px-2.5" onSubmit={handleSubmit(Submit)}>

                        {/* Blood Group */}
                        <div className="w-full flex flex-col gap-y-2">
                            <Controller control={control} name='blood_group' render={({ field }) => {
                                return <>
                                    <Label>Blood Group</Label>
                                    <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { HandleBloodGroupChange(value), field.onChange(value) }}>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent className='z-[200]'>
                                            {bloodGroups.map((item, i) => {
                                                return <SelectItem key={i} value={item.value}>{item.label}</SelectItem>
                                            })}
                                        </SelectContent>
                                    </Select>
                                </>
                            }} />
                            {errors.blood_group && <p className='text-sm text-red-500'>{errors.blood_group.message}</p>}
                        </div>

                        {/* Blood Bag */}
                        <div className="w-full flex flex-col gap-y-2">
                            <Controller control={control} name='bag' render={({ field }) => {
                                return <>
                                    <Label>Bag</Label>
                                    <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { field.onChange(value) }}>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent className='z-[200]'>
                                            {bags.map((item, i) => {
                                                return <SelectItem key={i} value={item.bag}>{item.bag}</SelectItem>
                                            })}
                                        </SelectContent>
                                    </Select>
                                </>
                            }} />
                            {errors.bag && <p className='text-sm text-red-500'>{errors.bag.message}</p>}
                        </div>


                        {/* Arrayed fields */}
                        {fields.map((field, index) => {

                            return <section key={field.id} className="sm:col-span-full mt-2 p-2 rounded-md grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-2   border-2 border-dashed border-zinc-200 dark:border-zinc-800">

                                {/* Component Name */}

                                <div className="w-full flex flex-col gap-y-2">
                                    <Controller control={control} name={`components.${index}.name`} render={({ field }) => {
                                        return <>
                                            <Label>Component Name</Label>
                                            <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { field.onChange(value) }}>
                                                <SelectTrigger >
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>

                                                <SelectContent className='z-[200]'>
                                                    {bloodComponents.map((item, index) => {
                                                        return <SelectItem key={index} value={item.value}>{item.label}</SelectItem>
                                                    })}
                                                </SelectContent>
                                            </Select>
                                        </>
                                    }} />
                                    {errors.components?.[index]?.name && <p className='text-sm text-red-500'>{errors.components?.[index].name?.message}</p>}
                                </div>


                                {/* Bag */}

                                <div className="w-full flex flex-col gap-y-2">
                                    <Label>Bag</Label>
                                    <Input type='text' {...register(`components.${index}.bag`)} />
                                    {errors?.components?.[index]?.bag && <p className='text-sm text-red-500'>{errors?.components?.[index]?.bag.message}</p>}
                                </div>


                                {/* Lot */}

                                <div className="w-full flex flex-col gap-y-2">
                                    <Label>Lot</Label>
                                    <Input type='number' {...register(`components.${index}.lot`)} />
                                    {errors?.components?.[index]?.lot && <p className='text-sm text-red-500'>{errors?.components?.[index]?.lot.message}</p>}
                                </div>


                                {/* Institution */}

                                <div className="w-full flex flex-col gap-y-2">
                                    <Label>Institution</Label>
                                    <Input type='text' {...register(`components.${index}.institution`)} />
                                    {errors?.components?.[index]?.institution && <p className='text-sm text-red-500'>{errors?.components?.[index]?.institution.message}</p>}
                                </div>

                                {/* Button to remove fields */}

                                {fields.length !== 1 &&
                                    <div className="h-full sm:col-span-full flex items-center gap-x-2 col-span-2 justify-center sm:justify-end">
                                        <TooltipProvider delayDuration={200}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div className="p-1 bg-red-500 rounded-full text-white mt-2 sm:mt-4">
                                                        <X className="w-4 h-4 cursor-pointer" onClick={() => { RemoveField(index) }} />
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent className="z-[200]">Remove</TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                }

                            </section>

                        })}


                        {/* Button for Addding fields */}

                        <div className="col-span-full flex justify-end mr-2">
                            <TooltipProvider delayDuration={200}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="p-1 bg-slate-500 rounded-full text-white">
                                            <Plus className="w-4 h-4 cursor-pointer" onClick={AppendFields} />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent className="z-[200]">Add More Fields</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>


                    </div>
                </ScrollArea>

                <div className="flex mt-5 mb-2 gap-x-2 sm:justify-end px-2.5">
                    <Button type='button' variant={'ghost'} onClick={() => reset()} >Reset</Button>
                    <Button type='submit' className='flex-1 sm:flex-none' >{false ? ('Update') : ('Save Components')} {isPending && <Loader className='animate-spin' />}</Button>
                </div>
            </form>
        </Dialog>
    )
}





export default BloodComponentForm