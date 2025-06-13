import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { dashboardPermissions, Module, setupPermissions } from "@/lib/modules"
import { cn } from "@/lib/utils"
import { Activity, ChartCandlestick, Edit3, Eye, Layers, Lock, LockOpen, Plus, Shield, Trash2, Users, Wrench } from "lucide-react"
import { parseAsInteger, parseAsString, useQueryState } from "nuqs"
import { ElementType, Fragment, ReactNode, useEffect, useState } from "react"
import toast from "react-hot-toast"
import AuthzApi from "../../services/authorization"
import { ROLE } from "../role/role"


type ActionType = 'view' | 'create' | 'update' | 'delete';
const action = ['view', 'create', 'update', 'delete']


const Permission = () => {

    const [permissions, setPermissions] = useState(new Map())
    const [roleId, setRoleId] = useQueryState('roleId', parseAsInteger)
    const [navigate, setNavigate] = useQueryState('navigate', parseAsString.withDefault('core'))

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
            <section className="flex flex-col min-h-[calc(100vh-64px)] pb-16 gap-y-12 pt-10 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-500/10 dark:to-green-500/10 rounded-t-3xl">
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


                {roleId && <>

                    {/* Navigation Buttons */}

                    <div className="max-w-full overflow-hidden p-2 border dark:border-white/10 rounded-lg shadow-md sm:mx-auto mx-2.5">
                        <ScrollArea className="w-full whitespace-nowrap">
                            <div className="flex w-max gap-4 px-2">
                                <Button
                                    onClick={() => setNavigate('core')}
                                    variant={navigate === 'core' ? 'default' : 'ghost'}
                                    className="flex items-center gap-2"
                                >
                                    <Layers /> Core Module
                                </Button>

                                <Button
                                    onClick={() => setNavigate('configuration')}
                                    variant={navigate === 'configuration' ? 'default' : 'ghost'}
                                    className="flex items-center gap-2"
                                >
                                    <Wrench /> Configuration
                                </Button>

                                <Button
                                    onClick={() => setNavigate('dashboard')}
                                    variant={navigate === 'dashboard' ? 'default' : 'ghost'}
                                    className="flex items-center gap-2"
                                >
                                    <ChartCandlestick /> Dashboard
                                </Button>
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>




                    {navigate === 'core' && (
                        <PermissionComponent
                            title="Core Modules"
                            Icon={Layers}
                            module={Module}
                            HeaderIcon={Activity}
                            permissions={permissions}
                            renderActions={(mod) => (
                                <div className="grid grid-cols-4 pb-2">
                                    {action.map((action, i) => {
                                        const perm = `${action}:${mod.name}`;
                                        const PID = permissions?.get(perm)?.id
                                        return <Fragment key={i}>
                                            <ActionButton
                                                key={i}
                                                hasPermission={permissions.has(`${action}:${mod.name}`)}
                                                action={action as ActionType}
                                                disabled={mod[action as ActionType]}
                                                click={(isAllow) => handleCheckBox(isAllow, perm, PID)}
                                            />
                                        </Fragment>
                                    })}
                                </div>
                            )}
                        />
                    )}

                    {navigate === 'configuration' && (
                        <PermissionComponent
                            title="Configuration"
                            Icon={Wrench}
                            module={setupPermissions}
                            HeaderIcon={Shield}
                            permissions={permissions}
                            renderActions={(mod) => (
                                <div className="grid grid-cols-4 pb-2">
                                    {action.map((action, i) => {
                                        const perm = `${action}:${mod.name}`;
                                        const PID = permissions?.get(perm)?.id
                                        return <Fragment key={i}>
                                            <ActionButton
                                                key={i}
                                                hasPermission={permissions.has(`${action}:${mod.name}`)}
                                                action={action as ActionType}
                                                disabled={mod[action as ActionType]}
                                                click={(isAllow) => handleCheckBox(isAllow, perm, PID)}
                                            />
                                        </Fragment>
                                    })}
                                </div>
                            )}
                        />
                    )}
                </>}


                {navigate === 'dashboard' && <DashboardPermissions module={dashboardPermissions} permissions={permissions} click={handleCheckBox} />}

            </section>
        </>
    )
}

export default Permission




