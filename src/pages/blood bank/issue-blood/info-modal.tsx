import CardBox from "@/components/card-box"
import Dialog from "@/components/Dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { currencySymbol } from "@/helpers/currencySymbol"
import { currencyFormat } from "@/lib/utils"
import { IssuedBloodInfo } from "@/types/blood-bank/blood-bank"
import { CalendarDays } from "lucide-react"
import { HTMLAttributes } from "react"


interface IssueBloodInfoModalProps extends HTMLAttributes<HTMLDivElement> {
    info: IssuedBloodInfo
}


const IssueBloodInfoModal = ({ info, ...props }: IssueBloodInfoModalProps) => {

    return (
        <Dialog pageTitle="Issued Blood" {...props}>
            <ScrollArea className={'relative h-[75vh] sm:h-[60vh] w-full'}>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 px-2.5 pb-14">

                    <div className="flex items-center gap-2 sm:col-span-2 mb-4">
                        <div className='p-3 bg-rose-500 rounded-full'>
                            <CalendarDays className='w-10 h-10 text-white' />
                        </div>
                        <div className=''>
                            <p className='font-semibold text-lg text-gray-900 dark:text-gray-100'>{info?.date}</p>
                            <p className='text-sm text-gray-500'>Invoice Date</p>
                        </div>
                    </div>

                    <div className="sm:col-span-2 grid sm:grid-cols-2 gap-2">
                        <CardBox borderType='dashed' title="Invoice No." value={info?.id} />
                        <CardBox borderType='dashed' title="Created At" value={info?.createdAt} />
                    </div>


                    <CardBox borderType='solid' title="Bag" value={info?.bag} />
                    <CardBox borderType='solid' title="Bag" value={info?.blood_group} />


                    <CardBox borderType='solid' title="Patient Name" value={info?.patient.name} />
                    <CardBox borderType='solid' title="Patient Phone" value={info?.patient.phone} />
                    <CardBox borderType='solid' title="Patient Email" value={info?.patient.email} />
                    <CardBox borderType='solid' title="Address" value={info?.patient.address} />


                    <CardBox borderType='solid' title="Driver" value={info?.doctor} />


                    <CardBox borderType='solid' title="Charge Type" value={info?.chargeType.charge_type} />
                    <CardBox borderType='solid' title="Charge Category" value={info?.chargeCategory.category} />
                    <CardBox borderType='solid' title="Charge Name" value={info?.chargeName.name} />


                    <CardBox borderType='solid' title={`Standard Charge ${currencySymbol()}`} value={currencyFormat(info?.standard_charge)} />


                    <CardBox borderType="solid" title="Tax %" value={`(${info?.tax.toFixed(2)})% : ${currencyFormat(info?.taxRate)}`} />
                    <CardBox borderType="solid" title="Discount %" value={`(${info?.discount.toFixed(2)})% : ${currencyFormat(info?.discountRate)}`} />

                    <CardBox borderType="solid" title="Payment Mode" value={info?.payment_mode} />
                    <CardBox borderType="solid" title="Payment Info" value={info?.payment_info} />

                    <CardBox borderType="solid" title={`Net Amount ${currencySymbol()}`} value={currencyFormat(info?.net_amount)} />

                    <CardBox borderType="solid" title="Note" value={info?.note} />

                </div>
            </ScrollArea>
        </Dialog>
    )
}


export default IssueBloodInfoModal