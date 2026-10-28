import React, { useState } from 'react'
import { AltarOffering, OfferingType } from '../types'
import { X, Plus, Sparkles } from 'lucide-react'
import { soundService } from '../services/soundService'

interface OfferingSelectorProps {
  tier: 1 | 2 | 3
  onClose: () => void
  onAddOffering: (offering: AltarOffering) => void
}

interface OfferingOption {
  type: OfferingType
  name: string
  icon: string
  meaning: string
  recommendedTier: 1 | 2 | 3
}

export const OfferingSelector: React.FC<OfferingSelectorProps> = ({
  tier,
  onClose,
  onAddOffering
}) => {
  const options: OfferingOption[] = [
    {
      type: 'cempasuchil',
      name: 'Flores de Cempasúchil',
      icon: '🏵️',
      meaning: 'Vibrant Aztec marigolds whose fiery petals and sweet scent guide spirits from the afterlife.',
      recommendedTier: 1
    },
    {
      type: 'copal',
      name: 'Resina de Copal',
      icon: '🏺',
      meaning: 'Sacred aromatic tree resin burned to purify the altar and transmit prayers to the heavens.',
      recommendedTier: 1
    },
    {
      type: 'water_salt',
      name: 'Vaso de Agua y Sal',
      icon: '🍶',
      meaning: 'Water quenches the weary soul after their long travel; salt purifies and preserves their essence.',
      recommendedTier: 1
    },
    {
      type: 'pan_de_muerto',
      name: 'Pan de Muerto Tradicional',
      icon: '🍞',
      meaning: 'Sweet round brioche bread adorned with bone and tear-drop crusts, celebrating the wheel of life.',
      recommendedTier: 2
    },
    {
      type: 'coffee',
      name: 'Café de Olla con Canela',
      icon: '☕',
      meaning: 'Earthenware clay pot coffee brewed with dark piloncillo and cinnamon to warm the visiting spirit.',
      recommendedTier: 2
    },
    {
      type: 'guitar',
      name: 'Guitarra Acústica',
      icon: '🎸',
      meaning: 'Honoring the music, serenatas, and songs that filled home courtyards and family reunions.',
      recommendedTier: 2
    },
    {
      type: 'chocolate',
      name: 'Chocolate de Metate',
      icon: '🍫',
      meaning: 'Stone-ground bitter chocolate frothed with a wooden molinillo in warm milk.',
      recommendedTier: 2
    },
    {
      type: 'book',
      name: 'Libro de Poesía o Recetas',
      icon: '📖',
      meaning: 'Personal keepsake of wisdom, literature, or secret family cooking secrets passed down generations.',
      recommendedTier: 2
    },
    {
      type: 'calavera',
      name: 'Calaveras de Azúcar',
      icon: '💀',
      meaning: 'Colorfully decorated sugar skulls inscribed with names, reminding us that death is sweet and natural.',
      recommendedTier: 3
    }
  ]

  const [selectedType, setSelectedType] = useState<OfferingType>('cempasuchil')
  const [customNote, setCustomNote] = useState<string>('')
  const [selectedTier, setSelectedTier] = useState<1 | 2 | 3>(tier)

  const selectedOption = options.find(o => o.type === selectedType) || options[0]

  const handleAdd = () => {
    const newOffering: AltarOffering = {
      id: `off-${Date.now()}`,
      type: selectedType,
      tier: selectedTier,
      name: selectedOption.name,
      symbolicMeaning: selectedOption.meaning,
      customNote: customNote.trim() || undefined,
      xPosPercent: Math.floor(Math.random() * 60) + 20
    }

    soundService.playOfferingPlaced()
    onAddOffering(newOffering)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: 580 }}
      >
        <div 
          style={{
            padding: '20px 24px 14px 24px',
            borderBottom: '1px solid rgba(255, 170, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, rgba(255, 170, 0, 0.1), rgba(0,0,0,0.4))'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '1.4rem' }}>{selectedOption.icon}</span>
            <div>
              <h3 className="font-serif text-gold-gradient" style={{ fontSize: '1.2rem' }}>
                Place a Sacred Offering
              </h3>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Traditional symbols and personal tokens for the altar
              </div>
            </div>
          </div>
          <button className="btn-ghost" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Offering Cards Grid */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 10
            }}
          >
            {options.map((opt) => (
              <div 
                key={opt.type}
                onClick={() => setSelectedType(opt.type)}
                style={{
                  padding: '12px 10px',
                  borderRadius: 10,
                  cursor: 'pointer',
                  border: selectedType === opt.type 
                    ? '2px solid var(--cempasuchil-gold)' 
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  background: selectedType === opt.type 
                    ? 'rgba(255, 170, 0, 0.12)' 
                    : 'rgba(255, 255, 255, 0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 4,
                  transition: 'all 0.2s ease'
                }}
              >
                <span style={{ fontSize: '1.6rem' }}>{opt.icon}</span>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {opt.name.split(' ')[0]} {opt.name.split(' ')[1] || ''}
                </span>
              </div>
            ))}
          </div>

          {/* Meaning Description Box */}
          <div 
            style={{
              padding: '14px 18px',
              borderRadius: 10,
              background: 'rgba(255, 170, 0, 0.08)',
              border: '1px solid rgba(255, 170, 0, 0.25)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-gold)', fontSize: '0.86rem', fontWeight: 600, marginBottom: 4 }}>
              <span>{selectedOption.icon}</span>
              <span>Symbolic Meaning in Tradition:</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', lineHeight: 1.5 }}>
              {selectedOption.meaning}
            </p>
          </div>

          {/* Tier Selection */}
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 5 }}>
              Altar Tier Destination:
            </label>
            <select 
              value={selectedTier}
              onChange={e => setSelectedTier(Number(e.target.value) as 1 | 2 | 3)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: 8,
                background: '#161222',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: 'var(--text-primary)',
                fontFamily: 'inherit'
              }}
            >
              <option value={1}>Tier 1: El Cielo (Top - Spiritual realm)</option>
              <option value={2}>Tier 2: La Tierra (Middle - Earthly delights)</option>
              <option value={3}>Tier 3: El Inframundo (Bottom - Mictlán foundation)</option>
            </select>
          </div>

          {/* Custom Dedication Note */}
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 5 }}>
              Personal Note / Dedication (Optional):
            </label>
            <input 
              type="text"
              value={customNote}
              onChange={e => setCustomNote(e.target.value)}
              placeholder="e.g., Prepared fresh for Abuela Rosa"
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: 8,
                background: '#161222',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: 'var(--text-primary)',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* Actions */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 12,
              marginTop: 6,
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: 16
            }}
          >
            <button className="btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button className="btn-primary" onClick={handleAdd}>
              <Plus size={16} /> Place Offering on Altar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
