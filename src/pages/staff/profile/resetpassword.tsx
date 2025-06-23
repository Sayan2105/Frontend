import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import PasswordField from '@/components/ui/password-input'
import { ResetPasswordForm } from '@/formSchemas/resetPasswordFormSchema'
import StaffApi from '@/services/staff-api'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'



const ResetPassword = () => {

    const { id } = useParams()
    const [isPending, setPending] = useState<boolean>(false)
    const router = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof ResetPasswordForm>>({
        resolver: zodResolver(ResetPasswordForm)
    })


    const onResetPassword = async (formData: z.infer<typeof ResetPasswordForm>) => {
        try {
            setPending(true)
            const { password } = formData
            const data = await StaffApi.resetPassword(Number(id), password)
            toast.success(data.message)
            router(`..`)
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setPending(false)
        }
    }


    return (
        <section className='h-[calc(100vh-56px-1px)] flex items-center justify-center'>
            <form className='flex-1 sm:flex-none sm:w-[400px] flex flex-col p-4 border border-border rounded-lg gap-y-3' onSubmit={handleSubmit(onResetPassword)}>

                <div className='text-center'>
                    <h1 className='text-lg text-gray-900 dark:text-gray-200 font-bold'>Reset Password</h1>
                    <p className='text-sm text-gray-500'>Enter your password carefully</p>
                </div>

                <div className='space-y-1'>
                    <Label>Password</Label>
                    <PasswordField {...register('password')} placeholder='Password' />
                    {errors.password && <p className="text-sm text-red-500">{errors.password?.message}</p>}
                </div>
                <div className='space-y-1'>
                    <Label>Confirm Password</Label>
                    <PasswordField {...register('confirm_password')} placeholder='Confirm Password' />
                    {errors.confirm_password && <p className="text-sm text-red-500">{errors.confirm_password?.message}</p>}
                </div>

                <div className='space-y-1'>
                    <Button type='submit' className='w-full' size={'sm'}>Save Password {isPending && <Loader className='animate-spin' />}</Button>
                </div>
            </form>
        </section>
    )
}

export default ResetPassword