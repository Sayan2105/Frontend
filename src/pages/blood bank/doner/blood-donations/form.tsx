import Dialog from '@/components/Dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { bloodDonationSchema } from '@/formSchemas/blood-bank'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { HTMLAttributes, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import useBloodDonor from '../blood-doners/handlers'
import { PaginatedDonations } from '@/types/blood-bank/blood-bank'



interface DonationsFormProps extends HTMLAttributes<HTMLDivElement> {
    Submit: (formData: any) => void
    isPending: boolean
    defaultValues?: PaginatedDonations['data'][0]
}


const DonationsForm = ({ defaultValues, Submit, isPending, ...props }: DonationsFormProps) => {

    const { donors, getBloodDonors } = useBloodDonor({})

    const { register, control, setValue, handleSubmit, formState: { errors } } = useForm<z.infer<typeof bloodDonationSchema>>({
        resolver: zodResolver(bloodDonationSchema),
        defaultValues
    })

    const handleDonorChange = (id: number) => {
        const donor = donors.data.find(donor => donor.id === id)
        setValue('blood_group', donor?.blood_group!)
    }


    useEffect(() => {
        getBloodDonors()
    }, [])


    return (

        <Dialog pageTitle={defaultValues ? 'Update Donation' : 'Add Donation'} {...props} className='sm:w-[400px] mx-auto'>
            <form onSubmit={handleSubmit(Submit)}>

                {/* Donor */}
                <ScrollArea className={'relative h-[50vh] w-full'}>
                    <div className="grid gap-5 mt-5 px-3 pb-5 ">

                        <div className="w-full flex flex-col gap-y-2">
                            <Controller control={control} name='donorId' render={({ field }) => {
                                return <>
                                    <Label>Donor Name</Label>
                                    <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { handleDonorChange(Number(value)); field.onChange(value) }}>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>

                                        <SelectContent className='z-[200]'>
                                            {donors.data.map((donor) => {
                                                return <SelectItem key={donor.id} value={String(donor.id)}>{donor.name}</SelectItem>
                                            })}
                                        </SelectContent>
                                    </Select>
                                </>
                            }} />
                            {errors.donorId && <p className='text-sm text-red-500'>{errors.donorId.message}</p>}
                        </div>


                        {/* Blood Group */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Blood Group</Label>
                            <Input type='text' {...register('blood_group')} disabled />
                            {errors.blood_group && <p className='text-sm text-red-500'>{errors.blood_group.message}</p>}
                        </div>


                        {/* Bag */}

                        <div className="w-full flex flex-col gap-y-2 ">
                            <Label>Bag</Label>
                            <Input type='text' {...register('bag')} disabled={defaultValues?.status === 'USED'} />
                            {errors.bag && <p className='text-sm text-red-500'>{errors.bag.message}</p>}
                        </div>

                        {/* expiry */}
                        <div className="w-full flex flex-col gap-y-2 ">
                            <Label>Expiry</Label>
                            <Input type='date' {...register('expiry')} />
                            {errors.expiry && <p className='text-sm text-red-500'>{errors.expiry.message}</p>}
                        </div>

                    </div>
                </ScrollArea>

                <div className="flex mt-5 mb-2 p-3 gap-x-2 sm:justify-end">
                    <Button type='submit' className='flex-1' disabled={isPending}>
                        {defaultValues ? 'Update' : 'Save'}
                        {isPending && <Loader className='animate-spin' />}
                    </Button>
                </div>
            </form>
        </Dialog>
    )
}



export default DonationsForm