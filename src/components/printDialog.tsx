import { X } from 'lucide-react'
import { HTMLAttributes, ReactNode } from 'react'
import CustomTooltip from './customTooltip'
import { ScrollArea } from './ui/scroll-area'


interface PrintDialogProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
}

const PrintDialog = ({ children, ...props }: PrintDialogProps) => {
    return (
        <section className='fixed w-full inset-0 bg-white p-2.5 z-[500]'>
            <div className="flex justify-end">
                <CustomTooltip message='Close popup'>
                    <div {...props} className='p-1 bg-primary rounded-full active:scale-95'>
                        <X className='cursor-pointer h-4 w-4 text-white ' />
                    </div>
                </CustomTooltip>
            </div>
            <ScrollArea className='h-screen'>
                <main>{children}</main>
            </ScrollArea>
        </section>
    )
}

export default PrintDialog