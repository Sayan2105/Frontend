import { ROLE } from '@/admin/setup/Authorization/role/role'
import AuthzApi from '@/admin/setup/services/authorization'
import useStaffDepartment from '@/admin/setup/staff/department/handlers'
import useStaffDesignation from '@/admin/setup/staff/designation/handlers'
import useSpecialization from '@/admin/setup/staff/specialization/handlers'
import RequiredLabel from '@/components/required-label'
import TextLabel from '@/components/text-label'
import { Button } from '@/components/ui/button'
import ImageInput from '@/components/ui/image-input'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MultiSelect } from '@/components/ui/multi-select'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { createStaffFormSchema } from '@/formSchemas/createStaffFormSchema'
import { currencySymbol } from '@/helpers/currencySymbol'
import { bloodGroups, maritalStatus, nomineeRelationOptions } from '@/helpers/formSelectOptions'
import StaffApi from '@/services/staff-api'
import { zodResolver } from '@hookform/resolvers/zod'
import { BriefcaseBusiness, Landmark, Loader, Paperclip, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'



const docs = ['image', 'aadhar_image', 'pan_image', 'diploma_image', 'graduation_image', 'masters_image', 'license_image']


const CreateStaff = () => {

  const { id } = useParams()
  const router = useNavigate()

  const [isPending, setPending] = useState<boolean>(false)

  // api state
  const [roles, setRole] = useState<ROLE[]>([])

  const { handleSubmit, reset, register, control, formState: { errors } } = useForm<z.infer<typeof createStaffFormSchema>>({
    resolver: zodResolver(createStaffFormSchema)
  })


  const { getDesignations, designations } = useStaffDesignation()
  const { getDepartments, departments } = useStaffDepartment()
  const { getSpecializations, specializations } = useSpecialization()


  async function onSubmit(staffData: z.infer<typeof createStaffFormSchema>) {
    try {

      let data; setPending(true)
      const formData = new FormData()

      // coverting all the data to form data
      for (const [key, value] of Object.entries(staffData)) {
        if (!value) continue
        if (docs.includes(key)) {
          formData.append(key, value as any);
        } else {
          formData.append(key, JSON.stringify(value))
        }
      }

      id ?
        (data = await StaffApi.updateStaff(Number(id), formData),
          router(`..`))
        :
        (data = await StaffApi.createStaff(formData),
          router(`/staff`)
        )

      toast.success(data.message)

    } catch ({ message }: any) {
      toast.error(message)
    }

    finally { setPending(false) }
  }


  const fetchProfileDetails = async () => {
    try {
      const data = await StaffApi.getStaffById(Number(id))
      const mapped = {
        ...data,
        specializationId: data.specialist.map(item => item.id) || [],
        image: undefined,
        aadhar_image: undefined,
        pan_image: undefined,
        diploma_image: undefined,
        graduation_image: undefined,
        masters_image: undefined,
        license_image: undefined
      }

      reset(mapped)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  const fetchRoles = async () => {
    try {
      const data = await AuthzApi.getRoles()
      setRole(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  useEffect(() => {
    (async () => {
      await fetchRoles()
      await getDepartments()
      await getDesignations()
      await getSpecializations()
      if (id) await fetchProfileDetails()
    })()
  }, [])



  return (
    <section className='pt-4 pb-20'>
      <form className='p-4 grid md:grid-cols-2 lg:grid-cols-3 ring-1 ring-gray-200 dark:ring-border rounded-lg gap-4' onSubmit={handleSubmit(onSubmit)}>

        {/* header */}
        <div className="col-span-full">
          <h1 className='text-lg font-bold'>Staff Information</h1>
        </div>

        {/* separator */}
        <Separator className='mt-4 mb-2 col-span-full' />

        {/* Text Label */}
        <TextLabel
          title='Personal information'
          icon={<User className='h-5 w-5' />}
        />

        {/* name */}

        <div className="w-full flex flex-col gap-y-2">
          <RequiredLabel label='Name' />
          <Input type='text' {...register('name')} placeholder='Enter Name' />
          {errors.name && <p className='text-sm text-red-500'>{errors.name.message}</p>}
        </div>

        {/*father name */}

        <div className="w-full flex flex-col gap-y-2">
          <RequiredLabel label='Father Name' />
          <Input type='text' {...register('father_name')} placeholder='Enter Father Name' />
          {errors.father_name && <p className='text-sm text-red-500'>{errors.father_name.message}</p>}
        </div>

        {/*mother name */}

        <div className="w-full flex flex-col gap-y-2">
          <RequiredLabel label='Mother Name' />
          <Input type='text' {...register('mother_name')} placeholder='Enter Mother Name' />
          {errors.mother_name && <p className='text-sm text-red-500'>{errors.mother_name.message}</p>}
        </div>

        {/* gender */}

        <div className="w-full flex flex-col gap-y-2">
          <Controller control={control} name='gender' render={({ field }) => {
            return <>
              <RequiredLabel label='Gender' />
              <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                <SelectTrigger >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent className='z-[200]'>
                  <SelectItem value='male'>Male</SelectItem>
                  <SelectItem value='female'>Female</SelectItem>
                </SelectContent>
              </Select>
            </>
          }} />
          {errors.gender && <p className='text-sm text-red-500'>{errors.gender.message}</p>}
        </div>


        {/* Marital Status */}

        <div className="w-full flex flex-col gap-y-2">
          <Controller control={control} name='marital_status' render={({ field }) => {
            return <>
              <Label>Marital Status</Label>
              <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                <SelectTrigger >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent className='z-[200]'>
                  {maritalStatus?.map((status, index) => {
                    return <SelectItem key={index} value={status.value}>{status.label}</SelectItem>
                  })}
                </SelectContent>
              </Select>
            </>
          }} />
          {errors.marital_status && <p className='text-sm text-red-500'>{errors.marital_status.message}</p>}
        </div>

        {/* Blood Group */}

        <div className="w-full flex flex-col gap-y-2">
          <Controller control={control} name='blood_group' render={({ field }) => {
            return <>
              <Label>Blood Group</Label>
              <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                <SelectTrigger >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent className='z-[200]'>
                  {bloodGroups?.map((group, index) => {
                    return <SelectItem key={index} value={group.value}>{group.label}</SelectItem>
                  })}
                </SelectContent>
              </Select>
            </>
          }} />
          {errors.blood_group && <p className='text-sm text-red-500'>{errors.blood_group.message}</p>}
        </div>

        {/*Date of birth */}

        <div className="w-full flex flex-col gap-y-2">
          <RequiredLabel label='Date of birth' />
          <Input type='date' {...register('dob')} />
          {errors.dob && <p className='text-sm text-red-500'>{errors.dob.message}</p>}
        </div>

        {/*Phone */}

        <div className="w-full flex flex-col gap-y-2">
          <Label>Phone</Label>
          <Input type='number' {...register('phone')} placeholder='Enter Phone Number' />
          {errors.phone && <p className='text-sm text-red-500'>{errors.phone.message}</p>}
        </div>

        {/*Emergency Contact */}

        <div className="w-full flex flex-col gap-y-2">
          <Label>Emergency Contact</Label>
          <Input type='number' {...register('emergency_contact')} placeholder='Enter Emergency Contact' />
          {errors.emergency_contact && <p className='text-sm text-red-500'>{errors.emergency_contact.message}</p>}
        </div>

        {/* Email */}

        <div className="w-full flex flex-col gap-y-2">
          <RequiredLabel label='Email' />
          <Input type='email' {...register('email')} placeholder='example@gmail.com' />
          {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
        </div>

        {/* Current Address */}

        <div className="w-full flex flex-col gap-y-2">
          <Label>Current Address</Label>
          <Input type='text' {...register('current_address')} placeholder='Enter Current Address' />
          {errors.current_address && <p className='text-sm text-red-500'>{errors.current_address.message}</p>}
        </div>

        {/* Permanent Address */}

        <div className="w-full flex flex-col gap-y-2">
          <Label>Permanent Address</Label>
          <Input type='text' {...register('permanent_address')} placeholder='Enter Permanent Address' />
          {errors.permanent_address && <p className='text-sm text-red-500'>{errors.permanent_address.message}</p>}
        </div>

        {/* Image */}

        <div className="w-full flex flex-col gap-y-2">
          <Controller control={control} name='image' render={({ field }) => (
            <>
              {/* <Label>Image</Label> */}
              <ImageInput
                title='Upload Image'
                message='PNG, JPG up to 4MB'
                onChange={(image) => { field.onChange(image) }}
              />
            </>
          )} />
          {errors.image && <p className='text-sm text-red-500'>{errors.image.message}</p>}
        </div>

        {/* Pan Number */}

        <div className="w-full flex flex-col gap-y-2 ">
          <Label>Pan Number</Label>
          <Input type='text' {...register('PAN')} placeholder='Enter Pan Number' />
          {errors.PAN && <p className='text-sm text-red-500'>{errors.PAN.message}</p>}
        </div>

        {/* Licence Number */}

        <div className="w-full flex flex-col gap-y-2 ">
          <Label>Licence Number</Label>
          <Input type='text' {...register('license_number')} placeholder='Enter Licence Number' />
          {errors.license_number && <p className='text-sm text-red-500'>{errors.license_number.message}</p>}
        </div>

        {/* National Identification Number */}

        <div className="w-full flex flex-col gap-y-2 ">
          <Label>National Identification Number</Label>
          <Input type='text' {...register('national_identification_number')} placeholder='Enter NID Number' />
          {errors.national_identification_number && <p className='text-sm text-red-500'>{errors.national_identification_number.message}</p>}
        </div>

        {/* local Identification Number */}

        <div className="w-full flex flex-col gap-y-2">
          <Label>Local Identification Number</Label>
          <Input type='text' {...register('local_identification_number')} placeholder='Enter Local ID Number' />
          {errors.local_identification_number && <p className='text-sm text-red-500'>{errors.local_identification_number.message}</p>}
        </div>


        {/* Text Label */}
        <TextLabel
          title='Professional information'
          icon={<BriefcaseBusiness className='h-5 w-5' />}
        />


        {/* role */}

        <div className="w-full flex flex-col gap-y-2">
          <Controller control={control} name='roleId' render={({ field }) => {
            return <>
              <RequiredLabel label='Role' />
              <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { field.onChange(Number(value)) }}>
                <SelectTrigger >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent className='z-[200]'>
                  {roles?.filter(R => R.name !== 'patient').map((role, index) => {
                    return <SelectItem key={index} value={String(role.id)}>{role.name}</SelectItem>
                  })}
                </SelectContent>
              </Select>
            </>
          }} />
          {errors.roleId && <p className='text-sm text-red-500'>{errors.roleId.message}</p>}
        </div>


        {/* Designation */}

        <div className="w-full flex flex-col gap-y-2">
          <Controller control={control} name='designation' render={({ field }) => {
            return <>
              <RequiredLabel label='Designation' />
              <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                <SelectTrigger >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent className='z-[200]'>
                  {designations?.map((role, index) => {
                    return <SelectItem key={index} value={role.name}>{role.name}</SelectItem>
                  })}
                </SelectContent>
              </Select>
            </>
          }} />
          {errors.designation && <p className='text-sm text-red-500'>{errors.designation.message}</p>}
        </div>


        {/* Department */}

        <div className="w-full flex flex-col gap-y-2">
          <Controller control={control} name='department' render={({ field }) => {
            return <>
              <RequiredLabel label='Department' />
              <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                <SelectTrigger >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent className='z-[200]'>
                  {departments?.map((department, index) => {
                    return <SelectItem key={index} value={department.name}>{department.name}</SelectItem>
                  })}
                </SelectContent>
              </Select>
            </>
          }} />
          {errors.department && <p className='text-sm text-red-500'>{errors.department.message}</p>}
        </div>

        {/* Qualification */}

        <div className="w-full flex flex-col gap-y-2 ">
          <Label>Qualification</Label>
          <Input type='text' {...register('qualification')} placeholder='Enter Qualification' />
          {errors.qualification && <p className='text-sm text-red-500'>{errors.qualification.message}</p>}
        </div>

        {/* Specialist */}

        <div className="w-full flex flex-col gap-y-2">
          <Label>Specialist</Label>
          <Controller control={control} name='specializationId' render={({ field }) => {
            return <MultiSelect
              defaultValue={field.value?.map(item => item.toString()) || []}
              options={specializations.map(item => ({ label: item.name, value: String(item.id) }))}
              onValueChange={(value) => { field.onChange(value) }}
              placeholder='Select Specializations'
              maxCount={3}
            />
          }} />
          {errors.specializationId && <p className='text-sm text-red-500'>{errors.specializationId.message}</p>}
        </div>

        {/* Work Experience */}

        <div className="w-full flex flex-col gap-y-2 ">
          <Label>Work Experience</Label>
          <Input type='text' {...register('work_experience')} placeholder='Enter Work Experience' />
          {errors.work_experience && <p className='text-sm text-red-500'>{errors.work_experience.message}</p>}
        </div>

        {/* Fees */}

        <div className="w-full flex flex-col gap-y-2">
          <Label>Normal Fees {currencySymbol()}</Label>
          <Input type='number' {...register('normal_fees')} placeholder='Enter Normal Fees' />
          {errors.normal_fees && <p className='text-sm text-red-500'>{errors.normal_fees.message}</p>}
        </div>

        {/*Emergency Fees */}

        <div className="w-full flex flex-col gap-y-2">
          <Label>Emergency Fees {currencySymbol()}</Label>
          <Input type='number' {...register('emergency_fees')} placeholder='Enter Emergency Fees' />
          {errors.emergency_fees && <p className='text-sm text-red-500'>{errors.emergency_fees.message}</p>}
        </div>

        {/* Salary */}
        <div className="w-full flex flex-col gap-y-2">
          <Label>Salary {currencySymbol()}</Label>
          <Input type='number' {...register('salary')} placeholder='Enter Salary' />
          {errors.salary && <p className='text-sm text-red-500'>{errors.salary.message}</p>}
        </div>


        {/*Date of joining */}

        <div className="w-full flex flex-col gap-y-2">
          <Label>Date of joining</Label>
          <Input type='date' {...register('date_of_joining')} />
          {errors.date_of_joining && <p className='text-sm text-red-500'>{errors.date_of_joining.message}</p>}
        </div>


        {/* Text Label */}
        <TextLabel
          title='Bank information'
          icon={<Landmark className='h-5 w-5' />}
        />


        {/*Nominee Name */}

        <div className="w-full flex flex-col gap-y-2">
          <Label>Nominee Name</Label>
          <Input type='text' {...register('nominee_name')} placeholder='Enter Nominee Name' />
          {errors.nominee_name && <p className='text-sm text-red-500'>{errors.nominee_name.message}</p>}
        </div>

        {/* Relation */}
        <div className="w-full flex flex-col gap-y-2">
          <Label>Relation</Label>
          <Controller control={control} name='relation' render={({ field }) => {
            return <>
              <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                <SelectTrigger >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent className='z-[200]'>
                  {nomineeRelationOptions?.map((relation, index) => {
                    return <SelectItem key={index} value={relation.value}>{relation.label}</SelectItem>
                  })}
                </SelectContent>
              </Select>
            </>
          }} />
          {errors.relation && <p className='text-sm text-red-500'>{errors.relation.message}</p>}
        </div>

        {/* Account Holder */}
        <div className="w-full flex flex-col gap-y-2">
          <Label>Account Holder</Label>
          <Input type='text' {...register('account_holder')} placeholder='Holder Name' />
          {errors.account_holder && <p className='text-sm text-red-500'>{errors.account_holder.message}</p>}
        </div>

        {/* Account Number */}
        <div className="w-full flex flex-col gap-y-2">
          <Label>Account Number</Label>
          <Input type='text' {...register('account_number')} placeholder='Enter Account Number' />
          {errors.account_number && <p className='text-sm text-red-500'>{errors.account_number.message}</p>}
        </div>

        {/* Bank Name */}
        <div className="w-full flex flex-col gap-y-2">
          <Label>Bank Name</Label>
          <Input type='text' {...register('bank_name')} placeholder='Enter Bank Name' />
          {errors.bank_name && <p className='text-sm text-red-500'>{errors.bank_name.message}</p>}
        </div>

        {/* Branch */}
        <div className="w-full flex flex-col gap-y-2">
          <Label>Branch</Label>
          <Input type='text' {...register('branch')} placeholder='Enter Branch Name' />
          {errors.branch && <p className='text-sm text-red-500'>{errors.branch.message}</p>}
        </div>

        {/* Ifsc Code */}
        <div className="w-full flex flex-col gap-y-2">
          <Label>Ifsc Code</Label>
          <Input type='text' {...register('ifsc_code')} placeholder='Enter IFSC Code' />
          {errors.ifsc_code && <p className='text-sm text-red-500'>{errors.ifsc_code.message}</p>}
        </div>

        <TextLabel
          title='Attach Documents'
          icon={<Paperclip className='h-5 w-5' />}
        />

        {/* Aadhar */}
        <div className="w-full flex flex-col gap-y-2">
          <Controller control={control} name='aadhar_image' render={({ field }) => (
            <ImageInput
              title='Aadhar'
              message='PNG, JPG up to 4MB'
              onChange={(image) => { field.onChange(image) }}
            />
          )} />
          {errors.aadhar_image && <p className='text-sm text-red-500'>{errors.aadhar_image.message}</p>}
        </div>

        {/* PAN */}
        <div className="w-full flex flex-col gap-y-2">
          <Controller control={control} name='pan_image' render={({ field }) => (
            <ImageInput
              title='PAN'
              message='PNG, JPG up to 4MB'
              onChange={(image) => { field.onChange(image) }}
            />
          )} />
          {errors.pan_image && <p className='text-sm text-red-500'>{errors.pan_image.message}</p>}
        </div>

        {/* Licence */}
        <div className="w-full flex flex-col gap-y-2">
          <Controller control={control} name='license_image' render={({ field }) => (
            <ImageInput
              title='Licence'
              message='PNG, JPG up to 4MB'
              onChange={(image) => { field.onChange(image) }}
            />
          )} />
          {errors.license_image && <p className='text-sm text-red-500'>{errors.license_image.message}</p>}
        </div>

        {/* Diploma Certificate */}
        <div className="w-full flex flex-col gap-y-2">
          <Controller control={control} name='diploma_image' render={({ field }) => (
            <ImageInput
              title='Diploma Certificate'
              message='PNG, JPG up to 4MB'
              onChange={(image) => { field.onChange(image) }}
            />
          )} />
          {errors.diploma_image && <p className='text-sm text-red-500'>{errors.diploma_image.message}</p>}
        </div>

        {/* Graduation Certificate */}
        <div className="w-full flex flex-col gap-y-2">
          <Controller control={control} name='graduation_image' render={({ field }) => (
            <ImageInput
              title='Graduation Certificate'
              message='PNG, JPG up to 4MB'
              onChange={(image) => { field.onChange(image) }}
            />
          )} />
          {errors.graduation_image && <p className='text-sm text-red-500'>{errors.graduation_image.message}</p>}
        </div>

        {/* Masters Degree */}
        <div className="w-full flex flex-col gap-y-2">
          <Controller control={control} name='masters_image' render={({ field }) => (
            <ImageInput
              title='Masters Certificate'
              message='PNG, JPG up to 4MB'
              onChange={(image) => { field.onChange(image) }}
            />
          )} />
          {errors.masters_image && <p className='text-sm text-red-500'>{errors.masters_image.message}</p>}
        </div>


        {/* Button */}
        <div className="col-span-full justify-end flex gap-3 flex-col sm:flex-row">
          {!id &&
            (<div className='order-2 sm:order-1'>
              <Button type='button' className='w-full sm:w-auto' variant={'ghost'} onClick={() => { reset() }}>Reset</Button>
            </div>)}
          <div className='sm:order-2'>
            <Button type='submit' className='w-full sm:w-auto'>{id ? 'Update' : 'Save Information'} {isPending && <Loader className='h-4 w-4 animate-spin' />}</Button>
          </div>
        </div>

      </form>
    </section>
  )
}

export default CreateStaff

