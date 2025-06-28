import ProtectRoutes from "@/guard/protectRoutes";
import { lazy } from "react";
import { Route } from "react-router-dom";

const RadiologyBills = lazy(() => import("@/pages/radiology/radiologyBills"));

const RadiologyRoutes = () => {
    return (
        <Route element={<ProtectRoutes action="view" module="Radiology Bill" />}>
            <Route path="radiology" element={<RadiologyBills />} />
        </Route>
    );
};

export default RadiologyRoutes;
