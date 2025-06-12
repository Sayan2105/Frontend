import AlertModel from '@/components/alertModel';
import IconMenu from '@/components/icon-menu';
import UserImage from '@/components/user-image';
import { authSelector } from '@/features/auth/authSlice';
import { useAppSelector } from '@/hooks';
import { cn, currencyFormat } from '@/lib/utils';
import StaffApi from '@/services/staff-api';
import { StaffProfile } from '@/types/staff/staff';
import { Banknote, BriefcaseBusiness, Calendar, Circle, Code, CreditCard, Droplets, Eye, FileText, GraduationCap, Guitar, HandCoins, Hospital, IdCard, Key, Landmark, Link, Mail, MapPin, Merge, NotebookTabs, Pencil, Phone, Pickaxe, Slice, Trash, User, UserCog } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';




const Staffprofile = () => {

    const { id } = useParams();
    const router = useNavigate()
    const [alert, setAlert] = useState<boolean>(false)
    const session = useAppSelector(authSelector)
    const [profile, setProfile] = useState<StaffProfile>()


    const onDelete = async () => {
        try {
            const data = await StaffApi.deleteStaffProfile(Number(id))
            toast.success(data.message)
            router('..')
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    useEffect(() => {

        (async function () {
            try {
                if (!id) return null
                const data = await StaffApi.getStaffById(+id)
                setProfile(data)
            } catch ({ message }: any) {
                toast.error(message)
            }
        })() // IIFE

    }, [id])



    return (
        <section className='flex flex-col pt-5 pb-20 gap-10'>

            {/* Top section */}
            <div className='relative p-10 rounded-3xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'>
                {/* Main content */}
                <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8">
                    <div className="relative group">
                        <UserImage
                            url={profile?.image!}
                            gender={profile?.gender!}
                            width='w-fit'
                            imageClass='w-40 h-40 border-4 border-gray-300 dark:border-gray-600 rounded-full shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg'
                        />
                    </div>

                    <div className='flex flex-col gap-y-4 text-center sm:text-left'>
                        <div>
                            <h1 className='font-bold text-3xl md:text-5xl text-gray-800 dark:text-white mb-2 drop-shadow-sm'>
                                {profile?.name}
                            </h1>
                            <div className="h-1 w-24 bg-gradient-to-r from-gray-400 via-gray-300 to-transparent rounded-full mx-auto sm:mx-0"></div>
                        </div>

                        <div className='flex gap-x-4 justify-center sm:justify-start'>
                            {(session.user?.role === 'admin' || session.user?.id === profile?.id) && (
                                <div className="group p-3 bg-white/70 dark:bg-gray-800/50 backdrop-blur-md rounded-full border border-gray-300 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg dark:hover:shadow-gray-900/50">
                                    <Key className='text-gray-600 dark:text-gray-300 w-5 h-5 cursor-pointer transition-transform duration-200 group-active:scale-90' onClick={() => { router(`./resetpassword`) }} />
                                </div>
                            )}

                            {session.user?.role === 'admin' && (
                                <>
                                    <div className="group p-3 bg-emerald-100/70 dark:bg-emerald-900/40 backdrop-blur-md rounded-full border border-emerald-300 dark:border-emerald-700 hover:bg-emerald-200 dark:hover:bg-emerald-800 transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg dark:hover:shadow-emerald-900/50">
                                        <Pencil className='text-emerald-600 dark:text-emerald-400 w-5 h-5 cursor-pointer transition-transform duration-200 group-active:scale-90' onClick={() => { router(`./edit`) }} />
                                    </div>
                                    <div className="group p-3 bg-red-100/70 dark:bg-red-900/40 backdrop-blur-md rounded-full border border-red-300 dark:border-red-700 hover:bg-red-200 dark:hover:bg-red-800 transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg dark:hover:shadow-red-900/50">
                                        <Trash className='text-red-600 dark:text-red-400 w-5 h-5 cursor-pointer transition-transform duration-200 group-active:scale-90' onClick={() => setAlert(true)} />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Heading */}
            <div className='space-y-3 '>
                <div className="flex space-x-1">
                    <div className='p-2 bg-gradient-to-r from-violet-500 to-rose-500 rounded-md shadow-lg'>
                        <User className='text-white' />
                    </div>
                    <h1 className='font-semibold text-2xl'>Profile Information</h1>
                </div>

                <div className='h-0.5 w-full bg-gradient-to-r from-violet-500 to-blue-500' />
            </div>

            <div className="grid lg:grid-cols-3 gap-5">
                {/* Personal Information */}
                <InformationCard
                    title='Personal Information'
                    icon={<User className='text-white' />}>

                    <IconMenu
                        iconBg='bg-blue-100 dark:bg-blue-500/10'
                        icon={<IdCard className='text-blue-500' />}
                        title='ID'
                        value={profile?.id!}
                    />
                    <IconMenu
                        iconBg='bg-rose-100 dark:bg-rose-500/10'
                        icon={<Phone className='text-rose-500' />}
                        title='Phone'
                        value={profile?.phone!}
                    />
                    <IconMenu
                        iconBg='bg-yellow-100 dark:bg-yellow-500/10'
                        icon={<Phone className='text-yellow-500' />}
                        title='Emergency Contact'
                        value={profile?.emergency_contact!}
                    />
                    <IconMenu
                        iconBg='bg-red-100 dark:bg-red-500/10'
                        icon={<Mail className='text-red-500' />}
                        title='Email'
                        value={profile?.email!}
                    />
                    <IconMenu
                        iconBg='bg-teal-100 dark:bg-teal-500/10'
                        icon={<Circle className='text-teal-500' />}
                        title='Gender'
                        value={profile?.email!}
                    />
                    <IconMenu
                        iconBg='bg-red-100 dark:bg-red-600/10'
                        icon={<Droplets className='text-red-600' />}
                        title='Blood Group'
                        value={profile?.blood_group!}
                    />
                    <IconMenu
                        iconBg='bg-orange-100 dark:bg-orange-600/10'
                        icon={<Calendar className='text-orange-600' />}
                        title='DOB'
                        value={profile?.dob!}
                    />
                    <IconMenu
                        iconBg='bg-pink-100 dark:bg-pink-600/10'
                        icon={<Guitar className='text-pink-600' />}
                        title='Marital Status'
                        value={profile?.marital_status!}
                    />
                    <IconMenu
                        iconBg='bg-green-100 dark:bg-green-600/10'
                        icon={<User className='text-green-600' />}
                        title='Father Name'
                        value={profile?.father_name!}
                    />
                    <IconMenu
                        iconBg='bg-violet-100 dark:bg-violet-600/10'
                        icon={<User className='text-violet-600' />}
                        title='Mother Name'
                        value={profile?.mother_name!}
                    />
                    <IconMenu
                        iconBg='bg-amber-100 dark:bg-amber-600/10'
                        icon={<MapPin className='text-amber-600' />}
                        title='Current Address'
                        value={profile?.current_address!}
                    />
                    <IconMenu
                        iconBg='bg-yellow-100 dark:bg-yellow-500/10'
                        icon={<MapPin className='text-yellow-500' />}
                        title='Permanant Address'
                        value={profile?.permanent_address!}
                    />
                </InformationCard>

                {/* Professional Information */}
                <InformationCard
                    icon={<BriefcaseBusiness className='text-white' />}
                    title='Professional Information'>

                    <IconMenu
                        iconBg='bg-green-100 dark:bg-green-600/10'
                        icon={<GraduationCap className='text-green-600' />}
                        title='Qualification'
                        value={profile?.qualification!}
                    />
                    <IconMenu
                        iconBg='bg-red-100 dark:bg-red-600/10'
                        icon={< UserCog className='text-red-600' />}
                        title='Role'
                        value={profile?.role?.name!}
                    />
                    <IconMenu
                        iconBg='bg-yellow-100 dark:bg-yellow-600/10'
                        icon={<Hospital className='text-yellow-600' />}
                        title='Department'
                        value={profile?.department!}
                    />
                    <IconMenu
                        iconBg='bg-orange-100 dark:bg-orange-600/10'
                        icon={<Slice className='text-orange-600' />}
                        title='Specialist'
                        value={profile?.specialist?.map(item => item.name).join(', ')!}
                    />
                    <IconMenu
                        iconBg='bg-violet-100 dark:bg-violet-600/10'
                        icon={<Pickaxe className='text-violet-600' />}
                        title='Work Experience'
                        value={profile?.work_experience!}
                    />
                    <IconMenu
                        iconBg='bg-red-100 dark:bg-red-400/10'
                        icon={<Merge className='text-red-400' />}
                        title='Date of joining'
                        value={profile?.date_of_joining!}
                    />
                    <IconMenu
                        iconBg='bg-teal-100 dark:bg-teal-600/10'
                        icon={<Banknote className='text-teal-600' />}
                        title='Normal Fees'
                        value={currencyFormat(Number(profile?.normal_fees))!}
                    />
                    <IconMenu
                        iconBg='bg-teal-100 dark:bg-teal-500/10'
                        icon={<Banknote className='text-teal-500' />}
                        title='Emergency Fees'
                        value={currencyFormat(Number(profile?.emergency_fees))!}
                    />
                    <IconMenu
                        iconBg='bg-yellow-100 dark:bg-yellow-300/10'
                        icon={<HandCoins className='text-yellow-300' />}
                        title='Salary'
                        value={currencyFormat(Number(profile?.salary))!}
                    />


                </InformationCard>

                {/* Identification */}
                {(session.user?.role === 'admin' || session.user?.id === profile?.id) &&
                    <InformationCard
                        icon={<CreditCard className='text-white' />}
                        title='Identification'
                    >

                        <IconMenu
                            iconBg='bg-blue-100 dark:bg-blue-500/10'
                            icon={<IdCard className='text-blue-500' />}
                            title='PAN Number'
                            value={profile?.PAN}
                        />
                        <IconMenu
                            iconBg='bg-green-100 dark:bg-green-500/10'
                            icon={<IdCard className='text-green-500' />}
                            title='National ID'
                            value={profile?.national_identification_number}
                        />
                        <IconMenu
                            iconBg='bg-red-100 dark:bg-red-500/10'
                            icon={<IdCard className='text-red-500' />}
                            title='Local ID'
                            value={profile?.local_identification_number}
                        />
                        <IconMenu
                            iconBg='bg-yellow-100 dark:bg-yellow-500/10'
                            icon={<IdCard className='text-yellow-500' />}
                            title='License Number'
                            value={profile?.license_number}
                        />
                    </InformationCard>
                }

                {/* Bank Information */}
                {(session.user?.role === 'admin' || session.user?.id === profile?.id) &&
                    <InformationCard
                        icon={<Landmark className='text-white' />}
                        title='Bank Information'
                        className='from-orange-300 to-yellow-300 dark:from-orange-800/50 dark:to-yellow-800/50 '
                    >
                        <IconMenu
                            iconBg='bg-yellow-100 dark:bg-yellow-500/10'
                            icon={<User className='text-yellow-500' />}
                            title='Nominee Name'
                            value={profile?.nominee_name}
                        />
                        <IconMenu
                            iconBg='bg-rose-100 dark:bg-rose-500/10'
                            icon={<Link className='text-rose-500' />}
                            title='Relation'
                            value={profile?.relation}
                        />
                        <IconMenu
                            iconBg='bg-blue-100 dark:bg-blue-500/10'
                            icon={<NotebookTabs className='text-blue-500' />}
                            title='Account Number'
                            value={profile?.account_number}
                        />
                        <IconMenu
                            iconBg='bg-green-100 dark:bg-green-500/10'
                            icon={<User className='text-green-500' />}
                            title='Account Holder'
                            value={profile?.account_holder}
                        />
                        <IconMenu
                            iconBg='bg-red-100 dark:bg-red-500/10'
                            icon={<Landmark className='text-red-500' />}
                            title='Bank Name'
                            value={profile?.bank_name}
                        />
                        <IconMenu
                            iconBg='bg-yellow-100 dark:bg-yellow-500/10'
                            icon={<MapPin className='text-yellow-500' />}
                            title='Branch'
                            value={profile?.branch}
                        />
                        <IconMenu
                            iconBg='bg-red-100 dark:bg-red-500/10'
                            icon={<Code className='text-red-500' />}
                            title='Ifsc Code'
                            value={profile?.ifsc_code}
                        />
                    </InformationCard>
                }

                {/* Documents */}
                {(session.user?.role === 'admin' || session.user?.id === profile?.id) &&
                    <InformationCard
                        icon={<FileText className='text-white' />}
                        title='Documents'
                        className='from-green-300 to-violet-300 dark:from-green-800/50 dark:to-violet-800/50' >
                        <div className=' grid  gap-5'>
                            <ViewDocument image={profile?.aadhar_image!} docName='Aadhar' />
                            <ViewDocument image={profile?.pan_image!} docName='PAN' />
                            <ViewDocument image={profile?.license_image!} docName='License' />
                            <ViewDocument image={profile?.diploma_image!} docName='Diploma Certificate' />
                            <ViewDocument image={profile?.graduation_image!} docName='Graduation Certificate' />
                            <ViewDocument image={profile?.masters_image!} docName='Masters Certificate' />
                        </div>
                    </InformationCard>
                }
            </div>

            {alert && <AlertModel cancel={() => { setAlert(false) }} continue={() => { onDelete() }} />}
        </section >
    )
}

export default Staffprofile







const ViewDocument = ({ image, docName }: { image: string, docName: string }) => {
    const view = () => {
        window.open(`${import.meta.env.VITE_APP_API_URL}/images/${image}`, '_blank')
    }
    return (
        <div className='border-2 border-border border-dashed rounded-lg p-5'>
            <h1 className='className="text-lg text-muted-foreground font-medium"'>{docName}</h1>
            <div className="flex flex-col gap-2 justify-center items-center  h-20">
                {image ?
                    <button
                        onClick={() => view()}
                        className='flex gap-2 text-white py-2 px-4 bg-gradient-to-r from-violet-500 to-rose-500 rounded-md shadow-lg hover:from-violet-600 hover:to-rose-600 hover:shadow-xl'>
                        <Eye /> View Document
                    </button>
                    :
                    <p className='text-red-500 w-fit py-1 px-2 rounded-lg bg-red-100 dark:bg-red-500/10 animate-pulse text-sm'>
                        Not Uploaded
                    </p>
                }
            </div>
        </div>
    )
}




const InformationCard = ({ children, title, icon, className }: { children: ReactNode, title: string, icon: ReactNode, className?: string }) => {

    return (
        <div className='flex flex-col shadow-lg dark:shadow-white/5 rounded-b-lg'>
            <div className={cn('flex gap-2 items-center p-5 rounded-t-lg bg-gradient-to-r from-violet-300 to-rose-300 dark:from-violet-800/50 dark:to-rose-800/50', className)}>
                <div className="relative p-3 bg-white/20 dark:bg-white/15 backdrop-blur-sm rounded-xl shadow-lg">
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