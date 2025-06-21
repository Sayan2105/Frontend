import CardBox from '@/components/card-box'
import Dialog from '@/components/Dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { currencyFormat } from '@/lib/utils'
import { medicinePurchaseDetails } from '@/types/opd_section/purchaseMedicine'
import { Receipt } from 'lucide-react'
import { HTMLAttributes } from 'react'



interface PurchaseMedicineDetailsModelProps extends HTMLAttributes<HTMLDivElement> {
    purchaseDetails: medicinePurchaseDetails
}


const PurchaseMedicineDetailsModel = ({ purchaseDetails, ...props }: PurchaseMedicineDetailsModelProps) => {


    return (
        <Dialog pageTitle='Purchase Details' {...props}>
            <ScrollArea className='relative h-[60vh] sm:h-[60vh] w-full'>

                <div className="grid lg:grid-cols-4 gap-y-3 px-2.5 pb-14">

                    {/* medicine name and icon col-span-2 */}

                    <div className="flex items-center gap-2 lg:col-span-2">
                        <div className='p-3 bg-red-500 rounded-full'>
                            <Receipt className='w-10 h-10 text-white' />
                        </div>
                        <div>
                            <h1 className='font-semibold text-lg text-gray-900 dark:text-white'>{purchaseDetails?.date}</h1>
                            <p className='text-sm text-gray-500'>Purchase Date</p>
                        </div>
                    </div>

                    {/* highlights col-span-2*/}

                    <div className='grid grid-cols-2 gap-3 lg:col-span-2'>
                        <CardBox borderType='dashed' title="Purchase No" value={purchaseDetails?.id} />
                        <CardBox borderType='dashed' title="Supplier Name" value={purchaseDetails?.supplier_name} />
                    </div>


                    {/* other highlight col-span-full */}

                    <div className="col-span-full grid sm:grid-cols-2 lg:grid-cols-3 p-0.5 gap-2">
                        <CardBox borderType='solid' title="Medicine Name" value={purchaseDetails?.medicine.name} />
                        <CardBox borderType='solid' title="Category" value={purchaseDetails?.category.name} />
                        <CardBox borderType='solid' title="Expiry Date" value={purchaseDetails?.expiry_date} />
                        <CardBox borderType='solid' title="Medicine Group" value={purchaseDetails?.medicine.group.name} />
                        <CardBox borderType='solid' title="Batch No." value={purchaseDetails?.batch_no} />
                        <CardBox borderType='solid' title="MRP" value={currencyFormat(Number(purchaseDetails?.MRP))} />
                        <CardBox borderType='solid' title="Sale Price" value={currencyFormat(Number(purchaseDetails?.sale_price))} />
                        <CardBox borderType='solid' title="Packing Quantity" value={purchaseDetails?.packing_quantity} />
                        <CardBox borderType='solid' title="Quantity" value={purchaseDetails?.quantity} />
                        <CardBox borderType='solid' title="Purchase Price" value={currencyFormat(Number(purchaseDetails?.purchase_price))} />
                        <CardBox borderType='solid' title="Amount" value={currencyFormat(Number(purchaseDetails?.amount))} />
                        <CardBox borderType='solid' title="Tax" value={purchaseDetails?.tax} />
                        <CardBox borderType='solid' title="Discount" value={purchaseDetails?.discount} />
                        <CardBox borderType='solid' title="Net Amount" value={currencyFormat(Number(purchaseDetails?.total_amount))} />
                        <CardBox borderType='solid' title="Payment Mode" value={purchaseDetails?.payment_mode} />
                        <CardBox borderType='solid' title="Note" value={purchaseDetails?.note} />
                    </div>

                </div>

                {/* <div className="h-14 bg-gradient-to-t from-white z-30 w-full absolute bottom-0" /> */}
            </ScrollArea>
        </Dialog>
    )
}

export default PurchaseMedicineDetailsModel