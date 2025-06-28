import { AuthContext } from "@/contexts/authContext"
import { SidebarContext } from "@/contexts/sidebar-provider"
import { useConfirmation } from "@/hooks/useConfirmation"
import { User } from "lucide-react"
import { useContext, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import AlertModel from "./alertModel"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { ModeToggle } from "./mode-toggle"
import { buttonVariants } from "./ui/button"
import UserImage from "./user-image"
import UserModel from "./userModel"



const Navbar = () => {

    const { toggleSidebar } = useContext(SidebarContext)
    const { authUser, logout } = useContext(AuthContext)
    const { confirm, confirmationProps } = useConfirmation()

    const path = useLocation().pathname

    const router = useNavigate()

    const [isUserModel, setUserModel] = useState<boolean>(false)

    const onLogout = async () => {
        const isConfirm = await confirm()
        if (!isConfirm) return null
        await logout()
        setUserModel(false)
    }

    const Routes = (authUser?.role === 'patient') ? authUser?.role : 'admin'

    return (
        <>
            <section className="h-16 bg-white dark:bg-background w-full z-[100] sticky inset-x-0 top-0 border-b border-border">
                <MaxWidthWrapper className="lg:px-10">
                    <header className="h-full flex justify-between items-center">

                        <div className="flex items-center gap-x-1">
                            <img src="/logo.png" alt="logo" className="w-12 h-12 rounded-full object-cover" />
                            <div>
                                <Link to={{ pathname: path !== '/signin' ? `/${Routes}/dashboard` : '/' }} className="tracking-tight cursor-pointer z-[100] select-none">
                                    Vertica Healthcare
                                </Link>
                            </div>
                        </div>

                        <div className="flex h-full items-center gap-x-3">


                            {/* Dark mode */}

                            <ModeToggle />

                            {/* user */}
                            {authUser ?
                                <>
                                    < div onClick={() => { setUserModel(!isUserModel) }} className="active:scale-90 transition-all cursor-pointer" >
                                        <UserImage url={authUser?.image!} gender={authUser?.gender!}
                                            width='w-fit'
                                            imageClass='w-10 h-10'
                                        />
                                    </div>

                                    {/* Hamburger menu for mobile */}

                                    <div onClick={toggleSidebar}
                                        className="w-10 rounded-md flex flex-col gap-2 p-2 shadow ring-1 ring-gray-200 bg-gray-100 transition-all active:scale-95 cursor-pointer sm:hidden">
                                        <div className="h-px bg-gray-700 w-full"></div>
                                        <div className="h-px bg-gray-700 w-full"></div>
                                        <div className="h-px bg-gray-700 w-full"></div>
                                    </div>

                                </>
                                :
                                <Link to={{ pathname: '/signin' }} className={buttonVariants({
                                    variant: "default",
                                    size: 'sm'
                                })}>log In <User /> </Link>
                            }
                        </div >
                    </header >
                </MaxWidthWrapper >

            </section >


            {/* user model */}

            {
                isUserModel && <UserModel onClick={() => setUserModel(false)} onLogout={onLogout}
                    onProfile={() => {

                        authUser?.role !== "patient" ? router(`/staff/${authUser?.id}`)
                            :
                            authUser?.role === "patient" ? router(`/patient/profile/${authUser.id}`) : alert('Invalid user')
                        setUserModel(false)
                    }}

                    onDashboard={() => {
                        router(`/${Routes}/dashboard`), setUserModel(false)
                    }}
                />
            }


            {/* Alert Modal */}

            {confirmationProps.isOpen && <AlertModel
                cancel={() => { confirmationProps.onCancel() }}
                continue={() => confirmationProps.onConfirm()}
            />}

        </>

    )
}

export default Navbar