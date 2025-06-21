import { geteMedicineGroups, getMedicineCategories, getMedicineCompanies, getMedicineUnits } from '@/admin/setup/pharmacy/service'
import Dialog from '@/components/Dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AddMedicinesFormSchema } from '@/formSchemas/addMedicinesFormSchema'
import { medicineDetails } from '@/types/pharmacy/pharmacy'
import { medicineCategory, medicineComapny, medicineGroup } from '@/types/setupTypes/pharmacy'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { HTMLAttributes, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'



interface AddMedicineFormModelProps extends HTMLAttributes<HTMLDivElement> {
    Submit: (FormData: any) => void
    isPending: boolean
    medicineDetails: medicineDetails
}


const AddMedicineFormModel = ({ Submit, isPending, medicineDetails, ...props }: AddMedicineFormModelProps) => {


    // Select options
    const [options, setOptions] = useState<{
        categories: medicineCategory[],
        companies: medicineComapny[],
        groups: medicineGroup[],
        units: medicineGroup[]
    }>({ categories: [], companies: [], groups: [], units: [] })



    const { register, reset, handleSubmit, control, formState: { errors } } = useForm<z.infer<typeof AddMedicinesFormSchema>>(
        {
            resolver: zodResolver(AddMedicinesFormSchema),
            defaultValues: {
                ...medicineDetails,
                categoryId: String(medicineDetails?.categoryId),  // formatting these
                companyId: String(medicineDetails?.companyId),
                groupId: String(medicineDetails?.groupId),
                unitId: String(medicineDetails?.unitId)
            }
        }
    )



    useEffect(() => {
        try {
            // Fetching form options
            (async function fetchAPIs() {
                const [categories, companies, groups, units] = await Promise.all([
                    getMedicineCategories(),
                    getMedicineCompanies(),
                    geteMedicineGroups(),
                    getMedicineUnits()
                ])

                setOptions(rest => ({
                    ...rest,
                    categories,
                    companies,
                    groups,
                    units
                }))
            })() //IIFE
        } catch ({ message }: any) {
            toast.error(message)
        }
    }, [])



    return (
        <Dialog pageTitle='Add Medicine' {...props}>
            <form className="rounded-md" onSubmit={handleSubmit(Submit)}>

                {/* mainGrid */}

                <ScrollArea className='h-[50vh] sm:h-[50vh]'>

                    <div className="grid md:grid-cols-3 gap-5 mt-5 px-3 pb-5">

                        {/* Name */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Medicine Name</Label>
                            <Input type='text' {...register('name')} />
                            {errors.name && <p className='text-sm text-red-500'>{errors.name.message}</p>}
                        </div>

                        {/* category */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Controller control={control} name='categoryId' render={({ field }) => {
                                return <>
                                    <Label>Medicine Category</Label>
                                    <Select value={field.value ? String(field.value) : ''} onValueChange={(value) => { field.onChange(value) }}>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>

                                        <SelectContent className='z-[200]'>
                                            {options.categories.map((category) => {
                                                return <SelectItem key={category.id} value={String(category.id)}>{category.name}</SelectItem>
                                            })}
                                        </SelectContent>
                                    </Select>
                                </>
                            }} />
                            {errors.categoryId && <p className='text-sm text-red-500'>{errors.categoryId.message}</p>}
                        </div>



                        {/* company */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Controller control={control} name='companyId' render={({ field }) => {
                                return <>
                                    <Label>Company</Label>
                                    <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>

                                        <SelectContent className='z-[200]'>
                                            {options.companies.map((company, index) => {
                                                return <SelectItem key={index} value={String(company.id)}>{company.name}</SelectItem>
                                            })}
                                        </SelectContent>
                                    </Select>
                                </>
                            }} />
                            {errors.companyId && <p className='text-sm text-red-500'>{errors.companyId.message}</p>}

                        </div>


                        {/* Composition */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Composition</Label>
                            <Input type='text' {...register('composition')} />
                            {errors.composition && <p className='text-sm text-red-500'>{errors.composition.message}</p>}
                        </div>


                        {/* Group */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Controller control={control} name='groupId' render={({ field }) => {
                                return <>
                                    <Label>Medicine Group</Label>
                                    <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>

                                        <SelectContent className='z-[200]'>
                                            <SelectContent className='z-[200]'>
                                                {options.groups.map((group, index) => {
                                                    return <SelectItem key={index} value={String(group.id)}>{group.name}</SelectItem>
                                                })}
                                            </SelectContent>
                                        </SelectContent>
                                    </Select>
                                </>
                            }} />
                            {errors.groupId && <p className='text-sm text-red-500'>{errors.groupId.message}</p>}
                        </div>


                        {/* unit */}


                        <div className="w-full flex flex-col gap-y-2">
                            <Controller control={control} name='unitId' render={({ field }) => {
                                return <>
                                    <Label>Unit</Label>
                                    <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>

                                        <SelectContent className='z-[200]'>
                                            <SelectContent className='z-[200]'>
                                                {options.units.map((unit, index) => {
                                                    return <SelectItem key={index} value={String(unit.id)}>{unit.name}</SelectItem>
                                                })}
                                            </SelectContent>
                                        </SelectContent>
                                    </Select>
                                </>
                            }} />
                            {errors.unitId && <p className='text-sm text-red-500'>{errors.unitId.message}</p>}
                        </div>


                        {/* min level */}

                        <div className="w-full flex flex-col gap-y-2 ">
                            <Label>Min Level</Label>
                            <Input type='number' {...register('min_level')} />
                        </div>


                        {/* reorder level */}

                        <div className="w-full flex flex-col gap-y-2 ">
                            <Label>Re-Order Level</Label>
                            <Input type='number' {...register('reorder_level')} />
                        </div>


                        {/* Vat */}

                        <div className="w-full flex flex-col gap-y-2 ">
                            <Label>VAT</Label>
                            <Input type='number' {...register('vat')} />
                        </div>


                        {/* Rack Number */}

                        <div className="w-full flex flex-col gap-y-2 ">
                            <Label>Rack No</Label>
                            <Input type='text' {...register('rack_no')} />
                        </div>

                        {/* Note */}

                        <div className="w-full flex flex-col gap-y-2 ">
                            <Label>Note</Label>
                            <Input type='text' {...register('note')} />
                        </div>

                    </div>
                </ScrollArea>

                <div className="flex mt-5 mb-2 p-3 gap-x-2 sm:justify-end">
                    <Button type='button' variant={'outline'} onClick={() => { reset() }}>reset</Button>
                    <Button type='submit' className='flex-1 sm:flex-none' >{medicineDetails ? 'Update' : 'Save Medicine'} {isPending && <Loader className='animate-spin' />}</Button>
                </div>

            </form>
        </Dialog>
    )
}

export default AddMedicineFormModel