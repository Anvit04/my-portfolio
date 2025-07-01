import React from 'react'

const MobHamenu = ({isMenuOpen, theme, onClick}) => {
    return (
        <>
            <button
                className={isMenuOpen ? `__hamIcon_bar __hamIcon_bar--opened` : `__hamIcon_bar `}
                onClick={() => onClick(!isMenuOpen)}
                aria-label="Toggle menu">
                <span className={theme === `dark` ? `bg-white` : `bg-gradient-to-r from-slate-900 to-cyan-800`}></span>
                <span className={theme === `dark` ? `bg-white` : `bg-gradient-to-r from-slate-900 to-cyan-800`}></span>
                <span className={theme === `dark` ? `bg-white` : `bg-gradient-to-r from-slate-900 to-cyan-800`}></span>
            </button>
        </>
    )
}

export default MobHamenu