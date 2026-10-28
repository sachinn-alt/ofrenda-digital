import React, { useState, useEffect } from 'react'
import { MemorialProfile, AltarOffering, CandleState, GemmaConfig } from './types'
import { storageService } from './services/storageService'
import { gemmaService } from './services/gemmaService'
import { Header } from './components/Header'
import { AltarCanvas } from './components/AltarCanvas'
import { FallingPetals } from './components/FallingPetals'
import { MemorialModal } from './components/MemorialModal'
import { NewMemorialModal } from './components/NewMemorialModal'
import { OfferingSelector } from './components/OfferingSelector'
import { WhyOpenMattersModal } from './components/WhyOpenMattersModal'
import { MemoryCapsuleModal } from './components/MemoryCapsuleModal'
import { GemmaConfigModal } from './components/GemmaConfigModal'
import { Flame, ShieldCheck, Sparkles, Heart } from 'lucide-react'

export const App: React.FC = () => {
  const [memorials, setMemorials] = useState<MemorialProfile[]>([])
  const [offerings, setOfferings] = useState<AltarOffering[]>([])
  const [candles, setCandles] = useState<CandleState[]>([])
  const [gemmaConfig, setGemmaConfig] = useState<GemmaConfig>(storageService.getGemmaConfig())
  const [isOllamaActive, setIsOllamaActive] = useState<boolean>(false)

  // Ambient effects
  const [petalsActive, setPetalsActive] = useState<boolean>(true)

  // Modals state
  const [selectedMemorial, setSelectedMemorial] = useState<MemorialProfile | null>(null)
  const [isNewMemorialOpen, setIsNewMemorialOpen] = useState<boolean>(false)
  const [newMemorialTier, setNewMemorialTier] = useState<1 | 2 | 3>(1)
  const [isOfferingModalOpen, setIsOfferingModalOpen] = useState<boolean>(false)
  const [offeringTier, setOfferingTier] = useState<1 | 2 | 3>(1)
  const [isWhyOpenModalOpen, setIsWhyOpenModalOpen] = useState<boolean>(false)
  const [isCapsuleModalOpen, setIsCapsuleModalOpen] = useState<boolean>(false)
  const [isGemmaConfigModalOpen, setIsGemmaConfigModalOpen] = useState<boolean>(false)

  // Load state from local storage on mount
  useEffect(() => {
    loadAltarData()
    checkOllamaConnection()
  }, [])

  const loadAltarData = () => {
    setMemorials(storageService.getMemorials())
    setOfferings(storageService.getOfferings())
    setCandles(storageService.getCandles())
    setGemmaConfig(storageService.getGemmaConfig())
  }

  const checkOllamaConnection = async () => {
    const res = await gemmaService.testOllamaConnection()
    setIsOllamaActive(res.ok)
  }

  // Candle interactions
  const handleToggleCandle = (id: string) => {
    const updated = storageService.toggleCandle(id)
    setCandles(updated)
  }

  const handleLightAllCandles = () => {
    const updated = storageService.lightAllCandles()
    setCandles(updated)
  }

  const handleExtinguishAllCandles = () => {
    const updated = storageService.extinguishAllCandles()
    setCandles(updated)
  }

  // Memorial handlers
  const handleSaveNewMemorial = (newMem: MemorialProfile) => {
    const updated = storageService.addMemorial(newMem)
    setMemorials(updated)
    setSelectedMemorial(newMem) // Open immediately to explore
  }

  const handleUpdateMemorial = (updated: MemorialProfile) => {
    const list = storageService.updateMemorial(updated)
    setMemorials(list)
    setSelectedMemorial(updated)
  }

  const handleDeleteMemorial = (id: string) => {
    const list = storageService.deleteMemorial(id)
    setMemorials(list)
  }

  // Offering handlers
  const handleOpenOfferingModal = (tier: 1 | 2 | 3) => {
    setOfferingTier(tier)
    setIsOfferingModalOpen(true)
  }

  const handleOpenNewMemorial = (tier: 1 | 2 | 3 = 1) => {
    setNewMemorialTier(tier)
    setIsNewMemorialOpen(true)
  }

  const handleAddOffering = (offering: AltarOffering) => {
    const updated = storageService.addOffering(offering)
    setOfferings(updated)
  }

  const handleRemoveOffering = (id: string) => {
    const updated = storageService.removeOffering(id)
    setOfferings(updated)
  }

  const allCandlesLit = candles.length > 0 && candles.every(c => c.isLit)

  return (
    <div 
      className="app-container" 
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      {/* Falling Marigold Petals Ambient Layer */}
      {petalsActive && <FallingPetals />}

      {/* Top Header & Navigation */}
      <Header 
        onOpenNewMemorial={() => handleOpenNewMemorial(1)}
        onOpenWhyOpenMatters={() => setIsWhyOpenModalOpen(true)}
        onOpenGemmaConfig={() => setIsGemmaConfigModalOpen(true)}
        onOpenCapsuleModal={() => setIsCapsuleModalOpen(true)}
        onLightAllCandles={handleLightAllCandles}
        onExtinguishAllCandles={handleExtinguishAllCandles}
        petalsActive={petalsActive}
        onTogglePetals={() => setPetalsActive(!petalsActive)}
        allCandlesLit={allCandlesLit}
        activeModelName={gemmaConfig.modelName}
        isOllamaConnected={isOllamaActive}
      />

      {/* Central Interactive Altar */}
      <main style={{ flex: 1, zIndex: 10 }}>
        <AltarCanvas 
          memorials={memorials}
          offerings={offerings}
          candles={candles}
          onSelectMemorial={m => setSelectedMemorial(m)}
          onToggleCandle={handleToggleCandle}
          onOpenOfferingModal={handleOpenOfferingModal}
          onOpenNewMemorial={handleOpenNewMemorial}
          onRemoveOffering={handleRemoveOffering}
        />
      </main>

      {/* Footer */}
      <footer 
        style={{
          padding: '24px 20px',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.84rem',
          borderTop: '1px solid rgba(255, 170, 0, 0.15)',
          background: 'rgba(8, 7, 13, 0.95)',
          zIndex: 10,
          position: 'relative'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
          <span className="font-serif text-gold-gradient" style={{ fontWeight: 700 }}>
            OFRENDA DIGITAL
          </span>
          <span>•</span>
          <span>A sacred Día de los Muertos sanctuary</span>
          <span>•</span>
          <span style={{ color: 'var(--cempasuchil-gold)' }}>
            Hacktoberfest 2026: Ghost in the Machine
          </span>
        </div>
        <p style={{ maxWidth: 680, margin: '0 auto', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
          Built with open-weight Google Gemma AI at its core. Runs 100% locally on your machine with the lights and internet off, keeping family memories sacred and private forever.
        </p>
      </footer>

      {/* Modals */}
      {selectedMemorial && (
        <MemorialModal 
          memorial={selectedMemorial}
          onClose={() => setSelectedMemorial(null)}
          onUpdateMemorial={handleUpdateMemorial}
          onDeleteMemorial={handleDeleteMemorial}
        />
      )}

      {isNewMemorialOpen && (
        <NewMemorialModal 
          initialTier={newMemorialTier}
          onClose={() => setIsNewMemorialOpen(false)}
          onSave={handleSaveNewMemorial}
        />
      )}

      {isOfferingModalOpen && (
        <OfferingSelector 
          tier={offeringTier}
          onClose={() => setIsOfferingModalOpen(false)}
          onAddOffering={handleAddOffering}
        />
      )}

      {isWhyOpenModalOpen && (
        <WhyOpenMattersModal 
          onClose={() => setIsWhyOpenModalOpen(false)}
        />
      )}

      {isCapsuleModalOpen && (
        <MemoryCapsuleModal 
          onClose={() => setIsCapsuleModalOpen(false)}
          onReloadAltar={loadAltarData}
        />
      )}

      {isGemmaConfigModalOpen && (
        <GemmaConfigModal 
          onClose={() => setIsGemmaConfigModalOpen(false)}
          onConfigUpdated={(cfg) => {
            setGemmaConfig(cfg)
            checkOllamaConnection()
          }}
        />
      )}
    </div>
  )
}
