import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import type { FC, PropsWithChildren } from 'react'
import { Button } from '../button/button'

const menu = [
  { to: '/', name: 'Dashboard' },
  { to: '/list', name: 'List' },
]

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= 1024)

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 1024)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-6">
        <Button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isOpen}
        >
          ☰
        </Button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`h-[calc(100vh-4rem)] shrink-0 overflow-hidden border-r border-slate-200 bg-white transition-all duration-300 ${
            isOpen ? 'w-64' : 'w-0'
          }`}
        >
          <nav
            aria-label="Main menu"
            className="h-full w-64 overflow-y-auto px-3 py-5"
          >
            <section aria-labelledby="general-title">
              <h2
                id="general-title"
                className="mb-2 px-3 text-xs font-medium uppercase tracking-wide text-slate-400"
              >
                Geral
              </h2>

              <ul className="space-y-1">
                {menu.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-100"
                      activeProps={{
                        'aria-current': 'page',
                        className:
                          'flex items-center gap-3 rounded-lg bg-slate-100 px-3 py-2.5 text-sm font-medium text-slate-900',
                      }}
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </nav>
        </aside>

        <main className="min-w-0 flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
