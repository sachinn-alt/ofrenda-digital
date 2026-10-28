import React from 'react'
import { MemorialProfile, AltarOffering, CandleState } from '../types'
import { Candle } from './Candle'
import { Plus, Heart, Sparkles, BookOpen, Music, Flame, Info } from 'lucide-react'
import { soundService } from '../services/soundService'

interface AltarCanvasProps {
  memorials: MemorialProfile[]
  offerings: AltarOffering[]
  candles: CandleState[]
  onSelectMemorial: (memorial: MemorialProfile) => void
  onToggleCandle: (id: string) => void
  onOpenOfferingModal: (tier: 1 | 2 | 3) => void
  onOpenNewMemorial: (tier: 1 | 2 | 3) => void
  onRemoveOffering: (id: string) => void
}

export const AltarCanvas: React.FC<AltarCanvasProps> = ({
  memorials,
  offerings,
  candles,
  onSelectMemorial,
  onToggleCandle,
  onOpenOfferingModal,
  onOpenNewMemorial,
  onRemoveOffering
}) => {
  const getCandlesForTier = (tier: 1 | 2 | 3) => candles.filter(c => c.tier === tier)
  const getOfferingsForTier = (tier: 1 | 2 | 3) => offerings.filter(o => o.tier === tier)
  const getMemorialsForTier = (tier: 1 | 2 | 3) => memorials.filter(m => m.tierPosition === tier)

  const handleFrameClick = (memorial: MemorialProfile) => {
    soundService.playOfferingPlaced()
    onSelectMemorial(memorial)
  }

  // Emoji and representation for offerings
  const getOfferingVisual = (type: string) => {
    switch (type) {
      case 'cempasuchil': return { icon: '🏵️', color: '#ff9800' }
      case 'pan_de_muerto': return { icon: '🍞', color: '#ffb74d' }
      case 'calavera': return { icon: '💀', color: '#e91e63' }
      case 'copal': return { icon: '🏺', color: '#26a69a' }
      case 'water_salt': return { icon: '🍶', color: '#00e5ff' }
      case 'guitar': return { icon: '🎸', color: '#d84315' }
      case 'coffee': return { icon: '☕', color: '#6d4c41' }
      case 'book': return { icon: '📖', color: '#7e57c2' }
      case 'chocolate': return { icon: '🍫', color: '#5d4037' }
      default: return { icon: '✨', color: '#ffd54f' }
    }
  }

  return (
    <div 
      className="altar-canvas-wrapper"
      style={{
        width: '100%',
        maxWidth: 1200,
        margin: '28px auto 60px auto',
        padding: '0 20px',
        position: 'relative'
      }}
    >
      {/* Golden Floral Arch at Top of Altar */}
      <div 
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: -10,
          position: 'relative',
          zIndex: 3
        }}
      >
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: 'linear-gradient(135deg, rgba(255, 170, 0, 0.25), rgba(230, 81, 0, 0.25))',
            border: '1px solid rgba(255, 179, 0, 0.5)',
            padding: '8px 24px',
            borderRadius: '40px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 30px rgba(255, 160, 0, 0.25)'
          }}
        >
          <span style={{ fontSize: '1.4rem' }}>🏵️</span>
          <span 
            className="font-serif" 
            style={{ 
              color: 'var(--cempasuchil-gold)', 
              fontWeight: 700, 
              fontSize: '1.1rem',
              letterSpacing: '0.08em'
            }}
          >
            MARIGOLD ARCH — THE SACRED PATH OF SOULS
          </span>
          <span style={{ fontSize: '1.4rem' }}>🏵️</span>
        </div>
      </div>

      {/* 3-Tier Altar Physical Hierarchy */}
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          marginTop: 20
        }}
      >
        {/* ======================================================== */}
        {/* TIER 1: EL CIELO (The Heavens & Spiritual Ancestry)     */}
        {/* ======================================================== */}
        <div 
          className="glass-panel-glow altar-tier"
          style={{
            width: '84%',
            margin: '0 auto',
            padding: '24px 28px 20px 28px',
            background: 'linear-gradient(180deg, rgba(32, 22, 50, 0.85) 0%, rgba(18, 14, 28, 0.9) 100%)',
            borderTop: '2px solid rgba(255, 215, 0, 0.6)',
            position: 'relative'
          }}
        >
          {/* Tier Label */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="badge-gold">Tier 1 • The Heavens (El Cielo)</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Spiritual purity, fragrant copal incense, and guiding eternal light
              </span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button 
                className="btn-ghost" 
                onClick={() => onOpenOfferingModal(1)}
                style={{ fontSize: '0.8rem', color: 'var(--cempasuchil-gold)' }}
              >
                <Plus size={14} /> Add Offering
              </button>
            </div>
          </div>

          {/* Central Copal Incense Burner Accent with Smoke Animation */}
          <div 
            style={{
              position: 'absolute',
              top: -18,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pointerEvents: 'none'
            }}
          >
            {/* Rising smoke curls */}
            <div 
              style={{
                width: 6,
                height: 18,
                background: 'radial-gradient(circle, rgba(220, 220, 240, 0.5) 0%, transparent 80%)',
                animation: 'copal-smoke 3.2s ease-out infinite',
                filter: 'blur(3px)'
              }}
            />
          </div>

          {/* Portrait Frames on Tier 1 */}
          <div 
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 24,
              flexWrap: 'wrap',
              margin: '12px 0 20px 0'
            }}
          >
            {getMemorialsForTier(1).map(memorial => (
              <MemorialFrame 
                key={memorial.id} 
                memorial={memorial} 
                onClick={() => handleFrameClick(memorial)} 
              />
            ))}

            {getMemorialsForTier(1).length === 0 && (
              <div 
                onClick={() => onOpenNewMemorial(1)}
                style={{
                  border: '2px dashed rgba(255, 170, 0, 0.3)',
                  borderRadius: 12,
                  padding: '28px 36px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  color: 'var(--text-muted)'
                }}
              >
                <Plus size={24} color="var(--cempasuchil-gold)" />
                <span style={{ fontSize: '0.88rem' }}>Place Beloved Portrait on Tier 1</span>
              </div>
            )}
          </div>

          {/* Offerings on Tier 1 */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 16 }}>
            {getOfferingsForTier(1).map(offering => (
              <OfferingBadge 
                key={offering.id} 
                offering={offering} 
                visual={getOfferingVisual(offering.type)}
                onRemove={() => onRemoveOffering(offering.id)} 
              />
            ))}
          </div>

          {/* Candle Line on Tier 1 */}
          <div 
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'flex-end',
              borderTop: '1px solid rgba(255, 170, 0, 0.2)',
              paddingTop: 8
            }}
          >
            {getCandlesForTier(1).map(candle => (
              <Candle key={candle.id} candle={candle} onToggle={onToggleCandle} size="md" />
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* TIER 2: LA TIERRA (Earthly Delights & Fond Remembrances)  */}
        {/* ======================================================== */}
        <div 
          className="glass-panel altar-tier"
          style={{
            width: '93%',
            margin: '0 auto',
            padding: '24px 30px 20px 30px',
            background: 'linear-gradient(180deg, rgba(26, 18, 38, 0.9) 0%, rgba(16, 12, 24, 0.95) 100%)',
            borderTop: '3px solid rgba(255, 152, 0, 0.55)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
            position: 'relative'
          }}
        >
          {/* Tier Label */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="badge-gold">Tier 2 • Earthly Delights (La Tierra)</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Favorite dishes, instruments, songs, and laughter shared in life
              </span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button 
                className="btn-ghost" 
                onClick={() => onOpenOfferingModal(2)}
                style={{ fontSize: '0.8rem', color: 'var(--cempasuchil-gold)' }}
              >
                <Plus size={14} /> Add Offering
              </button>
            </div>
          </div>

          {/* Portrait Frames on Tier 2 */}
          <div 
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 28,
              flexWrap: 'wrap',
              margin: '12px 0 20px 0'
            }}
          >
            {getMemorialsForTier(2).map(memorial => (
              <MemorialFrame 
                key={memorial.id} 
                memorial={memorial} 
                onClick={() => handleFrameClick(memorial)} 
              />
            ))}

            {getMemorialsForTier(2).length === 0 && (
              <div 
                onClick={() => onOpenNewMemorial(2)}
                style={{
                  border: '2px dashed rgba(255, 170, 0, 0.3)',
                  borderRadius: 12,
                  padding: '24px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  color: 'var(--text-muted)'
                }}
              >
                <Plus size={22} color="var(--cempasuchil-gold)" />
                <span style={{ fontSize: '0.86rem' }}>Place Memorial Photo on Tier 2</span>
              </div>
            )}
          </div>

          {/* Offerings on Tier 2 */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 16 }}>
            {getOfferingsForTier(2).map(offering => (
              <OfferingBadge 
                key={offering.id} 
                offering={offering} 
                visual={getOfferingVisual(offering.type)}
                onRemove={() => onRemoveOffering(offering.id)} 
              />
            ))}
          </div>

          {/* Candle Line on Tier 2 */}
          <div 
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'flex-end',
              borderTop: '1px solid rgba(255, 170, 0, 0.2)',
              paddingTop: 8
            }}
          >
            {getCandlesForTier(2).map(candle => (
              <Candle key={candle.id} candle={candle} onToggle={onToggleCandle} size="md" />
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* TIER 3: EL INFRAMUNDO / MICTLÁN (Roots & Sweet Life)     */}
        {/* ======================================================== */}
        <div 
          className="glass-panel altar-tier"
          style={{
            width: '100%',
            padding: '24px 32px 24px 32px',
            background: 'linear-gradient(180deg, rgba(20, 14, 28, 0.95) 0%, rgba(12, 9, 18, 0.98) 100%)',
            borderTop: '3px solid rgba(230, 81, 0, 0.65)',
            boxShadow: '0 12px 50px rgba(0, 0, 0, 0.65)'
          }}
        >
          {/* Tier Label */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="badge-gold">Tier 3 • The Roots / Underworld (Mictlán)</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Sugar skulls (calaveras), hot cocoa, marigold carpet, and sacred foundation
              </span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button 
                className="btn-ghost" 
                onClick={() => onOpenOfferingModal(3)}
                style={{ fontSize: '0.8rem', color: 'var(--cempasuchil-gold)' }}
              >
                <Plus size={14} /> Add Offering
              </button>
            </div>
          </div>

          {/* Portrait Frames on Tier 3 (if any) */}
          {getMemorialsForTier(3).length > 0 && (
            <div 
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 28,
                flexWrap: 'wrap',
                margin: '12px 0 20px 0'
              }}
            >
              {getMemorialsForTier(3).map(memorial => (
                <MemorialFrame 
                  key={memorial.id} 
                  memorial={memorial} 
                  onClick={() => handleFrameClick(memorial)} 
                />
              ))}
            </div>
          )}

          {/* Offerings on Tier 3 */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 18 }}>
            {getOfferingsForTier(3).map(offering => (
              <OfferingBadge 
                key={offering.id} 
                offering={offering} 
                visual={getOfferingVisual(offering.type)}
                onRemove={() => onRemoveOffering(offering.id)} 
              />
            ))}
          </div>

          {/* Bottom Candle Row */}
          <div 
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'flex-end',
              borderTop: '1px solid rgba(255, 170, 0, 0.2)',
              paddingTop: 10
            }}
          >
            {getCandlesForTier(3).map(candle => (
              <Candle key={candle.id} candle={candle} onToggle={onToggleCandle} size="lg" />
            ))}
          </div>

          {/* Marigold Petal Carpet at Base */}
          <div 
            style={{
              textAlign: 'center',
              marginTop: 18,
              paddingTop: 12,
              borderTop: '1px dashed rgba(255, 170, 0, 0.25)',
              color: 'var(--cempasuchil-gold)',
              fontSize: '0.84rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10
            }}
          >
            <span>🏵️ 🏵️ 🏵️</span>
            <span>Marigold Petal Carpet — Guiding souls home with love and remembrance</span>
            <span>🏵️ 🏵️ 🏵️</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Subcomponent: Memorial Photo Frame
