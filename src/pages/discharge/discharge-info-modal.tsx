import CardBox from '@/components/card-box'
import CustomTooltip from '@/components/customTooltip'
import Dialog from '@/components/Dialog'
import PermissionProtectedAction from '@/components/permission-protected-actions'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DischargeDataType } from '@/types/discharge/discharge'
import { CalendarDays, Trash2 } from 'lucide-react'
import { HTMLAttributes } from 'react'


interface DischargeInfoModal extends HTMLAttributes<HTMLDivElement> {
    infos: DischargeDataType;
    Delete: (id: number) => void
}


const DischargeInfoModal = ({ infos, Delete, ...props }: DischargeInfoModal) => {


    return (
        <Dialog pageTitle='Discharge Details' {...props}>
            <ScrollArea className='relative pt-3 h-[75vh] sm:h-[60vh] w-full'>
                <div className='gap-2 grid space-y-3 px-3 pb-10 sm:grid-cols-2 lg:grid-cols-4 sm:col-span-full'>

                    {/* Discharge details */}

                    <div className="flex items-center gap-2 sm:col-span-2 mb-4">

                        <div className='p-3 bg-yellow-500 rounded-full'>
                            <CalendarDays className='w-10 h-10 text-white' />
                        </div>

                        <div className=''>

                            <p className='font-semibold text-lg text-gray-900 dark:text-white'>{infos?.discharge_date}</p>

                            <span className='flex items-center gap-1'>

                                <p className='text-sm text-gray-500'>Discharge Date</p>

                                {/* delete discharge */}
                                <PermissionProtectedAction action='delete' module='Discharge Patient'>
                                    <CustomTooltip message='Delete Discharge'>
                                        <Trash2 className='w-4 h-4 cursor-pointer active:scale-95 text-red-500'
                                            onClick={() => Delete(infos?.id!)}
                                        />
                                    </CustomTooltip>
                                </PermissionProtectedAction>
                            </span>
                        </div>
                    </div>


                    <div className="sm:col-span-2 grid grid-cols-2 gap-2">
                        <CardBox borderType='dashed' title='Discharge No.' value={infos?.id} />
                        <CardBox borderType='dashed' title={infos.ipdId ? 'IPD No.' : 'OPD No.'} value={infos.ipdId ? infos?.ipdId! : infos?.opdId!} />
                    </div>


                    <div className="col-span-full grid sm:grid-cols-2 gap-2">
                        <CardBox borderType='solid' title='Discharge Type' value={infos?.discharge_type} />
                        <CardBox borderType='solid' title='Discharge Note' value={infos?.discharge_note} />
                        <CardBox borderType='solid' title='Billing Status' value={infos?.billingStatus} />
                        <CardBox borderType='solid' title='Doctor' value={infos?.doctor} />
                        <CardBox borderType='solid' title='Created At' value={infos?.createdAt} />
                    </div>
                </div>

            </ScrollArea>
        </Dialog>
    )
}




export default DischargeInfoModal