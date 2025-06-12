import CustomTooltip from '@/components/customTooltip'
import EmptyList from '@/components/emptyList'
import IconMenu from '@/components/icon-menu'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Separator } from '@/components/ui/separator'
import { features, services } from '@/helpers/homepage'
import pulicApi from '@/services/public-apis'
import { paginatedNews } from '@/types/setupTypes/homepage'
import Autoplay from "embla-carousel-autoplay"
import Lottie from 'lottie-react'
import { FileText, Globe, Heart, Newspaper, NotepadText, Stethoscope } from 'lucide-react'
import { motion } from 'motion/react'
import { CSSProperties, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import heroAnimation from '@/assets/animation/hero.json'
import consulationAnimation from '@/assets/animation/consultation.json'
import { Link } from 'react-router-dom'





const HomePage = () => {

    const [news, setNews] = useState<paginatedNews>({ data: [], total_pages: 0 })

    const getAllNews = async () => {
        try {
            const data = await pulicApi.getLatestNews({ search: 'unexpired' })
            setNews(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }

    useEffect(() => {
        getAllNews()
    }, [])

    return (
        <div>

            {/* Hero */}

            <div className='pt-14 pb-16 lg:px-20 px-2.5 bg-gradient-to-tr from-blue-50 dark:from-background relative'>

                <div className='size-48 bg-blue-500/5 rounded-full absolute -left-16 -top-16 animate-pulse' />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className='relative  px-5 py-1.5 z-10 rounded-full bg-white dark:bg-background border border-blue-100 dark:border-blue-950 w-fit flex space-x-1 shadow-md items-center mb-5'>
                    <Heart className='text-blue-500 w-5 animate-pulse' />
                    <span className='font-semibold text-gray-800 dark:text-neutral-200 text-sm'>Caring for Your Health Since 1999</span>
                </motion.div>

                <div className='grid lg:grid-cols-4 gap-10 lg:gap-0  min-h-[5vh]'>
                    {/* Text Content & Button */}
                    < div className="lg:col-span-2 flex flex-col space-y-5">
                        <div className='h-full'>
                            <motion.div
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                                className="flex flex-col gap-y-5 h-full w-full"
                            >
                                <motion.h1
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                    className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-violet-500 font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight relative"
                                >
                                    Welcome to Vertica Healthcare
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="text-gray-600 dark:text-neutral-200 text-2xl md:text-4xl tracking-tight leading-tight"
                                >
                                    Efficiency in Care, Excellence in Service
                                </motion.p>

                                <motion.p
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.6 }}
                                    className="text-gray-500 dark:text-neutral-300 max-w-4xl"
                                >
                                    Here, you can efficiently manage patient records, appointments, medical staff, and hospital operations. Easily access key data, track ongoing treatments, and ensure smooth workflows for enhanced patient care and hospital efficiency.
                                </motion.p>


                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.9 }}
                                    className='grid sm:grid-cols-2 gap-5'>
                                    <div>
                                        <a
                                            className='flex gap-1 items-center justify-center h-16 rounded-3xl border-blue-500 border-2 text-xl text-white bg-blue-500 hover:shadow-xl hover:scale-105 transition-all duration-300'
                                            href="tel:+91-1234567890">
                                            Emergency: +91-1234567890
                                        </a>
                                    </div>
                                    <Link to={{ pathname: '/home/book-appointment' }} className='flex gap-1 items-center justify-center h-16 font-bold rounded-3xl border-blue-500 border-2 text-xl text-blue-500 hover:shadow-xl hover:scale-105 transition-all duration-300'>
                                        <NotepadText />
                                        Book Appointment
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div >

                    {/* Hero Animation */}
                    <div className="lg:col-span-2 mx-auto flex flex-col justify-center" >
                        <div className='w-80 sm:w-[500px] lg:w-[500px]'>
                            <Lottie animationData={heroAnimation} loop={true} className='w-full h-full object-cover' />
                        </div>
                    </div>
                </div>
            </div>


            {/* Carousel Part */}
            <div className="py-20 bg-gradient-to-l from-orange-300 to-violet-300 dark:from-orange-900 dark:to-violet-900 rounded-t-3xl md:rounded-t-[50px]">

                <div className='mb-10 text-center'>
                    <h1 className='text-2xl md:text-4xl font-bold lg:text-5xl text-gray-800 dark:text-gray-200'>Overview & Latest News</h1>
                </div>

                <MaxWidthWrapper className='grid lg:grid-cols-3 gap-10 lg:px-10 justify-center'>

                    {/* Grid 1 */}
                    <div className='lg:col-span-2 border shadow-lg'>
                        <Carousel
                            plugins={[Autoplay({ delay: 2000, })]}>
                            <CarouselContent>
                                <CarouselItem>
                                    <img src="/slider/h-1.jpg" alt="slider-1" className='object-cover' />
                                </CarouselItem>
                                <CarouselItem>
                                    <img src="/slider/h-2.jpg" alt="slider-2" className='object-cover' />
                                </CarouselItem>
                                <CarouselItem>
                                    <img src="/slider/h-3.jpg" alt="slider-3" className='object-cover' />
                                </CarouselItem>
                                <CarouselItem>
                                    < img src="/slider/h-4.jpg" alt="slider-4" className='object-cover' />
                                </CarouselItem>
                                <CarouselItem>
                                    < img src="/slider/h-5.jpg" alt="slider-5" className='object-cover' />
                                </CarouselItem>
                            </CarouselContent>

                            <CarouselNext className='absolute right-5 bg-transparent border-none' />
                            <CarouselPrevious className='absolute left-5 bg-transparent border-none' />
                        </Carousel>

                    </div>

                    {/* Grid 2 */}

                    <div className="rounded border shadow-lg h-fit">
                        <h1 className="p-2 rounded-t text-xl shadow text-gray-900 dark:text-neutral-100 tracking-tight bg-white/20 backdrop-blur-lg">
                            Latest News
                        </h1>

                        <div className="h-[475px] overflow-hidden group">
                            {news.data.length > 0 ?
                                <div className='px-2 py-4 animate-marquee-top hover:animation-paused space-y-3'
                                    style={{ '--marquee-duration': `${news.data.length * 5}s` } as CSSProperties}>
                                    {news.data.map((item, i) => (
                                        <Accordion key={i} type="single" collapsible>
                                            <AccordionItem value="item-1" className='border rounded-lg px-2 shadow-md'>
                                                <AccordionTrigger>
                                                    <IconMenu
                                                        iconBg='bg-black/10 dark:bg-white/20'
                                                        icon={<Newspaper className='text-gray-700 dark:text-neutral-100' />}
                                                        value={new Date(item.date).toDateString()}
                                                        title={item.title}
                                                    />
                                                </AccordionTrigger>
                                                <AccordionContent>

                                                    {item.description}

                                                    {(item.pdf || item.url) && <Separator className='my-2 bg-white' />}

                                                    <div className="flex space-x-2">
                                                        {item.url && (
                                                            <CustomTooltip message='Visit'>
                                                                <div className='bg-black/10 dark:bg-white/20  flexitems-center w-fit rounded-full p-2 cursor-pointer relative active:scale-95 transition-all duration-300'>
                                                                    <Globe className='text-gray-700 dark:text-white h-4 w-4' />
                                                                    <a href={item.url} target='_blank' className='absolute inset-0' />
                                                                </div>
                                                            </CustomTooltip>
                                                        )}

                                                        {item.pdf && (
                                                            <CustomTooltip message='See PDF'>
                                                                <div className='bg-black/10 dark:bg-white/20 0 flexitems-center w-fit rounded-full p-2 cursor-pointer relative active:scale-95 transition-all duration-300' onClick={() => { window.open(`${import.meta.env.VITE_APP_API_URL}/images/${item.pdf}`) }}>
                                                                    <FileText className='text-gray-700 dark:text-white h-4 w-4' />
                                                                </div>
                                                            </CustomTooltip>
                                                        )}
                                                    </div>

                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    ))}
                                </div>
                                :
                                <EmptyList length={news.data.length} message="No News Found" />
                            }
                        </div>
                    </div>
                </MaxWidthWrapper>
            </div>


            {/* features */}
            <div className='my-20'>
                <MaxWidthWrapper>
                    <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-5 text-white'>

                        {features.map((feature, i) => (
                            <div key={i} className="flex flex-col bg-violet-400 dark:bg-violet-700 p-5 rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
                                <div className='flex space-x-2 items-center '>
                                    <div className='p-2 bg-white/10 rounded-full'>
                                        {feature.icon}
                                    </div>
                                    <span className='text-xl font-bold'>{feature.title}</span>
                                </div>
                                <div className='h-1 w-24 bg-gradient-to-r from-white my-2' />
                                <span className='text-sm'>{feature.description}</span>
                            </div>
                        ))}

                    </div>
                </MaxWidthWrapper>
            </div>


            {/* Services Section */}
            <div className='py-10'>
                <div className='mb-10 text-center'>
                    <h1 className='text-2xl md:text-4xl font-bold lg:text-5xl text-gray-800 dark:text-gray-200'>Our Services</h1>
                </div>
                <MaxWidthWrapper>
                    <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-5'>
                        {services.map((service, i) => (
                            <div key={i} className="flex flex-col items-center border border-border p-5 rounded-xl shadow-lg dark:shadow-white/5 hover:-translate-y-1 transition-all gap-2 text-center">
                                <div className='p-3 bg-rose-100 dark:bg-rose-500/10 rounded-full w-fit'>
                                    {service.icon}
                                </div>
                                <span className='text-xl font-bold'>{service.title}</span>
                                <Separator />
                                <p className='text-sm'>{service.description}</p>
                            </div>
                        ))}
                    </div>
                </MaxWidthWrapper>
            </div>


            {/* Consultation Section */}
            <div className="py-10 bg-gradient-to-br from-blue-50 dark:from-background">
                <MaxWidthWrapper className='grid md:grid-cols-2 lg:grid-cols-2 gap-5 text-white'>
                    <div className='flex flex-col space-y-16 items-center justify-center'>

                        <div className="space-y-2">
                            <h1 className='text-gray-800 dark:text-gray-100 text-3xl sm:text-4xl lg:text-5xl font-bold'>Looking for an Expert?</h1>
                            <p className='text-gray-600 dark:text-neutral-300'>
                                We have a team of highly skilled and experienced doctors and nurses who are ready to help you with any healthcare-related concerns.
                            </p>
                        </div>

                        <div className='w-72'>
                            <Link to={{ pathname: '/home/doctors' }} className='flex gap-1 items-center justify-center h-16 font-bold rounded-3xl border-blue-500 border-2 text-xl text-blue-500 hover:shadow-xl hover:scale-105 transition-all duration-300'>
                                <Stethoscope />
                                Find a Doctor
                            </Link>
                        </div>
                    </div>
                    <div>
                        <Lottie animationData={consulationAnimation} loop={true} className='w-full h-full object-cover' />
                    </div>
                </MaxWidthWrapper>
            </div>

        </div >


    )
}






export default HomePage
