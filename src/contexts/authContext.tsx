import { AuthApi } from "@/services/auth-api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { createContext, useMemo } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export interface User {
    id: number;
    email: string;
    name: string;
    role: string;
    image: string;
    gender: string;
}

interface AuthContextProps {
    isLoggingIn: boolean
    isLoggingOut: boolean
    isCheckingAuth: boolean
    authUser: User | null
    signin: (data: any) => void
    logout: () => Promise<void>
}


export const AuthContext = createContext<AuthContextProps>({
    isLoggingIn: false,
    isLoggingOut: false,
    isCheckingAuth: false,
    authUser: null,
    signin: () => null,
    logout: () => Promise.resolve()
})


const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const queryClient = useQueryClient()
    const navigate = useNavigate();

    const userData = useQuery({
        queryKey: ['user'],
        queryFn: () => AuthApi.checkAuth(),
    })

    const signin = useMutation({
        mutationFn: (data: any) => AuthApi.signin(data),
        onSuccess: async (newData) => {
            queryClient.setQueryData(['user'], newData)
            toast.success('Logged in successfully')
            const statictRoute = newData.role === 'patient' ? '/patient/dashboard' : '/admin/dashboard'
            navigate(statictRoute)
        },
        onError: (err: AxiosError<{ message: string }>) => {
            toast.error(err.response?.data?.message || 'Connection Error')
        }
    })

    const logout = useMutation({
        mutationFn: () => AuthApi.signout(),
        onSuccess: () => {
            queryClient.setQueryData(['user'], null)
            toast.success('Logged out successfully')
        },
        onError: (err: AxiosError<{ message: string }>) => {
            toast.error(err.response?.data?.message || 'Connection Error')
        }
    })


    const value = useMemo(() => ({
        authUser: userData.data || null,
        isCheckingAuth: userData.isLoading,
        isLoggingIn: signin.isPending,
        isLoggingOut: logout.isPending,
        signin: signin.mutate,
        logout: logout.mutateAsync
    }), [
        userData.data,
        userData.isLoading,
        signin.isPending,
        signin.mutate,
        logout.isPending,
        logout.mutate
    ])


    // here Auth Context have to return
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}


export default AuthProvider