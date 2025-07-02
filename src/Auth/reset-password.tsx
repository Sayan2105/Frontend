import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import PasswordField from "@/components/ui/password-input"
import { AuthApi } from "@/services/auth-api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useLocation, useNavigate } from "react-router-dom"
import { z } from "zod"

const Schema = z.object({
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }).max(20, { message: 'Password must be at most 20 characters long' }),
    confirmPassword: z.string().min(1, { message: 'Confirm Password must be at least 1 character long' })
}).refine((data) => data.password === data.confirmPassword, { message: 'Passwords do not match', path: ['confirmPassword'] })

const AuthResetPassword = () => {

    const router = useNavigate()
    const location = useLocation().search
    const token = new URLSearchParams(location).get('token')


    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema)
    })

    const onResetPassword = async (data: z.infer<typeof Schema>) => {
        if (!token) return toast.error('Invalid token')
        try {
            const { password } = data
            const res = await AuthApi.resetPassword(token, password)
            toast.success(res.message)
            router(`/signin`)
        } catch (error: any) {
            toast.error(error.response?.data?.message)
        }
    }

    return (
        <div className="grid lg:grid-cols-2 w-full h-full dark:bg-gray-950">
            {/* col 1 */}
            <div className="flex flex-col h-full w-full justify-center items-center px-2.5 bg-secondary lg:rounded-e-3xl">
                <form className="lg:w-[400px] w-auto" onSubmit={handleSubmit(onResetPassword)}>
                    <Card className="space-y-3 p-4">
                        <CardTitle className="text-xl">Reset Password</CardTitle>
                        <CardDescription>Enter your new password to reset your account.</CardDescription>
                        <div className="space-y-2">
                            <Label>New Password</Label>
                            <PasswordField placeholder="********" className="w-full" {...register('password')} />
                            {errors.password && <p className="text-sm text-red-500">{errors.password?.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Confirm Password</Label>
                            <PasswordField placeholder="********" className="w-full" {...register('confirmPassword')} />
                            {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword?.message}</p>}
                        </div>
                        <div className="mt-4 flex justify-end">
                            <Button>
                                Reset Password
                            </Button>
                        </div>
                    </Card>
                </form>
            </div>

            {/* col 2 */}
            <div className="lg:flex flex-col items-center justify-center space-y-3 hidden">
                <img src="/reset-password.svg" alt="Forgot Password" className="max-w-lg" />
                <div className="max-w-lg text-center space-y-3">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Reset Password</h2>
                    <p className="text-muted-foreground">
                        Enter your new password to reset your account. Choose something memorable but hard for others to guess.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AuthResetPassword