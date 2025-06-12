import Dialog from "@/components/Dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { Fragment, HTMLAttributes, useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { z, ZodType } from "zod"
import { ScrollArea } from "../ui/scroll-area"
import RequiredLabel from "../required-label"



export interface FormField {
    name: string
    type: 'text' | 'number' | 'email' | 'password' | 'date' | 'select' | 'textarea' | 'file'
    accecpt?: 'image/*' | 'application/pdf'
    label?: string
    requiredLabel?: string
    placeholder?: string
    change?: (value: string) => void
    isDisabled?: boolean
    defaultValue?: string
    selectOptions?: Array<{ label: string, value: number | string }>
}

interface FormModalProps<T extends ZodType<any>> extends HTMLAttributes<HTMLDivElement> {
    Submit: (formData: z.infer<T>) => void
    title: string
    isPending: boolean
    schema: T
    fields: FormField[]
    height?: string,
    width?: string,
    className?: string,
    defaultValues?: Partial<z.infer<T>>
}


const FormModal = <T extends ZodType<any>>({
    title,
    isPending,
    Submit,
    schema,
    fields,
    height,
    width,
    className,
    defaultValues,
    ...props
}: FormModalProps<T>) => {

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm<z.infer<T>>({
        resolver: zodResolver(schema),
    })




    // Optional: Reset form when defaultValues change
    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues)
        }
    }, [])



    return (
        <Dialog pageTitle={title} className={cn('sm:w-[400px] mx-auto', width)} {...props}>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(Submit)}>
                <ScrollArea className={height}>
                    <div className={cn('space-y-2 px-3 mb-10', className)}>
                        {fields.map((Formfield) => (
                            <Fragment key={Formfield.name}>
                                {['select'].includes(Formfield.type) ? (
                                    <div className="space-y-2">

                                        {Formfield.label && <Label>{Formfield.label}</Label>}
                                        {Formfield.requiredLabel && <RequiredLabel label={Formfield.requiredLabel} />}

                                        <Controller control={control} name={Formfield.name as any} render={({ field }) => {

                                            return <Select value={field.value || ''} onValueChange={(value) => {
                                                field.onChange(value);
                                                if (Formfield.change) {
                                                    Formfield.change(value);
                                                }
                                            }}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent className='z-[200]'>
                                                    {Formfield?.selectOptions?.map((option) => {
                                                        return <SelectItem key={option.value} value={String(option.value)}>{option.label}</SelectItem>
                                                    })}
                                                </SelectContent>
                                            </Select>
                                        }} />
                                        {errors?.[Formfield.name] && <p className='text-sm text-red-500'>{String(errors?.[Formfield.name]?.message)}</p>}
                                    </div>
                                ) : ['textarea'].includes(Formfield.type) ?
                                    <div className="space-y-2" key={Formfield.name}>

                                        {Formfield.label && <Label>{Formfield.label}</Label>}
                                        {Formfield.requiredLabel && <RequiredLabel label={Formfield.requiredLabel} />}

                                        <Textarea
                                            id={Formfield.name}
                                            {...register(Formfield.name as any)}
                                            placeholder={Formfield.placeholder || `Enter ${Formfield.name}`}
                                        />
                                        {errors[Formfield.name] && (
                                            <p className='text-sm text-red-500'>
                                                {String(errors[Formfield.name]?.message)}
                                            </p>
                                        )}
                                    </div>
                                    : Formfield.type === 'file' ? (
                                        <div className="space-y-2" key={Formfield.name}>
                                            {Formfield.label && <Label>{Formfield.label}</Label>}
                                            {Formfield.requiredLabel && <RequiredLabel label={Formfield.requiredLabel} />}
                                            <Controller control={control} name={Formfield.name as any} render={({ field }) => (
                                                <Input
                                                    id={Formfield.name}
                                                    type={Formfield.type}
                                                    accept={Formfield.accecpt}
                                                    onChange={(e) => {
                                                        if (e.target?.files) {
                                                            field.onChange(e.target?.files[0]!)
                                                        }
                                                    }}
                                                    defaultValue={Formfield.defaultValue}
                                                    disabled={Formfield.isDisabled}
                                                />
                                            )} />
                                            {errors[Formfield.name] && (
                                                <p className='text-sm text-red-500'>
                                                    {String(errors[Formfield.name]?.message)}
                                                </p>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="space-y-2" key={Formfield.name}>
                                            {Formfield.label && <Label>{Formfield.label}</Label>}
                                            {Formfield.requiredLabel && <RequiredLabel label={Formfield.requiredLabel} />}
                                            <Input
                                                id={Formfield.name}
                                                type={Formfield.type}
                                                {...register(Formfield.name as any)}
                                                placeholder={Formfield.placeholder || `Enter ${Formfield.name}`}
                                                defaultValue={Formfield.defaultValue}
                                                disabled={Formfield.isDisabled}
                                            />
                                            {errors[Formfield.name] && (
                                                <p className='text-sm text-red-500'>
                                                    {String(errors[Formfield.name]?.message)}
                                                </p>
                                            )}
                                        </div>
                                    )}
                            </Fragment>
                        ))}
                    </div>
                </ScrollArea>

                <div className="flex px-3">
                    <Button type="submit" disabled={isPending} className="flex-1">
                        {isPending ? (
                            <Loader className="animate-spin" />
                        ) : (
                            defaultValues ? 'Update' : 'Save'
                        )}
                    </Button>
                </div>
            </form>
        </Dialog >
    )
}

export default FormModal




