import consulationAnimation from '@/assets/animation/consultation.json'
import heroAnimation from '@/assets/animation/hero.json'
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
import { Player } from '@lottiefiles/react-lottie-player'
import Autoplay from "embla-carousel-autoplay"
import { FileText, Globe, Heart, Newspaper, NotepadText, Stethoscope } from 'lucide-react'
import { motion } from 'motion/react'
import { CSSProperties, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
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
            <div className='pt-14 pb-16 lg:px-20 px-2.5 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-background dark:to-slate-800 relative rounded-b-3xl md:rounded-b-[50px]'>
                <div className='size-48 bg-blue-500/10 rounded-full absolute -left-16 -top-16 blur-3xl' />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className='relative px-5 py-2 z-10 rounded-full bg-white/80 dark:bg-background/80 backdrop-blur-sm border border-blue-100 dark:border-blue-950 w-fit flex space-x-2 shadow-sm items-center mb-5'>
                    <Heart className='text-blue-500 w-5 h-5' />
                    <span className='font-medium text-gray-800 dark:text-neutral-200 text-sm'>Caring for Your Health Since 1999</span>
                </motion.div>

                <div className='grid lg:grid-cols-4 gap-10 lg:gap-0 min-h-[5vh]'>
                    {/* Text Content & Button */}
                    <div className="lg:col-span-2 flex flex-col space-y-5">
                        <div className='h-full'>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="flex flex-col gap-y-5 h-full w-full"
                            >
                                <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight">
                                    Welcome to Vertica Healthcare
                                </h1>

                                <p className="text-gray-700 dark:text-neutral-200 text-2xl md:text-4xl tracking-tight leading-tight font-medium">
                                    Efficiency in Care, Excellence in Service
                                </p>

                                <p className="text-gray-600 dark:text-neutral-300 max-w-4xl text-lg leading-relaxed">
                                    Here, you can efficiently manage patient records, appointments, medical staff, and hospital operations. Easily access key data, track ongoing treatments, and ensure smooth workflows for enhanced patient care and hospital efficiency.
                                </p>

                                <div className='grid sm:grid-cols-2 gap-5'>
                                    <div>
                                        <a
                                            className='flex gap-2 items-center justify-center h-16 rounded-2xl border-blue-500 border-2 text-xl text-white bg-blue-500 hover:bg-blue-600 hover:shadow-lg transition-all duration-300'
                                            href="tel:+91-1234567890">
                                            Emergency: +91-1234567890
                                        </a>
                                    </div>
                                    <Link to={{ pathname: '/home/available-doctors' }} className='flex gap-2 items-center justify-center h-16 font-semibold rounded-2xl border-blue-500 border-2 text-xl text-blue-500 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 hover:shadow-lg transition-all duration-300'>
                                        <NotepadText />
                                        Book Appointment
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Hero Animation */}
                    <div className="lg:col-span-2 mx-auto flex flex-col justify-center">
                        <div className='w-80 sm:w-[500px] lg:w-[500px]'>
                            <Player autoplay src={heroAnimation} loop={true} className='w-full h-full object-cover' />
                        </div>
                    </div>
                </div>
            </div>

            <div className='h-1 bg-gradient-to-r from-violet-50 via-violet-400 to-blue-50  dark:from-violet-800/5 dark:via-violet-500 dark:to-blue-800/5 my-3 md:w-[600px] w-[300px] mx-auto rounded animate-bounce' />

            {/* Carousel Part */}
            <div className="py-20 bg-gradient-to-r from-orange-100 to-violet-100 dark:from-orange-900/20 dark:to-violet-900/20 rounded-t-3xl md:rounded-t-[50px]">
                <div className='mb-10 text-center'>
                    <h1 className='text-2xl md:text-4xl font-bold lg:text-5xl text-gray-800 dark:text-gray-200'>Overview & Latest News</h1>
                </div>

                <MaxWidthWrapper className='grid lg:grid-cols-3 gap-10 lg:px-10 justify-center'>
                    {/* Grid 1 - Keep original slider size */}
                    <div className='lg:col-span-2 rounded-2xl overflow-hidden shadow-xl bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm'>
                        <Carousel plugins={[Autoplay({ delay: 2000 })]}>
                            <CarouselContent>
                                <CarouselItem>
                                    <img src="/slider/h-1.jpg" alt="slider-1" className='object-cover w-full h-full' />
                                </CarouselItem>
                                <CarouselItem>
                                    <img src="/slider/h-2.jpg" alt="slider-2" className='object-cover w-full h-full' />
                                </CarouselItem>
                                <CarouselItem>
                                    <img src="/slider/h-3.jpg" alt="slider-3" className='object-cover w-full h-full' />
                                </CarouselItem>
                                <CarouselItem>
                                    <img src="/slider/h-4.jpg" alt="slider-4" className='object-cover w-full h-full' />
                                </CarouselItem>
                                <CarouselItem>
                                    <img src="/slider/h-5.jpg" alt="slider-5" className='object-cover w-full h-full' />
                                </CarouselItem>
                            </CarouselContent>
                            <CarouselNext className='absolute right-5 bg-white/20 backdrop-blur-sm border-none hover:bg-white/30' />
                            <CarouselPrevious className='absolute left-5 bg-white/20 backdrop-blur-sm border-none hover:bg-white/30' />
                        </Carousel>
                    </div>

                    {/* Grid 2 - News */}
                    <div className="rounded-2xl overflow-hidden shadow-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm h-fit">
                        <h1 className="p-3 text-xl font-semibold text-gray-900 dark:text-neutral-100 tracking-tight bg-white/30 dark:bg-slate-700/30 backdrop-blur-sm">
                            Latest News
                        </h1>

                        <div className="h-[475px] overflow-hidden group">
                            {news.data.length > 0 ? (
                                <div className='px-3 py-4 animate-marquee-top hover:animation-paused space-y-3'
                                    style={{ '--marquee-duration': `20s` } as CSSProperties}>
                                    {news.data.map((item, i) => (
                                        <Accordion key={i} type="single" collapsible>
                                            <AccordionItem value="item-1" className='border rounded-xl px-3 py-1 shadow-md bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm'>
                                                <AccordionTrigger>
                                                    <IconMenu
                                                        iconBg='bg-blue-500/10 backdrop-blur-sm'
                                                        icon={<Newspaper className='text-blue-600 dark:text-blue-400' />}
                                                        value={new Date(item.date).toDateString()}
                                                        title={item.title}
                                                    />
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    {item.description}

                                                    {(item.pdf || item.url) && <Separator className='my-2 bg-gray-200 dark:bg-slate-600' />}

                                                    <div className="flex space-x-2">
                                                        {item.url && (
                                                            <CustomTooltip message='Visit'>
                                                                <div className='bg-blue-500/10 hover:bg-blue-500/20 backdrop-blur-sm flex items-center w-fit rounded-full p-2 cursor-pointer relative transition-all duration-300'>
                                                                    <Globe className='text-blue-600 dark:text-blue-400 h-4 w-4' />
                                                                    <a href={item.url} target='_blank' className='absolute inset-0' />
                                                                </div>
                                                            </CustomTooltip>
                                                        )}

                                                        {item.pdf && (
                                                            <CustomTooltip message='See PDF'>
                                                                <div className='bg-purple-500/10 hover:bg-purple-500/20 backdrop-blur-sm flex items-center w-fit rounded-full p-2 cursor-pointer relative transition-all duration-300' onClick={() => { window.open(`${import.meta.env.VITE_APP_API_URL}/images/${item.pdf}`) }}>
                                                                    <FileText className='text-purple-600 dark:text-purple-400 h-4 w-4' />
                                                                </div>
                                                            </CustomTooltip>
                                                        )}
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    ))}
                                </div>
                            ) : (
                                <EmptyList length={news.data.length} message="No News Found" />
                            )}
                        </div>
                    </div>
                </MaxWidthWrapper>
            </div>

            {/* Features */}
            <div className='my-20'>
                <MaxWidthWrapper>
                    <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-5 text-white'>
                        {features.map((feature, i) => (
                            <div key={i} className="flex flex-col bg-gradient-to-br from-violet-500 to-purple-600 dark:from-violet-600 dark:to-purple-700 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                                <div className='flex space-x-3 items-center'>
                                    <div className='p-2.5 bg-white/20 backdrop-blur-sm rounded-xl'>
                                        {feature.icon}
                                    </div>
                                    <span className='text-xl font-semibold'>{feature.title}</span>
                                </div>
                                <div className='h-0.5 w-20 bg-white/40 my-3' />
                                <span className='text-sm text-white/90 leading-relaxed'>{feature.description}</span>
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
                            <div key={i} className="flex flex-col items-center bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-slate-700/50 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 gap-3 text-center">
                                <div className='p-3 bg-rose-100 dark:bg-rose-500/20 rounded-xl w-fit'>
                                    {service.icon}
                                </div>
                                <span className='text-xl font-semibold'>{service.title}</span>
                                <Separator className='bg-gray-200 dark:bg-slate-600' />
                                <p className='text-sm text-gray-600 dark:text-slate-300 leading-relaxed'>{service.description}</p>
                            </div>
                        ))}
                    </div>
                </MaxWidthWrapper>
            </div>

            {/* Consultation Section */}
            <div className="py-10 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-background dark:to-slate-800">
                <MaxWidthWrapper className='grid md:grid-cols-2 lg:grid-cols-2 gap-5 text-white'>
                    <div className='flex flex-col space-y-16 items-center justify-center'>
                        <div className="space-y-3">
                            <h1 className='text-gray-800 dark:text-gray-100 text-3xl sm:text-4xl lg:text-5xl font-bold'>Looking for an Expert?</h1>
                            <p className='text-gray-600 dark:text-neutral-300 text-lg leading-relaxed'>
                                We have a team of highly skilled and experienced doctors and nurses who are ready to help you with any healthcare-related concerns.
                            </p>
                        </div>

                        <div className='w-72'>
                            <Link to={{ pathname: '/home/available-doctors' }} className='flex gap-2 items-center justify-center h-16 font-semibold rounded-2xl border-blue-500 border-2 text-xl text-blue-500 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 hover:shadow-lg transition-all duration-300'>
                                <Stethoscope />
                                Find a Doctor
                            </Link>
                        </div>
                    </div>
                    <div>
                        <Player autoplay src={consulationAnimation} loop={true} className='w-full h-full object-cover' />
                    </div>
                </MaxWidthWrapper>
            </div>
        </div>
    )
}

export default HomePage