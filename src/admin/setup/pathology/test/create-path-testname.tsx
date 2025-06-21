import Dialog from '@/components/Dialog'
import CustomTooltip from '@/components/customTooltip'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { ParameterDefaultValue, TestNameFormSchema } from '@/formSchemas/setupSectionSchemas/CreateTestNameSchema'
import { chargeNamesType } from '@/types/setupTypes/chargeName'
import { PathCategoryType, PathologyTestNameDetailsType, PathParametersType } from '@/types/setupTypes/pathology'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader, Plus, X } from 'lucide-react'
import { HTMLAttributes, useEffect, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { Charge_Type_Interface } from '../../hospital-charges/chargeType/chargeTypes'
import { categoryType } from '../../hospital-charges/chargesCategory/categoryList'
import hospitalChargeApi from '../../services/charge'
import { getPathologyCategories, getPathologytParameterDetails, getPathologytParameters } from '../service'




interface TestNameFormModalProps extends HTMLAttributes<HTMLDivElement> {
    Submit: (formData: any) => void
    isPending: boolean,
    editDetails: PathologyTestNameDetailsType
}


const CreatePathTest = ({ editDetails, Submit, isPending, ...props }: TestNameFormModalProps) => {

    // select options for the form
    const [categories, setCategories] = useState<PathCategoryType[]>([])
    const [chargeTypes, setChargeTypes] = useState<Charge_Type_Interface[]>([])
    const [chargeCategories, setChargeCategories] = useState<categoryType[]>([])
    const [chargeNames, setChargeNames] = useState<chargeNamesType>({ data: [], total_pages: 0 })
    const [parameters, setParameters] = useState<PathParametersType[]>([])
    const [parameterData, setParameterData] = useState<{ [key: number]: { range: string, unit: string } }>() // only for view


    const { register, setValue, reset, control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof TestNameFormSchema>>({
        resolver: zodResolver(TestNameFormSchema),
        defaultValues: editDetails ? { ...editDetails, parameters: editDetails.PathTestNameParameter } : ParameterDefaultValue
    })

    const { fields: parametesField, append: AppendParameter, remove: RemoveParameter } = useFieldArray({
        control,
        name: 'parameters'
    })


    const fetchChargeTypes = async () => {
        try {
            const data = await hospitalChargeApi.getChargeTypes('pathology') // getting charge types for pathology
            setChargeTypes(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const handleChargeTypeChange = async (chargeTypeId: number) => {
        try {
            const data = await hospitalChargeApi.getChargeCategories(chargeTypeId)
            setChargeCategories(data)
        } catch ({ message }: any) {
            toast.error(message)

        }
    }


    const handleChargeCategoryChange = async (chargeCategoryId: number) => {
        try {
            const data = await hospitalChargeApi.getChargeNames({ page: 1, limit: 0, search: String(chargeCategoryId) })
            setChargeNames(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const handleChargeNameChange = async (chargeNameId: number) => {
        try {
            const data = await hospitalChargeApi.getChargeNameDetails(chargeNameId)
            setValue('standardCharge', data.standard_charge)
            setValue('tax', data.tax_percentage)
            const amount = data.standard_charge + (data.standard_charge * data.tax_percentage / 100)
            setValue('amount', amount)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const fetchParameters = async () => {
        try {
            const data = await getPathologytParameters()
            setParameters(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const handleParameterChange = async (parameterId: number, index: number) => {
        try {
            const data = await getPathologytParameterDetails(parameterId)
            setParameterData(prev => ({ ...prev, [index]: { range: `${data.from} - ${data.to}`, unit: data.unit.name } }))
        } catch ({ message }: any) {
            toast.error(message)
        }
    }



    const fetchRadioCategories = async () => {
        try {
            const data = await getPathologyCategories()
            setCategories(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }

    const AppendFields = () => {
        AppendParameter(ParameterDefaultValue.parameters[0])
    }


    useEffect(() => {
        fetchRadioCategories()
        fetchChargeTypes()
        fetchParameters()
        if (editDetails) {
            handleChargeTypeChange(editDetails.chargeTypeId)
            handleChargeCategoryChange(editDetails.chargeCategoryId)
            handleChargeNameChange(editDetails.chargeNameId)
            editDetails.PathTestNameParameter.map(async (item, i) => {
                await handleParameterChange(item.parameterId, i)
            })
        }
    }, [])



    return (
        <Dialog pageTitle='Add Test' {...props}>
            <form onSubmit={handleSubmit(Submit)}>
                <ScrollArea className='h-[60vh] sm:h-[55vh]'>
                    <div className="grid sm:grid-cols-3 gap-2 mb-10 px-2.5">

                        {/* Test Name */}
                        <div className="space-y-2 p-2">
                            <Label>Test Name</Label>
                            <Input type="text" {...register('name')} />
                            {errors?.name && <p className='text-sm text-red-500'>{errors?.name.message}</p>}
                        </div>

                        {/* Short Name */}
                        <div className="space-y-2 p-2">
                            <Label>Short Name</Label>
                            <Input type="text" {...register('shortName')} />
                            {errors?.shortName && <p className='text-sm text-red-500'>{errors?.shortName.message}</p>}
                        </div>

                        {/* Test Type */}

                        <div className="space-y-2 p-2">
                            <Label>Test Type</Label>
                            <Input type="text" {...register('testType')} />
                            {errors?.testType && <p className='text-sm text-red-500'>{errors?.testType.message}</p>}
                        </div>


                        {/* Category */}

                        <div className="space-y-2 p-2">
                            <Label> Category </Label>
                            <Controller control={control} name='categoryId' render={({ field }) => {
                                return <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { field.onChange(value) }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent className='z-[200]'>
                                        {categories.map((category) => {
                                            return <SelectItem key={category.id} value={String(category.id)}>{category.name}</SelectItem>
                                        })}
                                    </SelectContent>
                                </Select>
                            }} />
                            {errors?.categoryId && <p className='text-sm text-red-500'>{errors?.categoryId.message}</p>}
                        </div>


                        {/* method */}

                        <div className="space-y-2 p-2">
                            <Label>Method</Label>
                            <Input type="text" {...register('method')} />
                            {errors?.method && <p className='text-sm text-red-500'>{errors?.method.message}</p>}
                        </div>

                        {/* report days */}

                        <div className="space-y-2 p-2">
                            <Label>Report Days</Label>
                            <Input type="number" {...register('reportDays')} defaultValue={0} />
                            {errors?.reportDays && <p className='text-sm text-red-500'>{errors?.reportDays.message}</p>}
                        </div>


                        {/* Charge Type */}

                        <div className="space-y-2 p-2">
                            <Label>Charge Type</Label>
                            <Controller control={control} name='chargeTypeId' render={({ field }) => {

                                return <Select value={field.value ? String(field.value) : ''} onValueChange={(value) => { handleChargeTypeChange(Number(value)), field.onChange(value) }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent className='z-[200]'>
                                        {chargeTypes.map((type) => {
                                            return <SelectItem key={type.id} value={String(type.id)}>{type.charge_type}</SelectItem>
                                        })}
                                    </SelectContent>
                                </Select>
                            }} />
                            {errors?.chargeTypeId && <p className='text-sm text-red-500'>{errors?.chargeTypeId.message}</p>}
                        </div>


                        {/* Charge Category */}

                        <div className="space-y-2 p-2">
                            <Label>Charge Category</Label>
                            <Controller control={control} name='chargeCategoryId' render={({ field }) => {

                                return <Select value={field.value ? String(field.value) : ''} onValueChange={(value) => { handleChargeCategoryChange(Number(value)), field.onChange(value) }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent className='z-[200]'>
                                        {chargeCategories.map((category) => {
                                            return <SelectItem key={category.id} value={String(category.id)}>{category.category}</SelectItem>
                                        })}
                                    </SelectContent>
                                </Select>
                            }} />
                            {errors?.chargeCategoryId && <p className='text-sm text-red-500'>{errors?.chargeCategoryId.message}</p>}
                        </div>


                        {/* charge Names */}

                        <div className="space-y-2 p-2">
                            <Label>Charge Name</Label>
                            <Controller control={control} name='chargeNameId' render={({ field }) => {

                                return <Select value={field.value ? String(field.value) : ''} onValueChange={(value) => { handleChargeNameChange(Number(value)), field.onChange(value) }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent className='z-[200]'>
                                        {chargeNames?.data.map((name) => {
                                            return <SelectItem key={name.id} value={String(name.id)}>{name.name}</SelectItem>
                                        })}
                                    </SelectContent>
                                </Select>
                            }} />
                            {errors?.chargeNameId && <p className='text-sm text-red-500'>{errors?.chargeNameId.message}</p>}
                        </div>


                        {/* Standard Charge */}

                        <div className="space-y-2 p-2">
                            <Label>Standard Charge</Label>
                            <Input type="number" {...register('standardCharge')} disabled />
                            {errors?.standardCharge && <p className='text-sm text-red-500'>{errors?.standardCharge.message}</p>}
                        </div>

                        {/* Tax */}

                        <div className="space-y-2 p-2">
                            <Label>Tax</Label>
                            <Input type="number" {...register('tax')} disabled />
                            {errors?.tax && <p className='text-sm text-red-500'>{errors?.tax.message}</p>}
                        </div>

                        {/* Amount */}

                        <div className="space-y-2 p-2">
                            <Label>Amount</Label>
                            <Input type="number" {...register('amount')} disabled />
                            {errors?.amount && <p className='text-sm text-red-500'>{errors?.amount.message}</p>}
                        </div>

                        {/* separator */}

                        <Separator className='col-span-full my-2' />


                        {/* Parameters Array */}

                        {parametesField.map((field, i) => {
                            return (
                                <div key={field.id} className="col-span-full grid sm:grid-cols-2 lg:grid-cols-4 gap-2 border dark:border-gray-800 rounded-lg p-2">

                                    {/* parameters */}
                                    <div className="space-y-2 p-2">
                                        <Label>Parameter</Label>
                                        <Controller control={control} name={`parameters.${i}.parameterId`} render={({ field }) => {

                                            return <Select value={field.value ? String(field.value) : ''} onValueChange={(value) => { handleParameterChange(Number(value), i), field.onChange(value) }}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent className='z-[200]'>
                                                    {parameters?.map((parameter) => (
                                                        <SelectItem key={parameter.id} value={String(parameter.id)}>{parameter.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        }} />
                                        {errors?.parameters?.[i]?.parameterId && <p className='text-sm text-red-500'>{errors?.parameters?.[i]?.parameterId?.message}</p>}
                                    </div>

                                    {/* unit */}

                                    <div className="space-y-2 p-2">
                                        <Label>Unit</Label>
                                        <Input type="text" defaultValue={parameterData?.[i]?.unit} disabled />
                                    </div>

                                    {/* range */}

                                    <div className="space-y-2 p-2">
                                        <Label>Range</Label>
                                        <Input type="text" defaultValue={parameterData?.[i]?.range} disabled />
                                    </div>


                                    {/* Button to remove fields */}

                                    {parametesField.length !== 1 &&
                                        <div className="h-full flex items-center gap-x-2 justify-end sm:justify-normal mx-auto">
                                            <CustomTooltip message='Remove Parameter'>
                                                <div className="p-1 bg-red-500 rounded-full text-white mt-2 sm:mt-4">
                                                    <X className="w-4 h-4 cursor-pointer" onClick={() => { RemoveParameter(i) }} />
                                                </div>
                                            </CustomTooltip>
                                        </div>
                                    }

                                </div>
                            )
                        })}


                        {/* Button for Addding fields */}

                        <div className="col-span-full flex justify-end mr-5 mt-2">
                            <CustomTooltip message='Add Parameter'>
                                <div className="p-1 bg-slate-500 rounded-full text-white">
                                    <Plus className="w-4 h-4 cursor-pointer" onClick={AppendFields} />
                                </div>
                            </CustomTooltip>
                        </div>

                    </div>
                </ScrollArea>
                <div className="flex p-2 gap-x-2 sm:justify-end">
                    <Button type='button' variant='ghost' onClick={() => reset()}>Reset</Button>
                    <Button type='submit' className='flex-1 sm:flex-none'>{editDetails ? 'Update' : 'Save Test'} {isPending && <Loader className='animate-spin' />}</Button>
                </div>
            </form>
        </Dialog >
    )
}





export default CreatePathTest



// NOTE : Unit and Range are only for displaying purpose and will not be saved