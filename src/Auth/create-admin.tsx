import IconMenu from "@/components/icon-menu"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import StaffApi from "@/services/staff-api"
import { zodResolver } from "@hookform/resolvers/zod"
import { SelectValue } from "@radix-ui/react-select"
import { Loader, User } from "lucide-react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { z } from "zod"


const CreateAdminSchema = z.object({
    name: z.string().min(2, 'Please enter at least 2 characters').max(25, 'Please enter less than 25 characters').optional(),
    email: z.string().nonempty('Please enter email').email('Please enter valid email'),
    gender: z.string().nonempty('Please select gender'),
    role: z.string().optional().default('admin'),
    secretKey: z.string().nonempty('Please enter secret key'),
    password: z.string().min(8, 'Please enter at least 8 characters').max(12, 'Please enter less than 12 characters')
})


const CreateAdmin = () => {

    const [isPending, setPending] = useState(false)
    const router = useNavigate()

    const { handleSubmit, register, control, formState: { errors } } = useForm<z.infer<typeof CreateAdminSchema>>({
        resolver: zodResolver(CreateAdminSchema)
    })

    const onSubmit = async (data: z.infer<typeof CreateAdminSchema>) => {
        data.role = 'admin'
        const formData = new FormData()
        Object.entries(data).forEach(([key, value]) => {
            if (value) formData.append(key, JSON.stringify(value))
        })

        try {
            setPending(true)
            const data = await StaffApi.createStaff(formData)
            toast.success(data.message)
            router('/signin')
        } catch ({ message }: any) {
            toast.error(message)
        } finally { setPending(false) }
    }


    return (
        <div className="py-10 px-2.5 flex flex-col items-center justify-center h-full">
            <Card className="space-y-5 w-full sm:w-[500px] mx-auto p-4">
                <header className="flex items-center">
                    <IconMenu iconBg="bg-white/10 shadow-lg p-3" icon={<User className="text-green-600" />} />
                    <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Create Admin</h1>
                </header>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-3">
                        <div className="flex flex-col gap-2">
                            <Label>Name</Label>
                            <Input type="text" placeholder="Enter Name" {...register('name')} />
                            {errors.name && <p className="text-sm text-red-500">{errors.name?.message}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Email</Label>
                            <Input type='email' placeholder="example@gmail.com" {...register('email')} />
                            {errors.email && <p className="text-sm text-red-500">{errors.email?.message}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Gender</Label>
                            <Controller control={control} name='gender' render={({ field }) => {
                                return <>
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
                            {errors.gender && <p className="text-sm text-red-500">{errors.gender?.message}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Secret</Label>
                            <Input type="text" placeholder="#xyz-abc" {...register('secretKey')} />
                            {errors.secretKey && <p className="text-sm text-red-500">{errors.secretKey?.message}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Password</Label>
                            <Input type="password" placeholder="Enter Password" {...register('password')} />
                            {errors.password && <p className="text-sm text-red-500">{errors.password?.message}</p>}
                        </div>

                        {/* Action */}
                        <Button className="w-full" disabled={isPending}>Submit {isPending && <Loader className='h-4 w-4 animate-spin' />}</Button>
                    </div>
                </form>
            </Card>
        </div>
    )
}



export default CreateAdmin