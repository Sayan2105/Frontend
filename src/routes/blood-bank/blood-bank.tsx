import ProtectRoutes from "@/guard/protectRoutes"
import BloodComponents from "@/pages/blood bank/blood-component/components/components"
import BloodComponentIssues from "@/pages/blood bank/blood-component/issue-components/issue-componnets"
import BloodDonations from "@/pages/blood bank/doner/blood-donations/donations"
import BloodDonors from "@/pages/blood bank/doner/blood-doners/donors"
import DonorLayouts from "@/pages/blood bank/doner/layout"
import BloodIssues from "@/pages/blood bank/issue-blood/blood-issues"
import BloodBankLayout from "@/pages/blood bank/layout"
import { Route } from "react-router-dom"




const BloodBankRoutes = () => {
    return (
        <Route element={<ProtectRoutes action="view" module="Issue Blood" />}>
            <Route path='blood-bank' element={<BloodBankLayout />}>
                <Route path='issue-blood' element={<BloodIssues />} />
                <Route path='doner' element={<DonorLayouts />}>
                    <Route path='blood-donations' element={<BloodDonations />} />
                    <Route path='blood-donors' element={<BloodDonors />} />
                </Route>
                <Route path='components' element={<BloodBankLayout />}>
                    <Route path='blood-components' element={<BloodComponents />} />
                    <Route path='issue-components' element={<BloodComponentIssues />} />
                </Route>
            </Route>
        </Route >
    )
}




export default BloodBankRoutes