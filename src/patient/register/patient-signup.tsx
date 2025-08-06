import Dialog from '@/components/Dialog'
import RequiredLabel from '@/components/required-label'
import { Button } from '@/components/ui/button'
import ImageInput from '@/components/ui/image-input'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import PasswordField from '@/components/ui/password-input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { patientRegistrationSchema, patientUpdateSchema } from '@/formSchemas/patientRegisterFormSchema'
import { bloodGroups, maritalStatus } from '@/helpers/formSelectOptions'
import { PatientDetails } from '@/types/patient/patient'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { HTMLAttributes } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'


interface Props extends HTMLAttributes<HTMLDivElement> {
    editDetails?: PatientDetails
    isPending: boolean
    Submit: (formData: any) => void
}


const RegisterPatient = ({ editDetails, isPending, Submit, ...props }: Props) => {

    const schema = editDetails ? patientUpdateSchema : patientRegistrationSchema

    const { register, handleSubmit, control, reset, formState: { errors } } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: { ...editDetails, image: undefined }
    })


    return (
        <Dialog pageTitle='Register Patient' {...props}>
            <form onSubmit={handleSubmit(Submit)}>

                <ScrollArea className='h-[50vh] lg:h-[60vh]'>
                    <div className='grid lg:grid-cols-3 sm:grid-cols-2 p-5 gap-5 rounded-lg pb-10'>
                        {/* Patient Name */}

                        <div className="space-y-2">
                            <RequiredLabel label='Patient Name' />
                            <Input type='text' {...register('name')} placeholder='eg: John Doe' />
                            {errors.name && <span className='text-red-500 text-sm'>{errors.name.message}</span>}
                        </div>

                        {/* Guardian */}
                        <div className="space-y-2">
                            <RequiredLabel label='Guardian Name' />
                            <Input type='text' {...register('guardian_name')} placeholder='eg: Jane Doe' />
                            {errors.guardian_name && <span className='text-red-500 text-sm'>{errors.guardian_name.message}</span>}
                        </div>


                        {/* Gender */}
                        <div className="space-y-2">
                            <RequiredLabel label='Gender' />
                            <Controller control={control} name='gender' render={({ field }) => (
                                <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>

                                    <SelectContent className='z-[200]'>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            )} />
                            {errors.gender && <span className='text-red-500 text-sm'>{errors.gender.message}</span>}
                        </div>


                        {/* DOB */}
                        <div className="space-y-2">
                            <RequiredLabel label='DOB' />
                            <Input type='date' {...register('dob')} />
                            {errors.dob && <span className='text-red-500 text-sm'>{errors.dob.message}</span>}
                        </div>


                        {/* Age */}
                        <div className="space-y-2">
                            <RequiredLabel label='Age' />
                            <Input type='number' {...register('age')} placeholder='eg: 25' />
                            {errors.age && <span className='text-red-500 text-sm'>{errors.age.message}</span>}
                        </div>


                        {/* Blood Group */}

                        <div className="space-y-2">
                            <RequiredLabel label='Blood Group' />
                            <Controller control={control} name='blood_group' render={({ field }) => (
                                <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent className='z-[200]'>
                                        {bloodGroups?.map((group, i) => (
                                            <SelectItem key={i} value={group.value}>{group.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )} />
                            {errors.blood_group && <span className='text-red-500 text-sm'>{errors.blood_group.message}</span>}
                        </div>


                        {/* Marital Status */}

                        <div className="space-y-2">
                            <RequiredLabel label='Marital Status' />
                            <Controller control={control} name='marital_status' render={({ field }) => (
                                <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent className='z-[200]'>
                                        {maritalStatus?.map((status, i) => (
                                            <SelectItem key={i} value={status.value}>{status.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )} />
                            {errors.marital_status && <span className='text-red-500 text-sm'>{errors.marital_status.message}</span>}
                        </div>


                        {/* Patient Image */}

                        <div className="space-y-2">
                            <Label>Image</Label>
                            <Controller control={control} name='image' render={({ field }) => (
                                <ImageInput
                                    title='Upload Image'
                                    message='PNG, JPG up to 4MB'
                                    onChange={(e) => { field.onChange(e) }}
                                />
                            )} />
                        </div>


                        {/* phone */}

                        <div className="space-y-2">
                            <RequiredLabel label='Phone' />
                            <Input type='number' {...register('phone')} placeholder='eg: 1234567890' />
                            {errors.phone && <span className='text-red-500 text-sm'>{errors.phone.message}</span>}
                        </div>


                        {/* email */}

                        <div className="space-y-2">
                            <RequiredLabel label='Email Address' />
                            <Input type='email' {...register('email')} placeholder='eg: johndoe@gmail.com' />
                            {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>}
                        </div>


                        {/* password */}

                        {!editDetails &&
                            <>

                                <div className="space-y-2">
                                    <RequiredLabel label='Password' />
                                    <PasswordField type='password' {...register('password')} placeholder='********' />
                                    {errors.password && <span className='text-red-500 text-sm'>{errors.password.message}</span>}
                                </div>

                                <div className="space-y-2">
                                    <RequiredLabel label='Confirm Password' />
                                    <PasswordField type='password' {...register('confirm_password')} placeholder='********' />
                                    {errors.confirm_password && <span className='text-red-500 text-sm'>{errors.confirm_password.message}</span>}
                                </div>
                            </>
                        }


                        {/* alergies */}

                        <div className="space-y-2">
                            <Label>Alergies</Label>
                            <Input type='text' {...register('alergies')} placeholder='eg: Milk, Gluten, Sugar' />
                            {errors.alergies && <span className='text-red-500 text-sm'>{errors.alergies.message}</span>}
                        </div>


                        {/* Aadhar No */}

                        <div className="space-y-2">
                            <Label>Aadhar</Label>
                            <Input type='number' {...register('aadhar')} />
                            {errors.aadhar && <span className='text-red-500 text-sm'>{errors.aadhar.message}</span>}
                        </div>


                        {/* Address */}

                        <div className="space-y-2">
                            <RequiredLabel label='Address' />
                            <Textarea {...register('address')} placeholder='eg: 123 Main Street, New York' />
                            {errors.address && <span className='text-red-500 text-sm'>{errors.address.message}</span>}
                        </div>

                    </div>
                </ScrollArea>

                {/* button section */}

                <div className="col-span-full gap-2 flex flex-col sm:justify-end sm:flex-row p-5 border-t border-border">

                    <div className='order-2 sm:order-none'>
                        <Button type='button' size={'sm'} variant={'ghost'} className='w-full' onClick={() => { reset() }}>Reset</Button>
                    </div>
                    <div>
                        <Button type='submit' size={'sm'} className='w-full' disabled={isPending}>
                            {editDetails ? 'Update' : 'Register'}
                            {isPending && <Loader className='animate-spin' />}
                        </Button>
                    </div>

                </div>
            </form>
        </Dialog>
    )
}

export default RegisterPatient