import { AuthContext } from '@/contexts/authContext';
import { Airplay, Loader, Settings } from 'lucide-react';
import { HTMLAttributes, useContext } from 'react';
import { Button } from './ui/button';
import UserImage from './user-image';

interface userModelProps extends HTMLAttributes<HTMLDivElement> {
    onLogout: () => void;
    onProfile: () => void;
    onDashboard: () => void;
}


const UserModel = ({ onLogout, onProfile, onDashboard, ...props }: userModelProps) => {

    const { authUser, isLoggingOut } = useContext(AuthContext)

    return (
        <>
            <div {...props} className='fixed top-0 left-0 h-screen w-full transition-all z-[120] bg-[#0000009c]'></div>
            <div className="bg-white dark:bg-background w-[300px] p-2.5 z-[150] flex flex-col ring-1 shadow rounded-xl fixed top-16 right-2 sm:right-5 ring-gray-200 dark:ring-border">
                <div className="flex items-center my-2">
                    <UserImage url={authUser?.image!} gender={authUser?.gender!}
                        width='w-fit'
                        imageClass='w-14 h-14'
                    />
                    <div className="text-sm tracking-tight leading-tight">
                        <p className="font-semibold">{authUser?.name}</p>
                        <p>{authUser?.email}</p>
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
                    <Button size={'sm'} variant={'destructive'} onClick={onLogout}>logout {isLoggingOut && <Loader className='animate-spin w-5' />}</Button>
                </div>
            </div>
        </>
    )
}

export default UserModel