import ProtectRoutes from "@/guard/protectRoutes"
import CahrgesList from "@/pages/OPD/details/charges/chargesList"
import OpdLabInvestigations from "@/pages/OPD/details/lab-investigation/lab-investigations"
import Medication from "@/pages/OPD/details/medication/medication"
import OpdDetailsLayout from "@/pages/OPD/details/opdDetailsLayout"
import OperationList from "@/pages/OPD/details/operation/operationList"
import VisitDetails from "@/pages/OPD/details/overview/visitDetails"
import PaymentsList from "@/pages/OPD/details/payments/paymentsList"
import Timeline from "@/pages/OPD/details/timeline/timelineList"
import TreatmentsList from "@/pages/OPD/details/treatmentHistory/treatmentsList"
import Vital from "@/pages/OPD/details/vital/vital"
import AdminOPDlayout from "@/pages/OPD/opd-layout"
import OPDLIST from "@/pages/OPD/opdList"
import { Route } from "react-router-dom"



const OpdRoutes = () => {
    return (
        <Route element={<ProtectRoutes action='view' module='Opd' />}>
            <Route path="opd" element={<AdminOPDlayout />}>
                <Route path="" element={<OPDLIST />} />
                <Route path=":opdId" element={<OpdDetailsLayout />}>
                    <Route path="" element={<VisitDetails />} />
                    <Route path="medication" element={<Medication />} />
                    <Route path="vital" element={<Vital />} />
                    <Route path="operation" element={<OperationList />} />
                    <Route path="timeline" element={<Timeline />} />
                    <Route path="charges" element={<CahrgesList />} />
                    <Route path="treatmenthistory" element={<TreatmentsList />} />
                    <Route path="payment" element={<PaymentsList />} />
                    <Route path="lab" element={<OpdLabInvestigations />} />
                </Route>
            </Route>
        </Route>
    )
}




export default OpdRoutes