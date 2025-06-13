import LoaderModel from "@/components/loader";
import ProtectRoutes from "@/guard/protectRoutes";
import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

// Lazy-loaded component
const RadiologyBills = lazy(() => import("@/pages/radiology/radiologyBills"));

const RadiologyRoutes = () => {
    return (
        <Route element={<ProtectRoutes action="view" module="Radiology Bill" />}>
            <Route
                path="radiology"
                element={
                    <Suspense fallback={<LoaderModel />}>
                        <RadiologyBills />
                    </Suspense>
                }
            />
        </Route>
    );
};

export default RadiologyRoutes;
