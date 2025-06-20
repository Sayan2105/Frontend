import CreateAdmin from "@/Auth/create-admin"
import SignIn from "@/Auth/signin"
import { Route } from "react-router-dom"

const AuthRoutes = () => {
    return (
        <>
            <Route path="signin" element={<SignIn />} />
            <Route path="create-admin" element={<CreateAdmin />} />
        </>
    )
}

export default AuthRoutes