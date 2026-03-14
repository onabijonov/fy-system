import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type ThemeId = 'neutral' | 'black-orange' | 'light-orange'

export interface Theme {
    id: ThemeId
    label: string
    emoji: string
    sidebarColor: string
    accentColor: string
}

export const themes: Theme[] = [
    {
        id: 'neutral',
        label: 'Neutral',
        emoji: '🩶',
        sidebarColor: '#F3F2F0',
        accentColor: '#141414',
    },
    {
        id: 'black-orange',
        label: 'Black + Orange',
        emoji: '🖤',
        sidebarColor: '#1A1A1A',
        accentColor: '#D13328',
    },
    {
        id: 'light-orange',
        label: 'Light + Orange',
        emoji: '☀️',
        sidebarColor: '#FFFFFF',
        accentColor: '#D13328',
    },
]

interface ThemeContextValue {
    themeId: ThemeId
    setThemeId: (id: ThemeId) => void
    currentTheme: Theme
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [themeId, setThemeId] = useState<ThemeId>('neutral')

    useEffect(() => {
        const root = document.documentElement
        root.removeAttribute('data-theme')
        root.setAttribute('data-theme', themeId)
    }, [themeId])

    const currentTheme = themes.find(t => t.id === themeId) ?? themes[0]

    return (
        <ThemeContext.Provider value={{ themeId, setThemeId, currentTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const ctx = useContext(ThemeContext)
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
    return ctx
}
