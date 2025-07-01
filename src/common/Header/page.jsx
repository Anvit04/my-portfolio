import React from 'react'
import ThemeToggler from '../ThemeToggler/page'
import MobHamenu from '../MobHamenu/page'

const Header = ({scrollSecOnClick, scrollY, headerScrollBg, headerBg, isMenuOpen, theme, toggleThemeOnClick, setIsMenuOpenOnClick}) => {
    return (
        <>
            <header className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrollY > 10 ? headerScrollBg : headerBg}`}>
                <nav className="container-nw mx-auto px-3 2xl:px-0 py-4 flex justify-between items-center">
                    <div onClick={() => scrollSecOnClick('home')} className={`text-2xl font-bold bg-gradient-to-r ${theme === 'dark' ? 'from-cyan-400 to-pink-500' : 'from-[#FF4D00] to-[#FFB326]'} bg-clip-text text-transparent`}> ASC </div>

                    <div className="flex items-center gap-4">

                        {/* Desktop Navigation */}
                        <ul className="hidden md:flex space-x-8">
                            {['Home', 'Skills', 'Projects', 'Contact'].map((item) => (
                                <li key={item}>
                                    <button
                                        onClick={() => scrollSecOnClick(item.toLowerCase())}
                                        className={`relative ${theme === 'dark' ? 'hover:text-cyan-400 ' : 'hover:text-[#FF4D00]'} transition-colors duration-300 group cursor-pointer`}
                                    >
                                        {item}
                                        <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r ${theme === 'dark' ? 'from-cyan-400 to-pink-500' : 'from-[#FF4D00] to-[#FFB326]'} transition-all duration-300 group-hover:w-full`}></span>
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* Mobile Menu Button */}
                        <MobHamenu isMenuOpen={isMenuOpen} theme={theme} onClick={setIsMenuOpenOnClick} />

                        {/* Theme Toggle */}
                        <ThemeToggler onClick={toggleThemeOnClick} theme={theme} />

                    </div>
                </nav>

                {/* Mobile Menu */}
                <div className={isMenuOpen ? `mobSideNav navOpen relative ${theme === 'dark' ? 'darker ' : 'lighter '}` : 'mobSideNav fixed'}>
                    <div className={isMenuOpen ? `md:hidden h-full relative z-10  ${theme === 'dark' ? 'bg-slate-900/25 backdrop-blur-md ' : 'bg-white/25 backdrop-blur-md '}` : ''}>
                        <ul className="py-4 px-6 space-y-4">
                            {['Home', 'Skills', 'Projects', 'Contact'].map((item) => (
                                <li key={item}>
                                    <button
                                        onClick={() => scrollSecOnClick(item.toLowerCase())}
                                        className={`block w-full text-left ${theme === 'dark' ? 'hover:text-cyan-400 ' : 'hover:text-[#FF4D00]'} transition-colors duration-300 cursor-pointer`}>
                                        {item}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header