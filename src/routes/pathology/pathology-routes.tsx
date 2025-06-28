import ProtectRoutes from "@/guard/protectRoutes";
import { lazy } from "react";
import { Route } from "react-router-dom";

const PathologyBills = lazy(() => import("@/pages/pathology/pathology-bills"));

const PathologyRoutes = () => {
    return (
        <Route element={<ProtectRoutes action="view" module="Radiology Bill" />}>
            <Route path="pathology" element={<PathologyBills />} />
        </Route>
    );
};

export default PathologyRoutes;
