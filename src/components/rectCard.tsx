import { cn, currencyFormat } from '@/lib/utils'
import React from 'react'
import { Link } from 'react-router-dom'


interface rectCardProps {
    path: string,
    name: string,
    amount?: number,
    visits?: number,
    children: React.ReactNode
    iconBg?: string,
}

const RectCard = ({ path, name, amount, visits, iconBg, children }: rectCardProps) => {
    return (
        <div className="mx-auto w-full ">
            <Link to={{
                pathname: path
            }} className='flex items-center gap-x-3 p-2.5 bg-white dark:bg-background active:scale-95 rounded-lg ring-1 transition-all ring-gray-200 dark:ring-zinc-800 hover:shadow-lg dark:shadow-zinc-900'>
                <div className={cn('p-2 rounded-full', iconBg)}>
                    {children}
                </div>
                <span className='mr-5 inline-block text-nowrap'>
                    <p>{name}</p>
                    {amount && <p className='font-bold'>{currencyFormat(amount)}</p>}
                    {visits && <p className='font-bold'>{visits}</p>}
                </span>
            </Link>
        </div>
    )
}

export default RectCard