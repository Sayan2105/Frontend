import { useLocation } from "react-router-dom"
import Aside from "./components/Aside"
import Navbar from "./components/Navbar"
import HomepageNavbar from "./components/homepage-navbar"

interface SidebarProviderProps {
    children: React.ReactNode
}

const hideFor = ['/signin', '/']

const LayoutWrapper = ({ children }: SidebarProviderProps) => {
    const path = useLocation().pathname
    const hideSidebar = hideFor.includes(path) || path.startsWith('/home')
    const isHomepage = path === '/' || path.startsWith('/home')

    return (
        <>
            {isHomepage ? <HomepageNavbar /> : <Navbar />}
            <div className="flex min-h-[calc(100vh-64px)]">
                {!hideSidebar && <Aside />}
                <div className="flex-1 w-full h-full overflow-auto">
                    {children}
                </div>
            </div>
        </>
    )
}

export default LayoutWrapper