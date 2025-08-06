import { AuthContext } from '@/contexts/authContext'
import { SidebarContext } from '@/contexts/sidebar-provider'
import { useConfirmation } from '@/hooks/useConfirmation'
import useNavigation from '@/hooks/useNavigation'
import { cn } from '@/lib/utils'
import { Loader, LogOut } from 'lucide-react'
import { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import AlertModel from './alertModel'
import PermissionProtectedAction from './permission-protected-actions'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { Button, buttonVariants } from './ui/button'
import { ScrollArea } from './ui/scroll-area'




const Aside = () => {

    const { isSidebarOpen, toggleSidebar } = useContext(SidebarContext)
    const { authUser, isLoggingOut, logout } = useContext(AuthContext)
    const { confirmationProps, confirm } = useConfirmation()
    const { SidebarNavigations } = useNavigation()

    const onNavigate = () => {
        toggleSidebar()
    }

    const onLogout = async () => {
        const isConfirm = await confirm()
        if (!isConfirm) return null
        await logout()
        toggleSidebar()
    }




    return (
        <>
            {/* backdrop */}
            {isSidebarOpen && (
                <div
                    onClick={() => onNavigate()}
                    className={cn("fixed top-16 left-0 right-0 bottom-0 bg-black/80 z-[40] sm:hidden")} />
            )}

            {/* sidebar */}
            <aside className={cn('fixed h-[calc(100vh-64px)] top-[64px]   sm:sticky w-60 p-2.5 transition-all duration-300 z-50 sm:z-auto border-r border-dashed bg-background border-zinc-200 dark:border-zinc-800', isSidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0')}
            >

                <div className="flex flex-col h-full relative">
                    <ScrollArea className="flex-1 pr-1">
                        <div className="flex flex-col gap-2 pb-20">
                            {SidebarNavigations.map((item, index) => (
                                !item.children ? (
                                    <Fragment key={item.name || index}>
                                        {item.permission ? (
                                            <PermissionProtectedAction
                                                action={item.permission.action}
                                                module={item.permission.module}
                                            >
                                                <Link
                                                    to={item.href}
                                                    className={buttonVariants({
                                                        variant: item.active ? "default" : "ghost",
                                                        className: "flex !justify-start space-x-2 p-1 cursor-pointer",
                                                    })}
                                                >
                                                    <item.icon className="w-5 h-5" /> {item.name}
                                                </Link>
                                            </PermissionProtectedAction>
                                        ) : (
                                            <Link
                                                to={item.href}
                                                className={buttonVariants({
                                                    variant: item.active ? "default" : "ghost",
                                                    className:
                                                        "flex space-x-2 !justify-start p-1 cursor-pointer w-full",
                                                })}
                                            >
                                                <item.icon className="w-5 h-5" /> {item.name}
                                            </Link>
                                        )}
                                    </Fragment>
                                ) : (
                                    <Accordion
                                        type="single"
                                        collapsible
                                        key={`accordion-${item.name || index}`}
                                    >
                                        <AccordionItem value={`item-${item.name || index}`} className="border-none">
                                            <PermissionProtectedAction action="view" module="Setup">
                                                <AccordionTrigger
                                                    className={buttonVariants({
                                                        variant: item.active ? "default" : "ghost",
                                                        className: "justify-between items-center",
                                                    })}
                                                >
                                                    <div className="flex gap-2">
                                                        <item.icon className="h-4 w-4" /> {item.name}
                                                    </div>
                                                </AccordionTrigger>
                                            </PermissionProtectedAction>

                                            {item.children.map((child, ci) => (
                                                <Fragment key={`child-${child.name || ci}`}>
                                                    {child.permission && (
                                                        <PermissionProtectedAction
                                                            action={child.permission.action}
                                                            module={child.permission.module}
                                                        >
                                                            <AccordionContent className="py-1">
                                                                <div className="pl-5">
                                                                    <Link
                                                                        to={child.href}
                                                                        onClick={onNavigate}
                                                                        className={`flex ${!child.active
                                                                                ? "hover:text-gray-600 dark:hover:text-gray-300"
                                                                                : "bg-blue-600 text-white"
                                                                            } rounded-md py-1 items-center gap-x-1 justify-start text-[13px]`}
                                                                    >
                                                                        <child.icon className="h-4 w-4" /> {child.name}
                                                                    </Link>
                                                                </div>
                                                            </AccordionContent>
                                                        </PermissionProtectedAction>
                                                    )}

                                                    {child.isAdmin && (
                                                        <AccordionContent className="py-1">
                                                            <div className="pl-5">
                                                                <Link
                                                                    to={child.href}
                                                                    onClick={onNavigate}
                                                                    className={`flex ${!child.active
                                                                            ? "hover:text-gray-600 dark:hover:text-gray-300"
                                                                            : "bg-blue-600 text-white"
                                                                        } rounded-md py-1 items-center gap-x-1 justify-start text-[13px]`}
                                                                >
                                                                    <child.icon className="h-4 w-4" /> {child.name}
                                                                </Link>
                                                            </div>
                                                        </AccordionContent>
                                                    )}
                                                </Fragment>
                                            ))}
                                        </AccordionItem>
                                    </Accordion>
                                )
                            ))}
                        </div>
                    </ScrollArea>


                    {/* Gradient overlay */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background pointer-events-none" />

                    {/* Logout */}
                    <div className="absolute bottom-0 inset-x-0 border-t border-zinc-200 dark:border-zinc-700 bg-background">
                        <div className="flex items-center gap-3 px-4 py-2">
                            <div className="relative">
                                <img
                                    src={authUser?.image ? `${import.meta.env.VITE_APP_API_URL}/images/${authUser.image}` : '/user.png'}
                                    alt="User avatar"
                                    className="w-10 h-10 rounded-full border-2 border-zinc-300 dark:border-zinc-600 shadow-sm object-cover"
                                />
                                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-zinc-900 rounded-full"></div>
                            </div>

                            <div className="flex-1">
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="w-full h-9 font-medium text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                                    onClick={onLogout}
                                    disabled={isLoggingOut}
                                >
                                    {isLoggingOut ? (
                                        <>
                                            <Loader className="w-4 h-4 animate-spin mr-2" />
                                            Logging out...
                                        </>
                                    ) : (
                                        <>
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Logout
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </aside >

            {/* Alert model */}

            {
                confirmationProps.isOpen &&
                (<AlertModel
                    continue={confirmationProps.onConfirm}
                    cancel={confirmationProps.onCancel}
                />)
            }

        </>
    )
}

export default Aside






//     < ul className = 'flex flex-col gap-y-2 pb-20' >

//         <li><Link to={{ pathname: `/${Routes}/dashboard` }} onClick={onNavigate} className={
//             buttonVariants({
//                 variant: 'ghost',
//                 className: 'flex text-sm items-center'
//             })
//         }><Airplay className='h-4 w-4' /> Dashboard</Link></li>

// {/* Appointment */ }

// <PermissionProtectedAction action='view' module='Appointment'>
//     <li><Link to={{ pathname: `/appointment` }} onClick={onNavigate} className={
//         buttonVariants({
//             variant: 'ghost',
//             className: 'flex text-sm items-center'
//         })
//     }><CalendarClock className='h-4 w-4' /> Appointment</Link></li>
// </PermissionProtectedAction>

// {/* OPD */ }

// <PermissionProtectedAction action='view' module='Opd'>
//     <li><Link to={{ pathname: `/opd` }} onClick={onNavigate} className={
//         buttonVariants({
//             variant: 'ghost',
//             className: 'flex text-sm items-center'
//         })
//     }><HeartPulse className='h-4 w-4' /> OPD - Out Patient</Link></li>
// </PermissionProtectedAction>

// {/* IPD */ }

// <PermissionProtectedAction action='view' module='Ipd'>
//     <li><Link to={{ pathname: `/ipd` }} onClick={onNavigate} className={
//         buttonVariants({
//             variant: 'ghost',
//             className: 'flex text-sm items-center'
//         })
//     }><Stethoscope className='h-4 w-4' /> IPD - In Patient</Link></li>
// </PermissionProtectedAction>

// {/* Pharmacy */ }

// <PermissionProtectedAction action='view' module='Pharmacy Bill'>
//     <li><Link to={{ pathname: `/pharmacy` }} onClick={onNavigate} className={
//         buttonVariants({
//             variant: 'ghost',
//             className: 'flex text-sm items-center'
//         })
//     }><BriefcaseMedical className='h-4 w-4' />Pharmacy</Link></li>
// </PermissionProtectedAction>

// {/* Radiology */ }
// <PermissionProtectedAction action='view' module='Radiology Bill'>
//     <li><Link to={{ pathname: `/radiology` }} onClick={onNavigate} className={
//         buttonVariants({
//             variant: 'ghost',
//             className: 'flex text-sm items-center'
//         })
//     }><Radiation className='h-4 w-4' />Radiology</Link></li>
// </PermissionProtectedAction>

// {/* Pathology */ }
// <PermissionProtectedAction action='view' module='Pathology Bill'>
//     <li><Link to={{ pathname: `/pathology` }} onClick={onNavigate} className={
//         buttonVariants({
//             variant: 'ghost',
//             className: 'flex text-sm items-center'
//         })
//     }><TestTube className='h-4 w-4' />Pathology</Link></li>
// </PermissionProtectedAction>

// {/* Ambulance */ }
// <PermissionProtectedAction action='view' module='Assign Ambulance'>
//     <li><Link to={{ pathname: `/ambulance` }} onClick={onNavigate} className={
//         buttonVariants({
//             variant: 'ghost',
//             className: 'flex text-sm items-center'
//         })
//     }><Ambulance className='h-4 w-4' />Ambulance</Link></li>
// </PermissionProtectedAction>

// {/* Blood Bank */ }
// <PermissionProtectedAction action='view' module='Issue Blood'>
//     <li><Link to={{ pathname: `/blood-bank/issue-blood` }} onClick={onNavigate} className={
//         buttonVariants({
//             variant: 'ghost',
//             className: 'flex text-sm items-center'
//         })
//     }><Droplets className='h-4 w-4' />Blood Bank</Link></li>
// </PermissionProtectedAction>

// {/* Staff */ }
// <PermissionProtectedAction action='view' module='Human Resource'>
//     <li><Link to={{ pathname: '/staff' }} onClick={onNavigate} className={
//         buttonVariants({
//             variant: 'ghost',
//             className: 'flex text-sm items-center'
//         })
//     }><UserRound className='h-4 w-4' />Staff</Link></li>
// </PermissionProtectedAction>

// {/* Duty Roster */ }
// <PermissionProtectedAction action='view' module='Duty Roster'>
//     <li><Link to={{ pathname: '/roster_report' }} onClick={onNavigate} className={
//         buttonVariants({
//             variant: 'ghost',
//             className: 'flex text-sm items-center'
//         })
//     }><Watch className='h-4 w-4' />Duty Roster</Link></li>
// </PermissionProtectedAction>


// {/* Tree View Links setup links */ }
// <li>
//     <Accordion type="single" collapsible >
//         <AccordionItem value="item-1" className='border-none'>

//             {/* Setup Trigger */}
//             <PermissionProtectedAction action='view' module='Setup'>
//                 <AccordionTrigger className={buttonVariants({
//                     variant: 'ghost',
//                     className: 'justify-between items-center'
//                 })}>
//                     <div className='flex gap-2'><Settings className='h-4 w-4' />  Setup</div>
//                 </AccordionTrigger>
//             </PermissionProtectedAction>

//             {/* Authorization */}

//             {authUser?.role === 'admin' && (
//                 <AccordionContent className='py-1'>
//                     <div className="pl-5">
//                         <Link to={{ pathname: '/admin/setup/authorization' }} onClick={onNavigate} className='flex hover:bg-slate-100 dark:hover:text-black  rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
//                             <ChevronRight className='h-4 w-4' />Authorization</Link>
//                     </div>
//                 </AccordionContent>
//             )}

//             {/* Hospital Charges */}

//             <PermissionProtectedAction action='view' module='Setup Hospital Charges'>
//                 <AccordionContent className='py-1'>
//                     <div className="pl-5">
//                         <Link to={{ pathname: '/admin/setup/charges' }} onClick={onNavigate} className='flex hover:bg-slate-100 dark:hover:text-black rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
//                             <ChevronRight className='h-4 w-4' />Hospital Charges</Link>
//                     </div>
//                 </AccordionContent>
//             </PermissionProtectedAction>

//             {/* Setup Operation */}
//             <PermissionProtectedAction action='view' module='Setup Operation'>
//                 <AccordionContent className='py-1'>
//                     <div className="pl-5">
//                         <Link to={{ pathname: '/admin/setup/operation' }} onClick={onNavigate} className='flex hover:bg-slate-100 dark:hover:text-black rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
//                             <ChevronRight className='h-4 w-4' />Operation</Link>
//                     </div>
//                 </AccordionContent>
//             </PermissionProtectedAction>

//             {/* Setup Finding */}
//             <PermissionProtectedAction action='view' module='Setup Finding'>
//                 <AccordionContent className='py-1'>
//                     <div className="pl-5">
//                         <Link to={{ pathname: '/admin/setup/finding' }} onClick={onNavigate} className='flex hover:bg-slate-100 dark:hover:text-black rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
//                             <ChevronRight className='h-4 w-4' />Findings</Link>
//                     </div>
//                 </AccordionContent>
//             </PermissionProtectedAction>

//             {/* Setup Pharmacy */}
//             <PermissionProtectedAction action='view' module='Setup Pharmacy'>
//                 <AccordionContent className='py-1'>
//                     <div className="pl-5">
//                         <Link to={{ pathname: '/admin/setup/pharmacy' }} onClick={onNavigate} className='flex hover:bg-slate-100 dark:hover:text-black rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
//                             <ChevronRight className='h-4 w-4' />Pharmacy</Link>
//                     </div>
//                 </AccordionContent>
//             </PermissionProtectedAction>


//             {/* Setup Vital */}
//             <PermissionProtectedAction action='view' module='Setup Vital'>
//                 <AccordionContent className='py-1'>
//                     <div className="pl-5">
//                         <Link to={{ pathname: '/admin/setup/vital' }} onClick={onNavigate} className='flex hover:bg-slate-100 dark:hover:text-black rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
//                             <ChevronRight className='h-4 w-4' />Vital</Link>
//                     </div>
//                 </AccordionContent>
//             </PermissionProtectedAction>

//             {/* Setup Event */}
//             {authUser?.role === 'admin' && (
//                 <AccordionContent className='py-1'>
//                     <div className="pl-5">
//                         <Link to={{ pathname: '/admin/setup/event' }} onClick={onNavigate} className='flex hover:bg-slate-100 dark:hover:text-black rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
//                             <ChevronRight className='h-4 w-4' />Calendar</Link>
//                     </div>
//                 </AccordionContent>
//             )}


//             {/* Setup Radiology */}
//             <PermissionProtectedAction action='view' module='Setup Radiology'>
//                 <AccordionContent className='py-1'>
//                     <div className="pl-5">
//                         <Link to={{ pathname: '/admin/setup/radiology' }} onClick={onNavigate} className='flex hover:bg-slate-100 dark:hover:text-black rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
//                             <ChevronRight className='h-4 w-4' />Radiology</Link>
//                     </div>
//                 </AccordionContent>
//             </PermissionProtectedAction>


//             {/* Setup Pathology */}
//             <PermissionProtectedAction action='view' module='Setup Pathology'>
//                 <AccordionContent className='py-1'>
//                     <div className="pl-5">
//                         <Link to={{ pathname: '/admin/setup/pathology' }} onClick={onNavigate} className='flex hover:bg-slate-100 dark:hover:text-black rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
//                             <ChevronRight className='h-4 w-4' />Pathology</Link>
//                     </div>
//                 </AccordionContent>
//             </PermissionProtectedAction>


//             {/* Setup Patient */}
//             <PermissionProtectedAction action='view' module='Setup Patient'>
//                 <AccordionContent className='py-1'>
//                     <div className="pl-5">
//                         <Link to={{ pathname: '/admin/setup/patient' }} onClick={onNavigate} className='flex hover:bg-slate-100 dark:hover:text-black rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
//                             <ChevronRight className='h-4 w-4' />Patients</Link>
//                     </div>
//                 </AccordionContent>
//             </PermissionProtectedAction>

//             {/* setup bed */}
//             <PermissionProtectedAction action='view' module='Setup Bed'>
//                 <AccordionContent className='py-1'>
//                     <div className="pl-5">
//                         <Link to={{ pathname: '/admin/setup/bed' }} onClick={onNavigate} className='flex hover:bg-slate-100 dark:hover:text-black rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
//                             <ChevronRight className='h-4 w-4' />Bed</Link>
//                     </div>
//                 </AccordionContent>
//             </PermissionProtectedAction>

//             {/* setup STaff */}
//             <PermissionProtectedAction action='view' module='Setup Staff'>
//                 <AccordionContent className='py-1'>
//                     <div className="pl-5">
//                         <Link to={{ pathname: '/admin/setupStaff/designation' }} onClick={onNavigate} className='flex hover:bg-slate-100 dark:hover:text-black rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
//                             <ChevronRight className='h-4 w-4' />Staff</Link>
//                     </div>
//                 </AccordionContent>
//             </PermissionProtectedAction>

//             {/* setup Homapage */}
//             <PermissionProtectedAction action='view' module='Setup Homepage'>
//                 <AccordionContent className='py-1'>
//                     <div className="pl-5">
//                         <Link to={{ pathname: '/admin/setup/homepage' }} onClick={onNavigate} className='flex hover:bg-slate-100 dark:hover:text-black rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
//                             <ChevronRight className='h-4 w-4' />Homepage</Link>
//                     </div>
//                 </AccordionContent>
//             </PermissionProtectedAction>

//         </AccordionItem>
//     </Accordion>
// </li>


//                         </ul >