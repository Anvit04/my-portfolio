import React from 'react'

const FloatAnimation = ({theme}) => {
  return (
    <>
    {/* Floating Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-1/4 right-1/4 w-32 h-32 rounded-full animate-pulse ${theme === 'dark'
            ? 'bg-gradient-to-r from-cyan-400/10 to-pink-500/10'
            : 'bg-gradient-to-r from-[#FF4D00]/20 to-[#FFB326]/20'
            }`}></div>
          <div className={`absolute top-3/4 right-1/12 w-48 h-48 rounded-full animate-bounce ${theme === 'dark'
            ? 'bg-gradient-to-r from-pink-500/10 to-cyan-400/10'
            : 'bg-gradient-to-r from-[#FFB326]/20 to-[#FF4D00]/20'
            }`} style={{ animationDelay: '-2s', animationDuration: '4s' }}></div>
          <div className={`absolute top-1/6 left-1/6 w-24 h-24 rounded-full animate-pulse ${theme === 'dark'
            ? 'bg-gradient-to-r from-cyan-400/10 to-pink-500/10'
            : 'bg-gradient-to-r from-[#FF4D00]/20 to-[#FFB326]/20'
            }`} style={{ animationDelay: '-1s' }}></div>
        </div>
    </>
  )
}

export default FloatAnimation