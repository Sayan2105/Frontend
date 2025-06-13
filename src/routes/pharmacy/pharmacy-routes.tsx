import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import ProtectRoutes from "@/guard/protectRoutes";
import LoaderModel from "@/components/loader";

// Lazy imports
const Pharmacy = lazy(() => import("@/pages/pharmacy/pharmacyLayout"));
const Bill = lazy(() => import("@/pages/pharmacy/pharmacyBill/pharmacyBills"));
const Medicines = lazy(() => import("@/pages/pharmacy/medicines/medicines"));
const Purchase = lazy(() => import("@/pages/pharmacy/purchaseMedicine/purchase"));

const PharmacyRoutes = () => {
    return (
        <Route element={<ProtectRoutes action="view" module="Pharmacy Bill" />}>
            <Route
                path="pharmacy"
                element={
                    <Suspense fallback={<LoaderModel />}>
                        <Pharmacy />
                    </Suspense>
                }
            >
                <Route
                    path=""
                    element={
                        <Suspense fallback={<LoaderModel />}>
                            <Bill />
                        </Suspense>
                    }
                />
                <Route
                    path="medicines"
                    element={
                        <Suspense fallback={<LoaderModel />}>
                            <Medicines />
                        </Suspense>
                    }
                />
                <Route
                    path="purchase"
                    element={
                        <Suspense fallback={<LoaderModel />}>
                            <Purchase />
                        </Suspense>
                    }
                />
            </Route>
        </Route>
    );
};

export default PharmacyRoutes;
