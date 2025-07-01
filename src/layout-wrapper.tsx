import { useLocation } from "react-router-dom"
import Aside from "./components/Aside"
import Navbar from "./components/Navbar"
import HomepageNavbar from "./components/homepage-navbar"

interface SidebarProviderProps {
    children: React.ReactNode
}

const hideFor = ['/signin', '/', '/create-admin']

const LayoutWrapper = ({ children }: SidebarProviderProps) => {
    const path = useLocation().pathname
    const hideSidebar = hideFor.includes(path) || path.startsWith('/home')
    const isHomepage = path === '/' || path.startsWith('/home')

    return (
        <>
            {isHomepage ? <HomepageNavbar /> : <Navbar />}
            <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden">
                {!hideSidebar && <Aside />}
                <main className="flex-1 flex flex-col w-full overflow-auto">
                    {children}
                </main>
            </div>
        </>
    )
}

export default LayoutWrapper