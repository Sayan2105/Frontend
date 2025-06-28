import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button, buttonVariants } from '@/components/ui/button'
import { ArrowLeft, Home } from 'lucide-react'
import { Link } from 'react-router-dom'


const Not_found = () => {
    return (
        <div className="fixed inset-0 bg-background z-[99999]">
            <MaxWidthWrapper className='h-[calc(100vh-56px-1px)] flex justify-center items-center'>
                <div className='flex flex-col gap-y-4'>
                    <div className='w-[300px] sm:w-[500px]'>
                        <img src="/not_found.svg" alt="not found svg" />
                    </div>
                    <div className='flex justify-center gap-4'>
                        <div className='text-center'>
                            <Link to={{ pathname: '/' }} className={buttonVariants({
                                variant: 'outline',
                                size: 'lg'
                            })}><Home /> Go to home</Link>
                        </div>
                        <div className='text-center'>
                            <Button onClick={() => window.history.back()} size='lg' variant={'outline'}>
                                <ArrowLeft />  Go Back
                            </Button>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    )
}

export default Not_found