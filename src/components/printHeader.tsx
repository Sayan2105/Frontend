import { Separator } from './ui/separator'

const PrintHeader = () => {
    return (
        <>
            <section className="grid grid-cols-2 px-1 mt-5">
                {/* col 1 */}
                <div className="flex-col flex gap-y-2">
                    <h1 className='font-medium sm:text-4xl text-balance tracking-tight'>Vertica <span className="text-primary">Healthcare</span></h1>
                    <p className='text-gray-600 italic'>Your health is our priority</p>
                </div>

                {/* col 2 */}
                <div className="flex flex-col gap-y-1 items-end justify-center text-sm">
                    <p>Old lucknow west, 226022</p>
                    <p>Near SBI Bank</p>
                    <p>Uttar pradesh , India</p>
                </div>
            </section>

            <Separator />
        </>
    )
}

export default PrintHeader