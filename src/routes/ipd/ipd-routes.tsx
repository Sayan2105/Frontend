import ProtectRoutes from '@/guard/protectRoutes'
import IpdLayout from '@/pages/ipd/ipd-layout'
import Ipds from '@/pages/ipd/ipds/ipds'
import IpdCharges from '@/pages/ipd/sections/charges/charges'
import IpdCounsultantRegisters from '@/pages/ipd/sections/consulatant-register/consultant-registers'
import IpdSectionsLayout from '@/pages/ipd/sections/ipd-section-layout'
import IpdLabInvestigations from '@/pages/ipd/sections/lab-investigations/lab-inestigations'
import IpdMedications from '@/pages/ipd/sections/medication/medications'
import IpdOperations from '@/pages/ipd/sections/operation/operations'
import IpdOverview from '@/pages/ipd/sections/overview/overview'
import IpdPayments from '@/pages/ipd/sections/payment/payments'
import IpdPrescription from '@/pages/ipd/sections/prescription/prescriptions'
import IpdTimelines from '@/pages/ipd/sections/timeline/timeline'
import IpdTreatmentHistories from '@/pages/ipd/sections/treatment-history/treatment-histories'
import IpdVitals from '@/pages/ipd/sections/vital/vitals'
import { Route } from 'react-router-dom'


const IpdRoutes = () => {
    return (
        <Route element={<ProtectRoutes action='view' module='Ipd' />}>
            <Route path='ipd' element={<IpdLayout />}>
                <Route path='' element={<Ipds />} />
                <Route path=':ipdId' element={<IpdSectionsLayout />}>
                    <Route path='' element={<IpdOverview />} />
                    <Route path='medication' element={<IpdMedications />} />
                    <Route path='operation' element={<IpdOperations />} />
                    <Route path='vital' element={<IpdVitals />} />
                    <Route path='timeline' element={<IpdTimelines />} />
                    <Route path='payment' element={<IpdPayments />} />
                    <Route path='charges' element={<IpdCharges />} />
                    <Route path='treatmenthistory' element={<IpdTreatmentHistories />} />
                    <Route path='consultant-register' element={<IpdCounsultantRegisters />} />
                    <Route path='lab' element={<IpdLabInvestigations />} />
                    <Route path='prescription' element={<IpdPrescription />} />
                </Route>
            </Route>
        </Route>
    )
}



export default IpdRoutes