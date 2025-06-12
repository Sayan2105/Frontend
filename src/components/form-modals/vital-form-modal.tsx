import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { vitalFormSchema } from '@/formSchemas/vitalFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { HTMLAttributes } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import Dialog from '@/components/Dialog'
import { SetupVital } from '@/types/setupTypes/vital'



interface VitalFormModelProps extends HTMLAttributes<HTMLDivElement> {
    Submit: (formData: any) => void
    isPending: boolean
    vitalOptions: SetupVital[]
}


const VitalFormModel = ({ vitalOptions, Submit, isPending, ...props }: VitalFormModelProps) => {

    const { register, control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof vitalFormSchema>>({
        resolver: zodResolver(vitalFormSchema)
    })


    return (

        <Dialog pageTitle='Add Payment' {...props} className='sm:w-[400px] mx-auto'>
            <form onSubmit={handleSubmit(Submit)}>
                <ScrollArea className={'relative h-[50vh] w-full'}>
                    <div className="grid gap-5 mt-5 px-3 pb-5 ">

                        {/* Date */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Date</Label>
                            <Input type='date' {...register('date')} />
                            {errors.date && <p className='text-sm text-red-500'>{errors.date.message}</p>}
                        </div>


                        {/* name */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Controller control={control} name='setup_VitalId' render={({ field }) => {
                                console.log(field.value);

                                return <>
                                    <Label>Vital Name</Label>
                                    <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { field.onChange(Number(value)) }}>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>

                                        <SelectContent className='z-[200]'>
                                            {vitalOptions.map((vital) => {
                                                return <SelectItem key={vital.id} value={String(vital.id)}>{`${vital.name} ( ${vital.from} - ${vital.to} )`}</SelectItem>
                                            })}
                                        </SelectContent>
                                    </Select>
                                </>
                            }} />
                            {errors.setup_VitalId && <p className='text-sm text-red-500'>{errors.setup_VitalId.message}</p>}

                        </div>

                        {/* Value */}

                        <div className="w-full flex flex-col gap-y-2 ">
                            <Label>Value</Label>
                            <Input type='text' {...register('value')} />
                            {errors.value && <p className='text-sm text-red-500'>{errors.value.message}</p>}
                        </div>
                    </div>
                </ScrollArea>
                <div className="flex mt-5 mb-2 p-3 gap-x-2 sm:justify-end">
                    <Button type='submit' className='flex-1'>Save Vitals {isPending && <Loader className='animate-spin' />}</Button>
                </div>
            </form>
        </Dialog>
    )
}

export default VitalFormModel