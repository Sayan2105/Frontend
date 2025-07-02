import CreateAdmin from "@/Auth/create-admin"
import ForgetPassword from "@/Auth/forgetPassword"
import AuthResetPassword from "@/Auth/reset-password"
import SignIn from "@/Auth/signin"
import { Route } from "react-router-dom"

const AuthRoutes = () => {
    return (
        <>
            <Route path="signin" element={<SignIn />} />
            <Route path="create-admin" element={<CreateAdmin />} />
            <Route path="forgot-password" element={<ForgetPassword />} />
            <Route path="reset-password" element={<AuthResetPassword />} />
        </>
    )
}

export default AuthRoutes