interface MemorialFrameProps {
  memorial: MemorialProfile
  onClick: () => void
}

const MemorialFrame: React.FC<MemorialFrameProps> = ({ memorial, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        width: 175
      }}
      className="memorial-frame-card"
    >
      {/* Baroque Wooden & Gold Filigree Frame */}
      <div 
        style={{
          width: 150,
          height: 180,
          background: 'linear-gradient(135deg, #d4af37 0%, #aa820a 50%, #f9d976 100%)',
          padding: 8,
          borderRadius: 8,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.7), 0 0 16px rgba(255, 180, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          border: '1px solid #ffe57f'
        }}
      >
        {/* Inner Black Matting */}
        <div 
          style={{
            flex: 1,
            backgroundColor: '#0d0914',
            borderRadius: 4,
            overflow: 'hidden',
            position: 'relative',
            border: '2px solid rgba(0,0,0,0.6)'
          }}
        >
          <img 
            src={memorial.photoUrl} 
            alt={memorial.name} 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'sepia(25%) contrast(105%) brightness(95%)'
            }}
            onError={(e) => {
              // Fallback to stylized silhouette if image URL fails
              (e.target as HTMLElement).style.display = 'none'
            }}
          />

          {/* Subtle Warm Amber Vignette overlay */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle, transparent 55%, rgba(0,0,0,0.45) 100%)',
              pointerEvents: 'none'
            }} 
          />

          {/* Oral History Tape Indicator Badge */}
          {memorial.oralMemories && memorial.oralMemories.length > 0 && (
            <div 
              style={{
                position: 'absolute',
                top: 6,
                right: 6,
                background: 'rgba(0,0,0,0.75)',
                color: 'var(--cempasuchil-gold)',
                borderRadius: '50%',
                padding: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(0,0,0,0.5)'
              }}
              title={`${memorial.oralMemories.length} oral history recording(s) preserved`}
            >
              <Music size={12} />
            </div>
          )}

          {/* Calaverita Tag Badge */}
          {memorial.calaverita && (
            <div 
              style={{
                position: 'absolute',
                bottom: 6,
                left: 6,
                background: 'rgba(233, 30, 99, 0.85)',
                color: '#ffffff',
                borderRadius: 4,
                padding: '2px 5px',
                fontSize: '0.65rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 3
              }}
              title="Calaverita Literaria attached"
            >
              <span>💀 Verse</span>
            </div>
          )}
        </div>

        {/* Small Ribbon/Marigold at Top Corner */}
        <div 
          style={{
            position: 'absolute',
            top: -6,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '1rem',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
          }}
        >
          🏵️
        </div>
      </div>

      {/* Name and Relation Label Plate */}
      <div 
        style={{
          marginTop: 8,
          textAlign: 'center',
          width: '100%'
        }}
      >
        <div 
          className="font-serif" 
          style={{ 
            color: 'var(--text-gold)', 
            fontWeight: 700, 
            fontSize: '0.9rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {memorial.name}
        </div>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
          {memorial.relation}
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontStyle: 'italic' }}>
          {memorial.birthYear} — {memorial.passingYear}
        </div>
      </div>
    </div>
  )
}

// Subcomponent: Offering Badge on the Altar
interface OfferingBadgeProps {
  offering: AltarOffering
  visual: { icon: string; color: string }
  onRemove: () => void
}

const OfferingBadge: React.FC<OfferingBadgeProps> = ({ offering, visual, onRemove }) => {
  return (
    <div 
      className="offering-chip"
      title={`${offering.name}: ${offering.symbolicMeaning} (Click X to remove)`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '5px 12px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: 20,
        fontSize: '0.82rem',
        color: 'var(--text-primary)',
        backdropFilter: 'blur(8px)',
        position: 'relative'
      }}
    >
      <span style={{ fontSize: '1.05rem' }}>{visual.icon}</span>
      <span style={{ fontWeight: 500 }}>{offering.name}</span>
      <button 
        onClick={(e) => {
          e.stopPropagation()
          onRemove()
        }}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          padding: '0 2px',
          fontSize: '0.85rem'
        }}
        title="Remove offering from altar"
      >
        ×
      </button>
    </div>
  )
}
