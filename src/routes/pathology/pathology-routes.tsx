import LoaderModel from "@/components/loader";
import ProtectRoutes from "@/guard/protectRoutes";
import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

// Lazy-loaded component
const PathologyBills = lazy(() => import("@/pages/pathology/pathology-bills"));

const PathologyRoutes = () => {
    return (
        <Route element={<ProtectRoutes action="view" module="Radiology Bill" />}>
            <Route
                path="pathology"
                element={
                    <Suspense fallback={<LoaderModel />}>
                        <PathologyBills />
                    </Suspense>
                }
            />
        </Route>
    );
};

export default PathologyRoutes;
