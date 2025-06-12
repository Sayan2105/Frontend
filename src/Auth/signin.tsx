import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { Loader } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"
import { signInformSchema } from '@/formSchemas/signinFormSchema'
import { zodResolver } from "@hookform/resolvers/zod"
import toast from 'react-hot-toast'
import axios from 'axios'
import { useContext, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { authSelector, setUser } from "@/features/auth/authSlice"
import { PermissionContext } from "@/contexts/permission-provider"
import usePatient from "@/patient/profile/handlers"
import RegisterPatient from "@/patient/register/patient-signup"



const SignIn = () => {

  const [isPending, setPending] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const router = useNavigate()
  const session = useAppSelector(authSelector)
  const { removePermissions } = useContext(PermissionContext)

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof signInformSchema>>({
    resolver: zodResolver(signInformSchema)
  })


  const { handlePatient, isPending: isPatientPending, form, setForm } = usePatient()


  const onSignin = async (formData: z.infer<typeof signInformSchema>) => {

    try {

      setPending(true)

      const response = (await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/signin`, formData))

      const user = response.data.user

      toast.success(response.data.message)

      dispatch(setUser(user))

      localStorage.setItem('token', JSON.stringify(response.data.token))

      const route = user.role === "patient" ? 'patient' : 'admin'

      await removePermissions()

      router(`/${route}/dashboard`)

    } catch (error: any) {
      const message = error.response?.data?.message || 'Connection Error'
      toast.error(message)
    } finally {
      setPending(false)
    }

  }


  useEffect(() => {
    if (session.user) {
      router(`/${session.user?.role}/dashboard`)
    }
  }, [])


  return (
    <div className="bg-zinc-50 dark:bg-background">
      <MaxWidthWrapper className="min-h-[calc(100vh-56px-1px)] flex flex-col justify-center items-center">
        <div className="sm:w-[500px] w-full">
          <form className=" p-4 w-full flex flex-col gap-y-4  dark:ring-border ring-1 ring-gray-200 rounded-lg" onSubmit={handleSubmit(onSignin)}>

            <div className="text-center my-4">
              <h1 className="text-gray-900 dark:text-neutral-100 font-bold text-2xl tracking-tight">Vertica Healthcare</h1>
              <p className="mt-2 text-gray-500">Sign In to your account</p>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Email</Label>
              <Input type="email" placeholder="example@gmail.com" {...register('email')} />
              {errors.email && <p className="text-sm text-red-500">{errors.email?.message}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <Label>Password</Label>
              <Input type="password" placeholder="password" {...register('password')} />
              {errors.password && <p className="text-sm text-red-500">{errors.password?.message}</p>}
            </div>

            <div className="my-2">
              <Button type="submit" size={'sm'} className="w-full active:scale-95 transition-all">{isPending ? <Loader className="animate-spin" /> : 'Sign In'}</Button>
            </div>
          </form>


          {/* form footer */}

          <div className="flex text-sm my-1 justify-center items-center">
            <p className="text-gray-500">Not a existing patient?</p>
            <Link to={''} className={buttonVariants({ variant: 'link' })} onClick={() => { setForm(true) }}>
              Rgister Patient
            </Link>
          </div>

        </div>
      </MaxWidthWrapper>


      {/* patient form */}

      {form && (
        <RegisterPatient
          isPending={isPatientPending}
          Submit={(v) => { handlePatient(v) }}
          onClick={() => { setForm(false) }}
        />
      )}


    </div>
  )
}

export default SignIn

