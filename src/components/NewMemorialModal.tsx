import React, { useState } from 'react'
import { MemorialProfile } from '../types'
import { X, Upload, Sparkles, Plus, Flame, Camera, Shield, Heart } from 'lucide-react'
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
  const [birthYear, setBirthYear] = useState('1942')
  const [passingYear, setPassingYear] = useState('2021')
  const [photoUrl, setPhotoUrl] = useState('')
  const [epitaph, setEpitaph] = useState('')
  const [favoriteSaying, setFavoriteSaying] = useState('')
  const [foodsInput, setFoodsInput] = useState('Pan dulce, Café de olla')
  const [songsInput, setSongsInput] = useState('Cielito Lindo')
  const [tierPosition, setTierPosition] = useState<1 | 2 | 3>(initialTier)
  const [photoFilter, setPhotoFilter] = useState<'candlelight' | 'sepia' | 'original'>('candlelight')

  // Preset respectful archival portraits
  const presetPhotos = [
    { label: 'Abuela (Grandmother)', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80' },
    { label: 'Abuelo (Grandfather)', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80' },
    { label: 'Gentle Soul', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80' },
    { label: 'Beloved Pet', url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80' }
  ]

  // Handle local image upload (converts to base64 data URL - stays 100% in browser)
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

  const toggleFavoriteFood = (food: string) => {
    const list = foodsInput.split(',').map(s => s.trim()).filter(Boolean)
    if (list.includes(food)) {
      setFoodsInput(list.filter(item => item !== food).join(', '))
    } else {
      setFoodsInput([...list, food].join(', '))
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
      epitaph: epitaph.trim() || 'Forever held in living memory and unconditional love.',
      favoriteSaying: favoriteSaying.trim(),
      favoriteFoods: foodsInput.split(',').map(s => s.trim()).filter(Boolean),
      favoriteSongs: songsInput.split(',').map(s => s.trim()).filter(Boolean),
      hobbies: [],
      oralMemories: [],
      tierPosition,
      candlesLitCount: 1,
      createdAt: new Date().toISOString()
    }

    soundService.playOfferingPlaced()
    onSave(newMemorial)
    onClose()
  }

  const quickOfferingPresets = [
    { label: 'Pan de Muerto', icon: '🍞' },
    { label: 'Café de Olla', icon: '☕' },
    { label: 'Mezcal / Tequila', icon: '🍶' },
    { label: 'Ranchera Melodies', icon: '🎺' },
    { label: 'Golden Marigolds', icon: '🌼' },
    { label: 'Mole Poblano', icon: '🍲' }
  ]

  const currentFoodsList = foodsInput.split(',').map(s => s.trim()).filter(Boolean)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#110b1b]/80 backdrop-blur-md overflow-y-auto" onClick={onClose}>
      <div 
        onClick={e => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#161020]/95 backdrop-blur-2xl border border-[#ffc174]/25 rounded-2xl shadow-[0_0_60px_rgba(245,158,11,0.25)] overflow-hidden my-8 text-[#fcf9f2]"
      >
        {/* Scalloped Papel Picado Ribbon */}
        <div className="w-full h-3 bg-[#110b1b] flex items-center justify-between px-2 border-b border-[#ffc174]/10 select-none">
          <div className="flex items-center gap-1.5 w-full justify-around opacity-80">
            <div className="w-6 h-2.5 rounded-b-sm bg-[#be0062]"></div>
            <div className="w-6 h-2.5 rounded-b-sm bg-[#f59e0b]"></div>
            <div className="w-6 h-2.5 rounded-b-sm bg-[#5f258e]"></div>
            <div className="w-6 h-2.5 rounded-b-sm bg-[#ffc174]"></div>
            <div className="w-6 h-2.5 rounded-b-sm bg-[#be0062]"></div>
            <div className="w-6 h-2.5 rounded-b-sm bg-[#f59e0b]"></div>
            <div className="w-6 h-2.5 rounded-b-sm bg-[#5f258e]"></div>
          </div>
        </div>

        {/* Modal Header */}
        <div className="relative px-6 pt-6 pb-4 flex flex-col items-center text-center bg-gradient-to-b from-[#2e2738]/60 to-transparent border-b border-[#ffc174]/15">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#1f1929] hover:bg-[#2e2738] text-[#c9c2b5] hover:text-[#ffc174] border border-[#ffc174]/15 transition-colors flex items-center justify-center"
            type="button"
          >
            <X size={18} />
          </button>

          <div className="w-14 h-14 rounded-2xl bg-[#231d2d] border border-[#ffc174]/30 shadow-lg flex items-center justify-center text-2xl mb-2">
            🕯️
          </div>

          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffc174]"></span>
            <span className="text-[10px] text-[#ffc174] tracking-widest uppercase font-semibold">
              Living Memorial Ritual
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffc174]"></span>
          </div>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#ffc174]">
            Honor a Beloved Soul
          </h2>
          <p className="text-xs text-[#c9c2b5] max-w-md mt-1">
            “Every soul remembered continues to live in the hearts of the living.” Preserved 100% on your machine with open-weight Gemma AI.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          {/* STEP 1: Portrait Upload Dropzone */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#fcf9f2] uppercase tracking-wider flex items-center gap-1.5">
                <Camera size={14} className="text-[#ffc174]" />
                <span>Step 1: Sacred Portrait</span>
              </label>
              <span className="text-[11px] text-[#c9c2b5]">Stays 100% local</span>
            </div>

            <div className="p-4 rounded-xl bg-[#1f1929] border border-[#ffc174]/15 hover:border-[#f59e0b]/40 transition-all">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Photo Preview Box */}
                <div className="relative w-24 h-28 rounded-xl bg-[#110b1b] border-2 border-[#ffc174]/40 overflow-hidden shrink-0 shadow-md">
                  <img 
                    src={photoUrl || presetPhotos[0].url} 
                    alt="Portrait Preview" 
                    className={`w-full h-full object-cover ${
                      photoFilter === 'candlelight' 
                        ? 'sepia-[30%] contrast-105 brightness-95' 
                        : photoFilter === 'sepia' 
                        ? 'sepia contrast-110' 
                        : ''
                    }`}
                  />
                  <div className="absolute bottom-1 right-1 bg-[#110b1b]/80 px-1.5 py-0.5 rounded text-[8px] text-[#ffc174] uppercase font-bold">
                    Preview
                  </div>
                </div>

                {/* Upload Action */}
                <div className="flex-1 text-center sm:text-left space-y-1.5">
                  <p className="text-xs font-bold text-[#ffc174]">
                    Choose or upload a family photograph
                  </p>
                  <p className="text-[11px] text-[#c9c2b5]">
                    Supports JPG, PNG, or vintage scanned family photos (reads directly in browser).
                  </p>

                  <div className="pt-1 flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2e2738] hover:bg-[#393243] text-xs font-medium text-[#ffc174] border border-[#ffc174]/20 shadow-sm transition-colors">
                      <Upload size={13} />
                      <span>Upload from Device</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        className="hidden" 
                      />
                    </label>

                    {/* Filter selector */}
                    <div className="flex items-center gap-1">
                      <button 
                        type="button" 
                        onClick={() => setPhotoFilter('candlelight')}
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition-colors ${
                          photoFilter === 'candlelight' ? 'bg-[#f59e0b] text-[#110b1b]' : 'bg-[#231d2d] text-[#c9c2b5]'
                        }`}
                      >
                        Candlelight
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setPhotoFilter('sepia')}
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition-colors ${
                          photoFilter === 'sepia' ? 'bg-[#f59e0b] text-[#110b1b]' : 'bg-[#231d2d] text-[#c9c2b5]'
                        }`}
                      >
                        Vintage Sepia
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2: Identity & Lifespan */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-[#fcf9f2] uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#ffc174]">id_card</span>
              <span>Step 2: Identity & Lifespan</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-[11px] text-[#c9c2b5] uppercase">Full Name</span>
                <input 
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Abuela Rosa Morales"
                  className="w-full px-3 py-2 rounded-xl bg-[#110b1b] border border-[#ffc174]/20 text-xs text-[#fcf9f2] focus:outline-none focus:border-[#f59e0b]"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-[#c9c2b5] uppercase">Relationship / Title</span>
                <input 
                  type="text"
                  value={relation}
                  onChange={e => setRelation(e.target.value)}
                  placeholder="e.g. Beloved Grandmother & Mentor"
                  className="w-full px-3 py-2 rounded-xl bg-[#110b1b] border border-[#ffc174]/20 text-xs text-[#fcf9f2] focus:outline-none focus:border-[#f59e0b]"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-[#c9c2b5] uppercase">Birth Year</span>
                <input 
                  type="text"
                  value={birthYear}
                  onChange={e => setBirthYear(e.target.value)}
                  placeholder="1938"
                  className="w-full px-3 py-2 rounded-xl bg-[#110b1b] border border-[#ffc174]/20 text-xs text-[#fcf9f2] focus:outline-none focus:border-[#f59e0b]"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-[#c9c2b5] uppercase">Passing Year</span>
                <input 
                  type="text"
                  value={passingYear}
                  onChange={e => setPassingYear(e.target.value)}
                  placeholder="2022"
                  className="w-full px-3 py-2 rounded-xl bg-[#110b1b] border border-[#ffc174]/20 text-xs text-[#fcf9f2] focus:outline-none focus:border-[#f59e0b]"
                />
              </div>
            </div>
          </div>

          {/* STEP 3: Altar Tier Placement */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#fcf9f2] uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#ffc174]">layers</span>
                <span>Step 3: Altar Tier Placement</span>
              </label>
              <span className="text-[11px] text-[#ffc174]">3-Tier Tradition</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              <button 
                type="button"
                onClick={() => setTierPosition(1)}
                className={`text-left p-3 rounded-xl border transition-all flex flex-col justify-between ${
                  tierPosition === 1 
                    ? 'bg-[#2e2738] border-[#f59e0b] shadow-[0_0_20px_rgba(245,158,11,0.25)]' 
                    : 'bg-[#110b1b] border-[#ffc174]/15 hover:border-[#ffc174]/40'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-[10px] uppercase font-bold text-[#ffc174]">Tier 1</span>
                  {tierPosition === 1 && <span className="w-2 h-2 rounded-full bg-[#f59e0b]"></span>}
                </div>
                <div>
                  <p className="font-serif text-xs font-bold text-[#fcf9f2]">Cielo • Heavens</p>
                  <p className="text-[10px] text-[#c9c2b5] mt-0.5">Spiritual rest, holy copal, pure light.</p>
                </div>
              </button>

              <button 
                type="button"
                onClick={() => setTierPosition(2)}
                className={`text-left p-3 rounded-xl border transition-all flex flex-col justify-between ${
                  tierPosition === 2 
                    ? 'bg-[#2e2738] border-[#f59e0b] shadow-[0_0_20px_rgba(245,158,11,0.25)]' 
                    : 'bg-[#110b1b] border-[#ffc174]/15 hover:border-[#ffc174]/40'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-[10px] uppercase font-bold text-[#ffb1c7]">Tier 2</span>
                  {tierPosition === 2 && <span className="w-2 h-2 rounded-full bg-[#ffb1c7]"></span>}
                </div>
                <div>
                  <p className="font-serif text-xs font-bold text-[#fcf9f2]">Tierra • Earth</p>
                  <p className="text-[10px] text-[#c9c2b5] mt-0.5">Favorite dishes, guitars, memories.</p>
                </div>
              </button>

              <button 
                type="button"
                onClick={() => setTierPosition(3)}
                className={`text-left p-3 rounded-xl border transition-all flex flex-col justify-between ${
                  tierPosition === 3 
                    ? 'bg-[#2e2738] border-[#f59e0b] shadow-[0_0_20px_rgba(245,158,11,0.25)]' 
                    : 'bg-[#110b1b] border-[#ffc174]/15 hover:border-[#ffc174]/40'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-[10px] uppercase font-bold text-[#e4bfff]">Tier 3</span>
                  {tierPosition === 3 && <span className="w-2 h-2 rounded-full bg-[#e4bfff]"></span>}
                </div>
                <div>
                  <p className="font-serif text-xs font-bold text-[#fcf9f2]">Roots • Mictlán</p>
                  <p className="text-[10px] text-[#c9c2b5] mt-0.5">Sugar skulls, marigold path.</p>
                </div>
              </button>
            </div>
          </div>

          {/* STEP 4: Earthly Offerings & Joys */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#fcf9f2] uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#ffc174]">local_cafe</span>
                <span>Step 4: Earthly Joys & Favorite Offerings</span>
              </label>
              <span className="text-[11px] text-[#c9c2b5]">Click to add</span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {quickOfferingPresets.map((item, idx) => {
                const isSelected = currentFoodsList.includes(item.label)
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleFavoriteFood(item.label)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
                      isSelected 
                        ? 'bg-[#be0062] text-white shadow-md' 
                        : 'bg-[#1f1929] text-[#c9c2b5] hover:text-[#fcf9f2] border border-[#ffc174]/15'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* STEP 5: Privacy Guarantee Banner */}
          <div className="p-3.5 rounded-xl bg-[#110b1b] border border-[#ffc174]/15 flex items-start gap-3">
            <Shield size={18} className="text-[#ffc174] shrink-0 mt-0.5" />
            <div className="text-xs text-[#c9c2b5]">
              <span className="font-bold text-[#ffc174] uppercase tracking-wider">
                100% On-Device Sovereign Privacy
              </span>
              <p className="mt-0.5">
                Photographs, spoken audio, and family memories never touch a remote cloud server. Powered directly by open-weight Gemma AI.
              </p>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="pt-2 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 border-t border-[#ffc174]/15">
            <button 
              type="button" 
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#1f1929] hover:bg-[#2e2738] text-[#c9c2b5] text-xs font-semibold"
            >
              Cancel
            </button>

            <button 
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#ffc174] to-[#f59e0b] text-[#110b1b] font-bold text-xs hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(245,158,11,0.35)] active:scale-95"
            >
              <Flame size={16} />
              <span>Place on Altar & Light Candle</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
