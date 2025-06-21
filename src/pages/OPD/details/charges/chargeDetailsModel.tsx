import CardBox from "@/components/card-box"
import Dialog from "@/components/Dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { currencyFormat } from "@/lib/utils"
import { ChargeDetailsType } from "@/types/opd_section/charges"
import { CalendarDays } from "lucide-react"
import { HTMLAttributes } from "react"


interface ChargeDetailsModelProps extends HTMLAttributes<HTMLDivElement> {
    chargeDetails: ChargeDetailsType | undefined
}


const ChargeDetailsModel = ({ chargeDetails, ...props }: ChargeDetailsModelProps) => {

    return (
        <Dialog pageTitle="Charge Details" {...props}>
            <ScrollArea className={'relative h-[60vh] w-full'}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 px-2.5 pb-14">

                    <div className="flex items-center gap-2 sm:col-span-2 mb-4">
                        <div className='p-3 bg-yellow-500 rounded-full'>
                            <CalendarDays className='w-10 h-10 text-white' />
                        </div>
                        <div className=''>
                            <p className='font-semibold text-lg text-gray-900 dark:text-gray-100'>{chargeDetails?.date}</p>
                            <p className='text-sm text-gray-500'>Charge Date</p>
                        </div>
                    </div>

                    {/* Dashed */}
                    <div className="sm:col-span-2 grid grid-cols-2 gap-2">
                        <CardBox borderType='dashed' title="Reference No." value={chargeDetails?.id} />
                        <CardBox borderType='dashed' title="Charge Name" value={chargeDetails?.chargeNames.name} />
                    </div>

                    {/* Solid */}
                    <div className="col-span-full grid sm:grid-cols-3 gap-3 mt-3">
                        <CardBox borderType='solid' title="Charge Type" value={chargeDetails?.chargeType.charge_type} />
                        <CardBox borderType='solid' title="Charge Category" value={chargeDetails?.chargeCategory.category} />
                        <CardBox borderType='solid' title="Standard Amount" value={currencyFormat(Number(chargeDetails?.standard_charge))} />
                        <CardBox borderType='solid' title="TPA Charge" value={currencyFormat(Number(chargeDetails?.tpa))} />
                        <CardBox borderType='solid' title="Total" value={currencyFormat(Number(chargeDetails?.total))} />
                        <CardBox borderType='solid' title="Tax %" value={`${chargeDetails?.tax} %`} />
                        <CardBox borderType='solid' title="Discount" value={`${chargeDetails?.discount} %`} />
                        <CardBox borderType='solid' title="Net Amount" value={currencyFormat(Number(chargeDetails?.net_amount))} />
                    </div>
                </div>
            </ScrollArea>
        </Dialog>
    )
}


export default ChargeDetailsModel