import { AuthContext } from "@/contexts/authContext"
import useNavigation from "@/hooks/useNavigation"
import { cn } from "@/lib/utils"
import { ChevronDownIcon, LinkIcon, Menu, User } from "lucide-react"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { ModeToggle } from "./mode-toggle"
import { Button, buttonVariants } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"



const HomepageNavbar = () => {

    const [isOpen, setIsOpen] = useState(false)
    const { authUser } = useContext(AuthContext)
    const { HomepageNavigations } = useNavigation()
    // making routes static
    const Routes = (authUser?.role === 'patient') ? authUser?.role : 'admin'

    const closeMenu = () => setIsOpen(false)

    return (
        <>
            {/* backdrop */}
            {isOpen && (
                <div
                    onClick={() => closeMenu()}
                    className={cn("fixed top-16 left-0 right-0 bottom-0 bg-black/80 z-40 sm:hidden")} />
            )}


            {/* Header */}
            <div className="sticky top-0 z-40 bg-white dark:bg-background px-2.5 lg:px-10 border-b border-border h-16 flex items-center justify-between overflow-none">

                <div className="relative flex items-center gap-x-1 z-50">
                    <img src="/logo.png" alt="logo" className="w-12 h-12 rounded-full object-cover" />
                    <p className="font-semibold text-gray-900 dark:text-neutral-100">Vertica Healthcare</p>
                    <Link to={{ pathname: '/' }} className="absolute inset-0" />
                </div>


                <div className={cn("fixed md:static w-56 md:w-auto !top-0 left-0 h-screen p-5 gap-1 items-start flex flex-col md:flex-row md:h-full md:items-center gap-x-2 bg-white dark:bg-background md:bg-transparent md:dark:bg-transparent border-r border-border border-dashed md:border-none transition-all duration-200", isOpen ? 'left-0' : '-left-[100%]')}>

                    <div className="pt-14 md:hidden" />

                    {HomepageNavigations.map((item) => (
                        item.children ? (
                            <div key={item.name}> {/* Or item.id if available */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant={item.active ? "default" : "ghost"} className="flex space-x-2">
                                            <LinkIcon /> {item.name} <ChevronDownIcon />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="space-y-1" align="end">
                                        {item.children.map((child) => (
                                            <DropdownMenuItem asChild key={child.name}> {/* Or child.href / child.id */}
                                                <Link
                                                    to={{ pathname: `${child.href}` }}
                                                    onClick={closeMenu}
                                                    className={cn("flex space-x-2 p-1 cursor-pointer", child.active && "bg-blue-500 text-white")}
                                                >
                                                    <child.icon className="w-5 h-5" />
                                                    <p className="text-sm">{child.name}</p>
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        ) : (
                            <Link
                                key={item.name} // Or item.href or item.id
                                to={{ pathname: `${item.href}` }}
                                onClick={closeMenu}
                                className={buttonVariants({
                                    variant: item.active ? "default" : "ghost",
                                })}
                            >
                                <item.icon /> {item.name}
                            </Link>
                        )
                    ))}


                    {authUser ?
                        <Link to={{ pathname: `/${Routes}/dashboard` }} onClick={closeMenu} className={buttonVariants({
                            variant: "outline",
                            className: "mt-5 md:mt-0"
                        })}>
                            Dashboard ✨
                        </Link>
                        :
                        <Link to={{ pathname: '/signin' }} onClick={closeMenu} className={buttonVariants({
                            variant: "default",
                            className: "mt-5 md:mt-0"
                        })}>
                            Log In < User />
                        </Link>
                    }

                </div>

                <div className=" flex space-x-3">
                    <ModeToggle />

                    {/* Hamburger menu for mobile */}
                    <div className="block md:hidden p-2 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full text-white shadow-green-500 cursor-pointer active:scale-95" onClick={() => setIsOpen(!isOpen)}>
                        <Menu className="w-6 h-6" />
                    </div>
                </div>

            </div >
        </>
    )
}



export default HomepageNavbar