const PermissionComponent = ({ Icon, HeaderIcon, title, module, permissions, renderActions }: { Icon: ElementType, HeaderIcon: ElementType, title: string, module: typeof Module, permissions: Map<string, any>, renderActions: (module: typeof Module[0]) => ReactNode }) => {

    return (
        <div className="flex flex-col p-5 border gap-5 dark:border-white/10 rounded-xl mx-2 md:mx-10">
            {/* Header */}
            <div className="flex gap-3 items-center">
                <div className="p-3 dark:bg-white/20 rounded-full bg-blue-100 text-blue-500 backdrop-blur-sm shadow-xl">
                    <Icon />
                </div>
                <h1 className="font-bold text-xl text-gray-800 dark:text-gray-100">{title}</h1>
            </div>

            {module.map((mod, i) => {

                const enabled = action.filter(a => mod[a as ActionType]).length
                const granted = action.filter(a => permissions.has(`${a}:${mod.name}`)).length

                return <div key={i + mod.name} className="p-2 rounded-xl space-y-4 border dark:border-white/10">
                    {/* header */}
                    <div className="flex gap-3 items-center">
                        <div className="p-3 bg-gradient-to-br from-blue-400 to-green-400 dark:from-blue-700 dark:to-green-700 rounded-md text-white backdrop-blur-sm shadow-xl">
                            <HeaderIcon />
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
        hasPermission ? click(false) : click(true)
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

    useEffect(() => {
        if (!hasPermission) {
            setActiveButtons(prev => ({
                ...prev,
                [action]: false, // clear it if permission was removed
            }));
        } else {
            setActiveButtons(prev => ({
                ...prev,
                [action]: true, // if permission is given again, mark active
            }));
        }
    }, [hasPermission]);

    return (
        <div className="mx-auto flex space-y-1 flex-col items-center">
            <button className={cn(`p-3 transition-all duration-200 outline outline-offset-2 rounded-lg shadow-none ${btnConfig[action].inactive} `,
                { [btnConfig[action].active]: (activeButtons[action] || hasPermission) },
                { [btnConfig[action].disabled]: !disabled }
            )}
                disabled={!disabled}
                onClick={() => { handleClick(action) }}
            >
                <Icon className="h-5 w-5" />
            </button>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-500">{btnConfig[action].label}</span>
        </div>
    )
}


const DashboardPermissions = ({ module, permissions, click }: { module: typeof dashboardPermissions, permissions: Map<string, any>, click: (isAllowed: boolean, permission: string, PID: number) => void }) => {

    const [isClicked, setIsClicked] = useState<{ [key: number]: boolean }>({})

    const handleClick = (i: number) => {
        setIsClicked(prev => ({ ...prev, [i]: !prev[i] }))
    }


    return (
        <div className="flex flex-col p-5 border gap-5 dark:border-white/10 rounded-xl mx-2 md:mx-10">
            {/* Header */}
            <div className="flex gap-3 items-center">
                <div className="p-3 dark:bg-white/20 rounded-full bg-blue-100 text-blue-500 backdrop-blur-sm shadow-xl">
                    <ChartCandlestick />
                </div>
                <h1 className="font-bold text-xl text-gray-800 dark:text-gray-100">Dashboard Analytics</h1>
            </div>

            {module.map((action, i) => {
                const isGranted = permissions.has(`${action}:dashboard`)
                const perm = `${action}:dashboard`
                const permId = permissions.get(perm)?.id
                isClicked[i] = isGranted

                return <div
                    onClick={() => { handleClick(i); click && click(!isGranted, perm, permId) }} // if true then create else delete
                    className={cn("flex justify-between items-center cursor-pointer p-5 rounded-xl space-y-4 outline outline-green-500/10 bg-green-50 dark:bg-green-500/5 transition-all duration-300", { 'border-none outline-offset-2 outline-green-500': isClicked[i] })} key={i}>
                    <div className="flex gap-2 items-center">
                        <ChartCandlestick className="w-5 h-5 text-gray-400" />
                        <p className="text-gray-800 dark:text-neutral-100 font-semibold">{action}</p>
                    </div>
                    <div className="p-2 rounded-full bg-white/10 shadow-xl">
                        {isClicked[i] ? <LockOpen className="text-green-500 w-5 h-5" /> : <Lock className="text-gray-400 w-5 h-5" />}
                    </div>
                </div>
            })}
        </div>
    )
}