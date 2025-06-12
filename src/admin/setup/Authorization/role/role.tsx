import AlertModel from '@/components/alertModel'
import CustomTooltip from '@/components/customTooltip'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useConfirmation } from '@/hooks/useConfirmation'
import { Pencil, Plus, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { z } from 'zod'
import AuthzApi from '../../services/authorization'
import CreateRole, { roleFormSchema } from './createRole'


export interface ROLE {
    "id": number,
    "name": string,
    _count: number
}


const Role = () => {

    // Loaders
    const [isPending, setPending] = useState<boolean>(false)

    // custom hook

    const { confirm, confirmationProps } = useConfirmation()

    // model states
    const [isRoleForm, setRoleForm] = useState<boolean>(false)

    // api state
    const [roles, setRoles] = useState<ROLE[]>([])
    const [roleDts, setRoleDts] = useState<ROLE>()


    // performing upsert
    const handleSubmit = async (formData: z.infer<typeof roleFormSchema>) => {
        try {
            let data;
            setPending(true)
            roleDts ? (
                data = await AuthzApi.updateRole(formData, roleDts.id),
                setRoleDts(undefined)
            ) :
                (data = await AuthzApi.createRole(formData))
            toast.success(data.message)
            setRoleForm(false)
            fetchRoles()
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setPending(false)
        }
    }


    // fetching list
    const fetchRoles = async () => {
        try {
            const data = await AuthzApi.getRoles()
            setRoles(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    // fetching details for update mode

    const fetchRoleDetails = async (id: number) => {
        try {
            const data = await AuthzApi.getRoleDetails(id)
            setRoleDts(data)
            setRoleForm(true)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }



    //   deleting details
    const onDelete = async (id: number) => {
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await AuthzApi.deleteRole(id)
            toast.success(data.message)
            fetchRoles()
        } catch ({ message }: any) {
            toast.error(message)
        }
    }



    useEffect(() => {
        fetchRoles()
    }, [])


    return (
        <section className="flex flex-col pb-16 gap-y-5 pt-5">

            <div className="flex justify-between">
                <h1 className="text-lg font-semibold">Roles</h1>
                <Button size='sm' onClick={() => { setRoleForm(true) }}>
                    <Plus /> Add Role
                </Button>
            </div>

            <Separator />

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead >ID</TableHead>
                        <TableHead className=''>Role</TableHead>
                        <TableHead >Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {roles.map((role) => {
                        return <TableRow key={role.id}>
                            <TableCell>{role.id}</TableCell>
                            <TableCell>{role.name}</TableCell>
                            <TableCell className='flex space-x-2'>
                                {/* EDIT  */}
                                <CustomTooltip message='EDIT'>
                                    <Pencil className="w-4 cursor-pointer  text-gray-600 dark:text-gray-400" onClick={async () => {
                                        fetchRoleDetails(role.id)
                                    }} />
                                </CustomTooltip>

                                {/* DELETE  */}
                                <CustomTooltip message='DELETE'>
                                    <Trash className="w-4 cursor-pointer  text-gray-600 dark:text-gray-400" onClick={async () => {
                                        onDelete(role.id)
                                    }} />
                                </CustomTooltip>
                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>

            {/* Models */}

            {/* form model */}
            {isRoleForm && (
                <CreateRole isPending={isPending} Submit={handleSubmit}
                    defaultVals={roleDts!}
                    onClick={() => { setRoleForm(false); setRoleDts(undefined) }}
                />
            )}


            {/* Alert model */}
            {confirmationProps.isOpen && <AlertModel
                cancel={() => { confirmationProps.onCancel() }}
                continue={() => confirmationProps.onConfirm()}
            />}



        </section>
    )
}




export default Role