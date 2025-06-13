import { chartConfig, patientChartConfig } from "@/chartConfig/chartConfig"
import CustomTooltip from "@/components/customTooltip"
import RectCard from "@/components/rectCard"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AppointmentReportType, ExpenseReportType, Expenses, PatientDashTotalCount } from "@/types/dashboard/patientDashboard"
import { Ambulance, CalendarClock, Component, Droplets, HandCoins, HeartPulse, ListFilter, Pill, Radiation, Search, Stethoscope, TestTube } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Bar, BarChart, CartesianGrid, Label, LabelList, Pie, PieChart, XAxis } from "recharts"
import { getApppointmentStatusCount, getPatientDashTotalCount, getPatientExpenseReport, getPatientTotalExpenses } from "./ApiHandlers"


type SearchParams = {
    year?: number
    month?: string
    date?: string
}


const PatientDashboard = () => {

    // api states
    const [totalCount, setTotalCount] = useState<PatientDashTotalCount | null>(null)
    const [expReport, setExpenseReport] = useState<ExpenseReportType[]>([])
    const [appmtReport, setAppmtReport] = useState<AppointmentReportType>()
    const [exp, setExpenses] = useState<Expenses>()
    const [seachERby, setSearchERby] = useState<'date' | 'year' | 'month'>('year')
    const [searchAPNTby, setSearchAPNTby] = useState<'date' | 'year' | 'month'>('year')


    const fetchDashboardData = async () => {
        try {
            // calling apis
            const [totalCount, expReport, statusCount, expns] = await Promise.all([
                getPatientDashTotalCount(),
                getPatientExpenseReport(),
                getApppointmentStatusCount(),
                getPatientTotalExpenses(),
            ])


            // changing states
            setTotalCount(totalCount)
            setExpenseReport(expReport)
            setAppmtReport(statusCount)
            setExpenses(expns)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const onExpenseReportSearch = async ({ date, month, year }: SearchParams) => {
        try {
            const data = await getPatientExpenseReport({ year, month, date })
            setExpenseReport(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }

    const onAppointmentSearch = async ({ date, month, year }: SearchParams) => {
        try {
            const data = await getApppointmentStatusCount({ year, month, date })
            setAppmtReport(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    useEffect(() => {
        fetchDashboardData()
    }, [])




    return (
        <section className="flex flex-col space-y-16 mt-4 mb-24">
            <div className='grid lg:grid-cols-4 sm:grid-cols-2 gap-4'>

                {/* Total Visits */}
                <RectCard name='OPD' path={'/opd'} visits={totalCount?.opds}>
                    <HeartPulse className='h-8 w-8 text-red-500' />
                </RectCard>

                <RectCard name='IPD' path={'/ipd'} visits={totalCount?.ipds}>
                    <Stethoscope className='h-8 w-8 text-pink-700' />
                </RectCard>

                <RectCard name='Appointment' path={'/appointment'} visits={totalCount?.appointments} >
                    <CalendarClock className='h-8 w-8 text-slate-500' />
                </RectCard>

                <RectCard name='Pharmacy' path={'/pharmacy'} visits={totalCount?.pharmacies}>
                    <Pill className='h-8 w-8 text-green-500' />
                </RectCard>

                <RectCard name='Radiology' path={'/radiology'} visits={totalCount?.radiology}>
                    <Radiation className='h-8 w-8 text-yellow-500' />
                </RectCard>

                <RectCard name='Pathology' path={'/pathology'} visits={totalCount?.pathology}>
                    <TestTube className='h-8 w-8 text-orange-500' />
                </RectCard>

                <RectCard name='Blood' path={'/blood-bank/issue-blood'} visits={totalCount?.issueBlood}>
                    <Droplets className='h-8 w-8 text-red-600' />
                </RectCard>

                <RectCard name='Blood Component' path={'/blood-bank/components/issue-components'} visits={totalCount?.issueBloodComponent}>
                    <Component className='h-8 w-8 text-teal-600' />
                </RectCard>

                <RectCard name='Ambulance' path={'/ambulance'} visits={totalCount?.ambulance}>
                    <Ambulance className='h-8 w-8 text-violet-600' />
                </RectCard>

                <RectCard name='Expenses' path={''} amount={exp?.expenses}>
                    <HandCoins className='h-8 w-8 text-rose-500' />
                </RectCard>

            </div>




            <div className="grid lg:grid-cols-2 gap-5 items-center">
                {/* area chart */}

                <Card>
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
                                        <DropdownMenuItem onSelect={() => setSearchERby('date')}>Date</DropdownMenuItem>
                                        <DropdownMenuItem onSelect={() => setSearchERby('year')}>Year</DropdownMenuItem>
                                        <DropdownMenuItem onSelect={() => setSearchERby('month')}>Month</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                {/* search types input */}
                                {seachERby === 'year' &&
                                    <Select onValueChange={(v) => onExpenseReportSearch({ year: Number(v) })}>
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

                                {seachERby === 'month' &&
                                    <Input type='month' onChange={(e) => onExpenseReportSearch({ month: e.target.value })} />
                                }

                                {seachERby === 'date' &&
                                    <Input type='date' onChange={(e) => onExpenseReportSearch({ date: e.target.value })} />
                                }

                            </div>
                        </div>

                        <CardTitle>Expense</CardTitle>
                        <CardDescription>
                            Showing total Expenses based on the search
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={patientChartConfig}>
                            <BarChart
                                accessibilityLayer
                                data={expReport}
                                margin={{
                                    top: 20,
                                }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Bar dataKey="Expense" fill="var(--color-desktop)" radius={8}>
                                    <LabelList
                                        position="top"
                                        offset={12}
                                        className="fill-foreground"
                                        fontSize={12}
                                    />
                                </Bar>
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-2 text-sm">
                        <div className="flex gap-2 font-medium leading-none">
                            {expReport.length < 1 && <div className="flex items-center space-x-2 leading-none text-red-600">
                                <p>No data found</p> <Search className='h-4 w-4' />
                            </div>}
                        </div>

                    </CardFooter>
                </Card>



                {/* pie chart */}

                <Card className="flex flex-col w-full xl:w-[400px] mx-auto">
                    <CardHeader>
                        <div className="flex justify-between  items-center mb-2">
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

                        <CardTitle>Appointment Report</CardTitle>
                        <CardDescription>
                            Showing Appointments based on the search
                        </CardDescription>
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
                                    data={appmtReport?.appointments}
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
                                                            {appmtReport?.total.toLocaleString()}
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
                    <CardFooter className="flex-col gap-2 text-sm">
                        <div className="flex gap-2 font-medium leading-none">
                            {appmtReport?.appointments?.length! < 1 && <div className="flex items-center space-x-2 leading-none text-red-600">
                                <p>No data found</p> <Search className='h-4 w-4' />
                            </div>}
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </section>
    )
}

export default PatientDashboard