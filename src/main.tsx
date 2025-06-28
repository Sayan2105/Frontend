import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NuqsAdapter } from 'nuqs/adapters/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import AuthProvider from './contexts/authContext.tsx'
import { PermissionProvider } from './contexts/permission-provider.tsx'
import SidebarProvider from './contexts/sidebar-provider.tsx'
import './index.css'
import { persistor, store } from './store.ts'
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <SidebarProvider>
            <PersistGate loading={null} persistor={persistor}>
              <NuqsAdapter>
                <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                  <AuthProvider>
                    <PermissionProvider>
                      <App />
                    </PermissionProvider>
                  </AuthProvider>
                </ThemeProvider>
              </NuqsAdapter>
            </PersistGate>
          </SidebarProvider>
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
