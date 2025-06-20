import { useLocation } from "react-router-dom"
import Aside from "./components/Aside"
import Navbar from "./components/Navbar"
import HomepageNavbar from "./components/homepage-navbar"

interface SidebarProviderProps {
    children: React.ReactNode
}

const hideFor = ['/signin', '/' , '/create-admin']

const LayoutWrapper = ({ children }: SidebarProviderProps) => {
    const path = useLocation().pathname
    const hideSidebar = hideFor.includes(path) || path.startsWith('/home')
    const isHomepage = path === '/' || path.startsWith('/home')

    return (
        <>
            {isHomepage ? <HomepageNavbar /> : <Navbar />}
            <div className="flex ">
                {!hideSidebar && <Aside />}
                <main className="min-h-[calc(100vh-4rem)] w-full overflow-auto">
                    {children}
                </main>
            </div>
        </>
    )
}

export default LayoutWrapper