import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import SidebarProvider from './contexts/sidebar-provider'
import { NuqsAdapter } from 'nuqs/adapters/react'
import { ThemeProvider } from './components/theme-provider'
import AuthProvider from './contexts/authContext'
import { PermissionProvider } from './contexts/permission-provider'
import { BrowserRouter } from 'react-router-dom'

type Props = React.PropsWithChildren<{}>

const AppProvider = ({ children }: Props) => {

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                refetchOnWindowFocus: false,
            }
        }
    })

    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <SidebarProvider>
                    <NuqsAdapter>
                        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                            <AuthProvider>
                                <PermissionProvider>
                                    {children}
                                </PermissionProvider>
                            </AuthProvider>
                        </ThemeProvider>
                    </NuqsAdapter>
                </SidebarProvider>
            </QueryClientProvider>
        </BrowserRouter>
    )
}

export default AppProvider