import RadioCategories from '@/admin/setup/radiology/category/categories'
import SetupRadiologyLayout from '@/admin/setup/radiology/layout'
import SetupRadioParameters from '@/admin/setup/radiology/parameter/parameters'
import RadiologyTests from '@/admin/setup/radiology/test/tests'
import RadiologyUnits from '@/admin/setup/radiology/units/units'
import { Route } from 'react-router-dom'



const RadiologyRoutes = () => {
    return (
        <Route path='admin/setup/radiology' element={<SetupRadiologyLayout />}>
            <Route path='' element={<RadiologyTests />} />
            <Route path='category' element={<RadioCategories />} />
            <Route path='units' element={<RadiologyUnits />} />
            <Route path='parameter' element={<SetupRadioParameters />} />
        </Route>
    )
}

export default RadiologyRoutes