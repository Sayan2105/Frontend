import { createContext, ReactNode, useMemo, useState } from 'react'

type SidebarContextValue = {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

export const SidebarContext = createContext<SidebarContextValue>({
    isSidebarOpen: false,
    toggleSidebar: () => { }
})

const SidebarProvider = ({ children }: { children: ReactNode }) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

    const value = useMemo(() => ({
        isSidebarOpen, toggleSidebar
    }), [isSidebarOpen])


    return (
        <SidebarContext.Provider value={value}>
            {children}
        </SidebarContext.Provider>
    )
}

export default SidebarProvider