'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAppProvider } from '@/app/app-provider'
import { useWindowWidth } from '@/components/utils/use-window-width'
import Logo from './logo'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: 'M3 4.5A1.5 1.5 0 0 1 4.5 3h7A1.5 1.5 0 0 1 13 4.5v7a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 11.5v-7Zm2 1v2h6v-2H5Zm0 4v1.5h2V9.5H5Zm4 0v1.5h2V9.5H9Z' },
  { href: '/opportunities', label: 'Opportunities', icon: 'M2 4.5A1.5 1.5 0 0 1 3.5 3h9A1.5 1.5 0 0 1 14 4.5v7a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 11.5v-7Zm2 1V7h8V5.5H4Zm0 3v1h5v-1H4Zm0 2v1h3v-1H4Z' },
  { href: '/reports', label: 'Reports', icon: 'M3 12.5h10v1H3v-1Zm1-9h2v7H4v-7Zm3 3h2v4H7v-4Zm3-2h2v6h-2v-6Z' },
  { href: '/notifications', label: 'Notifications', icon: 'M8 14a2 2 0 0 0 1.7-1H6.3A2 2 0 0 0 8 14Zm4-4V7A4 4 0 0 0 4 7v3l-1 1v1h10v-1l-1-1Z' },
  { href: '/team', label: 'Team', icon: 'M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm4.5 1A2.5 2.5 0 1 0 10.5 4a2.5 2.5 0 0 0 0 5ZM1 13.5C1 11.57 3.24 10 6 10s5 1.57 5 3.5V14H1v-.5Zm9.8-3.23A4.9 4.9 0 0 1 13 13.5v.5h2v-.5c0-1.58-1.58-2.9-3.72-3.23h-.48Z' },
  { href: '/settings', label: 'Settings', icon: 'M8 10.5A2.5 2.5 0 1 0 8 5a2.5 2.5 0 0 0 0 5.5Zm5.5-2.5-.9-.52.1-1.04-1.1-1.9-1 .42-.86-.6L9.6 3H6.4l-.14 1.36-.86.6-1-.42-1.1 1.9.1 1.04-.9.52v2.2l.9.52-.1 1.04 1.1 1.9 1-.42.86.6.14 1.36h3.2l.14-1.36.86-.6 1 .42 1.1-1.9-.1-1.04.9-.52V8Z' },
]

export default function Sidebar({ variant = 'default' }: { variant?: 'default' | 'v2' }) {
  const sidebar = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const { sidebarOpen, setSidebarOpen, sidebarExpanded, setSidebarExpanded } = useAppProvider()
  const breakpoint = useWindowWidth()
  const expandOnly = !sidebarExpanded && breakpoint && breakpoint >= 1024 && breakpoint < 1536

  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }) => {
      if (!sidebar.current || !sidebarOpen || sidebar.current.contains(target as Node)) return
      setSidebarOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }) => {
      if (sidebarOpen && keyCode === 27) setSidebarOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  return (
    <div className={`min-w-fit ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
      <div className={`fixed inset-0 z-40 bg-gray-900/30 transition-opacity duration-200 lg:hidden ${sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`} />
      <div
        id="sidebar"
        ref={sidebar}
        className={`absolute left-0 top-0 z-40 flex h-[100dvh] w-64 shrink-0 flex-col overflow-y-auto bg-white p-4 transition-all duration-200 ease-in-out dark:bg-gray-800 lg:static lg:left-auto lg:top-auto lg:flex! lg:w-20 lg:translate-x-0 lg:sidebar-expanded:!w-64 2xl:w-64! ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'} ${variant === 'v2' ? 'border-r border-gray-200 dark:border-gray-700/60' : 'rounded-r-2xl shadow-xs'}`}
      >
        <div className="mb-8 flex justify-between pr-3 sm:px-2">
          <button
            className="text-gray-500 hover:text-gray-400 lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          <Logo />
        </div>

        <nav className="space-y-8">
          <div>
            <h3 className="pl-3 text-xs font-semibold uppercase text-gray-400 dark:text-gray-500">
              <span className="hidden w-6 text-center lg:block lg:sidebar-expanded:hidden 2xl:hidden" aria-hidden="true">...</span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Workspace</span>
            </h3>
            <ul className="mt-3 space-y-1">
              {navItems.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={(event) => {
                        if (expandOnly) {
                          event.preventDefault()
                          setSidebarExpanded(true)
                        } else {
                          setSidebarOpen(false)
                        }
                      }}
                      className={`flex items-center rounded-lg px-3 py-2 transition ${active ? 'bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700/40 dark:hover:text-white'}`}
                    >
                      <svg className={`h-4 w-4 shrink-0 fill-current ${active ? 'text-violet-600 dark:text-violet-300' : 'text-gray-400'}`} viewBox="0 0 16 16" aria-hidden="true">
                        <path d={item.icon} />
                      </svg>
                      <span className="ml-4 text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>

        <div className="mt-auto hidden justify-end pt-3 lg:inline-flex 2xl:hidden">
          <div className="w-12 py-2 pl-4 pr-3">
            <button className="text-gray-400 hover:text-gray-500" onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand or collapse sidebar</span>
              <svg className="shrink-0 fill-current sidebar-expanded:rotate-180" width="16" height="16" viewBox="0 0 16 16">
                <path d="M15 16a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v14a1 1 0 0 1-1 1ZM8.586 7H1a1 1 0 1 0 0 2h7.586l-2.793 2.793a1 1 0 1 0 1.414 1.414l4.5-4.5A.997.997 0 0 0 12 8.01M11.924 7.617a.997.997 0 0 0-.217-.324l-4.5-4.5a1 1 0 0 0-1.414 1.414L8.586 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
