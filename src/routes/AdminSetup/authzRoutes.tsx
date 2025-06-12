import PermissionLayout from '@/admin/setup/Authorization/layout'
import Permission from '@/admin/setup/Authorization/permission/permission'
import Role from '@/admin/setup/Authorization/role/role'
import { Route } from 'react-router-dom'

const AuthzRoutes = () => {
    return (
        <Route path='admin/setup/authorization' element={<PermissionLayout />} >
            <Route path='' element={<Permission />} />
            <Route path='role' element={<Role />} />
        </Route>
    )
}


export default AuthzRoutes