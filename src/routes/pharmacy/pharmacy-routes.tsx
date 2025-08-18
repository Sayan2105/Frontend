import { lazy } from "react";
import { Route } from "react-router-dom";
import ProtectRoutes from "@/guard/protectRoutes";

// Lazy imports
const Pharmacy = lazy(() => import("@/pages/pharmacy/pharmacyLayout"));
const Bill = lazy(() => import("@/pages/pharmacy/pharmacyBill/pharmacyBills"));
const Medicines = lazy(() => import("@/pages/pharmacy/medicines/medicines"));
const Purchase = lazy(() => import("@/pages/pharmacy/purchaseMedicine/purchase"));

const PharmacyRoutes = () => {
    return (
        <Route path="pharmacy" element={<Pharmacy />}>
            {/* Pharmacy Bills */}
            <Route element={<ProtectRoutes action="view" module="Pharmacy Bill" />}>
                <Route index element={<Bill />} />
            </Route>

            {/* Medicines */}
            <Route element={<ProtectRoutes action="view" module="Medicines" />}>
                <Route path="medicines" element={<Medicines />} />
            </Route>

            {/* Purchase Medicine */}
            <Route element={<ProtectRoutes action="view" module="Purchase Medicine" />}>
                <Route path="purchase" element={<Purchase />} />
            </Route>
        </Route>
    );
};

export default PharmacyRoutes;
