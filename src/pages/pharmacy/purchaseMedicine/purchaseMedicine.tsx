import { getMedicineCategories } from '@/admin/setup/pharmacy/service'
import Dialog from '@/components/Dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { PurchaseMedicineFormSchema } from '@/formSchemas/purchaseMedicineFormSchema'
import { calculateAmount } from '@/helpers/calculateAmount'
import { currencySymbol } from '@/helpers/currencySymbol'
import PharmacyApi from '@/services/pharmacy-api'
import { medicinesBYcategory } from '@/types/pharmacy/pharmacy'
import { medicineCategory } from '@/types/setupTypes/pharmacy'
import { zodResolver } from '@hookform/resolvers/zod'
import { HTMLAttributes, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'


interface PurchaseMedicineFormProps extends HTMLAttributes<HTMLDivElement> {
    Submit: (formData: any) => void
    isPending: boolean
    purchaseDetails?: any
}


const PurchaseMedicineForm = ({ Submit, isPending, purchaseDetails, ...props }: PurchaseMedicineFormProps) => {

    // API States
    const [medicines, setMedicines] = useState<medicinesBYcategory[]>([])
    const [medicineCategories, setMedicineCategories] = useState<medicineCategory[]>([])


    const { register, watch, reset, control, handleSubmit, setValue, formState: { errors } } = useForm<z.infer<typeof PurchaseMedicineFormSchema>>({
        resolver: zodResolver(PurchaseMedicineFormSchema)
    })



    const fetchMedicineCategories = async () => {
        try {
            const data = await getMedicineCategories()
            setMedicineCategories(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const handleCategoryChange = async (categoryId: number) => {
        try {
            const data = await PharmacyApi.getMedicinesBYcategory(categoryId)
            setMedicines(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }




    useEffect(() => {
        fetchMedicineCategories()
    }, [])


    useEffect(() => {
        // Destructure watched values
        const [quantity, purchasePrice, tax, discount] = watch([
            'quantity',
            'purchase_price',
            'tax',
            'discount',
        ]);

        // Calculate total and amount
        const total = +quantity * +purchasePrice;
        const { total: amount, net_amount: totalAmount } = calculateAmount(total, +tax!, +discount!);

        // Set values
        setValue('amount', amount);
        setValue('total_amount', totalAmount);
    }, [watch('tax'), watch('discount'), watch('quantity'), watch('purchase_price')]);



    return (
        <Dialog pageTitle='Purchase Medicine' {...props}>
            <form onSubmit={handleSubmit(Submit)}>

                <ScrollArea className='h-[50vh] sm:h-[62vh]'>
                    {/* Main grid */}
                    <section className='p-3 grid sm:grid-cols-2 lg:grid-cols-3 rounded-lg gap-4' >

                        {/* category */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Controller control={control} name='categoryId' render={({ field }) => {
                                return <>
                                    <Label>Category</Label>
                                    <Select value={field.value || ''} onValueChange={(value) => { handleCategoryChange(Number(value));  field.onChange(value) }}>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>

                                        <SelectContent className='z-[200]'>
                                            {medicineCategories?.map((category) => {
                                                return <SelectItem key={category.id} value={String(category.id)}>{category.name}</SelectItem>
                                            })}
                                        </SelectContent>
                                    </Select>
                                </>
                            }} />
                            {errors.categoryId && <p className='text-sm text-red-500'>{errors.categoryId.message}</p>}
                        </div>


                        {/* medicine names */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Controller control={control} name='medicineId' render={({ field }) => {
                                return <>
                                    <Label>Medicine Name</Label>
                                    <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>

                                        <SelectContent className='z-[200]'>
                                            {medicines?.map((medicine, index) => {
                                                return <SelectItem key={index} value={String(medicine.id)}>{medicine.name}</SelectItem>
                                            })}
                                        </SelectContent>
                                    </Select>
                                </>
                            }} />
                            {errors.medicineId && <p className='text-sm text-red-500'>{errors.medicineId.message}</p>}
                        </div>


                        {/* Supplier Name */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Supplier Name</Label>
                            <Input type='text' {...register('supplier_name')} />
                            {errors.supplier_name && <p className='text-sm text-red-500'>{errors.supplier_name.message}</p>}
                        </div>

                        {/* batch No. */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Batch No.</Label>
                            <Input type='number' {...register('batch_no')} />
                            {errors.batch_no && <p className='text-sm text-red-500'>{errors.batch_no.message}</p>}
                        </div>


                        {/* Expiry date */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Purcahse Date</Label>
                            <Input type='date' {...register('purchase_date')} />
                            {errors.purchase_date && <p className='text-sm text-red-500'>{errors.purchase_date.message}</p>}
                        </div>

                        {/* Expiry date */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Expiry Date</Label>
                            <Input type='date' {...register('expiry_date')} />
                            {errors.expiry_date && <p className='text-sm text-red-500'>{errors.expiry_date.message}</p>}
                        </div>

                        {/*MRP */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>MRP {currencySymbol()}</Label>
                            <Input type='number' step="0.01" {...register('MRP')} />
                            {errors.MRP && <p className='text-sm text-red-500'>{errors.MRP.message}</p>}
                        </div>

                        {/*Sale Price */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Sale Price {currencySymbol()}</Label>
                            <Input type='number' {...register('sale_price')} />
                            {errors.sale_price && <p className='text-sm text-red-500'>{errors.sale_price.message}</p>}
                        </div>

                        {/*Packing Quantity */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Packing Quantity</Label>
                            <Input type='number' {...register('packing_quantity')} />
                            {errors.packing_quantity && <p className='text-sm text-red-500'>{errors.packing_quantity.message}</p>}
                        </div>


                        {/* Quantity */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Quantity</Label>
                            <Input type='number' {...register('quantity', { valueAsNumber: true })} />
                            {errors.quantity && <p className='text-sm text-red-500'>{errors.quantity.message}</p>}
                        </div>


                        {/* Purcahse Price */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Purcahse Price {currencySymbol()}</Label>
                            <Input type='number' {...register('purchase_price')} />
                            {errors.purchase_price && <p className='text-sm text-red-500'>{errors.purchase_price.message}</p>}
                        </div>

                        {/*  Amount */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Amount {currencySymbol()}</Label>
                            <Input type='number' {...register('amount')} disabled />
                            {errors.amount && <p className='text-sm text-red-500'>{errors.amount.message}</p>}
                        </div>

                        {/* Tax% */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Tax%</Label>
                            <Input type='number' {...register('tax')} />
                            {errors.tax && <p className='text-sm text-red-500'>{errors.tax.message}</p>}
                        </div>

                        {/* Discount% */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Discount%</Label>
                            <Input type='number' {...register('discount')} />
                            {errors.discount && <p className='text-sm text-red-500'>{errors.discount.message}</p>}
                        </div>


                        {/* Total Amount */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Total Amount {currencySymbol()}</Label>
                            <Input type='number' {...register('total_amount')} disabled />
                            {errors.total_amount && <p className='text-sm text-red-500'>{errors.total_amount.message}</p>}
                        </div>

                        {/* Payment mode */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Controller control={control} name='payment_mode' render={({ field }) => {
                                return <>
                                    <Label>Payment mode</Label>
                                    <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>

                                        <SelectContent className='z-[200]'>
                                            <SelectItem value="cash">Cash</SelectItem>
                                            <SelectItem value="to bank">Transfer to Bank</SelectItem>
                                            <SelectItem value="cheque">Cheque</SelectItem>
                                            <SelectItem value="upi">UPI</SelectItem>
                                            <SelectItem value="online">Online</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </>
                            }} />
                            {errors.payment_mode && <p className='text-sm text-red-500'>{errors.payment_mode.message}</p>}
                        </div >


                        <div className="w-full flex flex-col gap-y-2 lg:col-span-2">
                            <Label>Note</Label>
                            <Textarea {...register('note')} placeholder='Write note here' />
                            {errors.note && <p className='text-sm text-red-500'>{errors.note.message}</p>}
                        </div>
                    </section>
                </ScrollArea>

                <div className="p-2.5 flex space-x-2 justify-end">
                    <Button type='button' variant='outline' onClick={() => reset()}>Reset</Button>
                    <Button type='submit' className='flex-1 sm:flex-none'>Save Purchase</Button>
                </div>

            </form>
        </Dialog>
    )
}

export default PurchaseMedicineForm