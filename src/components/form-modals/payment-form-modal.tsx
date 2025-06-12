import Dialog from "@/components/Dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { paymentFormSchema } from "@/formSchemas/paymentFormSchema"
import { currencySymbol } from "@/helpers/currencySymbol"
import { PaymentOptions } from "@/helpers/formSelectOptions"
import useChargeHandlers from "@/pages/OPD/details/charges/charge-handlers"
import { paymentData } from "@/types/opd_section/payment"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { HTMLAttributes, useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import RequiredLabel from "../required-label"
import { MultiSelect } from "../ui/multi-select"


interface PaymentFormModelProps extends HTMLAttributes<HTMLDivElement> {
    Submit: (formData: any) => void;
    isPending: boolean,
    paymentDetails: paymentData
}


const PaymentFormModel = ({ Submit, isPending, paymentDetails, ...props }: PaymentFormModelProps) => {

    const { control, register, watch, handleSubmit, setValue, formState: { errors } } = useForm<z.infer<typeof paymentFormSchema>>({
        resolver: zodResolver(paymentFormSchema),
        defaultValues: {
            ...paymentDetails,
            chargeId: paymentDetails?.charge.map(c => c.id) // eg: [1,2,3]
        }
    })

    // payment id is here to fetch charges that are paid for that payment
    const { charges, getCharges } = useChargeHandlers({ search: 'Unpaid', paymentId: paymentDetails?.id })

    // calculate amount
    useEffect(() => {
        const selectedIds = watch('chargeId') || []; // will return array of strings
        const selectedCharge = selectedIds.map((id) => charges.data.find((c) => c.id === +id));
        const total = selectedCharge.reduce((acc, curr) => acc + curr?.net_amount!, 0);
        setValue('amount', total)
        const balance = (total - watch('paid_amount'))
        setValue('balance_amount', balance)
    }, [watch('chargeId'), watch('paid_amount')])


    useEffect(() => {
        getCharges()
    }, [])


    return (
        <Dialog pageTitle='Add Payment' {...props} className='sm:w-[400px] mx-auto'>
            <form onSubmit={handleSubmit(Submit)}>
                <ScrollArea className={'relative h-[50vh] w-full'}>
                    <div className="grid gap-5 mt-2 px-3 pb-5">

                        {/* Date */}

                        <div className="w-full flex flex-col gap-y-2">
                            <RequiredLabel label='Date' />
                            <Input type='date' {...register('date')} defaultValue={new Date().toISOString().split('T')[0]} />
                            {errors.date && <p className='text-sm text-red-500'>{errors.date.message}</p>}
                        </div>

                        {/* Charge */}
                        <div className="w-full flex flex-col gap-y-2">
                            <RequiredLabel label='Charge' />
                            <Controller name="chargeId" control={control} render={({ field }) => {
                                return <MultiSelect
                                    className="shadow-none"
                                    defaultValue={field?.value?.map(id => id.toString())}
                                    options={charges.data.map((charge) => ({ label: charge.chargeNames.name, value: String(charge.id) }))}
                                    placeholder='Select Charge'
                                    onValueChange={(value) => { field.onChange(value) }}
                                />
                            }} />
                            {errors.chargeId && <p className='text-sm text-red-500'>{errors.chargeId.message}</p>}
                        </div>


                        {/* Amount */}

                        <div className="w-full flex flex-col gap-y-2 ">
                            <Label>Amount {currencySymbol()}</Label>
                            <Input type='number' {...register('amount')} placeholder="Enter Amount" disabled />
                            {errors.amount && <p className='text-sm text-red-500'>{errors.amount.message}</p>}
                        </div>


                        {/* Paid */}

                        <div className="w-full flex flex-col gap-y-2 ">
                            <Label>Paid {currencySymbol()}</Label>
                            <Input type='number' {...register('paid_amount')} placeholder="Enter Paid Amount" />
                            {errors.paid_amount && <p className='text-sm text-red-500'>{errors.paid_amount.message}</p>}
                        </div>

                        {/* Balance */}

                        <div className="w-full flex flex-col gap-y-2 ">
                            <Label>Balance {currencySymbol()}</Label>
                            <Input type='number' {...register('balance_amount')} disabled />
                            {errors.balance_amount && <p className='text-sm text-red-500'>{errors.balance_amount.message}</p>}
                        </div>

                        {/* Payment Mode */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Controller control={control} name='payment_mode' render={({ field }) => {
                                return <>
                                    <Label>Payment Mode</Label>
                                    <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>

                                        <SelectContent className='z-[200]'>
                                            {PaymentOptions.map((payment, i) => {
                                                return <SelectItem key={i} value={payment.value}>{payment.label}</SelectItem>
                                            })}
                                        </SelectContent>
                                    </Select>
                                </>
                            }} />
                            {errors.payment_mode && <p className='text-sm text-red-500'>{errors.payment_mode.message}</p>}

                        </div>


                        {/* Note */}

                        <div className="w-full flex flex-col gap-y-2 ">
                            <Label>Note</Label>
                            <Textarea  {...register('note')} placeholder="Write your message" />
                            {errors.note && <p className='text-sm text-red-500'>{errors.note.message}</p>}
                        </div>
                    </div>
                </ScrollArea>

                <div className="flex mt-5 mb-2 p-3 gap-x-2 sm:justify-end">
                    <Button type='submit' className='flex-1'>{paymentDetails ? ('Update') : ('Save Payment')} {isPending && <Loader className='animate-spin' />}</Button>
                </div>
            </form>
        </Dialog>
    )


}

export default PaymentFormModel