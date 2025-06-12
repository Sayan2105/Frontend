import ProtectRoutes from "@/guard/protectRoutes"
import Medicines from "@/pages/pharmacy/medicines/medicines"
import Bill from "@/pages/pharmacy/pharmacyBill/pharmacyBills"
import Pharmacy from "@/pages/pharmacy/pharmacyLayout"
import Purchase from "@/pages/pharmacy/purchaseMedicine/purchase"
import { Route } from "react-router-dom"


const PharmacyRoutes = () => {
    return (
        <Route element={<ProtectRoutes action="view" module="Pharmacy Bill" />}>
            <Route path="pharmacy" element={<Pharmacy />} >
                <Route path="" element={<Bill />} />
                <Route path="medicines" element={<Medicines />} />
                <Route path="purchase" element={<Purchase />} />
            </Route>
        </Route>
    )
}

export default PharmacyRoutes