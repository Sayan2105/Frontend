import { useLocation } from "react-router-dom"
import Aside from "./components/Aside"
import Navbar from "./components/Navbar"
import HomepageNavbar from "./components/homepage-navbar"

interface SidebarProviderProps {
    children: React.ReactNode
}

const HIDE_SIDEBAR_FOR = ['/signin', '/', '/create-admin', '/forgot-password', '/reset-password']

const LayoutWrapper = ({ children }: SidebarProviderProps) => {
    const path = useLocation().pathname
    const hideSidebar = HIDE_SIDEBAR_FOR.includes(path) || path.startsWith('/home')
    const isHomepageNav = path === '/' || path.startsWith('/home') || path === '/signin'

    return (
        <>
            {isHomepageNav ? <HomepageNavbar /> : <Navbar />}
            <div className="flex min-h-[calc(100vh-64px)] w-full">
                {!hideSidebar && <Aside />}
                <main className="flex-1 flex flex-col w-full overflow-hidden">
                    {children}
                </main>
            </div>
        </>
    )
}

export default LayoutWrapper