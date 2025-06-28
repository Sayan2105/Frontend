import { Routes } from 'react-router-dom'
import AdminRoutes from './AdminRoutes'
import SetupIndexRoutes from './AdminSetup'
import AmbulanceRoutes from './ambulance/ambulanceRoutes'
import AppointmentRoutes from './appointment/appointmentRoutes'
import AuthRoutes from './auth/auth'
import BloodBankRoutes from './blood-bank/blood-bank'
import DutyRosterRoutes from './duty-roster/duty-roster'
import ErrorRoutes from './error/error'
import HomepageRoutes from './homepage/homepage'
import IpdRoutes from './ipd/ipd-routes'
import OpdRoutes from './opd/opd-routes'
import PathologyRoutes from './pathology/pathology-routes'
import PatientRoutes from './PatientRoutes'
import PharmacyRoutes from './pharmacy/pharmacy-routes'
import RadiologyRoutes from './radiology/radiology-routes'
import StaffRoutes from './staff/staff'
import { Suspense } from 'react'


const IndexRoutes = () => {
    return (
        <Suspense>
            <Routes>
                {AuthRoutes()}
                {HomepageRoutes()}
                {IpdRoutes()}
                {OpdRoutes()}
                {AppointmentRoutes()}
                {DutyRosterRoutes()}
                {StaffRoutes()}
                {RadiologyRoutes()}
                {PathologyRoutes()}
                {PharmacyRoutes()}
                {AmbulanceRoutes()}
                {BloodBankRoutes()}
                {AdminRoutes()}
                {PatientRoutes()}
                {SetupIndexRoutes()}
                {ErrorRoutes()}
            </Routes>
        </Suspense>
    )
}

export default IndexRoutes