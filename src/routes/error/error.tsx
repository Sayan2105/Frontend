import Not_found from '@/error/not_found'
import Unauthorized from '@/error/unauthorized'
import { Route } from 'react-router-dom'

const ErrorRoutes = () => {
    return (
        <>
            <Route path="*" element={<Not_found />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
        </>
    )
}

export default ErrorRoutes