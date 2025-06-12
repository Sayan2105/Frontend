import ProtectRoutes from '@/guard/protectRoutes'
import { Route } from 'react-router-dom'
import AuthzRoutes from './authzRoutes'
import BedRoutes from './bed-routes'
import ChargesRoutes from './ChargesRoutes'
import EventRoutes from './EventRoutes'
import FindingRoutes from './FindingRoutes'
import SetupHomepageRoutes from './homepage'
import OperationRoutes from './OperationRoutes'
import PathologyRoutes from './pathology'
import PatientRoutes from './patientRoutes'
import PharmacyRoutes from './PharmacyRoutes'
import RadiologyRoutes from './radiologyRoutes'
import SetupStaffRoutes from './staff'
import VitalRoutes from './vitalRoutes'




const SetupIndexRoutes = () => {
    return (
        <Route element={<ProtectRoutes restrictedTo='patient' />}>
            {AuthzRoutes()}
            {BedRoutes()}
            {EventRoutes()}
            {ChargesRoutes()}
            {FindingRoutes()}
            {OperationRoutes()}
            {PathologyRoutes()}
            {RadiologyRoutes()}
            {PatientRoutes()}
            {PharmacyRoutes()}
            {VitalRoutes()}
            {SetupStaffRoutes()}
            {SetupHomepageRoutes()}
        </Route>
    )
}

export default SetupIndexRoutes