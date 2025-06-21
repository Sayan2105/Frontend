import { HTMLAttributes } from 'react'
import { CalendarDays } from 'lucide-react'
import Dialog from '@/components/Dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { operationDetailsType } from '@/types/opd_section/operationType'
import CardBox from '@/components/card-box'



interface OperationDetailsModelProps extends HTMLAttributes<HTMLDivElement> {
    operationDetails: operationDetailsType | undefined
}


const OperationDetailsModel = ({ operationDetails, ...props }: OperationDetailsModelProps) => {

    return (
        <Dialog pageTitle='Opration Details' {...props}>
            <ScrollArea className={'relative h-[50vh] lg:h-[60vh] w-full'}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 px-2.5 pb-14">

                    <div className="flex items-center gap-2 sm:col-span-2 mb-4">
                        <div className='p-3 bg-yellow-500 rounded-full'>
                            <CalendarDays className='w-10 h-10 text-white' />
                        </div>
                        <div className=''>
                            <p className='font-semibold text-lg text-gray-900 dark:text-white'>{operationDetails?.date}</p>
                            <p className='text-sm text-gray-500'>Operation Date</p>
                        </div>
                    </div>


                    {/* Dashed */}
                    <div className="sm:col-span-2 grid grid-cols-2 gap-2">
                        <CardBox borderType='dashed' title="Reference No." value={operationDetails?.id} />
                        <CardBox borderType='dashed' title="Operation Name" value={operationDetails?.operationName.name} />
                    </div>

                    {/* solid */}
                    <CardBox borderType='solid' title="IPD ID" value={operationDetails?.ipdId ? operationDetails?.ipdId : operationDetails?.opdId} />
                    <CardBox borderType='solid' title="Category" value={operationDetails?.operationCategory.name} />
                    <CardBox borderType='solid' title="Consultant" value={operationDetails?.doctor.name} />
                    <CardBox borderType='solid' title="Consultant Assistant 1" value={operationDetails?.assistant_1} />
                    <CardBox borderType='solid' title="Consultant Assistant 2" value={operationDetails?.assistant_2} />
                    <CardBox borderType='solid' title="Anesthetist" value={operationDetails?.anesthetist} />
                    <CardBox borderType='solid' title="Anesthesia Type" value={operationDetails?.anesthesia_type} />
                    <CardBox borderType='solid' title="OT Technician" value={operationDetails?.ot_technician} />
                    <CardBox borderType='solid' title="OT Assistant" value={operationDetails?.ot_assistant} />
                    <CardBox borderType='solid' title="Note" value={operationDetails?.note} />
                    <CardBox borderType='solid' title="Result" value={operationDetails?.result} />
                </div>
            </ScrollArea>
        </Dialog>
    )
}

export default OperationDetailsModel