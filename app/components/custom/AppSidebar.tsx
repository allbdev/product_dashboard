import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '~/components/ui/sidebar'
import { Package, House } from 'lucide-react'
import { NavLink } from 'react-router'

const menuItems = [
  {
    title: 'Home',
    icon: House,
    url: '/'
  },
  {
    title: 'Products',
    icon: Package,
    url: '/products'
  }
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className='border-b border-sidebar-border p-0 h-16 flex justify-center items-start'>
        <div className='flex items-center gap-2 px-2'>
          <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
            <Package className='size-4' />
          </div>
          <div className='flex flex-col gap-0.5 leading-none'>
            <span className='font-semibold'>Product Dashboard</span>
            <span className='text-xs text-sidebar-foreground/60'>Management System</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <NavLink to={item.url} className='cursor-pointer'>
                    {({ isActive }) => (
                      <SidebarMenuButton isActive={isActive}>
                        <>
                          <item.icon className='size-4' />
                          <span>{item.title}</span>
                        </>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className='border-t border-sidebar-border'>
        <span className='text-xs text-center text-sidebar-foreground/60'>
          Made with ♥ by{' '}
          <a href='https://github.com/allbdev' target='_blank' rel='noreferrer' className='underline'>
            allbdev
          </a>
        </span>
      </SidebarFooter>
    </Sidebar>
  )
}
