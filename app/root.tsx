import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import 'react-virtualized/styles.css'

import type { Route } from './+types/root'
import './app.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '~/components/ui/sidebar'
import { AppSidebar } from '~/components/custom/AppSidebar'
import { Toaster } from '~/components/ui/sonner'

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous'
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap'
  }
]

const queryClient = new QueryClient()

export function Layout({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang='en'>
        <head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <Meta />
          <Links />
        </head>
        <body>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className='shrink-0 flex h-16 items-center gap-2 border-b border-sidebar-border px-4'>
                <SidebarTrigger className='-ml-1' />
                <h1 className='text-lg font-semibold'>Product Dashboard</h1>
              </header>
              <div className='grow p-4 min-h-0 overflow-y-auto'>{children}</div>
            </SidebarInset>
          </SidebarProvider>
          <Toaster />
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    </QueryClientProvider>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className='pt-16 p-4 container mx-auto'>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className='w-full p-4'>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
