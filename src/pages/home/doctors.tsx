import CustomPagination from "@/components/customPagination"
import EmptyList from "@/components/emptyList"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { buttonVariants } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { page_limit } from "@/globalData"
import pulicApi from "@/services/public-apis"
import { homepageDoctors } from "@/types/type"
import { Calendar1, Search, Stethoscope } from "lucide-react"
import { parseAsInteger, useQueryState } from "nuqs"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"

const Doctors = () => {

    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
    const [search, setSearch] = useQueryState('search')
    const [searchValue, setSearchValue] = useState('')
    const [doctors, setDoctors] = useState<homepageDoctors>({ data: [], total_pages: 0 })


    const getAllDoctors = async () => {
        try {
            const data = await pulicApi.getDoctors({ page, limit: page_limit, search })
            setDoctors(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }

    useEffect(() => {
        getAllDoctors()
    }, [page, search])


    return (
        <div className="bg-gradient-to-br from-blue-50 dark:from-blue-500/10 dark:to-green-500/10 dark:bg-neutral-900 text-gray-800 dark:text-gray-100">
            <MaxWidthWrapper className="flex flex-col gap-12 pt-12 pb-24 lg:px-10">
                {/* header */}
                <div className="flex gap-2 items-center justify-center">
                    <div className="p-2 rounded-full bg-white/20 dark:bg-white/10 shadow-xl">
                        <Stethoscope className="text-blue-500 w-8 h-8" />
                    </div>
                    <h1 className="text-gray-800 dark:text-neutral-100 text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                        Meet Our Expert Doctors
                    </h1>
                </div>

                {/* Search bar with text */}
                <div className="space-y-2">
                    {/* Search bar */}
                    <div className="rounded-full shadow-xl border dark:border-white/10 bg-white/10 backdrop-blur-sm w-full sm:w-[600px] mx-auto hover:scale-105 transition-all duration-300">
                        <div className="flex items-center p-3 h-16">
                            <input
                                defaultValue={search!}
                                onChange={(e) => { e.target.value.length > 0 ? setSearchValue(e.target.value) : (setSearch(''), setSearchValue('')) }}
                                type="text"
                                placeholder="Type here…"
                                className="w-full bg-transparent rounded-md px-4 py-2   placeholder-gray-400 focus:outline-none"
                            />
                            <div
                                onClick={() => setSearch(searchValue)}
                                className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg cursor-pointer active:scale-95">
                                <Search className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <p className="text-center text-xs text-gray-600 dark:text-neutral-400">DOCTOR NAME , QUALIFICATION , SPECIALIZATION</p>
                </div>


                {/* Doctors list */}
                <div className="flex flex-col min-h-[60vh] gap-5">
                    <div className="flex-1">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-center ">
                            {doctors.data.map((doctor, index) => (
                                <div
                                    className='group relative space-y-4 bg-white h-full dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 p-6 rounded-2xl shadow-sm hover:shadow-xl dark:shadow-black/20 hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300 cursor-pointer backdrop-blur-sm'
                                    key={index}
                                >
                                    {/* Gradient overlay on hover */}
                                    <div className='absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

                                    {/* Doctor Image */}
                                    <div className='relative z-10 flex justify-center'>
                                        <div className='relative'>
                                            <img
                                                src={`${import.meta.env.VITE_APP_API_URL}/images/${doctor.image}`}
                                                alt={`Dr. ${doctor.name}`}
                                                className='object-cover select-none w-32 h-32 rounded-full border-4 border-white dark:border-gray-700 shadow-lg group-hover:scale-110 group-hover:border-blue-300 dark:group-hover:border-blue-500 transition-all duration-300'
                                            />
                                            {/* Status indicator */}
                                            <div className='absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-700 rounded-full shadow-sm'></div>
                                        </div>
                                    </div>

                                    {/* Doctor Info */}
                                    <div className='relative z-10 text-center space-y-3'>
                                        <div>
                                            <h3 className='font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200'>
                                                {doctor.name}
                                            </h3>
                                            <div className='w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                                        </div>

                                        <ScrollArea className='bg-gray-50 dark:bg-gray-700/50 px-4 py-2 rounded-lg h-14 '>
                                            <p className='text-gray-600 dark:text-gray-300 text-sm font-medium'>
                                                {doctor.specialist.map((staff) => (staff.name)).join(', ')}
                                            </p>
                                        </ScrollArea>

                                        {/* Additional info section */}
                                        <div className='flex items-center justify-center space-x-4 text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                            <div className='flex items-center space-x-1'>
                                                <div className='w-2 h-2 bg-yellow-400 rounded-full'></div>
                                                <span>4.8</span>
                                            </div>
                                            <div className='flex items-center space-x-1'>
                                                <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                                                <span>Available</span>
                                            </div>
                                        </div>

                                        {/* experience */}
                                        <div className="flex justify-between">
                                            <div className="py-1 px-3 bg-white/20 dark:bg-white/10 border dark:border-white/10 h-fit text-xs rounded-full shadow-lg">
                                                {doctor.qualification}
                                            </div>
                                            <div className="py-1 px-3 bg-white/20 dark:bg-white/10 border dark:border-white/10 h-fit text-xs rounded-full shadow-lg">
                                                {doctor.work_experience}
                                            </div>
                                        </div>

                                        {/* Book Appointment Button - Only visible on hover */}
                                        <div className="pt-2">
                                            <Link
                                                to={{ pathname: `/home/doctor-appointment`, search: `doctorId=${doctor.id}` }}
                                                className={buttonVariants({ variant: 'default', className: 'w-full' })}
                                            >
                                                <Calendar1 />
                                                Book Appointment
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Empty list */}

                        <EmptyList length={doctors.data.length} message="No doctors found" />
                    </div>


                    {/* Pagination */}
                    <div>
                        <CustomPagination
                            currentPage={page}
                            total_pages={doctors.total_pages}
                            next={setPage}
                            previous={setPage}
                            goTo={setPage}
                        />
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    )
}

export default Doctors