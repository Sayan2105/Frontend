import { NuqsAdapter } from 'nuqs/adapters/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App.tsx'
import { PermissionProvider } from './contexts/permission-provider.tsx'
import './index.css'
import { persistor, store } from './store.ts'
import SidebarProvider from './contexts/sidebar-provider.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PermissionProvider>
        <SidebarProvider>
          <PersistGate loading={null} persistor={persistor}>
            <NuqsAdapter>
              <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                <App />
              </ThemeProvider>
            </NuqsAdapter>
          </PersistGate>
        </SidebarProvider>
      </PermissionProvider>
    </Provider>
  </StrictMode>,
)
