import OperationLayout from '@/admin/setup/operation/layout'
import OperationCategories from '@/admin/setup/operation/operation_category/operationCategories'
import OperationNames from '@/admin/setup/operation/operation_name/operationNames'
import { Route } from 'react-router-dom'



const OperationRoutes = () => {
    return (
        <Route path="admin/setup/operation" element={<OperationLayout />}>
            <Route path="" element={<OperationNames />} />
            <Route path="category" element={<OperationCategories />} />
        </Route>
    )
}


export default OperationRoutes