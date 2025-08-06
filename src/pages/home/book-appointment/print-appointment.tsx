import { AppointmentData } from "@/types/appointment/appointment"
import { FileText } from "lucide-react"
import { useEffect, useState } from "react"
import PrintAppointment from '../../appointment/pdf-template/template'



const HomepagePrintAppointment = () => {

    const [print, setPrint] = useState(false)
    const [appointmentInfo, setAppointmentInfo] = useState<AppointmentData>()

    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem('printData')!)
        setAppointmentInfo(data)
    }, [sessionStorage.getItem('printData')])


    if (!appointmentInfo) return <div>Loading...</div>


    return (
        <div className="min-h-[calc(100vh-30vh)] flex flex-col items-center justify-center px-2.5 py-10">
            <div className="flex flex-col justify-center items-center gap-8 text-center border-2 border-dashed border-green-900/20  lg:w-[800px] mx-auto p-5 rounded-xl shadow-xl bg-gradient-to-br form-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
                {/* Text */}
                <div className="space-y-3">
                    <h1 className="text-green-500 text-2xl sm:text-4xl font-bold">Congratulations 🎉</h1>
                    <p className="text-sm text-gray-600 dark:text-neutral-300">Your appointment has been booked successfully. You will receive a confirmation email shortly.</p>
                </div>
                {/* icon */}
                <div
                    // onClick={ }
                    className="relative p-4 rounded-full bg-green-500 dark:bg-green-800 shadow-xl cursor-pointer">
                    <FileText className="w-12 h-12 text-white" />
                    <div className="bg-green-500/60 dark:bg-green-500/30 absolute inset-0 rounded-full animate-ping" />
                </div>

                <div className="flex flex-col gap-y-5 text-center">
                    <p className="">Now you can Print & Download your appointment</p>

                    <button
                        onClick={() => { setPrint(true) }}
                        type="button"
                        className="bg-gradient-to-r rounded-lg hover:scale-105 transition-all duration-300 from-green-500  to-blue-500 text-white px-4 py-2 text-sm font-semibold">
                        Print & Download
                    </button>
                </div>
            </div>


            {print && <PrintAppointment Info={appointmentInfo!} afterGenerate={() => { setPrint(false) }} />}
        </div>
    )
}

export default HomepagePrintAppointment