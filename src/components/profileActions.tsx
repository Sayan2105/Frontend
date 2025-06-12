import React from 'react'

const ProfileActions = () => {
    return (
        <div className='flex gap-x-2'>
            {(session.user?.role === 'admin' || session.user?.id === profile?.id) &&
                <Key className='text-green-600 w-4 h-4 cursor-pointer active:scale-95' onClick={() => { router(`/admin/profile/resetpassword/${profile?.id}`) }} />
            }
            {['admin'].includes(session.user?.role!) &&
                <>
                    <Pencil className='text-yellow-600 w-4 h-4 cursor-pointer active:scale-95' onClick={() => { router(`/admin/profile/edit/${profile?.id}`) }} />
                    <Trash className='text-red-600 w-4 h-4 cursor-pointer active:scale-95' onClick={() => setAlert(true)} />
                </>
            }
        </div>
    )
}

export default ProfileActions