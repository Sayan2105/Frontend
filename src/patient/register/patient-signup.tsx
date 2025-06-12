import Dialog from '@/components/Dialog'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import ImageInput from '@/components/ui/image-input'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { patientRegistrationSchema, patientUpdateSchema } from '@/formSchemas/patientRegisterFormSchema'
import { bloodGroups, maritalStatus } from '@/helpers/formSelectOptions'
import { PatientDetails } from '@/types/patient/patient'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { HTMLAttributes } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'


interface Props extends HTMLAttributes<HTMLDivElement> {
    editDetails?: PatientDetails
    isPending: boolean
    Submit: (formData: any) => void
}


const RegisterPatient = ({ editDetails, isPending, Submit, ...props }: Props) => {

    const schema = editDetails ? patientUpdateSchema : patientRegistrationSchema

    const patientRegistrationform = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: { ...editDetails, image: undefined }
    })


    return (
        <Dialog pageTitle='Register Patient' {...props}>
            <Form {...patientRegistrationform}>
                <form onSubmit={patientRegistrationform.handleSubmit(Submit)}>

                    <ScrollArea className='min-h-[40vh] h-[60vh]'>
                        <div className='grid lg:grid-cols-3 sm:grid-cols-2 p-5 gap-5 rounded-lg pb-10'>
                            {/* Patient Name */}

                            <FormField control={patientRegistrationform.control} name='name' render={({ field }) => {
                                return <FormItem className="flex flex-col gap-3">
                                    <FormLabel>Patient Name</FormLabel>
                                    <FormControl>
                                        <Input type='text' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }} />

                            {/* Guardian */}

                            <FormField control={patientRegistrationform.control} name='guardian_name' render={({ field }) => {
                                return <FormItem className="flex flex-col gap-3">
                                    <FormLabel>Guardian Name</FormLabel>
                                    <FormControl>
                                        <Input type='text' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }} />


                            {/* Gender */}

                            <FormField control={patientRegistrationform.control} name='gender' render={({ field }) => {
                                return <FormItem className="flex flex-col gap-3">
                                    <FormLabel>Gender</FormLabel>
                                    <FormControl>
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
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }} />


                            {/* DOB */}

                            <FormField control={patientRegistrationform.control} name='dob' render={({ field }) => {
                                return <FormItem className="flex flex-col gap-3">
                                    <FormLabel>DOB</FormLabel>
                                    <FormControl >
                                        <Input type='date'  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }} />


                            {/* Age */}

                            <FormField control={patientRegistrationform.control} name='age' render={({ field }) => {
                                return <FormItem className="flex flex-col gap-3">
                                    <FormLabel>Age</FormLabel>
                                    <FormControl>
                                        <Input type='number' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }} />


                            {/* Blood Group */}

                            <FormField control={patientRegistrationform.control} name='blood_group' render={({ field }) => {
                                return <FormItem className="flex flex-col gap-3">
                                    <FormLabel>Blood Group</FormLabel>
                                    <FormControl>
                                        <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent className='z-[200]'>
                                                <SelectItem defaultValue={'select'} value={'select'}>Select</SelectItem>
                                                {bloodGroups?.map((group, i) => (
                                                    <SelectItem key={i} value={group.value}>{group.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }} />



                            {/* Marital Status */}

                            <FormField control={patientRegistrationform.control} name='marital_status' render={({ field }) => {
                                return <FormItem className="flex flex-col gap-3">
                                    <FormLabel>Marital Status</FormLabel>
                                    <FormControl>
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
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }} />


                            {/* Patient Image */}

                            <FormField control={patientRegistrationform.control} name='image' render={({ field }) => {
                                return <FormItem className="flex flex-col gap-3">
                                    <FormLabel>Image</FormLabel>
                                    <FormControl>
                                        <ImageInput
                                            title='Upload Image'
                                            message='PNG, JPG up to 4MB'
                                            onChange={(e) => { field.onChange(e) }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }} />


                            {/* phone */}

                            <FormField control={patientRegistrationform.control} name='phone' render={({ field }) => {
                                return <FormItem className="flex flex-col gap-3">
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input type='number' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }} />


                            {/* email */}

                            <FormField control={patientRegistrationform.control} name='email' render={({ field }) => {
                                return <FormItem className="flex flex-col gap-3">
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input type='email' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }} />


                            {/* password */}

                            {!editDetails && <FormField control={patientRegistrationform.control} name='password' render={({ field }) => {
                                return <FormItem className="flex flex-col gap-3">
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }} />}


                            {/* alergies */}

                            <FormField control={patientRegistrationform.control} name='alergies' render={({ field }) => {
                                return <FormItem className="flex flex-col gap-3">
                                    <FormLabel>Alergies</FormLabel>
                                    <FormControl>
                                        <Input type='text' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }} />


                            {/* Aadhar No */}

                            <FormField control={patientRegistrationform.control} name='aadhar' render={({ field }) => {
                                return <FormItem className="flex flex-col gap-3">
                                    <FormLabel>Aadhar</FormLabel>
                                    <FormControl>
                                        <Input type='number' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }} />


                            {/* Address */}

                            <FormField control={patientRegistrationform.control} name='address' render={({ field }) => {
                                return <FormItem className="flex flex-col gap-3">
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input type='text' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }} />
                        </div>
                    </ScrollArea>

                    {/* button section */}

                    <div className="col-span-full gap-2 flex flex-col sm:justify-end sm:flex-row p-5">

                        <div className='order-2 sm:order-none'>
                            <Button type='button' size={'sm'} variant={'ghost'} className='w-full' onClick={() => { patientRegistrationform.reset() }}>Reset</Button>
                        </div>
                        <div>
                            <Button type='submit' size={'sm'} className='w-full' disabled={isPending}>
                                {editDetails ? 'Update' : 'Register'}
                                {isPending && <Loader className='animate-spin' />}
                            </Button>
                        </div>

                    </div>

                </form>
            </Form>
        </Dialog>
    )
}

export default RegisterPatient