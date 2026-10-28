import React, { useState } from 'react'
import { MemorialProfile } from '../types'
import { X, Upload, Sparkles, Plus } from 'lucide-react'
import { soundService } from '../services/soundService'

interface NewMemorialModalProps {
  initialTier: 1 | 2 | 3
  onClose: () => void
  onSave: (memorial: MemorialProfile) => void
}

export const NewMemorialModal: React.FC<NewMemorialModalProps> = ({
  initialTier,
  onClose,
  onSave
}) => {
  const [name, setName] = useState('')
  const [relation, setRelation] = useState('')
  const [birthYear, setBirthYear] = useState('1945')
  const [passingYear, setPassingYear] = useState('2023')
  const [photoUrl, setPhotoUrl] = useState('')
  const [epitaph, setEpitaph] = useState('')
  const [favoriteSaying, setFavoriteSaying] = useState('')
  const [foodsInput, setFoodsInput] = useState('Pan dulce, Café de olla')
  const [songsInput, setSongsInput] = useState('Cielito Lindo')
  const [hobbiesInput, setHobbiesInput] = useState('Gardening, Cooking')
  const [tierPosition, setTierPosition] = useState<1 | 2 | 3>(initialTier)

  // Preset respectful portraits if user doesn't have a photo ready
  const presetPhotos = [
    { label: 'Elder Woman', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80' },
    { label: 'Elder Man', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80' },
    { label: 'Gentle Soul', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80' },
    { label: 'Beloved Pet', url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80' }
  ]

  // Handle local image upload (converts to base64 data URL - stays 100% on client)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    const newMemorial: MemorialProfile = {
      id: `mem-${Date.now()}`,
      name: name.trim(),
      relation: relation.trim() || 'Beloved Ancestor',
      birthYear: birthYear.trim(),
      passingYear: passingYear.trim(),
      photoUrl: photoUrl || presetPhotos[0].url,
      epitaph: epitaph.trim() || 'Forever held in living memory and love.',
      favoriteSaying: favoriteSaying.trim(),
      favoriteFoods: foodsInput.split(',').map(s => s.trim()).filter(Boolean),
      favoriteSongs: songsInput.split(',').map(s => s.trim()).filter(Boolean),
      hobbies: hobbiesInput.split(',').map(s => s.trim()).filter(Boolean),
      oralMemories: [],
      tierPosition,
      candlesLitCount: 1,
      createdAt: new Date().toISOString()
    }

    soundService.playOfferingPlaced()
    onSave(newMemorial)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: 640 }}
      >
        <div 
          style={{
            padding: '20px 26px 14px 26px',
            borderBottom: '1px solid rgba(255, 170, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, rgba(255, 170, 0, 0.1), rgba(0,0,0,0.4))'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '1.4rem' }}>🏵️</span>
            <div>
              <h2 className="font-serif text-gold-gradient" style={{ fontSize: '1.25rem' }}>
                Place a Memorial on the Ofrenda
              </h2>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Honor a loved one's presence, memory, and favorite stories
              </div>
            </div>
          </div>
          <button className="btn-ghost" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Name & Relation */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14 }}>
            <div>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 5 }}>
                Full Name *
              </label>
              <input 
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g., Elena Ramírez"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 8,
                  background: '#161222',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: 'var(--text-primary)',
                  fontFamily: 'inherit'
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 5 }}>
                Relationship *
              </label>
              <input 
                type="text"
                required
                value={relation}
                onChange={e => setRelation(e.target.value)}
                placeholder="e.g., Grandmother, Father, Mentor"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 8,
                  background: '#161222',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: 'var(--text-primary)',
                  fontFamily: 'inherit'
                }}
              />
            </div>
          </div>

          {/* Years & Altar Tier */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: 14 }}>
            <div>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 5 }}>
                Birth Year
              </label>
              <input 
                type="text"
                value={birthYear}
                onChange={e => setBirthYear(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 8,
                  background: '#161222',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: 'var(--text-primary)',
                  fontFamily: 'inherit'
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 5 }}>
                Passing Year
              </label>
              <input 
                type="text"
                value={passingYear}
                onChange={e => setPassingYear(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 8,
                  background: '#161222',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: 'var(--text-primary)',
                  fontFamily: 'inherit'
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 5 }}>
                Altar Tier
              </label>
              <select 
                value={tierPosition}
                onChange={e => setTierPosition(Number(e.target.value) as 1 | 2 | 3)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 8,
                  background: '#161222',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: 'var(--text-primary)',
                  fontFamily: 'inherit'
                }}
              >
                <option value={1}>Tier 1: The Heavens (El Cielo)</option>
                <option value={2}>Tier 2: Earthly Memories (La Tierra)</option>
                <option value={3}>Tier 3: The Roots / Underworld (Mictlán)</option>
              </select>
            </div>
          </div>

          {/* Photo Selection / Local Upload */}
          <div>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
              Portrait Photo (Local Upload or Choose Dignified Preset)
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <label 
                className="btn-secondary" 
                style={{ cursor: 'pointer', fontSize: '0.84rem', padding: '8px 14px' }}
              >
                <Upload size={14} /> Upload from Computer
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  style={{ display: 'none' }} 
                />
              </label>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {photoUrl.startsWith('data:') ? '✓ Private local image loaded' : 'or pick a preset below:'}
              </span>
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {presetPhotos.map((preset, i) => (
                <div 
                  key={i}
                  onClick={() => setPhotoUrl(preset.url)}
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 6,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: photoUrl === preset.url ? '2px solid var(--cempasuchil-gold)' : '1px solid rgba(255,255,255,0.15)',
                    opacity: photoUrl === preset.url ? 1 : 0.65
                  }}
                  title={preset.label}
                >
                  <img src={preset.url} alt={preset.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Loving Epitaph & Favorite Saying */}
          <div>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 5 }}>
              Loving Remembrance / Epitaph
            </label>
            <input 
              type="text"
              value={epitaph}
              onChange={e => setEpitaph(e.target.value)}
              placeholder="e.g., Maker of the best holiday tamales and keeper of quiet kindness."
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 8,
                background: '#161222',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: 'var(--text-primary)',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 5 }}>
              Their Favorite Saying / Words of Wisdom
            </label>
            <input 
              type="text"
              value={favoriteSaying}
              onChange={e => setFavoriteSaying(e.target.value)}
              placeholder='e.g., "Always leave room at the table for one more person."'
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 8,
                background: '#161222',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: 'var(--text-primary)',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* Favorite foods and songs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 5 }}>
                Favorite Foods (comma separated)
              </label>
              <input 
                type="text"
                value={foodsInput}
                onChange={e => setFoodsInput(e.target.value)}
                placeholder="Pozole, Chocolate, Tamales"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 8,
                  background: '#161222',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: 'var(--text-primary)',
                  fontFamily: 'inherit'
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 5 }}>
                Favorite Songs / Melodies
              </label>
              <input 
                type="text"
                value={songsInput}
                onChange={e => setSongsInput(e.target.value)}
                placeholder="Amor Eterno, Sabor a Mí"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 8,
                  background: '#161222',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: 'var(--text-primary)',
                  fontFamily: 'inherit'
                }}
              />
            </div>
          </div>

          {/* Action Footer */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 12,
              marginTop: 10,
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: 16
            }}
          >
            <button type="button" className="btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Plus size={16} /> Place on Ofrenda
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
