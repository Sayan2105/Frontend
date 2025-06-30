import { chartConfig, incomeExpenseConfig } from '@/chartConfig/chartConfig'
import CustomTooltip from '@/components/customTooltip'
import PermissionProtectedAction from '@/components/permission-protected-actions'
import RectCard from '@/components/rectCard'
import StaffCalendar from '@/components/staffCalendar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AdminDash_MM_IncExp, AdminDashAppmtReport, AdminDashTotalCount, AdminDashVisitors } from '@/types/dashboard/adminDashboard'
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import { Activity, Ambulance, CalendarClock, ClipboardPlus, DollarSign, Droplets, HandCoins, HeartPulse, ListFilter, Package, Pill, Radiation, Search, ShoppingCart, Stethoscope, TestTube2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Area, AreaChart, CartesianGrid, Label, Pie, PieChart, XAxis } from 'recharts'
import { getAdminDash_MM_IncExp, getAdminDashAppointmentReport, getAdminDashIncExp, getAdminDashVisitors } from './apiHandler'
import { Default_MM_Inc_Exp_Data } from './defaultChartdata'


type SearchParams = {
    year?: number
    month?: string
    date?: string
}


const AdminDashboard = () => {


    // Api states
    const [total, setTotalCount] = useState<AdminDashTotalCount>()
    const [MonthlyIncExp, setMonthlyIncExp] = useState<AdminDash_MM_IncExp[]>([])
    const [visitors, setVisitors] = useState<AdminDashVisitors[]>([])
    const [appmtReport, setAppmtReport] = useState<AdminDashAppmtReport>()
    const [searchIEby, setSearchIEby] = useState<'date' | 'year' | 'month'>('year')
    const [searchAPNTby, setSearchAPNTby] = useState<'date' | 'year' | 'month'>('year')
    const [searchVTby, setSearchVTby] = useState<'date' | 'year' | 'month'>('year')


    const fetchAdminDashStats = async () => {
        try {
            const [total, monthly_inc_exp, visitors, appmtReport] = await Promise.all([
                getAdminDashIncExp(),
                getAdminDash_MM_IncExp(),
                getAdminDashVisitors(), // start woking from here
                getAdminDashAppointmentReport()
            ])
            // states
            setTotalCount(total)
            setMonthlyIncExp(monthly_inc_exp)
            setVisitors(visitors)
            setAppmtReport(appmtReport)

        } catch ({ message }: any) {
            toast.error(message)
        }
    }



    const onIESearch = async ({ date, month, year }: SearchParams) => {
        try {
            const data = await getAdminDash_MM_IncExp({ year, month, date })
            setMonthlyIncExp(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }

    const onAppointmentSearch = async ({ date, month, year }: SearchParams) => {
        try {
            const data = await getAdminDashAppointmentReport({ year, month, date })
            setAppmtReport(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const onVisitSearch = async ({ date, month, year }: SearchParams) => {
        try {
            const data = await getAdminDashVisitors({ year, month, date })
            setVisitors(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    useEffect(() => {
        fetchAdminDashStats()
    }, [])

    return (

        <div className='pt-4 pb-20 px-2.5'>

            {/* Charts section */}

            <div className='mb-14'>

                <div className="grid lg:grid-cols-3 gap-3">
                    {/* Montly Income & expenses Chart */}
                    <PermissionProtectedAction action='Income Expenses' module='dashboard'>
                        <Card className="w-full h-[400px] lg:h-[450px]">
                            <CardHeader>
                                <div className="flex justify-between items-center mb-2">
                                    <p className='text-gray-500'>Search</p>
                                    <div className="flex w-56 gap-2">
                                        {/* dropdown menu */}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <CustomTooltip message="Search by">
                                                    <div className='p-2 bg-rose-100 dark:bg-rose-500/10 rounded-full'>
                                                        <ListFilter className='w-5 h-5 text-rose-600' />
                                                    </div>
                                                </CustomTooltip>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align='end'>
                                                <DropdownMenuItem onSelect={() => setSearchIEby('date')}>Date</DropdownMenuItem>
                                                <DropdownMenuItem onSelect={() => setSearchIEby('year')}>Year</DropdownMenuItem>
                                                <DropdownMenuItem onSelect={() => setSearchIEby('month')}>Month</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                        {/* search types input */}
                                        {searchIEby === 'year' &&
                                            <Select onValueChange={(v) => onIESearch({ month: v })}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Year" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value={String(new Date().getFullYear())}>{new Date().getFullYear()}</SelectItem>
                                                    <SelectItem value={String(new Date().getFullYear() - 1)}>{new Date().getFullYear() - 1}</SelectItem>
                                                    <SelectItem value={String(new Date().getFullYear() - 2)}>{new Date().getFullYear() - 2}</SelectItem>
                                                    <SelectItem value={String(new Date().getFullYear() - 3)}>{new Date().getFullYear() - 3}</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        }

                                        {searchIEby === 'month' &&
                                            <Input
                                                type='month'
                                                onChange={(e) => onIESearch({ month: e.target.value })}
                                            />
                                        }

                                        {searchIEby === 'date' &&
                                            <Input
                                                type='date'
                                                onChange={(e) => onIESearch({ date: e.target.value })}
                                            />
                                        }

                                    </div>
                                </div>

                                <CardTitle>Income & Expense</CardTitle>
                                <CardDescription>
                                    Showing total Income & Expenses based on the search
                                </CardDescription>
                            </CardHeader>
                            <CardContent className='flex-1'>
                                <ChartContainer config={incomeExpenseConfig}>
                                    <AreaChart
                                        accessibilityLayer
                                        data={MonthlyIncExp.length > 1 ? MonthlyIncExp : Default_MM_Inc_Exp_Data}
                                        margin={{
                                            left: 12,
                                            right: 12,
                                        }}
                                    >
                                        <CartesianGrid
                                            vertical
                                            strokeDasharray="5 5" // Optional: Customize dash pattern
                                        />
                                        <XAxis
                                            dataKey="month"
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={8}
                                            tickFormatter={(value: string) => value.slice(0, 3)}
                                        />
                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent indicator="dot" />}
                                        />
                                        <Area
                                            dataKey="Expenses"
                                            type="natural"
                                            fill="var(--color-mobile)"
                                            fillOpacity={0.4}
                                            stroke="var(--color-mobile)"
                                            stackId="a"
                                        />
                                        <Area
                                            dataKey="Income"
                                            type="natural"
                                            fill="var(--color-desktop)"
                                            fillOpacity={0.4}
                                            stroke="var(--color-desktop)"
                                            stackId="a"
                                        />
                                    </AreaChart>
                                </ChartContainer>
                                {MonthlyIncExp.length < 1 && <p className='text-red-600 italic'>No data found</p>}
                            </CardContent>
                        </Card>
                    </PermissionProtectedAction>


                    {/* pie chart 1 */}

                    <PermissionProtectedAction action='Appointments' module='dashboard'>
                        <Card className="flex flex-col w-full h-[400px] lg:h-[450px]">
                            <CardHeader>
                                <div className="flex justify-between items-center mb-2">
                                    <p className='text-gray-500'>Search</p>
                                    <div className="flex w-56 gap-2">
                                        {/* dropdown menu */}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <CustomTooltip message="Search by">
                                                    <div className='p-2 bg-rose-100 dark:bg-rose-500/10 rounded-full'>
                                                        <ListFilter className='w-5 h-5 text-rose-600' />
                                                    </div>
                                                </CustomTooltip>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align='end'>
                                                <DropdownMenuItem onSelect={() => setSearchAPNTby('date')}>Date</DropdownMenuItem>
                                                <DropdownMenuItem onSelect={() => setSearchAPNTby('year')}>Year</DropdownMenuItem>
                                                <DropdownMenuItem onSelect={() => setSearchAPNTby('month')}>Month</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                        {/* search types input */}
                                        {searchAPNTby === 'year' &&
                                            <Select onValueChange={(v) => onAppointmentSearch({ year: Number(v) })}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Year" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value={String(new Date().getFullYear())}>{new Date().getFullYear()}</SelectItem>
                                                    <SelectItem value={String(new Date().getFullYear() - 1)}>{new Date().getFullYear() - 1}</SelectItem>
                                                    <SelectItem value={String(new Date().getFullYear() - 2)}>{new Date().getFullYear() - 2}</SelectItem>
                                                    <SelectItem value={String(new Date().getFullYear() - 3)}>{new Date().getFullYear() - 3}</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        }

                                        {searchAPNTby === 'month' &&
                                            <Input type='month' onChange={(e) => onAppointmentSearch({ month: e.target.value })} />
                                        }

                                        {searchAPNTby === 'date' &&
                                            <Input type='date' onChange={(e) => onAppointmentSearch({ date: e.target.value })} />
                                        }

                                    </div>
                                </div>

                                <CardTitle>Appointments Status</CardTitle>
                                <CardDescription>Showing total Appointments based on the search</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 pb-0">
                                <ChartContainer
                                    config={chartConfig}
                                    className="mx-auto aspect-square max-h-[250px]"
                                >
                                    <PieChart>
                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent hideLabel />}
                                        />
                                        <Pie
                                            data={appmtReport?.status}
                                            dataKey="count"
                                            nameKey="status"
                                            innerRadius={60}
                                            strokeWidth={5}
                                        >
                                            <Label
                                                content={({ viewBox }) => {
                                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                        return (
                                                            <text
                                                                x={viewBox.cx}
                                                                y={viewBox.cy}
                                                                textAnchor="middle"
                                                                dominantBaseline="middle"
                                                            >
                                                                <tspan
                                                                    x={viewBox.cx}
                                                                    y={viewBox.cy}
                                                                    className="fill-foreground text-3xl font-bold"
                                                                >
                                                                    {appmtReport?.totalAppmts?.toLocaleString()}
                                                                </tspan>
                                                                <tspan
                                                                    x={viewBox.cx}
                                                                    y={(viewBox.cy || 0) + 24}
                                                                    className="fill-muted-foreground"
                                                                >
                                                                    Appointments
                                                                </tspan>
                                                            </text>
                                                        )
                                                    }
                                                }}
                                            />
                                        </Pie>
                                    </PieChart>
                                </ChartContainer>
                            </CardContent>
                            <CardFooter>
                                <div className="flex gap-2 font-medium leading-none">
                                    {appmtReport?.status.length! < 1 && <div className="flex items-center space-x-2 leading-none text-red-600">
                                        <p>No data found</p> <Search className='h-4 w-4' />
                                    </div>}
                                </div>
                            </CardFooter>
                        </Card>
                    </PermissionProtectedAction>



                    {/* numbers of services */}

                    <PermissionProtectedAction action='Visitors' module='dashboard'>
                            <Card className="flex flex-col h-[400px] lg:h-[450px]">
                                <CardHeader>
                                    <div className="flex justify-between items-center mb-2">
                                        <p className='text-gray-500'>Search</p>
                                        <div className="flex w-56 gap-2">
                                            {/* dropdown menu */}
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <CustomTooltip message="Search by">
                                                        <div className='p-2 bg-rose-100 dark:bg-rose-500/10 rounded-full'>
                                                            <ListFilter className='w-5 h-5 text-rose-600' />
                                                        </div>
                                                    </CustomTooltip>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align='end'>
                                                    <DropdownMenuItem onSelect={() => setSearchVTby('date')}>Date</DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => setSearchVTby('year')}>Year</DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => setSearchVTby('month')}>Month</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>

                                            {/* search types input */}
                                            {searchVTby === 'year' &&
                                                <Select onValueChange={(v) => onVisitSearch({ year: Number(v) })}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Year" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value={String(new Date().getFullYear())}>{new Date().getFullYear()}</SelectItem>
                                                        <SelectItem value={String(new Date().getFullYear() - 1)}>{new Date().getFullYear() - 1}</SelectItem>
                                                        <SelectItem value={String(new Date().getFullYear() - 2)}>{new Date().getFullYear() - 2}</SelectItem>
                                                        <SelectItem value={String(new Date().getFullYear() - 3)}>{new Date().getFullYear() - 3}</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            }

                                            {searchVTby === 'month' &&
                                                <Input type='month' onChange={(e) => onVisitSearch({ month: e.target.value })} />
                                            }

                                            {searchVTby === 'date' &&
                                                <Input type='date' onChange={(e) => onVisitSearch({ date: e.target.value })} />
                                            }

                                        </div>
                                    </div>

                                    <CardTitle>Visitors Status</CardTitle>
                                    <CardDescription>Showing total Visitors based on the search</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1 pb-0">
                                    <ChartContainer
                                        config={chartConfig}
                                        className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
                                    >
                                        <PieChart>
                                            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                                            <Pie data={visitors} dataKey="visitors" label nameKey="browser" />
                                        </PieChart>
                                    </ChartContainer>
                                </CardContent>

                            </Card>
                    </PermissionProtectedAction>
                </div>
            </div>

            {/* total income section */}

            <div className='grid lg:grid-cols-4 sm:grid-cols-2 gap-4 mb-14'>

                {/* opd income */}
                <PermissionProtectedAction action='Opd Income' module='dashboard'>
                    <RectCard name='OPD Income' path={'/opd'} amount={total?.opdIncome ?? 0} iconBg='bg-red-100 dark:bg-red-500/10'>
                        <HeartPulse className='h-7 w-7 text-red-500' />
                    </RectCard>
                </PermissionProtectedAction>

                {/* opds */}
                <PermissionProtectedAction action='Opds' module='dashboard'>
                    <RectCard name='Total OPD' path={'/opd'} visits={total?.opds ?? 0} iconBg='bg-amber-100 dark:bg-amber-500/10'>
                        <Activity className='h-7 w-7 text-amber-500' />
                    </RectCard>
                </PermissionProtectedAction>

                {/* Ipd income */}
                <PermissionProtectedAction action='Ipd Income' module='dashboard'>
                    <RectCard name='Ipd Income' path={'/ipd'} amount={total?.ipdIncome ?? 0} iconBg='bg-rose-100 dark:bg-rose-700/10'>
                        <Stethoscope className='h-7 w-7 text-rose-700' />
                    </RectCard>
                </PermissionProtectedAction>

                {/* ipds */}
                <PermissionProtectedAction action='Opds' module='dashboard'>
                    <RectCard name='Total IPD' path={'/ipd'} visits={total?.ipds ?? 0} iconBg='bg-green-100 dark:bg-green-700/10'>
                        <ClipboardPlus className='h-7 w-7 text-green-700' />
                    </RectCard>
                </PermissionProtectedAction>

                {/* appmnt income */}
                <PermissionProtectedAction action='Appmnt Income' module='dashboard'>
                    <RectCard name='Appointment Income' path={'/appointment'} amount={total?.appointmentIncome ?? 0} iconBg='bg-slate-100 dark:bg-slate-700/10'>
                        <CalendarClock className='h-7 w-7 text-slate-500' />
                    </RectCard>
                </PermissionProtectedAction>

                {/* pharmacy income */}
                <PermissionProtectedAction action='Pharmacy Income' module='dashboard'>
                    <RectCard name='Pharmacy Income' path={'/pharmacy'} amount={total?.pharmacyIncome ?? 0} iconBg='bg-green-100 dark:bg-green-700/10'>
                        <Pill className='h-7 w-7 text-green-500' />
                    </RectCard>
                </PermissionProtectedAction>

                {/* medicines */}
                <PermissionProtectedAction action='Medicines' module='dashboard'>
                    <RectCard name='Total Medicines' path={'/pharmacy/medicines'} visits={total?.medicines ?? 0} iconBg='bg-teal-100 dark:bg-teal-700/10'>
                        <Package className='h-7 w-7 text-teal-500' />
                    </RectCard>
                </PermissionProtectedAction>

                {/* pharmacy expenses */}
                <PermissionProtectedAction action='Pharmacy Expenses' module='dashboard'>
                    <RectCard name='Pharmacy Expenses' path={'/pharmacy'} amount={total?.pharmacyExpenses ?? 0} iconBg='bg-yellow-100 dark:bg-yellow-700/10'>
                        <HandCoins className='h-7 w-7 text-yellow-500' />
                    </RectCard>
                </PermissionProtectedAction>

                {/* medicine purchases */}
                <PermissionProtectedAction action='Medicine Purchases' module='dashboard'>
                    <RectCard name='Medicine Purchases' path={'/pharmacy/medicines'} visits={total?.purchases ?? 0} iconBg='bg-violet-100 dark:bg-violet-700/10'>
                        <ShoppingCart className='h-7 w-7 text-violet-500' />
                    </RectCard>
                </PermissionProtectedAction>

                {/* radiology income */}
                <PermissionProtectedAction action='Radiology Income' module='dashboard'>
                    <RectCard name='Radiology Income' path={'/radiology'} amount={total?.radiologyIncome ?? 0} iconBg='bg-yellow-100 dark:bg-yellow-700/10'>
                        <Radiation className='h-7 w-7 text-yellow-500' />
                    </RectCard>
                </PermissionProtectedAction>


                {/* pathology income */}
                <PermissionProtectedAction action='Pathology Income' module='dashboard'>
                    <RectCard name='Pathology Income' path={'/pathology'} amount={total?.pathologyIncome ?? 0} iconBg='bg-gray-100 dark:bg-gray-700/10'>
                        <TestTube2 className='h-7 w-7 text-gray-500' />
                    </RectCard>
                </PermissionProtectedAction>


                {/* Amnulance Imcome */}
                <PermissionProtectedAction action='Ambulance Income' module='dashboard'>
                    <RectCard name='Ambulance Income' path={'/ambulance'} amount={total?.ambulanceIncome ?? 0} iconBg='bg-orange-100 dark:bg-orange-700/10'>
                        <Ambulance className='h-7 w-7 text-orange-500' />
                    </RectCard>
                </PermissionProtectedAction>

                {/* Blood Income */}
                <PermissionProtectedAction action='Blood Bank Income' module='dashboard'>
                    <RectCard name='Blood Bank Income' path={'/blood-bank/issue-blood'} amount={total?.bloodBankIncome ?? 0} iconBg='bg-red-100 dark:bg-red-700/10'>
                        <Droplets className='h-7 w-7 text-red-600' />
                    </RectCard>
                </PermissionProtectedAction>

                {/* expenses */}
                <PermissionProtectedAction action='Expenses' module='dashboard'>
                    <RectCard name='Expenses' path={''} amount={total?.expenses! ?? 0} iconBg='bg-pink-100 dark:bg-pink-700/10'>
                        <DollarSign className='h-7 w-7 text-pink-500' />
                    </RectCard>
                </PermissionProtectedAction>

            </div>

            {/* Calendar */}

            <StaffCalendar />

        </div>
    )
}

export default AdminDashboard