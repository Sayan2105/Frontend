import SignIn from "@/Auth/signin"
import { Route } from "react-router-dom"

const AuthRoutes = () => {
    return (
        <Route path="signin" element={<SignIn />} />
    )
}

export default AuthRoutes