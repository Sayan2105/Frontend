import { cn } from '@/lib/utils'
import React, { HTMLAttributes } from 'react'

interface RadioProps extends HTMLAttributes<HTMLDivElement> {
    className?: string,
    name: string,
    id: string,
    text?: string
}

const Radio = ({ className, name, id, text, ...props }: RadioProps) => {
    return (
        <div className="flex gap-x-2">
            <label htmlFor={id} className='cursor-pointer'>
                <input type="radio" id={id} className='hidden peer' name={name} />
                <span {...props} className={cn('inline-block ring-1 h-3 w-3 ring-gray-700 ring-offset-2 rounded-full', className)}></span>
            </label>
            <p className='text-gray-800 dark:text-gray-400'>{text}</p>
        </div>
    )
}

export default Radio