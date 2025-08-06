import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import PasswordField from "@/components/ui/password-input"
import { AuthContext } from "@/contexts/authContext"
import { signInformSchema } from '@/formSchemas/signinFormSchema'
import usePatient from "@/patient/profile/handlers"
import RegisterPatient from "@/patient/register/patient-signup"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader, Users } from "lucide-react"
import { useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"

const SignIn = () => {
  const router = useNavigate()
  const { handlePatient, isPending: isPatientPending, form, setForm } = usePatient()
  const { authUser, isLoggingIn, signin } = useContext(AuthContext)

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof signInformSchema>>({
    resolver: zodResolver(signInformSchema)
  })

  useEffect(() => {
    if (authUser) {
      router(`/${authUser?.role}/dashboard`)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900/10 dark:to-blue-900/10 relative overflow-hidden">

      <MaxWidthWrapper className="min-h-screen flex flex-col justify-center items-center relative z-10 py-12">
        <div className="w-full max-w-md">

          {/* Main form card */}
          <div className="bg-white/80 dark:bg-gray-800/10 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-2xl shadow-blue-500/10 p-8 transform hover:shadow-3xl transition-all duration-500 animate-slide-up">
            <form onSubmit={handleSubmit(signin)} className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                  Vertica Healthcare
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Sign in to access your healthcare dashboard
                </p>
              </div>

              {/* Email field */}
              <div className="space-y-2 group">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="pl-4 pr-4 py-3 bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:shadow-md"
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500 flex items-center gap-1 animate-fade-in">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.email?.message}
                  </p>
                )}
              </div>

              {/* Password field */}
              <div className="space-y-2 group">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-shield-lock-icon">
                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />

                    <rect x="9" y="11" width="6" height="5" rx="1" ry="1" />
                    <path d="M10 11V9a2 2 0 1 1 4 0v2" />
                  </svg>

                  Password
                </Label>
                <div className="relative">
                  <PasswordField
                    placeholder="Enter your password"
                    className="pl-4 pr-12 py-3 bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:shadow-md"
                    {...register('password')}
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 flex items-center gap-1 animate-fade-in">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.password?.message}
                  </p>
                )}
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium rounded-xl shadow-lg shadow-blue-500/25 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? (
                    <div className="flex items-center gap-2">
                      <Loader className="animate-spin w-4 h-4" />
                      <span>Signing In...</span>
                    </div>
                  ) : (
                    'Sign In to Dashboard'
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Footer links */}
          <div className="mt-8 space-y-4 animate-fade-in-delayed">
            <div className="flex items-center justify-center text-sm">
              <span className="text-gray-500 dark:text-gray-400">New to Vertica Healthcare?</span>
              <Link
                to=""
                className="ml-2 font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200 hover:underline underline-offset-4"
                onClick={() => setForm(true)}
              >
                Create Patient Account
              </Link>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="h-px bg-gray-300 dark:bg-gray-600 flex-1"></div>
                <span className="px-4 text-sm text-gray-500 dark:text-gray-400">or</span>
                <div className="h-px bg-gray-300 dark:bg-gray-600 flex-1"></div>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200 hover:underline underline-offset-4"
              >
                Reset your password
              </Link>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-gray-500 dark:text-gray-400 animate-fade-in-delayed">
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-shield-lock-icon">
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />

                <rect x="9" y="11" width="6" height="5" rx="1" ry="1" />
                <path d="M10 11V9a2 2 0 1 1 4 0v2" />
              </svg>
              <span>Secure Login</span>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>

      {/* Patient registration modal */}
      {form && (
          <RegisterPatient
            isPending={isPatientPending}
            Submit={(v) => handlePatient(v)}
            onClick={() => setForm(false)}
          />
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animate-fade-in-delayed {
          animation: fade-in 0.8s ease-out 0.2s both;
        }
      `}</style>
    </div>
  )
}

export default SignIn