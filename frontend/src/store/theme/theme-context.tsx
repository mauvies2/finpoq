import { createContext, FC, ReactNode, useEffect, useState } from 'react'

export const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('color-theme')
    if (typeof storedPrefs === 'string') {
      return storedPrefs
    }

    const userMedia = window.matchMedia('(prefers-color-scheme: dark)')
    console.log(userMedia)
    if (userMedia.matches) {
      return 'dark'
    }
  }

  return 'light' // light theme as the default;
}

export const ThemeContext = createContext({})

interface Props {
  initialTheme?: string
  children: ReactNode
}

export const ThemeProvider = ({ initialTheme, children }: Props) => {
  const [theme, setTheme] = useState(getInitialTheme)

  const rawSetTheme = (rawTheme: string) => {
    const root = window.document.documentElement
    const isDark = rawTheme === 'dark'

    root.classList.remove(isDark ? 'light' : 'dark')
    root.classList.add(rawTheme)

    localStorage.setItem('color-theme', rawTheme)
  }

  if (initialTheme) {
    rawSetTheme(initialTheme)
  }

  useEffect(() => {
    console.log('hola')
    rawSetTheme(theme)
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}