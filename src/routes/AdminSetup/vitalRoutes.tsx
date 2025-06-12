import SetupVitals from '@/admin/setup/vitals/setupVitals'
import { Route } from 'react-router-dom'

const VitalRoutes = () => {
    return (
        <Route path="admin/setup/vital" element={<SetupVitals />} />
    )
}

export default VitalRoutes