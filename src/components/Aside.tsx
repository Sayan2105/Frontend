import { SidebarContext } from '@/contexts/sidebar-provider'
import { authSelector, logout } from '@/features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { cn } from '@/lib/utils'
import { Airplay, Ambulance, BriefcaseMedical, CalendarClock, ChevronRight, Droplets, HeartPulse, Radiation, Settings, Stethoscope, TestTube, UserRound, Watch } from 'lucide-react'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import AlertModel from './alertModel'
import PermissionProtectedAction from './permission-protected-actions'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { Button, buttonVariants } from './ui/button'
import { ScrollArea } from './ui/scroll-area'




const Aside = () => {

    // model
    const [isAlert, setAlert] = useState<boolean>(false)
    const { isSidebarOpen, toggleSidebar } = useContext(SidebarContext)

    const dispatch = useAppDispatch()
    const session = useAppSelector(authSelector)


    const onNavigate = () => {
        toggleSidebar()
    }

    // making routes static
    const Routes = (session.user?.role === 'patient') ? session.user?.role : 'admin'


    return (
        <>
            {/* backdrop */}
            {isSidebarOpen && (
                <div
                    onClick={() => onNavigate()}
                    className={cn("fixed top-16 left-0 right-0 bottom-0 bg-black/80 z-[120] sm:hidden")} />
            )}

            {/* sidebar */}
            <div className={cn('fixed sm:z-0 z-[120] -left-[100%] sm:sticky w-52 p-2.5 transition-all duration-200 border-r border-dashed bg-background border-zinc-200 dark:border-zinc-800 h-[calc(100vh-64px)] top-16', { 'left-0': isSidebarOpen })}>
                <ScrollArea className='h-full '>

                    <ul className='flex flex-col gap-y-2 pb-20'>

                        <li><Link to={{ pathname: `/${Routes}/dashboard` }} onClick={onNavigate} className={
                            buttonVariants({
                                variant: 'ghost',
                                className: 'flex text-sm items-center'
                            })
                        }><Airplay className='h-4 w-4' /> Dashboard</Link></li>

                        {/* Appointment */}

                        <PermissionProtectedAction action='view' module='Appointment'>
                            <li><Link to={{ pathname: `/appointment` }} onClick={onNavigate} className={
                                buttonVariants({
                                    variant: 'ghost',
                                    className: 'flex text-sm items-center'
                                })
                            }><CalendarClock className='h-4 w-4' /> Appointment</Link></li>
                        </PermissionProtectedAction>

                        {/* OPD */}

                        <PermissionProtectedAction action='view' module='Opd'>
                            <li><Link to={{ pathname: `/opd` }} onClick={onNavigate} className={
                                buttonVariants({
                                    variant: 'ghost',
                                    className: 'flex text-sm items-center'
                                })
                            }><HeartPulse className='h-4 w-4' /> OPD - Out Patient</Link></li>
                        </PermissionProtectedAction>

                        {/* IPD */}

                        <PermissionProtectedAction action='view' module='Ipd'>
                            <li><Link to={{ pathname: `/ipd` }} onClick={onNavigate} className={
                                buttonVariants({
                                    variant: 'ghost',
                                    className: 'flex text-sm items-center'
                                })
                            }><Stethoscope className='h-4 w-4' /> IPD - In Patient</Link></li>
                        </PermissionProtectedAction>

                        {/* Pharmacy */}

                        <PermissionProtectedAction action='view' module='Pharmacy Bill'>
                            <li><Link to={{ pathname: `/pharmacy` }} onClick={onNavigate} className={
                                buttonVariants({
                                    variant: 'ghost',
                                    className: 'flex text-sm items-center'
                                })
                            }><BriefcaseMedical className='h-4 w-4' />Pharmacy</Link></li>
                        </PermissionProtectedAction>

                        {/* Radiology */}
                        <PermissionProtectedAction action='view' module='Radiology Bill'>
                            <li><Link to={{ pathname: `/radiology` }} onClick={onNavigate} className={
                                buttonVariants({
                                    variant: 'ghost',
                                    className: 'flex text-sm items-center'
                                })
                            }><Radiation className='h-4 w-4' />Radiology</Link></li>
                        </PermissionProtectedAction>

                        {/* Pathology */}
                        <PermissionProtectedAction action='view' module='Pathology Bill'>
                            <li><Link to={{ pathname: `/pathology` }} onClick={onNavigate} className={
                                buttonVariants({
                                    variant: 'ghost',
                                    className: 'flex text-sm items-center'
                                })
                            }><TestTube className='h-4 w-4' />Pathology</Link></li>
                        </PermissionProtectedAction>

                        {/* Ambulance */}
                        <PermissionProtectedAction action='view' module='Assign Ambulance'>
                            <li><Link to={{ pathname: `/ambulance` }} onClick={onNavigate} className={
                                buttonVariants({
                                    variant: 'ghost',
                                    className: 'flex text-sm items-center'
                                })
                            }><Ambulance className='h-4 w-4' />Ambulance</Link></li>
                        </PermissionProtectedAction>

                        {/* Blood Bank */}
                        <PermissionProtectedAction action='view' module='Issue Blood'>
                            <li><Link to={{ pathname: `/blood-bank/issue-blood` }} onClick={onNavigate} className={
                                buttonVariants({
                                    variant: 'ghost',
                                    className: 'flex text-sm items-center'
                                })
                            }><Droplets className='h-4 w-4' />Blood Bank</Link></li>
                        </PermissionProtectedAction>

                        {/* Staff */}
                        <PermissionProtectedAction action='view' module='Human Resource'>
                            <li><Link to={{ pathname: '/staff' }} onClick={onNavigate} className={
                                buttonVariants({
                                    variant: 'ghost',
                                    className: 'flex text-sm items-center'
                                })
                            }><UserRound className='h-4 w-4' />Staff</Link></li>
                        </PermissionProtectedAction>

                        {/* Duty Roster */}
                        <PermissionProtectedAction action='view' module='Duty Roster'>
                            <li><Link to={{ pathname: '/roster_report' }} onClick={onNavigate} className={
                                buttonVariants({
                                    variant: 'ghost',
                                    className: 'flex text-sm items-center'
                                })
                            }><Watch className='h-4 w-4' />Duty Roster</Link></li>
                        </PermissionProtectedAction>


                        {/* Tree View Links setup links */}
                        <li>
                            <Accordion type="single" collapsible >
                                <AccordionItem value="item-1" className='border-none'>

                                    {/* Setup Trigger */}
                                    <PermissionProtectedAction action='view' module='Setup'>
                                        <AccordionTrigger className={buttonVariants({
                                            variant: 'ghost',
                                            className: 'justify-between items-center'
                                        })}>
                                            <div className='flex gap-2'><Settings className='h-4 w-4' />  Setup</div>
                                        </AccordionTrigger>
                                    </PermissionProtectedAction>

                                    {/* Authorization */}

                                    {session.user?.role === 'admin' && (
                                        <AccordionContent className='py-1'>
                                            <div className="pl-5">
                                                <Link to={{ pathname: '/admin/setup/authorization' }} onClick={onNavigate} className='flex hover:bg-slate-100 dark:hover:text-black  rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
                                                    <ChevronRight className='h-4 w-4' />Authorization</Link>
                                            </div>
                                        </AccordionContent>
                                    )}

                                    {/* Hospital Charges */}

                                    <PermissionProtectedAction action='view' module='Setup Hospital Charges'>
                                        <AccordionContent className='py-1'>
                                            <div className="pl-5">
                                                <Link to={{ pathname: '/admin/setup/charges' }} onClick={onNavigate} className='flex hover:bg-slate-100 dark:hover:text-black rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
                                                    <ChevronRight className='h-4 w-4' />Hospital Charges</Link>
                                            </div>
                                        </AccordionContent>
                                    </PermissionProtectedAction>

                                    {/* Setup Operation */}
                                    <PermissionProtectedAction action='view' module='Setup Operation'>
                                        <AccordionContent className='py-1'>
                                            <div className="pl-5">
                                                <Link to={{ pathname: '/admin/setup/operation' }} onClick={onNavigate} className='flex hover:bg-slate-100 dark:hover:text-black rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
                                                    <ChevronRight className='h-4 w-4' />Operation</Link>
                                            </div>
                                        </AccordionContent>
                                    </PermissionProtectedAction>

                                    {/* Setup Finding */}
                                    <PermissionProtectedAction action='view' module='Setup Finding'>
                                        <AccordionContent className='py-1'>
                                            <div className="pl-5">
                                                <Link to={{ pathname: '/admin/setup/finding' }} onClick={onNavigate} className='flex hover:bg-slate-100 dark:hover:text-black rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
                                                    <ChevronRight className='h-4 w-4' />Findings</Link>
                                            </div>
                                        </AccordionContent>
                                    </PermissionProtectedAction>

                                    {/* Setup Pharmacy */}
                                    <PermissionProtectedAction action='view' module='Setup Pharmacy'>
                                        <AccordionContent className='py-1'>
                                            <div className="pl-5">
                                                <Link to={{ pathname: '/admin/setup/pharmacy' }} onClick={onNavigate} className='flex hover:bg-slate-100 dark:hover:text-black rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
                                                    <ChevronRight className='h-4 w-4' />Pharmacy</Link>
                                            </div>
                                        </AccordionContent>
                                    </PermissionProtectedAction>


                                    {/* Setup Vital */}
                                    <PermissionProtectedAction action='view' module='Setup Vital'>
                                        <AccordionContent className='py-1'>
                                            <div className="pl-5">
                                                <Link to={{ pathname: '/admin/setup/vital' }} onClick={onNavigate} className='flex hover:bg-slate-100 dark:hover:text-black rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
                                                    <ChevronRight className='h-4 w-4' />Vital</Link>
                                            </div>
                                        </AccordionContent>
                                    </PermissionProtectedAction>

                                    {/* Setup Event */}
                                    {session.user?.role === 'admin' && (
                                        <AccordionContent className='py-1'>
                                            <div className="pl-5">
                                                <Link to={{ pathname: '/admin/setup/event' }} onClick={onNavigate} className='flex hover:bg-slate-100 dark:hover:text-black rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
                                                    <ChevronRight className='h-4 w-4' />Calendar</Link>
                                            </div>
                                        </AccordionContent>
                                    )}


                                    {/* Setup Radiology */}
                                    <PermissionProtectedAction action='view' module='Setup Radiology'>
                                        <AccordionContent className='py-1'>
                                            <div className="pl-5">
                                                <Link to={{ pathname: '/admin/setup/radiology' }} onClick={onNavigate} className='flex hover:bg-slate-100 dark:hover:text-black rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
                                                    <ChevronRight className='h-4 w-4' />Radiology</Link>
                                            </div>
                                        </AccordionContent>
                                    </PermissionProtectedAction>


                                    {/* Setup Pathology */}
                                    <PermissionProtectedAction action='view' module='Setup Pathology'>
                                        <AccordionContent className='py-1'>
                                            <div className="pl-5">
                                                <Link to={{ pathname: '/admin/setup/pathology' }} onClick={onNavigate} className='flex hover:bg-slate-100 dark:hover:text-black rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
                                                    <ChevronRight className='h-4 w-4' />Pathology</Link>
                                            </div>
                                        </AccordionContent>
                                    </PermissionProtectedAction>


                                    {/* Setup Patient */}
                                    <PermissionProtectedAction action='view' module='Setup Patient'>
                                        <AccordionContent className='py-1'>
                                            <div className="pl-5">
                                                <Link to={{ pathname: '/admin/setup/patient' }} onClick={onNavigate} className='flex hover:bg-slate-100 dark:hover:text-black rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
                                                    <ChevronRight className='h-4 w-4' />Patients</Link>
                                            </div>
                                        </AccordionContent>
                                    </PermissionProtectedAction>

                                    {/* setup bed */}
                                    <PermissionProtectedAction action='view' module='Setup Bed'>
                                        <AccordionContent className='py-1'>
                                            <div className="pl-5">
                                                <Link to={{ pathname: '/admin/setup/bed' }} onClick={onNavigate} className='flex hover:bg-slate-100 dark:hover:text-black rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
                                                    <ChevronRight className='h-4 w-4' />Bed</Link>
                                            </div>
                                        </AccordionContent>
                                    </PermissionProtectedAction>

                                    {/* setup STaff */}
                                    <PermissionProtectedAction action='view' module='Setup Staff'>
                                        <AccordionContent className='py-1'>
                                            <div className="pl-5">
                                                <Link to={{ pathname: '/admin/setupStaff/designation' }} onClick={onNavigate} className='flex hover:bg-slate-100 dark:hover:text-black rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
                                                    <ChevronRight className='h-4 w-4' />Staff</Link>
                                            </div>
                                        </AccordionContent>
                                    </PermissionProtectedAction>

                                    {/* setup Homapage */}
                                    <PermissionProtectedAction action='view' module='Setup Staff'>
                                        <AccordionContent className='py-1'>
                                            <div className="pl-5">
                                                <Link to={{ pathname: '/admin/setup/homepage' }} onClick={onNavigate} className='flex hover:bg-slate-100 dark:hover:text-black rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
                                                    <ChevronRight className='h-4 w-4' />Homepage</Link>
                                            </div>
                                        </AccordionContent>
                                    </PermissionProtectedAction>

                                </AccordionItem>
                            </Accordion>
                        </li>


                    </ul>
                    <div className="h-24 bg-gradient-to-t from-background z-30 w-full absolute bottom-0" />
                </ScrollArea>
                {/* logout button */}
                <div className='absolute bottom-2 z-50 sm:flex gap-2 items-center transition-all flex w-44'>
                    <img src="/user.png" alt="" className="w-9 border-2 border-gray-300 rounded-full" />
                    <Button variant={'destructive'} size='sm' className='flex-1' onClick={() => setAlert(true)}>Logout</Button>
                </div >

            </div >

            {/* Alert model */}

            {
                isAlert && (<AlertModel
                    continue={() => { dispatch(logout()); setAlert(false) }}
                    cancel={() => { setAlert(false) }}
                />)
            }
        </>
    )
}

export default Aside