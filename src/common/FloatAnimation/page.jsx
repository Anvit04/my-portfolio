import React from 'react'

const FloatAnimation = ({ theme }) => {
  const accentA = theme === 'dark' ? 'from-cyan-400/15 to-pink-500/15' : 'from-[#FF4D00]/25 to-[#FFB347]/25';
  const accentB = theme === 'dark' ? 'from-pink-500/15 to-cyan-400/15' : 'from-[#FFB326]/25 to-[#FF4D00]/25';
  const ringColor = theme === 'dark' ? 'border-cyan-400/20' : 'border-[#FF4D00]/25';
  const cubeFace = theme === 'dark' ? 'bg-cyan-400/10 border-cyan-400/30' : 'bg-[#FF4D00]/15 border-[#FF4D00]/30';

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none perspective-scene">
      {/* Soft gradient orbs */}
      <div className={`absolute top-1/4 right-1/4 w-32 h-32 rounded-full animate-pulse bg-gradient-to-r ${accentA}`} />
      <div
        className={`absolute top-3/4 right-1/12 w-48 h-48 rounded-full animate-bounce bg-gradient-to-r ${accentB}`}
        style={{ animationDelay: '-2s', animationDuration: '4s' }}
      />
      <div
        className={`absolute top-1/6 left-1/6 w-24 h-24 rounded-full animate-pulse bg-gradient-to-r ${accentA}`}
        style={{ animationDelay: '-1s' }}
      />

      {/* 3D floating ring */}
      <div className="absolute top-[18%] left-[8%] shape-3d-ring">
        <div className={`w-28 h-28 rounded-full border-2 ${ringColor} border-dashed`} />
      </div>

      {/* 3D cube */}
      <div className="absolute top-[55%] right-[6%] w-16 h-16 shape-3d-cube" style={{ transformStyle: 'preserve-3d' }}>
        <div className={`absolute inset-0 border ${cubeFace} rounded-lg`} style={{ transform: 'translateZ(32px)' }} />
        <div className={`absolute inset-0 border ${cubeFace} rounded-sm`} style={{ transform: 'rotateY(180deg) translateZ(32px)' }} />
        <div className={`absolute inset-0 border ${cubeFace} rounded-sm`} style={{ transform: 'rotateY(90deg) translateZ(32px)' }} />
        <div className={`absolute inset-0 border ${cubeFace} rounded-sm`} style={{ transform: 'rotateY(-90deg) translateZ(32px)' }} />
        <div className={`absolute inset-0 border ${cubeFace} rounded-sm`} style={{ transform: 'rotateX(90deg) translateZ(32px)' }} />
        <div className={`absolute inset-0 border ${cubeFace} rounded-sm`} style={{ transform: 'rotateX(-90deg) translateZ(32px)' }} />
      </div>

      {/* Orbiting dot */}
      <div className="absolute top-[35%] right-[22%] w-4 h-4 shape-3d-orbit">
        <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${accentA}`} />
      </div>

      {/* Second ring */}
      <div className="absolute bottom-[20%] left-[15%] shape-3d-ring" style={{ animationDelay: '-4s' }}>
        <div className={`w-20 h-20 rounded-full border ${ringColor}`} />
      </div>
    </div>
  )
}

export default FloatAnimation
