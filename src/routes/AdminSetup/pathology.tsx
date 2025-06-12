import SetupPathCategories from '@/admin/setup/pathology/category/categories'
import SetupPathologyLayout from '@/admin/setup/pathology/layout'
import SetupPathParameters from '@/admin/setup/pathology/parameter/parameters'
import SetupPathologyTestNames from '@/admin/setup/pathology/test/test-names'
import PathologyUnit from '@/admin/setup/pathology/units/units'
import { Route } from 'react-router-dom'



const PathologyRoutes = () => {
    return (
        <Route path='admin/setup/pathology' element={<SetupPathologyLayout />}>
            <Route path='' element={<SetupPathologyTestNames />} />
            <Route path='category' element={<SetupPathCategories />} />
            <Route path='test' element={<div>PathologyTest</div>} />
            <Route path='units' element={<PathologyUnit />} />
            <Route path='parameter' element={<SetupPathParameters />} />
        </Route>
    )
}

export default PathologyRoutes