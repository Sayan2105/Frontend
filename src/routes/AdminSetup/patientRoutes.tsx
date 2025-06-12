import Patients from '@/admin/setup/patient/patients'
import { Route } from 'react-router-dom'

const PatientRoutes = () => {
    return (
        <>
            <Route path='admin/setup/patient' element={<Patients />} />
        </>
    )
}

export default PatientRoutes