import CustomPagination from "@/components/customPagination"
import ErrorFallback from "@/components/errorFallback"
import InlineLoader from "@/components/inline-loader"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import useOpdRoster from "@/hooks/useRoster"
import { Calendar1, Search, Star, Clock, Award } from "lucide-react"
import { Link } from "react-router-dom"


const AvailableDoctors = () => {

    const { doctors, isLoadingDoctors, isError, error, onSearch, page, setPage, search } = useOpdRoster({ isEnabled: true })

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-2.5">
            <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-indigo-600/90"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>

                    <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6">
                        <div className="space-y-3">
                            <CardTitle className='font-bold tracking-tight text-2xl flex items-center gap-3'>
                                <div className="p-2 bg-white/20 rounded-xl">
                                    <Calendar1 className="h-6 w-6" />
                                </div>
                                Available Doctors
                            </CardTitle>
                            <CardDescription className="text-blue-100 text-base">
                                Find and book appointments with our qualified healthcare professionals
                            </CardDescription>
                        </div>
                        <div className="md:w-80">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 z-10" />
                                <Input
                                    type='text'
                                    placeholder='Search doctors...'
                                    defaultValue={search!}
                                    onChange={(e) => onSearch(e.target.value)}
                                    className="pl-10 bg-white dark:bg-gray-800 backdrop-blur-sm border-white/30 dark:border-gray-600 focus:border-white/60 dark:focus:border-gray-500 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                />
                            </div>
                            <p className="text-xs text-blue-200 mt-2 text-center">
                                Search by name, specialty, qualification, or experience
                            </p>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-5">
                    {isLoadingDoctors ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <InlineLoader />
                            <p className="text-gray-600 dark:text-gray-400 mt-4">Loading our amazing doctors...</p>
                        </div>
                    ) : isError ? (
                        <ErrorFallback error={error!} />
                    ) : (
                        <div className="flex flex-col gap-20">
                            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                                {doctors?.data?.map((item, index) => (
                                    <div
                                        className='group relative bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden'
                                        key={index}
                                    >
                                        {/* Premium gradient overlay */}
                                        <div className='absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

                                        {/* Top accent bar */}
                                        <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>

                                        <div className="p-8 space-y-6">
                                            {/* Doctor Image Section */}
                                            <div className='relative flex justify-center'>
                                                <div className='relative'>
                                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                                                    <img
                                                        src={`${import.meta.env.VITE_APP_API_URL}/images/${item.staff.image}`}
                                                        alt={`Dr. ${item.staff.name}`}
                                                        className='relative object-cover select-none w-28 h-28 rounded-full border-4 border-white dark:border-gray-700 shadow-xl group-hover:scale-105 transition-transform duration-500'
                                                    />
                                                    {/* Status indicator with pulse */}
                                                    <div className='absolute bottom-1 right-1'>
                                                        <div className='w-5 h-5 bg-green-500 border-3 border-white dark:border-gray-700 rounded-full shadow-lg'>
                                                            <div className='absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75'></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Doctor Info */}
                                            <div className='relative z-10 text-center space-y-4'>
                                                <div>
                                                    <h3 className='font-bold text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 mb-2'>
                                                        Dr. {item.staff.name}
                                                    </h3>
                                                    <div className='w-16 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto opacity-60 group-hover:opacity-100 group-hover:w-24 transition-all duration-500'></div>
                                                </div>

                                                {/* Specialties with better styling */}
                                                <ScrollArea className='bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 px-4 py-3 rounded-xl h-16 border border-gray-100 dark:border-gray-600'>
                                                    <p className='text-gray-700 dark:text-gray-200 text-sm font-medium leading-relaxed'>
                                                        {item.staff.specialist.map((staff) => (staff.name)).join(', ')}
                                                    </p>
                                                </ScrollArea>

                                                {/* Rating and status indicators */}
                                                <div className='flex items-center justify-center space-x-6 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                                                    <div className='flex items-center space-x-1 text-amber-600'>
                                                        <Star className="h-4 w-4 fill-current" />
                                                        <span className="font-semibold">4.8</span>
                                                    </div>
                                                    <div className='flex items-center space-x-1 text-green-600'>
                                                        <Clock className="h-4 w-4" />
                                                        <span className="font-medium">Available</span>
                                                    </div>
                                                </div>

                                                {/* Credentials with icons */}
                                                <div className="flex justify-between gap-3">
                                                    <div className="flex items-center gap-2 py-2 px-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200 dark:border-blue-700 rounded-xl text-xs font-medium text-blue-800 dark:text-blue-200 shadow-sm">
                                                        <Award className="h-3 w-3" />
                                                        {item.staff.qualification}
                                                    </div>
                                                    <div className="flex items-center gap-2 py-2 px-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 border border-emerald-200 dark:border-emerald-700 rounded-xl text-xs font-medium text-emerald-800 dark:text-emerald-200 shadow-sm">
                                                        <Clock className="h-3 w-3" />
                                                        {item.staff.work_experience}
                                                    </div>
                                                </div>

                                                {/* Enhanced CTA Button */}
                                                <div className="pt-4">
                                                    <Link
                                                        to={{ pathname: `book-appointment/${item.id}` }}
                                                        className={buttonVariants({
                                                            variant: 'default',
                                                            className: 'w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105'
                                                        })}
                                                    >
                                                        <Calendar1 className="mr-2 h-4 w-4" />
                                                        Book Appointment
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Enhanced Pagination */}
                            {doctors?.data?.length! > 0 && (
                                <div className="flex justify-center">
                                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-2">
                                        <CustomPagination
                                            currentPage={page}
                                            total_pages={doctors?.total_pages!}
                                            previous={(p) => setPage(p)}
                                            goTo={(p) => setPage(p)}
                                            next={(p) => setPage(p)}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Enhanced Empty State */}
                            {doctors?.data?.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-24">
                                    <div className="relative">
                                        <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center shadow-lg">
                                            <span className="text-6xl">🔍</span>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-indigo-100/50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full animate-pulse"></div>
                                    </div>
                                    <div className="text-center mt-8 space-y-4">
                                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                                            No doctors found
                                        </h2>
                                        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
                                            We couldn't find any doctors matching your search criteria.
                                            Try adjusting your search terms or check back later.
                                        </p>
                                        <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-medium mt-6">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                            New doctors are added regularly
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default AvailableDoctors