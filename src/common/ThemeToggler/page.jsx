import { Moon, Sun } from 'lucide-react'
import React from 'react'

const ThemeToggler = ({onClick, theme}) => {
    return (
        <>
            <button
                onClick={onClick}
                className="p-2 rounded-full hover:bg-white/10 transition-colors duration-300 cursor-pointer"
                aria-label="Toggle theme">
                {theme === 'dark' ? (
                    <Sun className="text-yellow-400" size={20} />
                ) : (
                    <Moon className="text-indigo-600" size={20} />
                )}
            </button>
        </>
    )
}

export default ThemeToggler