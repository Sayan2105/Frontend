import { authSelector } from '@/features/auth/authSlice'
import { useAppSelector } from '@/hooks'
import { HTMLAttributes } from 'react'
import { Button } from './ui/button'
import { Airplay, Settings } from 'lucide-react';
import UserImage from './user-image';

interface userModelProps extends HTMLAttributes<HTMLDivElement> {
    onLogout: () => void;
    onProfile: () => void;
    onDashboard: () => void;
}


const UserModel = ({ onLogout, onProfile, onDashboard, ...props }: userModelProps) => {

    const session = useAppSelector(authSelector)

    return (
        <>
            <div {...props} className='fixed top-0 left-0 h-screen w-full transition-all z-[120] bg-[#0000009c]'></div>
            <div className="bg-white dark:bg-background w-[300px] p-2.5 z-[150] flex flex-col ring-1 shadow rounded-xl fixed top-16 right-2 sm:right-5 ring-gray-200 dark:ring-border">
                <div className="flex items-center my-2">
                    <UserImage url={session.user?.image!} gender={session.user?.gender!}
                        width='w-fit'
                        imageClass='w-14 h-14'
                    />
                    <div className="text-sm tracking-tight leading-tight">
                        <p className="font-semibold">{session.user?.name}</p>
                        <p>{session.user?.email}</p>
                    </div>
                </div>
                <div className="h-px bg-gray-200 dark:bg-border" />
                <div className="my-2 text-sm  cursor-pointer flex flex-col gap-y-2">
                    {/* Account Button */}
                    <div className="hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-lg" onClick={onProfile}>
                        <p className='text-sm text-slate-800 dark:text-white flex items-center'><Settings className='w-5 mr-1' /> Account</p>
                    </div>
                    {/* Separator */}
                    <div className="h-px bg-gray-200 dark:bg-border" />
                    <div className="hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-lg" onClick={onDashboard}>
                        <p className='text-sm text-slate-800  dark:text-white flex items-center'><Airplay className='w-5 mr-1' /> Dashboard</p>
                    </div>
                    {/* Separator */}
                    <div className="h-px bg-gray-200 dark:bg-border" />
                    <Button size={'sm'} variant={'destructive'} onClick={onLogout}>logout</Button>
                </div>
            </div>
        </>
    )
}

export default UserModel