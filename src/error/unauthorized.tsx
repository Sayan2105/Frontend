import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { buttonVariants } from '@/components/ui/button'
import { Home } from 'lucide-react'
import { Link } from 'react-router-dom'

const Unauthorized = () => {
    return (
        <MaxWidthWrapper className='h-[calc(100vh-56px-1px)] flex justify-center items-center'>
            <div className="flex gap-4 flex-col">
                <h1 className='font-semibold'>trying to unauthorized access</h1>
                <div className='text-center'>
                    <Link to={{ pathname: '/' }} className={buttonVariants({
                        variant: 'outline',
                        size: 'sm'
                    })}>Go to home <Home /></Link>
                </div>
            </div>
        </MaxWidthWrapper>
    )
}

export default Unauthorized