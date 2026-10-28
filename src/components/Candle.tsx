import React from 'react'
import { CandleState } from '../types'
import { soundService } from '../services/soundService'

interface CandleProps {
  candle: CandleState
  onToggle: (id: string) => void
  size?: 'sm' | 'md' | 'lg'
}

export const Candle: React.FC<CandleProps> = ({ candle, onToggle, size = 'md' }) => {
  const handleClick = () => {
    soundService.playCandleLight()
    onToggle(candle.id)
  }

  const dimensions = {
    sm: { width: 14, height: 28, flameWidth: 10, flameHeight: 18 },
    md: { width: 18, height: 42, flameWidth: 12, flameHeight: 22 },
    lg: { width: 24, height: 56, flameWidth: 16, flameHeight: 28 }
  }[size]

  return (
    <div 
      className="candle-container"
      onClick={handleClick}
      title={candle.dedication ? `${candle.dedication} (Click to ${candle.isLit ? 'extinguish' : 'light'})` : 'Click to toggle candle'}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        padding: '4px 6px',
        transition: 'transform 0.2s ease',
        userSelect: 'none'
      }}
    >
      {/* Flame & Halo */}
      <div 
        style={{
          height: dimensions.flameHeight + 4,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          marginBottom: 1,
          position: 'relative'
        }}
      >
        {candle.isLit && (
          <>
            {/* Luminous Glow Halo */}
            <div 
              style={{
                position: 'absolute',
                width: dimensions.flameWidth * 3,
                height: dimensions.flameHeight * 2,
                borderRadius: '50%',
                background: candle.color === 'celestial'
                  ? 'radial-gradient(circle, rgba(0, 229, 255, 0.4) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(255, 170, 0, 0.45) 0%, rgba(255, 100, 0, 0.15) 50%, transparent 70%)',
                filter: 'blur(4px)',
                bottom: -2,
                pointerEvents: 'none'
              }}
            />

            {/* Core Animated Teardrop Flame */}
            <div 
              style={{
                width: dimensions.flameWidth,
                height: dimensions.flameHeight,
                borderRadius: '50% 50% 35% 35% / 80% 80% 30% 30%',
                background: candle.color === 'celestial'
                  ? 'linear-gradient(to top, #00b0ff 0%, #80d8ff 50%, #ffffff 90%)'
                  : 'linear-gradient(to top, #ff6d00 0%, #ffab00 40%, #ffeb3b 75%, #ffffff 100%)',
                animation: 'flame-wobble 2.4s ease-in-out infinite alternate',
                transformOrigin: 'bottom center',
                position: 'relative',
                zIndex: 2
              }}
            />
          </>
        )}
      </div>

      {/* Wick */}
      <div 
        style={{
          width: 2,
          height: 4,
          backgroundColor: '#3e2723',
          marginBottom: -1,
          zIndex: 1
        }} 
      />

      {/* Wax Pillar */}
      <div 
        style={{
          width: dimensions.width,
          height: dimensions.height,
          background: 'linear-gradient(to right, #fff9c4 0%, #fffde7 50%, #fff59d 100%)',
          borderRadius: '3px 3px 2px 2px',
          boxShadow: candle.isLit 
            ? '0 0 10px rgba(255, 170, 0, 0.4), inset -2px 0 3px rgba(0,0,0,0.1)'
            : 'inset -2px 0 3px rgba(0,0,0,0.15)',
          position: 'relative',
          border: '1px solid rgba(230, 200, 100, 0.3)'
        }}
      >
        {/* Wax drip accent */}
        <div 
          style={{
            position: 'absolute',
            top: 2,
            left: 2,
            width: dimensions.width - 4,
            height: 3,
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '50%'
          }} 
        />
      </div>

      {/* Terracotta/Brass Base Holder */}
      <div 
        style={{
          width: dimensions.width + 6,
          height: 4,
          backgroundColor: '#8d4925',
          borderRadius: '2px',
          marginTop: -1,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
        }} 
      />
    </div>
  )
}
