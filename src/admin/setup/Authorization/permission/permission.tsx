import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { dashboardPermissions, Module, setupPermissions } from "@/lib/modules"
import { cn } from "@/lib/utils"
import { Activity, Edit3, Eye, Layers, Plus, Shield, Trash2, Users } from "lucide-react"
import { parseAsInteger, useQueryState } from "nuqs"
import { ReactNode, useEffect, useState } from "react"
import toast from "react-hot-toast"
import AuthzApi from "../../services/authorization"
import { ROLE } from "../role/role"


type ActionType = 'view' | 'create' | 'update' | 'delete';
const action = ['view', 'create', 'update', 'delete']


const Permission = () => {

    type actionType = 'view' | 'create' | 'update' | 'delete'

    const [permissions, setPermissions] = useState(new Map())
    const [roleId, setRoleId] = useQueryState('roleId', parseAsInteger)

    const [roles, setRoles] = useState<ROLE[]>([])

    const fetchRoles = async () => {
        try {
            const data = await AuthzApi.getRoles()
            setRoles(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    // creating and deleting both
    const handleCheckBox = async (isAllow: boolean, permission: string, PID?: number) => {
        try {
            if (!roleId) return toast.error('Please select role')
            let data
            isAllow ?
                (data = await AuthzApi.createPermission(permission, roleId)) // updating current set
                :
                (PID && (data = await AuthzApi.deletePermission(permission, PID))) // if permission id will present then it will work

            // both time updating
            fetchPermissions()
            toast.success(data.message)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const fetchPermissions = async () => {
        try {
            const data = await AuthzApi.getPermissions({ roleId: Number(roleId) })
            setPermissions(new Map(data.map((p) => [p.name, p]))); // setting map
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    useEffect(() => {
        fetchRoles()
    }, [])

    useEffect(() => {
        fetchPermissions()
    }, [roleId])



    return (
        <>
            <section className="flex flex-col pb-16 gap-y-12 pt-10 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-500/10 dark:to-green-500/10 rounded-t-3xl">
                <div className="flex space-x-2 items-center justify-center">
                    <div className="p-3 dark:bg-white/20 rounded-full bg-blue-100 text-blue-500 backdrop-blur-sm shadow-xl">
                        <Shield className="h-8 w-8" />
                    </div>
                    <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 dark:text-neutral-100">Permission Center</h1>
                </div>

                {/* Search bar */}
                <div className="space-y-2 px-5">
                    <div className="rounded-full shadow-xl border dark:border-white/10 bg-white/10 backdrop-blur-sm w-full lg:w-[600px] mx-auto hover:scale-105 transition-all duration-300">
                        <div className="flex items-center p-3 h-16">
                            <Select defaultValue={String(roleId)} onValueChange={(val) => { setRoleId(+val) }}>
                                <SelectTrigger className="border-none focus:ring-0 shadow-none">
                                    <SelectValue placeholder='Select Role' />
                                </SelectTrigger>
                                <SelectContent className="dark:border-white/10">
                                    {roles.map((role) => (
                                        <SelectItem key={role.id} value={String(role.id)}>{role.name.charAt(0).toUpperCase() + role.name.slice(1)}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Not selected role */}
                {!roleId && (
                    <div className="flex flex-col items-center justify-center gap-y-8 text-center mt-5">
                        <div className="relative p-4 rounded-full bg-yellow-500 dark:bg-yellow-600 shadow-xl">
                            <Users className="w-12 h-12 text-white" />
                            <div className="bg-yellow-500/60 dark:bg-yellow-500/30 absolute inset-0 rounded-full animate-ping" />
                        </div>

                        <div className="space-y-2">
                            <p className="text-gray-800 dark:text-neutral-100 sm:text-2xl font-bold">There is not any role selected yet</p>
                            <p className="text-neutral-400">Please select a role from the dropdown to manage permissions</p>
                        </div>
                    </div>
                )}


                <PermissionComponent
                    module={Module}
                    permissions={permissions}
                    renderActions={(mod) => (
                        <div className="grid grid-cols-4 pb-2">
                            {action.map((action, i) => {
                                const perm = `${action}:${mod.name}`;
                                const PID = permissions?.get(perm)?.id
                                return <>
                                    <ActionButton
                                        key={i}
                                        hasPermission={permissions.has(`${action}:${mod.name}`)}
                                        action={action as ActionType}
                                        disabled={mod[action as ActionType]}
                                        click={(isAllow) => handleCheckBox(isAllow, perm, PID)}
                                    />
                                </>
                            })}
                        </div>
                    )}
                />


            </section>

            <section className="flex flex-col pb-16 gap-y-5 pt-5">
                <div className="flex justify-between">
                    <h1 className="text-lg font-semibold">Permission</h1>
                </div>

                <Separator />

                {/* ROLE */}
                <div className="w-[200px] sm:w-[300px] space-y-2">
                    <p className="text-gray-400">Roles</p>
                    <Select defaultValue={String(roleId)} onValueChange={(val) => { setRoleId(+val) }}>
                        <SelectTrigger>
                            <SelectValue placeholder='Select Role' />
                        </SelectTrigger>
                        <SelectContent>
                            {roles.map((role) => (
                                <SelectItem key={role.id} value={String(role.id)}>{role.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>


                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead >Module</TableHead>
                            <TableHead >View</TableHead>
                            <TableHead >Create</TableHead>
                            <TableHead >Update</TableHead>
                            <TableHead >Delete</TableHead>
                            {/* <TableHead >Action</TableHead> */}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Module.map((mod, i) => {
                            return <TableRow key={i}>
                                <TableCell>{mod.name}</TableCell>
                                {['view', 'create', 'update', 'delete'].map((action) => {
                                    const perm = `${action}:${mod.name}`;
                                    const permID = permissions.get(perm)
                                    return <TableCell key={action}>
                                        {/* checking if any role has permission the checked */}
                                        <Checkbox
                                            disabled={!mod[action as actionType]} // cause true will disable it
                                            checked={permissions.has(perm)}
                                            onCheckedChange={(value) => {
                                                handleCheckBox(Boolean(value),
                                                    perm, permID?.id)
                                            }}
                                        />
                                    </TableCell>
                                })}
                            </TableRow>
                        })}
                    </TableBody>
                </Table>


                {/* dashboard permissions */}

                <div className="mt-10">

                    <h1 className="font-medium mb-4">Dashboard Permission</h1>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead >Module</TableHead>
                                {dashboardPermissions.map((action, i) => (
                                    <TableHead key={i}>{action}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>Dashboard</TableCell>
                                {dashboardPermissions.map((action) => {
                                    const perm = `${action}:dashboard`;
                                    const permID = permissions.get(perm)
                                    return <TableCell key={action}>
                                        {/* checking if any role has permission the checked */}
                                        <Checkbox checked={permissions.has(perm)} onCheckedChange={(value) => { handleCheckBox(Boolean(value), perm, permID?.id) }} />
                                    </TableCell>
                                })}
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>



                {/* Setup permissions */}

                <div className="mt-10">

                    <h1 className="font-medium mb-4">Setup Permission</h1>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead >Module</TableHead>
                                <TableHead >View</TableHead>
                                <TableHead >Create</TableHead>
                                <TableHead >Update</TableHead>
                                <TableHead >Delete</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {setupPermissions.map((mod) => {
                                return <TableRow key={mod.name}>
                                    <TableCell>{mod.name}</TableCell>
                                    {['view', 'create', 'update', 'delete'].map((action) => {
                                        const perm = `${action}:${mod.name}`;
                                        const permID = permissions.get(perm)
                                        return <TableCell key={action}>
                                            <Checkbox
                                                disabled={!mod[action as actionType]}
                                                checked={permissions.has(perm)}
                                                onCheckedChange={(value) => {
                                                    handleCheckBox(Boolean(value),
                                                        perm, permID?.id)
                                                }}
                                            />
                                        </TableCell>
                                    })}
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </div>

            </section>
        </>
    )
}

export default Permission




const PermissionComponent = ({ module, permissions, renderActions }: { module: typeof Module, permissions: Map<string, any>, renderActions: (module: typeof Module[0]) => ReactNode }) => {

    return (
        <div className="flex flex-col p-5 border gap-5 dark:border-white/10 rounded-xl mx-2 md:mx-10">
            {/* Header */}
            <div className="flex gap-3 items-center">
                <div className="p-3 dark:bg-white/20 rounded-full bg-blue-100 text-blue-500 backdrop-blur-sm shadow-xl">
                    <Layers />
                </div>
                <h1 className="font-bold text-xl text-gray-800 dark:text-gray-100">Core Modules</h1>
            </div>

            {module.map((mod, i) => {

                const enabled = action.filter(a => mod[a as ActionType]).length
                const granted = action.filter(a => permissions.has(`${a}:${mod.name}`)).length

                return <div key={i} className="p-2 rounded-xl space-y-4 border dark:border-white/10">
                    {/* header */}
                    <div className="flex gap-3 items-center">
                        <div className="p-3 bg-gradient-to-br from-blue-400 to-green-400 dark:from-blue-700 dark:to-green-700 rounded-md text-white backdrop-blur-sm shadow-xl">
                            <Activity />
                        </div>
                        <div className="space-y-0.5">
                            <h1 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{mod.name}</h1>
                            <p className="text-xs dark:text-neutral-300 text-gray-600">{granted}/{enabled} permissions granted</p>
                        </div>
                    </div>
                    {/* button have to create by our own */}
                    <main>{renderActions(mod)}</main>
                </div>
            })}
        </div>
    )
}




const ActionButton = ({ action, hasPermission, disabled, click }: { action: ActionType, hasPermission: boolean, disabled: boolean, click: (action: boolean) => void }) => {

    const [activeButtons, setActiveButtons] = useState({
        view: false,
        create: false,
        update: false,
        delete: false
    });

    const handleClick = (action: ActionType) => {
        setActiveButtons({ ...activeButtons, [action]: !activeButtons[action] })
    }

    const btnConfig = {
        view: {
            icon: Eye,
            label: 'View',
            inactive: 'text-blue-500 bg-blue-100 dark:bg-blue-600/10 outline-blue-500/10 ',
            active: 'bg-blue-500 dark:bg-blue-500 text-white outline-blue-500',
            disabled: 'bg-gray-100 dark:bg-gray-600/10 text-blue-500 outline-gray-500/10 cursor-not-allowed text-gray-300 dark:text-gray-600'
        },
        create: {
            icon: Plus,
            label: 'Create',
            inactive: 'text-green-500 bg-green-50 dark:bg-green-500/10 outline-green-500/10',
            active: 'bg-green-500 dark:bg-green-500 text-white outline-green-500',
            disabled: 'bg-gray-100 dark:bg-gray-600/10 text-blue-500 outline-gray-500/10 cursor-not-allowed text-gray-300 dark:text-gray-600'
        },
        update: {
            icon: Edit3,
            label: 'Update',
            inactive: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10 outline-yellow-500/10',
            active: 'bg-yellow-500 dark:bg-yellow-500 text-white outline-yellow-500',
            disabled: 'bg-gray-100 dark:bg-gray-600/10 text-blue-500 outline-gray-500/10 cursor-not-allowed text-gray-300 dark:text-gray-600'
        },
        delete: {
            icon: Trash2,
            label: 'Delete',
            inactive: 'text-red-500 bg-red-50 dark:bg-red-500/10 outline-red-500/10',
            active: 'bg-red-500 dark:bg-red-500 text-white outline-red-500',
            disabled: 'bg-gray-100 dark:bg-gray-600/10 text-blue-500 outline-gray-500/10 cursor-not-allowed text-gray-300 dark:text-gray-600'
        }
    };


    const Icon = btnConfig[action].icon

    return (
        <div className="mx-auto flex space-y-1 flex-col items-center">
            <button className={cn(`p-3 transition-all duration-200 outline outline-offset-2 rounded-lg shadow-none ${btnConfig[action].inactive} `,
                { [btnConfig[action].active]: (activeButtons[action] || hasPermission) },
                { [btnConfig[action].disabled]: !disabled }
            )}
                disabled={!disabled}
                onClick={() => { handleClick(action); hasPermission ? click(false) : click(true) }}
            >
                <Icon className="h-5 w-5" />
            </button>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-500">{btnConfig[action].label}</span>
        </div>
    )
}