import AlertModel from '@/components/alertModel';
import IconMenu from '@/components/icon-menu';
import UserImage from '@/components/user-image';
import { cn } from '@/lib/utils';
import { Calendar, Circle, Droplets, Guitar, IdCard, IdCardIcon, Key, Mail, MapPin, NutOff, Pencil, Phone, Trash, User } from 'lucide-react';
import { ReactNode, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RegisterPatient from '../register/patient-signup';
import usePatient from './handlers';
import { AuthContext } from '@/contexts/authContext';




const PatientProfile = () => {

    const { id } = useParams();
    const router = useNavigate()
    const { authUser } = useContext(AuthContext)

    const { isPending, getPatientById, handlePatient, onDelete, current, confirmationProps, form, setForm } = usePatient()



    useEffect(() => {
        getPatientById(+id!)
    }, [id])



    return (
        <section className='flex flex-col gap-10 pt-5 pb-20'>

            {/* Top section */}
            <div className='relative p-10 rounded-3xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'>

                {/* Main content */}
                <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
                    <div className="relative group">
                        <UserImage
                            url={current?.image!}
                            gender={current?.gender!}
                            width='w-fit'
                            imageClass='w-40 h-40 border-4 border-gray-200 transition-all duration-300 group-hover:scale-105 group-hover:border-gray-300'
                        />
                    </div>

                    <div className='flex flex-col gap-y-4 text-center sm:text-left'>
                        <div>
                            <h1 className='font-bold text-3xl md:text-5xl text-gray-800 dark:text-white mb-2 drop-shadow-sm'>
                                {current?.name}
                            </h1>
                            <div className="h-1 w-20 bg-gradient-to-r from-gray-400 to-transparent rounded-full mx-auto sm:mx-0"></div>
                        </div>

                        <div className='flex gap-x-3 justify-center sm:justify-start'>
                            {(authUser?.role === 'admin' || authUser?.id === current?.id) &&
                                <>
                                    <div className="group p-3 bg-gray-100/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-600 hover:bg-gray-200/80 dark:hover:bg-gray-700/60 transition-all duration-300 hover:scale-110 hover:shadow-lg dark:hover:shadow-gray-900/50">
                                        <Key className='text-gray-600 dark:text-gray-300 w-5 h-5 cursor-pointer transition-transform duration-200 group-active:scale-90'
                                            onClick={() => { router(`../resetpassword/${id}`) }} />
                                    </div>

                                    <div className="group p-3 bg-emerald-100/80 dark:bg-emerald-900/30 backdrop-blur-sm rounded-full border border-emerald-200 dark:border-emerald-700 hover:bg-emerald-200/80 dark:hover:bg-emerald-800/40 transition-all duration-300 hover:scale-110 hover:shadow-lg dark:hover:shadow-emerald-900/50">
                                        <Pencil className='text-emerald-600 dark:text-emerald-400 w-5 h-5 cursor-pointer transition-transform duration-200 group-active:scale-90'
                                            onClick={() => setForm(true)} />
                                    </div>
                                    <div className="group p-3 bg-red-100/80 dark:bg-red-900/30 backdrop-blur-sm rounded-full border border-red-200 dark:border-red-700 hover:bg-red-200/80 dark:hover:bg-red-800/40 transition-all duration-300 hover:scale-110 hover:shadow-lg dark:hover:shadow-red-900/50">
                                        <Trash className='text-red-600 dark:text-red-400 w-5 h-5 cursor-pointer transition-transform duration-200 group-active:scale-90'
                                            onClick={() => onDelete(current?.id!)} />
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* Heading */}
            <div className='space-y-3'>
                <div className="flex space-x-1">
                    <div className='p-2 bg-gradient-to-r from-violet-500 to-rose-500 rounded-md shadow-lg'>
                        <User className='text-white' />
                    </div>
                    <h1 className='font-semibold text-2xl'>Profile Information</h1>
                </div>

                <div className='h-0.5 w-full bg-gradient-to-r from-violet-500 to-blue-500' />
            </div>

            {/* personal information */}
            <InformationCard
                title='Personal Information'
                icon={<User className='text-white' />}>

                <IconMenu
                    iconBg='bg-blue-100 dark:bg-blue-500/10'
                    icon={<IdCard className='text-blue-500' />}
                    title='ID'
                    value={current?.id!}
                />
                <IconMenu
                    iconBg='bg-rose-100 dark:bg-rose-500/10'
                    icon={<Phone className='text-rose-500' />}
                    title='Phone'
                    value={current?.phone!}
                />
                <IconMenu
                    iconBg='bg-red-100 dark:bg-red-500/10'
                    icon={<Mail className='text-red-500' />}
                    title='Email'
                    value={current?.email!}
                />
                <IconMenu
                    iconBg='bg-teal-100 dark:bg-teal-500/10'
                    icon={<Circle className='text-teal-500' />}
                    title='Gender'
                    value={current?.gender!}
                />
                <IconMenu
                    iconBg='bg-red-100 dark:bg-red-600/10'
                    icon={<Droplets className='text-red-600' />}
                    title='Blood Group'
                    value={current?.blood_group!}
                />
                <IconMenu
                    iconBg='bg-orange-100 dark:bg-orange-600/10'
                    icon={<Calendar className='text-orange-600' />}
                    title='DOB'
                    value={current?.dob!}
                />
                <IconMenu
                    iconBg='bg-pink-100 dark:bg-pink-600/10'
                    icon={<Guitar className='text-pink-600' />}
                    title='Marital Status'
                    value={current?.marital_status!}
                />
                <IconMenu
                    iconBg='bg-green-100 dark:bg-green-600/10'
                    icon={<User className='text-green-600' />}
                    title='Guardian'
                    value={current?.guardian_name!}
                />
                <IconMenu
                    iconBg='bg-amber-100 dark:bg-amber-600/10'
                    icon={<MapPin className='text-amber-600' />}
                    title='Current Address'
                    value={current?.address!}
                />
                <IconMenu
                    iconBg='bg-yellow-100 dark:bg-yellow-500/10'
                    icon={<NutOff className='text-yellow-500' />}
                    title='Alergies'
                    value={current?.alergies!}
                />
                <IconMenu
                    iconBg='bg-violet-100 dark:bg-violet-500/10'
                    icon={<IdCardIcon className='text-violet-500' />}
                    title='Aadhar'
                    value={current?.aadhar!}
                />
            </InformationCard>


            {/* alert model */}

            {confirmationProps.isOpen && (
                <AlertModel
                    cancel={() => confirmationProps.onCancel()}
                    continue={() => confirmationProps.onConfirm()}
                />
            )}

            {/* form modal */}

            {form && (
                <RegisterPatient
                    isPending={isPending}
                    Submit={(v) => { handlePatient(v, () => getPatientById(+id!)) }}
                    editDetails={current!}
                    onClick={() => { setForm(false) }}
                />
            )}


        </section>
    )
}



export default PatientProfile







const InformationCard = ({ children, title, icon, className }: { children: ReactNode, title: string, icon: ReactNode, className?: string }) => {

    return (
        <div className='flex flex-col shadow-lg dark:shadow-white/5 rounded-b-lg'>
            <div className={cn('flex gap-2 items-center p-5 rounded-t-lg bg-gradient-to-r from-violet-300 to-rose-300 dark:from-violet-800/50 dark:to-rose-300/50', className)}>
                <div className='p-2 bg-white/20 backdrop-blur-sm shadow-md rounded-md'>
                    {icon}
                </div>
                <h1 className='font-semibold text-xl text-white'>{title}</h1>
            </div>

            <div className="flex flex-col gap-5 p-5">
                {children}
            </div>

        </div>
    )
}