import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AuthApi } from "@/services/auth-api"
import { useState } from "react"
import toast from "react-hot-toast"

const ForgetPassword = () => {

    const [email, setEmail] = useState<string>('')

    const onSubmit = async () => {
        if (!email) return toast.error('Please enter your email')
        if (!email.includes('@')) return toast.error('Please enter a valid email')
        try {
            const data = await AuthApi.forgotPassword(email)
            toast.success(data.message)
        } catch (error: any) {
            toast.error(error.response?.data?.message)
        }
    }

    return (
        <div className="grid lg:grid-cols-2 w-full h-full dark:bg-gray-950">
            {/* col 1 */}
            <div className="flex flex-col h-full justify-center items-center px-2.5 bg-secondary lg:rounded-e-3xl">
                <Card className="max-w-md p-3 space-y-3">
                    <CardTitle className="text-xl">Forgot Password</CardTitle>
                    <CardDescription>Enter your email address and we will send you a link to reset your password.</CardDescription>
                    <Input placeholder="example@gmail.com" type="email" className="w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <div className="mt-4 flex justify-end">
                        <Button onClick={onSubmit}>
                            Send Reset Link
                        </Button>
                    </div>
                </Card>
            </div>

            {/* col 2 */}
            <div className="lg:flex flex-col items-center justify-center space-y-3 hidden">
                <img src="/forget-password.svg" alt="Forgot Password" className="max-w-lg" />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Forgot Password</h2>
                <p className="text-muted-foreground">
                    No worries! We’ll email you a link to reset your password in just a moment.
                </p>
            </div>
        </div>
    )
}

export default ForgetPassword