import React, { useState } from 'react'
import { MemorialProfile, AltarOffering, CandleState } from '../types'
import { Candle } from './Candle'
import { Plus, Heart, Sparkles, BookOpen, Music, Flame, Shield, X, Check } from 'lucide-react'
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
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 3200)
  }

  const getCandlesForTier = (tier: 1 | 2 | 3) => candles.filter(c => c.tier === tier)
  const getOfferingsForTier = (tier: 1 | 2 | 3) => offerings.filter(o => o.tier === tier)
  const getMemorialsForTier = (tier: 1 | 2 | 3) => memorials.filter(m => m.tierPosition === tier)

  const handleFrameClick = (memorial: MemorialProfile) => {
    soundService.playOfferingPlaced()
    onSelectMemorial(memorial)
  }

  const handleQuickLight = (e: React.MouseEvent, tier: 1 | 2 | 3) => {
    e.stopPropagation()
    const tierCandles = getCandlesForTier(tier)
    const unlit = tierCandles.find(c => !c.isLit)
    if (unlit) {
      onToggleCandle(unlit.id)
      showToast('A warm candle was lit with devotion.')
    } else if (tierCandles.length > 0) {
      onToggleCandle(tierCandles[0].id)
      showToast('Candle flame adjusted.')
    }
  }

  const litCount = candles.filter(c => c.isLit).length

  // Finding Abuela Rosa or first memorial for center spot
  const primaryAncestor = memorials.find(m => m.tierPosition === 1) || memorials[0]
  const tier2Ancestors = memorials.filter(m => m.id !== primaryAncestor?.id)

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 pt-24 pb-32 flex flex-col items-center relative select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 px-4 py-2.5 rounded-xl bg-[#2e2738] text-[#ffc174] font-medium text-sm shadow-2xl border border-[#f59e0b]/40 flex items-center gap-2 animate-bounce">
          <Flame size={16} className="text-[#f59e0b]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Sanctuary Metadata & Living Flame Counter Bar */}
      <div className="flex flex-wrap items-center justify-between w-full gap-3 mb-6">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2e2738]/80 border border-[#ffc174]/15 shadow-md">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] animate-pulse"></span>
          <span className="text-xs text-[#ffc174] font-semibold tracking-widest uppercase">
            Sacred Family Sanctuary
          </span>
          <span className="text-[#a08e7a] text-xs">•</span>
          <span className="text-xs text-[#c9c2b5]">
            Grand November Ofrenda
          </span>
        </div>

        {/* Living Flame Aggregate Counter Badge */}
        <div 
          onClick={(e) => handleQuickLight(e, 1)}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1f1929] border border-[#f59e0b]/30 shadow-[0_0_24px_rgba(245,158,11,0.18)] cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95"
          title="Click to light a tribute candle"
        >
          <Flame size={16} className="text-[#ffc174] animate-pulse" />
          <span className="text-sm font-semibold text-[#ffc174]">
            {litCount} Candles Lit
          </span>
          <span className="text-xs text-[#ffb1c7] uppercase tracking-wider">
            by the Family
          </span>
        </div>
      </div>

      {/* Sacred Overhead Arch Crest (Arco de Cempasúchil) */}
      <div className="relative w-full flex flex-col items-center text-center mb-8">
        <div className="w-full flex items-center justify-center gap-3 mb-2 opacity-85">
          <div className="h-px w-20 md:w-32 bg-gradient-to-r from-transparent to-[#ffc174]"></div>
          <div className="flex items-center gap-1.5 text-[#ffc174]">
            <span className="text-sm">🏵️</span>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold">
              In Miquiztli • In Yoliliztli
            </span>
            <span className="text-sm">🏵️</span>
          </div>
          <div className="h-px w-20 md:w-32 bg-gradient-to-l from-transparent to-[#ffc174]"></div>
        </div>

        <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#ffc174] tracking-tight drop-shadow-[0_4px_24px_rgba(245,158,11,0.3)]">
          Main Altar of the Spirits
        </h1>
        <p className="text-sm md:text-base text-[#c9c2b5] max-w-2xl mt-1.5">
          Three tiers of light, fragrance, and sacred memory preserved beyond time by sovereign local Gemma AI.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* 3-TIER SACRED ALTAR STAGE                                                 */}
      {/* ========================================================================= */}
      <div className="w-full flex flex-col items-center relative z-20 space-y-8 max-w-5xl">
        
        {/* ======================================================= */}
        {/* TIER 1: CIELO (The Heavens & Spiritual Ascent)           */}
        {/* ======================================================= */}
        <section className="w-full flex flex-col items-center relative">
          {/* Overline Marker */}
          <div className="flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[#110b1b] border border-[#ffc174]/15 shadow-sm">
            <span className="text-xs uppercase tracking-widest text-[#ffc174] font-semibold">
              Tier I • Cielo
            </span>
            <span className="text-[#a08e7a] text-xs">•</span>
            <span className="text-xs text-[#c9c2b5]">
              Heavenly Abode • Purification and Light
            </span>
          </div>

          {/* Platform Surface Card */}
          <div className="w-full rounded-2xl bg-[#231d2d]/80 backdrop-blur-xl p-5 md:p-8 border border-[#ffc174]/20 shadow-[0_16px_40px_rgba(0,0,0,0.6)] flex flex-col items-center relative overflow-hidden">
            {/* Golden Velvet Shimmer Glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#ffc174]/15 rounded-full blur-[90px] pointer-events-none"></div>

            <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
              {/* Left Wing: Holy Salt Vessel & Chalice */}
              <div className="md:col-span-3 flex flex-col items-center md:items-end justify-center gap-3">
                {/* Vessel of Pure Water */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#2e2738]/85 border border-[#ffc174]/10 shadow-md w-full max-w-[240px]">
                  <div className="w-10 h-10 rounded-lg bg-[#110b1b] flex items-center justify-center text-[#ffc174] shadow-inner">
                    <span className="material-symbols-outlined text-[22px]">water_drop</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold text-[#fcf9f2] truncate">Vessel of Pure Water</span>
                    <span className="text-[11px] text-[#c9c2b5]">To quench the soul's thirst</span>
                  </div>
                </div>

                {/* Holy Salt Bowl */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#2e2738]/85 border border-[#ffc174]/10 shadow-md w-full max-w-[240px]">
                  <div className="w-10 h-10 rounded-lg bg-[#110b1b] flex items-center justify-center text-[#ffc174] shadow-inner">
                    <span className="material-symbols-outlined text-[22px]">grain</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold text-[#fcf9f2] truncate">Sacred Salt</span>
                    <span className="text-[11px] text-[#c9c2b5]">Spiritual purification</span>
                  </div>
                </div>

                {/* Left Pillar Candle */}
                {getCandlesForTier(1).slice(0, 1).map(candle => (
                  <div key={candle.id} className="pt-2">
                    <Candle candle={candle} onToggle={onToggleCandle} size="md" />
                  </div>
                ))}
              </div>

              {/* Centerpiece: Grand Baroque Golden Arched Portrait Frame */}
              <div className="md:col-span-6 flex flex-col items-center justify-center">
                {primaryAncestor ? (
                  <div 
                    onClick={() => handleFrameClick(primaryAncestor)}
                    className="relative group cursor-pointer"
                  >
                    {/* Golden Radiance Aura */}
                    <div className="absolute -inset-4 rounded-full bg-[#f59e0b]/20 blur-xl group-hover:bg-[#f59e0b]/35 transition-all duration-700"></div>

                    {/* Handcrafted Baroque Arched Portrait Frame */}
                    <div className="relative w-64 h-80 sm:w-72 sm:h-88 rounded-t-[100px] rounded-b-2xl p-3 bg-gradient-to-b from-[#ffc174] via-[#f59e0b] to-[#be0062]/60 shadow-[0_20px_60px_rgba(0,0,0,0.85)] border border-[#ffc174]/50 transition-transform duration-500 group-hover:-translate-y-1">
                      {/* Inner Velvet Matting */}
                      <div className="w-full h-full rounded-t-[90px] rounded-b-xl overflow-hidden bg-[#110b1b] relative flex flex-col border border-black/80">
                        <img 
                          src={primaryAncestor.photoUrl} 
                          alt={primaryAncestor.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95 contrast-105"
                        />

                        {/* Scrim with Ancestor Name */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#110b1b] via-[#110b1b]/30 to-transparent flex flex-col justify-end p-4 text-center">
                          <span className="font-serif text-lg md:text-xl text-[#ffc174] font-bold tracking-wide leading-tight drop-shadow-md">
                            {primaryAncestor.name}
                          </span>
                          <span className="text-xs text-[#ffb1c7] tracking-widest uppercase mt-0.5 font-medium">
                            {primaryAncestor.birthYear} — {primaryAncestor.passingYear}
                          </span>
                          <div className="flex items-center justify-center gap-1.5 mt-2 text-[#fcf9f2] text-xs">
                            <span className="material-symbols-outlined text-[15px] text-[#ffc174]">mic</span>
                            <span>{primaryAncestor.oralMemories?.length || 1} Oral History Preserved</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Golden Arch Crown Star Emblem */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#f59e0b] text-[#110b1b] flex items-center justify-center shadow-lg border border-[#ffc174]">
                      <span className="material-symbols-outlined text-[18px]">stars</span>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={() => onOpenNewMemorial(1)}
                    className="p-8 border-2 border-dashed border-[#ffc174]/40 rounded-2xl flex flex-col items-center gap-2 hover:border-[#f59e0b] transition-colors"
                  >
                    <Plus size={28} className="text-[#ffc174]" />
                    <span className="text-sm text-[#ffc174] font-semibold">Place Beloved Portrait on Tier 1</span>
                  </button>
                )}

                {/* Candlelight Quote Banner */}
                <p className="font-serif italic text-sm md:text-base text-[#ffc174] mt-4 text-center max-w-sm">
                  “While we are remembered with love, we remain alive in the home.”
                </p>
              </div>

              {/* Right Wing: Copal Burner & Tall Candle */}
              <div className="md:col-span-3 flex flex-col items-center md:items-start justify-center gap-3">
                {/* Sahumerio de Copal (Copal Incense Burner) */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#2e2738]/85 border border-[#ffc174]/10 shadow-md w-full max-w-[240px]">
                  <div className="w-10 h-10 rounded-lg bg-[#110b1b] flex items-center justify-center text-[#ffc174] shadow-inner relative overflow-hidden">
                    <span className="material-symbols-outlined text-[22px]">local_fire_department</span>
                    <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 32 32">
                      <path d="M16 26 C14 20, 18 16, 16 10 C14 6, 16 2, 16 2" fill="none" stroke="currentColor" strokeDasharray="2 3" strokeWidth="1.5">
                        <animate attributeName="stroke-dashoffset" dur="2s" repeatCount="indefinite" values="10;0" />
                      </path>
                    </svg>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold text-[#fcf9f2] truncate">Copal Incense Burner</span>
                    <span className="text-[11px] text-[#c9c2b5]">Guiding sacred fragrance</span>
                  </div>
                </div>

                {/* Family Rosary Heirloom */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#2e2738]/85 border border-[#ffc174]/10 shadow-md w-full max-w-[240px]">
                  <div className="w-10 h-10 rounded-lg bg-[#110b1b] flex items-center justify-center text-[#ffb1c7] shadow-inner">
                    <span className="material-symbols-outlined text-[20px]">church</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold text-[#fcf9f2] truncate">Family Rosary</span>
                    <span className="text-[11px] text-[#c9c2b5]">Olive wood heirloom</span>
                  </div>
                </div>

                {/* Right Pillar Candle */}
                {getCandlesForTier(1).slice(1, 2).map(candle => (
                  <div key={candle.id} className="pt-2">
                    <Candle candle={candle} onToggle={onToggleCandle} size="md" />
                  </div>
                ))}
              </div>
            </div>

            {/* Tier 1 Offering Badges */}
            <div className="flex items-center justify-center gap-2 flex-wrap mt-6 pt-4 border-t border-[#ffc174]/15 w-full">
              {getOfferingsForTier(1).map(offering => (
                <div 
                  key={offering.id}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#110b1b] border border-[#ffc174]/20 text-xs text-[#fcf9f2] shadow-sm"
                >
                  <span>🏵️</span>
                  <span>{offering.name}</span>
                  <button 
                    onClick={() => onRemoveOffering(offering.id)}
                    className="text-[#a08e7a] hover:text-[#ffc174] ml-1"
                    title="Remove offering"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button 
                onClick={() => onOpenOfferingModal(1)}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#2e2738] text-xs text-[#ffc174] hover:bg-[#393243] transition-colors"
              >
                <Plus size={12} /> Place Offering
              </button>
            </div>
          </div>
        </section>

        {/* ======================================================= */}
        {/* TIER 2: TIERRA (Earth, Shared Table & Earthly Nourishment) */}
        {/* ======================================================= */}
        <section className="w-full flex flex-col items-center relative -mt-3">
          {/* Overline Marker */}
          <div className="flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[#110b1b] border border-[#ffb1c7]/20 shadow-sm">
            <span className="text-xs uppercase tracking-widest text-[#ffb1c7] font-semibold">
              Tier II • Tierra
            </span>
            <span className="text-[#a08e7a] text-xs">•</span>
            <span className="text-xs text-[#c9c2b5]">
              Earthly Banquet • Bread, Coffee, and Melodies
            </span>
          </div>

          {/* Tier 2 Wide Sanctuary Shelf Deck */}
          <div className="w-full rounded-2xl bg-[#2e2738]/85 backdrop-blur-xl p-5 md:p-7 border border-[#ffc174]/20 shadow-[0_20px_50px_rgba(0,0,0,0.65)] flex flex-col gap-6 relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="text-base md:text-lg font-serif font-bold text-[#ffc174] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ffc174]">diversity_1</span>
                Portraits at This Table
              </span>
              <span className="text-xs text-[#c9c2b5]">
                Tap a portrait to listen or dedicate light
              </span>
            </div>

            {/* Memorials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Existing Tier 2 Ancestors */}
              {tier2Ancestors.map(mem => (
                <div 
                  key={mem.id}
                  onClick={() => handleFrameClick(mem)}
                  className="p-4 rounded-xl bg-[#110b1b]/80 border border-[#ffc174]/15 hover:border-[#f59e0b]/50 shadow-md hover:bg-[#1f1929] transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#231d2d] shrink-0 border border-[#ffc174]/30 shadow-inner">
                      <img 
                        src={mem.photoUrl} 
                        alt={mem.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-serif text-sm font-bold text-[#fcf9f2] truncate group-hover:text-[#ffc174] transition-colors">
                        {mem.name}
                      </span>
                      <span className="text-xs text-[#ffb1c7] uppercase font-medium">
                        {mem.birthYear} — {mem.passingYear}
                      </span>
                      <p className="text-xs text-[#c9c2b5] mt-1 line-clamp-2">
                        {mem.epitaph || mem.favoriteSaying || 'Remembered with love, music, and quiet devotion.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#ffc174]/10">
                    <span className="text-xs text-[#ffc174] flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-[14px]">headphones</span>
                      {mem.oralMemories?.length || 1} Anecdotes
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        handleQuickLight(e, 2)
                      }}
                      className="text-xs text-[#fcf9f2] hover:text-[#ffc174] flex items-center gap-1 font-semibold"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[15px] text-[#ffc174]">local_fire_department</span>
                      Dedicate Light
                    </button>
                  </div>
                </div>
              ))}

              {/* + Add Loved One Sacred Portal Card */}
              <div 
                onClick={() => onOpenNewMemorial(2)}
                className="p-4 rounded-xl bg-[#110b1b]/40 border border-dashed border-[#ffc174]/30 hover:border-[#ffc174] hover:bg-[#110b1b]/70 transition-all flex flex-col items-center justify-center text-center cursor-pointer group py-6"
              >
                <div className="w-11 h-11 rounded-full bg-[#231d2d] border border-[#ffc174]/30 flex items-center justify-center text-[#ffc174] group-hover:bg-[#f59e0b] group-hover:text-[#110b1b] transition-colors mb-2 shadow-sm">
                  <Plus size={20} />
                </div>
                <span className="font-serif text-sm font-bold text-[#fcf9f2] group-hover:text-[#ffc174] transition-colors">
                  + Place a Loved One
                </span>
                <span className="text-xs text-[#c9c2b5] max-w-[180px] mt-0.5">
                  Upload portrait or transcribe spoken memories locally
                </span>
              </div>
            </div>

            {/* Earthly Offerings Tray */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-[#231d2d] border border-[#ffc174]/10 flex items-center gap-3 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-[#110b1b] flex items-center justify-center text-xl shrink-0">
                  🍞
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold text-[#fcf9f2] truncate">Pan de Muerto</span>
                  <span className="text-[11px] text-[#c9c2b5]">Orange blossom & sugar</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#231d2d] border border-[#ffc174]/10 flex items-center gap-3 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-[#110b1b] flex items-center justify-center text-xl shrink-0">
                  ☕
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold text-[#fcf9f2] truncate">Café de Olla</span>
                  <span className="text-[11px] text-[#c9c2b5]">Cinnamon & piloncillo</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#231d2d] border border-[#ffc174]/10 flex items-center gap-3 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-[#110b1b] flex items-center justify-center text-xl shrink-0">
                  🎸
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold text-[#fcf9f2] truncate">Spanish Guitar</span>
                  <span className="text-[11px] text-[#c9c2b5]">For Don Mateo's melodies</span>
                </div>
              </div>

              <div 
                onClick={(e) => handleQuickLight(e, 2)}
                className="p-3 rounded-xl bg-[#2e2738] hover:bg-[#393243] border border-[#f59e0b]/40 transition-colors flex items-center gap-3 shadow-sm cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#f59e0b] text-[#110b1b] flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(245,158,11,0.4)] group-hover:scale-105 transition-transform">
                  <Flame size={20} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-[#ffc174] truncate">Light Veladora</span>
                  <span className="text-[11px] text-[#c9c2b5]">Offer warm prayer</span>
                </div>
              </div>
            </div>

            {/* Candle Row on Tier 2 */}
            <div className="flex justify-around items-end pt-3 border-t border-[#ffc174]/15">
              {getCandlesForTier(2).map(candle => (
                <Candle key={candle.id} candle={candle} onToggle={onToggleCandle} size="md" />
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================= */}
        {/* TIER 3: INFRAMUNDO (Underworld, Roots, Sugar Skulls)      */}
        {/* ======================================================= */}
        <section className="w-full flex flex-col items-center relative -mt-3">
          {/* Overline Marker */}
          <div className="flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[#110b1b] border border-[#ffc174]/20 shadow-sm">
            <span className="text-xs uppercase tracking-widest text-[#ffc174] font-semibold">
              Tier III • Inframundo & Roots
            </span>
            <span className="text-[#a08e7a] text-xs">•</span>
            <span className="text-xs text-[#c9c2b5]">
              Mictlán • Marigold Carpet & Calaveras
            </span>
          </div>

          {/* Tier 3 Base Platform Container */}
          <div className="w-full rounded-2xl bg-[#110b1b]/95 backdrop-blur-xl p-5 md:p-8 border border-[#ffc174]/20 shadow-[0_24px_60px_rgba(0,0,0,0.85)] flex flex-col gap-6 relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left: Calaveras de Azúcar & Fruit Bowl */}
              <div className="md:col-span-4 flex flex-col gap-3">
                <div className="p-4 rounded-xl bg-[#231d2d] border border-[#ffc174]/10 flex items-center gap-3.5 shadow-sm">
                  <div className="w-14 h-14 rounded-xl bg-[#be0062] text-white flex items-center justify-center shrink-0 shadow-md text-2xl">
                    💀
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-serif text-sm font-bold text-[#ffb1c7]">Sugar Skull (Calavera)</span>
                    <span className="text-[11px] text-[#c9c2b5]">Vivid magenta icing and gold foil</span>
                    <span className="text-[10px] text-[#ffc174] mt-0.5 uppercase tracking-wider font-semibold">Sweetness before mystery</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#231d2d] border border-[#ffc174]/10 flex items-center gap-3.5 shadow-sm">
                  <div className="w-14 h-14 rounded-xl bg-[#2e2738] text-[#ffc174] flex items-center justify-center shrink-0 shadow-inner text-2xl">
                    🍊
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-serif text-sm font-bold text-[#fcf9f2]">Autumn Harvest</span>
                    <span className="text-[11px] text-[#c9c2b5]">Tangerines, sweet tejocotes, sugarcane</span>
                    <span className="text-[10px] text-[#a08e7a] mt-0.5 uppercase tracking-wider font-semibold">Family harvest</span>
                  </div>
                </div>
              </div>

              {/* Center: Tapete de Cempasúchil (Golden Pathway Guiding Spirits) */}
              <div className="md:col-span-8 flex flex-col justify-center">
                <div className="relative w-full rounded-2xl p-5 bg-[#2e2738]/60 border border-[#ffc174]/15 shadow-inner flex flex-col overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-[#ffc174]">
                      <span className="material-symbols-outlined text-[20px]">flare</span>
                      <span className="font-serif text-sm md:text-base font-bold text-[#ffc174]">
                        Marigold Carpet & Pathway (Tapete de Cempasúchil)
                      </span>
                    </div>
                    <span className="text-[10px] text-[#c9c2b5] uppercase tracking-wider font-semibold">
                      Midnight Guide Light
                    </span>
                  </div>

                  <p className="text-xs text-[#c9c2b5] mb-4">
                    Hand-plucked fragrant petals forming the vibrant aromatic golden carpet that guides our loved ones from the veil of the unknown back into our warm home.
                  </p>

                  {/* Visual Petal Pathway Nodes */}
                  <div className="w-full flex items-center justify-between gap-1 p-3 rounded-xl bg-[#110b1b]/90 border border-[#ffc174]/10 shadow-sm">
                    <div className="flex items-center gap-2 overflow-x-auto py-1 w-full justify-around text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-base animate-bounce">🚪</span>
                        <span className="text-[10px] text-[#c9c2b5] mt-1 font-medium">Doorway</span>
                      </div>
                      <div className="h-0.5 w-10 md:w-16 bg-[#f59e0b]/40"></div>
                      <div className="flex flex-col items-center">
                        <span className="text-base">🏵️</span>
                        <span className="text-[10px] text-[#c9c2b5] mt-1 font-medium">Courtyard</span>
                      </div>
                      <div className="h-0.5 w-10 md:w-16 bg-[#f59e0b]/40"></div>
                      <div className="flex flex-col items-center">
                        <span className="text-base">🕯️</span>
                        <span className="text-[10px] text-[#ffb1c7] mt-1 font-medium">Threshold</span>
                      </div>
                      <div className="h-0.5 w-10 md:w-16 bg-[#f59e0b]/40"></div>
                      <div className="flex flex-col items-center">
                        <span className="text-lg">⭐</span>
                        <span className="text-[10px] text-[#ffc174] mt-1 font-bold">Ofrenda</span>
                      </div>
                    </div>
                  </div>

                  {/* Floor Vigil Candles */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#ffc174]/10">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1.5">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#f59e0b] shadow-[0_0_8px_rgba(245,158,11,0.8)] inline-block"></span>
                        <span className="w-3.5 h-3.5 rounded-full bg-[#ffc174] shadow-[0_0_8px_rgba(255,193,116,0.8)] inline-block"></span>
                        <span className="w-3.5 h-3.5 rounded-full bg-[#be0062] shadow-[0_0_8px_rgba(190,0,98,0.8)] inline-block"></span>
                      </div>
                      <span className="text-xs text-[#fcf9f2] font-medium">Ash Cross & Blessed Copal</span>
                    </div>
                    <span className="text-xs text-[#a08e7a]">Protection & Eternal Peace</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Candle Row on Tier 3 */}
            <div className="flex justify-around items-end pt-4 border-t border-[#ffc174]/15">
              {getCandlesForTier(3).map(candle => (
                <Candle key={candle.id} candle={candle} onToggle={onToggleCandle} size="lg" />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ========================================================================= */}
      {/* FLOATING SACRED ACTION DOCK (STICKY BOTTOM CONTROLS)                      */}
      {/* ========================================================================= */}
      <aside className="fixed bottom-6 z-40 w-full px-4 flex justify-center pointer-events-none">
        <div className="pointer-events-auto p-2 rounded-2xl bg-[#110b1b]/95 backdrop-blur-2xl border border-[#ffc174]/25 shadow-[0_16px_50px_rgba(0,0,0,0.85)] flex flex-wrap items-center justify-center gap-2 max-w-2xl">
          {/* Primary Action: + Place a Loved One */}
          <button 
            onClick={() => onOpenNewMemorial(1)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#ffc174] to-[#f59e0b] text-[#110b1b] font-bold text-xs hover:brightness-110 transition-all shadow-[0_0_20px_rgba(245,158,11,0.35)] active:scale-95"
            type="button"
          >
            <Plus size={16} />
            <span>Place Loved One</span>
          </button>

          {/* Action 2: Offer an Element */}
          <button 
            onClick={() => onOpenOfferingModal(2)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#2e2738] text-[#fcf9f2] font-semibold text-xs hover:bg-[#393243] hover:text-[#ffc174] border border-[#ffc174]/15 transition-all active:scale-95"
            type="button"
          >
            <span className="text-sm">🏵️</span>
            <span>Place Offering</span>
          </button>

          {/* Action 3: Light Candle */}
          <button 
            onClick={(e) => handleQuickLight(e, 1)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#2e2738] text-[#fcf9f2] font-semibold text-xs hover:bg-[#393243] hover:text-[#ffc174] border border-[#ffc174]/15 transition-all active:scale-95"
            type="button"
          >
            <Flame size={14} className="text-[#f59e0b]" />
            <span>Dedicate Flame</span>
          </button>

          {/* Action 4: Offline Sanctuary Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1f1929] text-[#c9c2b5] text-xs border border-[#ffc174]/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>100% Offline Sanctuary</span>
          </div>
        </div>
      </aside>
    </div>
  )
}
