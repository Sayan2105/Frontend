import { AuthContext } from "@/contexts/authContext"
import { Airplay, Ambulance, BriefcaseMedical, Calendar, CalendarCheck2, CalendarClock, ChevronRight, Droplets, Home, Hospital, LinkIcon, Radiation, Send, Settings, Stethoscope, TestTube, UserRound, Watch } from "lucide-react"
import { useContext } from "react"
import { useLocation } from "react-router-dom"

const quickLinks = ['/home/about', '/home/annual-calendar', '/home/event']

const useNavigation = () => {

    const path = useLocation().pathname
    const { authUser } = useContext(AuthContext)

    const Routes = (authUser?.role === 'patient') ? authUser?.role : 'admin'

    const HomepageNavigations = [
        {
            name: 'Home',
            href: '/',
            icon: Home,
            active: path === '/'
        },
        {
            name: 'Book Appointment',
            href: '/home/available-doctors',
            icon: Stethoscope,
            active: path.startsWith('/home/available-doctors')
        },
        {
            name: 'Contact',
            href: '/home/contact',
            icon: Send,
            active: path === '/home/contact'
        },
        {
            name: 'Quick Links',
            href: '/home/quick-links',
            icon: LinkIcon,
            active: quickLinks.includes(path),
            children: [
                {
                    name: 'About Hospital',
                    href: '/home/about',
                    icon: Hospital,
                    active: path === '/home/about'
                },
                {
                    name: 'Annual Calendar',
                    href: '/home/annual-calendar',
                    icon: Calendar,
                    active: path === '/home/annual-calendar'
                },
                {
                    name: 'Event',
                    href: '/home/event',
                    icon: CalendarCheck2,
                    active: path === '/home/event'
                },
            ]
        }
    ]


    const SidebarNavigations = [
        {
            name: 'Dashboard',
            href: `/${Routes}/dashboard`,
            icon: Airplay,
            active: path === `/${Routes}/dashboard`
        },
        {
            name: 'Appointment',
            href: `/appointment`,
            icon: CalendarClock,
            active: path.startsWith(`/appointment`),
            permission: { action: 'view', module: 'Appointment' }
        },
        {
            name: 'OPD - Out Patient',
            href: `/opd`,
            icon: Airplay,
            active: path.startsWith(`/opd`),
            permission: { action: 'view', module: 'Opd' }
        },
        {
            name: 'IPD - In Patient',
            href: `/ipd`,
            icon: Stethoscope,
            active: path.startsWith(`/ipd`),
            permission: { action: 'view', module: 'Ipd' }
        },
        {
            name: 'Pharmacy',
            href: `/pharmacy`,
            icon: BriefcaseMedical,
            active: path.startsWith(`/pharmacy`),
            permission: { action: 'view', module: 'Pharmacy Bill' }
        },
        {
            name: 'Radiology',
            href: `/radiology`,
            icon: Radiation,
            active: path === `/radiology`,
            permission: { action: 'view', module: 'Radiology Bill' }
        },
        {
            name: 'Pathology',
            href: `/pathology`,
            icon: TestTube,
            active: path === `/pathology`,
            permission: { action: 'view', module: 'Pathology Bill' }
        },
        {
            name: 'Ambulance',
            href: `/ambulance`,
            icon: Ambulance,
            active: path.startsWith(`/ambulance`),
            permission: { action: 'view', module: 'Assign Ambulance' }
        },
        {
            name: 'Blood Bank',
            href: `/blood-bank/issue-blood`,
            icon: Droplets,
            active: path.startsWith(`/blood-bank`),
            permission: { action: 'view', module: 'Issue Blood' }
        },
        {
            name: 'Staff',
            href: '/staff',
            icon: UserRound,
            active: path.startsWith(`/staff`),
            permission: { action: 'view', module: 'Human Resource' }
        },
        {
            name: 'Duty Roster',
            href: '/roster_report',
            icon: Watch,
            active: path === '/roster_report',
            permission: { action: 'view', module: 'Duty Roster' }
        },
        {
            name: 'Setup',
            icon: Settings,
            active: path.startsWith('/admin/setup'),
            permission: { action: 'view', module: 'Setup' },
            children: [
                {
                    name: 'Authorization',
                    href: '/admin/setup/authorization',
                    icon: ChevronRight,
                    active: path.startsWith(`/admin/setup/authorization`),
                    isAdmin: authUser?.role === 'admin'
                },
                {
                    name: 'Hospital Charges',
                    href: '/admin/setup/charges',
                    icon: ChevronRight,
                    active: path.startsWith(`/admin/setup/charges`),
                    permission: { action: 'view', module: 'Setup Hospital Charges' }
                },
                {
                    name: 'Operation',
                    href: '/admin/setup/operation',
                    icon: ChevronRight,
                    active: path.startsWith(`/admin/setup/operation`),
                    permission: { action: 'view', module: 'Setup Operation' }
                },
                {
                    name: 'Findings',
                    href: '/admin/setup/finding',
                    icon: ChevronRight,
                    active: path.startsWith(`/admin/setup/finding`),
                    permission: { action: 'view', module: 'Setup Finding' }
                },
                {
                    name: 'Pharmacy',
                    href: '/admin/setup/pharmacy',
                    icon: ChevronRight,
                    active: path.startsWith(`/admin/setup/pharmacy`),
                    permission: { action: 'view', module: 'Setup Pharmacy' }
                },
                {
                    name: 'Vital',
                    href: '/admin/setup/vital',
                    icon: ChevronRight,
                    active: path === '/admin/setup/vital',
                    permission: { action: 'view', module: 'Setup Vital' }
                },
                {
                    name: 'Calendar',
                    href: '/admin/setup/event',
                    icon: ChevronRight,
                    active: path === '/admin/setup/event',
                    isAdmin: authUser?.role === 'admin'
                },
                {
                    name: 'Radiology',
                    href: '/admin/setup/radiology',
                    icon: ChevronRight,
                    active: path.startsWith(`/admin/setup/radiology`),
                    permission: { action: 'view', module: 'Setup Radiology' }
                },
                {
                    name: 'Pathology',
                    href: '/admin/setup/pathology',
                    icon: ChevronRight,
                    active: path.startsWith(`/admin/setup/pathology`),
                    permission: { action: 'view', module: 'Setup Pathology' }
                },
                {
                    name: 'Patients',
                    href: '/admin/setup/patient',
                    icon: ChevronRight,
                    active: path === '/admin/setup/patient',
                    permission: { action: 'view', module: 'Setup Patient' }
                },
                {
                    name: 'Bed',
                    href: '/admin/setup/bed',
                    icon: ChevronRight,
                    active: path.startsWith(`/admin/setup/bed`),
                    permission: { action: 'view', module: 'Setup Bed' }
                },
                {
                    name: 'Staff',
                    href: '/admin/setupStaff/designation',
                    icon: ChevronRight,
                    active: path.startsWith(`/admin/setupStaff`),
                    permission: { action: 'view', module: 'Setup Staff' }
                },
                {
                    name: 'Homepage',
                    href: '/admin/setup/homepage',
                    icon: ChevronRight,
                    active: path.startsWith(`/admin/setup/homepage`),
                    permission: { action: 'view', module: 'Setup Homepage' }
                },
            ]
        },

    ]

    return {
        HomepageNavigations,
        SidebarNavigations
    }
}

export default useNavigation