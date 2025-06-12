import CardBox from '@/components/card-box'
import Dialog from '@/components/Dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { medicineDetails } from '@/types/pharmacy/pharmacy'
import { Pill } from 'lucide-react'
import { HTMLAttributes } from 'react'


interface MedicineDetailsModelProps extends HTMLAttributes<HTMLDivElement> {
    medicineDetails: medicineDetails
}



const MedicineDetailsModel = ({ medicineDetails, ...props }: MedicineDetailsModelProps) => {


    return (
        <Dialog pageTitle='Medicine Details' {...props}>
            <ScrollArea className='relative pt-3 h-[75vh] sm:h-[60vh] w-full'>

                <div className="grid lg:grid-cols-4 gap-y-3 pt-3 px-2.5 pb-10">

                    {/* medicine name and icon col-span-2 */}

                    <div className="flex items-center gap-2 lg:col-span-2">
                        <div className='p-3 bg-green-500 rounded-full'>
                            <Pill className='w-10 h-10 text-white' />
                        </div>
                        <div>
                            <h1 className='font-semibold text-lg text-gray-900 dark:text-gray-100'>{medicineDetails?.name}</h1>
                            <p className='text-sm text-gray-400'>{medicineDetails?.group.name}</p>
                        </div>
                    </div>

                    {/* highlights col-span-2*/}

                    <div className='grid grid-cols-2 gap-3 lg:col-span-2'>
                        <CardBox borderType='dashed' title="Medicine ID" value={medicineDetails?.id} />
                        <CardBox borderType='dashed' title="Company" value={medicineDetails?.company.name} />
                    </div>


                    {/* other highlight col-span-full */}

                    <div className="col-span-full grid sm:grid-cols-2 lg:grid-cols-3 p-0.5 gap-2">
                        <CardBox borderType='solid' title="Category" value={medicineDetails?.category.name} />
                        <CardBox borderType='solid' title="Composition" value={medicineDetails?.composition} />
                        <CardBox borderType='solid' title="Group" value={medicineDetails?.group.name} />
                        <CardBox borderType='solid' title="Unit" value={medicineDetails?.unit.name} />
                        <CardBox borderType='solid' title="Quantity" value={medicineDetails?.quantity === 0 ? (<span className='text-red-500'>out of stock</span> as any) : medicineDetails?.quantity} />
                        <CardBox borderType='solid' title="Rack No" value={medicineDetails?.rack_no} />
                        <CardBox borderType='solid' title="Min Level" value={medicineDetails?.min_level} />
                        <CardBox borderType='solid' title="Reorder Level" value={medicineDetails?.reorder_level} />
                        <CardBox borderType='solid' title="VAT" value={medicineDetails?.vat} />
                        <CardBox borderType='solid' title="Note" value={medicineDetails?.note} />
                    </div>

                </div>

            </ScrollArea>
        </Dialog>
    )
}

export default MedicineDetailsModel