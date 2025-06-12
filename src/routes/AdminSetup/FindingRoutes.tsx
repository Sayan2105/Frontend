import FindindngCategories from '@/admin/setup/findings/finding_category/findindngCategory'
import FindingNames from '@/admin/setup/findings/finding_name/findingNames'
import FindingsLayout from '@/admin/setup/findings/layout'
import { Route } from 'react-router-dom'



const FindingRoutes = () => {
    return (
        <Route path="admin/setup/finding" element={<FindingsLayout />}>
            <Route path="" element={<FindingNames />} />
            <Route path="category" element={<FindindngCategories />} />
        </Route>
    )
}

export default FindingRoutes