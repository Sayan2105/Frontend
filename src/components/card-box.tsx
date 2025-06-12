import { cn } from "@/lib/utils"

interface CardBoxProps {
    borderType: 'solid' | 'dashed',
    className?: string,
    title: string,
    value: string | number | undefined
}

const CardBox = ({ borderType, className, title, value }: CardBoxProps) => {
    return (
        <>
            {borderType === 'solid' ? (
                <div className={cn(
                    'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-3 space-y-2',
                    className
                )}>
                    <p className='text-xs text-gray-500 dark:text-gray-400 font-medium'>{title}</p>
                    <p className='text-base font-semibold text-gray-900 dark:text-gray-100'>{value}</p>
                </div>
            ) : (
                <div className={cn(
                    'border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-3 space-y-2',
                    className
                )}>
                    <p className='text-xs text-gray-500 dark:text-gray-400 font-medium'>{title}</p>
                    <p className='text-base font-semibold text-gray-900 dark:text-gray-100'>{value}</p>
                </div>
            )}
        </>
    )
}

export default CardBox