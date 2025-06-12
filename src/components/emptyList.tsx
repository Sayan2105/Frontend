import { SearchX } from 'lucide-react'

const EmptyList = ({ message = 'No data found', length }: { message?: string, length: number }) => {

    if (length > 0) return null

    return (
        <div className="flex items-center gap-x-2 justify-center h-40">
            <p className="text-sm text-gray-800 dark:text-neutral-200">{message}</p>
            <SearchX className='size-4 text-gray-800 dark:text-neutral-200' />
        </div>
    )
}

export default EmptyList