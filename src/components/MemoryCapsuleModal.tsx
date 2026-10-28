import React, { useState } from 'react'
import { storageService } from '../services/storageService'
import { soundService } from '../services/soundService'
import { X, Download, Upload, RotateCcw, ShieldCheck, Check, AlertTriangle } from 'lucide-react'

interface MemoryCapsuleModalProps {
  onClose: () => void
  onReloadAltar: () => void
}

export const MemoryCapsuleModal: React.FC<MemoryCapsuleModalProps> = ({
  onClose,
  onReloadAltar
}) => {
  const [importStatus, setImportStatus] = useState<string | null>(null)
  const [isError, setIsError] = useState<boolean>(false)

  // Export altar capsule JSON
  const handleExport = () => {
    const jsonStr = storageService.exportCapsule()
    const blob = new Blob([jsonStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ofrenda-digital-capsule-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    soundService.playOfferingPlaced()
    setImportStatus('Memory Capsule downloaded successfully. Keep it safe on your local drive or USB.')
    setIsError(false)
  }

  // Import altar capsule JSON
  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string
        const success = storageService.importCapsule(content)
        if (success) {
          soundService.playCandleLight()
          setImportStatus('Capsule imported successfully! Altar refreshed.')
          setIsError(false)
          onReloadAltar()
        } else {
          setImportStatus('Could not parse capsule file. Please ensure it is a valid Ofrenda Digital JSON.')
          setIsError(true)
        }
      } catch {
        setImportStatus('Failed to read file.')
        setIsError(true)
      }
    }
    reader.readAsText(file)
  }

  // Reset to default
  const handleReset = () => {
    if (confirm('Reset altar to traditional defaults (Doña Rosa & Don Mateo)? Your current changes will be overwritten unless exported.')) {
      storageService.resetToDefault()
      soundService.playCandleLight()
      onReloadAltar()
      onClose()
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: 600 }}
      >
        {/* Header */}
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
            <span style={{ fontSize: '1.4rem' }}>📦</span>
            <div>
              <h2 className="font-serif text-gold-gradient" style={{ fontSize: '1.25rem' }}>
                Offline Memory Capsule
              </h2>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Keep your family's oral histories and altar safe forever
              </div>
            </div>
          </div>
          <button className="btn-ghost" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Explanation */}
          <div 
            style={{
              padding: '14px 18px',
              background: 'rgba(255, 170, 0, 0.08)',
              borderRadius: 10,
              border: '1px solid rgba(255, 170, 0, 0.25)',
              fontSize: '0.86rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.55
            }}
          >
            A <strong>Memory Capsule</strong> packages all photos, recorded oral histories, synthesized calaveritas, and offerings into an open standard JSON file. It stays 100% on your machine with zero server dependencies, allowing you to back it up, pass it down to your children, or restore it on any device.
          </div>

          {importStatus && (
            <div 
              style={{
                padding: '10px 14px',
                borderRadius: 8,
                background: isError ? 'rgba(244, 67, 54, 0.15)' : 'rgba(76, 175, 80, 0.15)',
                border: isError ? '1px solid rgba(244, 67, 54, 0.4)' : '1px solid rgba(76, 175, 80, 0.4)',
                color: isError ? '#ff8a80' : '#b9f6ca',
                fontSize: '0.84rem',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              {isError ? <AlertTriangle size={16} /> : <Check size={16} />}
              <span>{importStatus}</span>
            </div>
          )}

          {/* Export Action */}
          <div className="glass-panel" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.92rem' }}>
                Export Altar to JSON
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Download an offline backup capsule (.json)
              </div>
            </div>
            <button className="btn-primary" onClick={handleExport}>
              <Download size={15} /> Export Capsule
            </button>
          </div>

          {/* Import Action */}
          <div className="glass-panel" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.92rem' }}>
                Import Existing Capsule
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Restore an altar from a saved .json file
              </div>
            </div>
            <label className="btn-secondary" style={{ cursor: 'pointer' }}>
              <Upload size={15} /> Load Capsule
              <input 
                type="file" 
                accept=".json,application/json" 
                onChange={handleFileImport} 
                style={{ display: 'none' }} 
              />
            </label>
          </div>

          {/* Reset Action */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: 16
            }}
          >
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Need to start fresh with default examples?
            </div>
            <button 
              className="btn-ghost" 
              onClick={handleReset}
              style={{ color: '#ffb74d' }}
            >
              <RotateCcw size={14} /> Reset to Defaults
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
