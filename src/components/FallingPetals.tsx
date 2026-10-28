import React, { useMemo } from 'react'

interface PetalItem {
  id: number
  left: number
  size: number
  duration: number
  delay: number
  color: string
}

export const FallingPetals: React.FC = () => {
  const petals: PetalItem[] = useMemo(() => {
    const colors = [
      '#ff9800', // vibrant marigold orange
      '#ffb300', // amber gold
      '#ffa000', // cempasúchil core
      '#ffd54f', // golden highlight
      '#e65100'  // deep orange petal tip
    ]

    return Array.from({ length: 26 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 10 + 10,
      duration: Math.random() * 8 + 7, // 7 to 15 seconds
      delay: Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)]
    }))
  }, [])

  return (
    <div 
      className="falling-petals-layer"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 2
      }}
      aria-hidden="true"
    >
      {petals.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            top: -30,
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.5,
            backgroundColor: p.color,
            borderRadius: '50% 50% 50% 0',
            transform: 'rotate(-45deg)',
            opacity: 0.75,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
            animation: `petal-drift ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`
          }}
        />
      ))}
    </div>
  )
}
