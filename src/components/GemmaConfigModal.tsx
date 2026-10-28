import React, { useState, useEffect } from 'react'
import { GemmaConfig } from '../types'
import { storageService } from '../services/storageService'
import { gemmaService } from '../services/gemmaService'
import { X, Sparkles, Check, AlertCircle, RefreshCw, Terminal, ExternalLink } from 'lucide-react'

interface GemmaConfigModalProps {
  onClose: () => void
  onConfigUpdated: (config: GemmaConfig) => void
}

export const GemmaConfigModal: React.FC<GemmaConfigModalProps> = ({
  onClose,
  onConfigUpdated
}) => {
  const [config, setConfig] = useState<GemmaConfig>(storageService.getGemmaConfig())
  const [isTesting, setIsTesting] = useState<boolean>(false)
  const [testResult, setTestResult] = useState<{ ok: boolean; models: string[] } | null>(null)

  useEffect(() => {
    handleTestConnection(config.ollamaEndpoint)
  }, [])

  const handleTestConnection = async (endpoint?: string) => {
    setIsTesting(true)
    const res = await gemmaService.testOllamaConnection(endpoint || config.ollamaEndpoint)
    setTestResult(res)
    setIsTesting(false)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    storageService.saveGemmaConfig(config)
    onConfigUpdated(config)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: 620 }}
      >
        {/* Header */}
        <div 
          style={{
            padding: '20px 26px 14px 26px',
            borderBottom: '1px solid rgba(255, 170, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, rgba(66, 133, 244, 0.15), rgba(0,0,0,0.4))'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '1.4rem' }}>✨</span>
            <div>
              <h2 className="font-serif text-gold-gradient" style={{ fontSize: '1.25rem' }}>
                Open-Weight Gemma AI Engine
              </h2>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Partner Track: Best Use of Gemma ($200 Prize Track)
              </div>
            </div>
          </div>
          <button className="btn-ghost" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSave} style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Provider Selector */}
          <div>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 8 }}>
              Select AI Inference Engine:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div 
                onClick={() => setConfig({ ...config, provider: 'ollama' })}
                style={{
                  padding: '14px 16px',
                  borderRadius: 10,
                  cursor: 'pointer',
                  border: config.provider === 'ollama' 
                    ? '2px solid #8ab4f8' 
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  background: config.provider === 'ollama' 
                    ? 'rgba(66, 133, 244, 0.15)' 
                    : 'rgba(255, 255, 255, 0.03)',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ fontWeight: 600, color: '#8ab4f8', fontSize: '0.92rem', marginBottom: 4 }}>
                  Local Ollama Daemon
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  Runs open-weight Gemma 2 on your GPU/CPU via local HTTP API.
                </div>
              </div>

              <div 
                onClick={() => setConfig({ ...config, provider: 'offline-sanctuary' })}
                style={{
                  padding: '14px 16px',
                  borderRadius: 10,
                  cursor: 'pointer',
                  border: config.provider === 'offline-sanctuary' 
                    ? '2px solid #81c784' 
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  background: config.provider === 'offline-sanctuary' 
                    ? 'rgba(76, 175, 80, 0.15)' 
                    : 'rgba(255, 255, 255, 0.03)',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ fontWeight: 600, color: '#81c784', fontSize: '0.92rem', marginBottom: 4 }}>
                  Offline Sanctuary Engine
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  100% in-browser offline synthesis. Zero install or daemon required.
                </div>
              </div>
            </div>
          </div>

          {/* Ollama Endpoint & Model Config */}
          {config.provider === 'ollama' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 5 }}>
                  Ollama Local Endpoint
                </label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input 
                    type="text"
                    value={config.ollamaEndpoint}
                    onChange={e => setConfig({ ...config, ollamaEndpoint: e.target.value })}
                    style={{
                      flex: 1,
                      padding: '9px 12px',
                      borderRadius: 8,
                      background: '#161222',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: 'var(--text-primary)',
                      fontFamily: 'monospace',
                      fontSize: '0.88rem'
                    }}
                  />
                  <button 
                    type="button" 
                    className="btn-secondary" 
                    onClick={() => handleTestConnection()}
                    disabled={isTesting}
                  >
                    <RefreshCw size={14} className={isTesting ? 'animate-spin' : ''} />
                    <span>{isTesting ? 'Testing...' : 'Test Connection'}</span>
                  </button>
                </div>
              </div>

              {/* Status Indicator */}
              {testResult && (
                <div 
                  style={{
                    padding: '10px 14px',
                    borderRadius: 8,
                    background: testResult.ok ? 'rgba(76, 175, 80, 0.12)' : 'rgba(255, 152, 0, 0.12)',
                    border: testResult.ok ? '1px solid rgba(76, 175, 80, 0.35)' : '1px solid rgba(255, 152, 0, 0.35)',
                    color: testResult.ok ? '#b9f6ca' : '#ffcc80',
                    fontSize: '0.82rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600 }}>
                    {testResult.ok ? <Check size={15} /> : <AlertCircle size={15} />}
                    <span>{testResult.ok ? 'Ollama Daemon Connected & Active' : 'Ollama not detected at endpoint'}</span>
                  </div>
                  {testResult.ok && testResult.models.length > 0 && (
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      Available models: {testResult.models.join(', ')}
                    </div>
                  )}
                  {!testResult.ok && (
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      Tip: Run <code>ollama run gemma2:2b</code> in your terminal. If offline, the app seamlessly falls back to the Offline Sanctuary Engine!
                    </div>
                  )}
                </div>
              )}

              {/* Model Name */}
              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 5 }}>
                  Gemma Model Tag:
                </label>
                <select 
                  value={config.modelName}
                  onChange={e => setConfig({ ...config, modelName: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: 8,
                    background: '#161222',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: 'var(--text-primary)',
                    fontFamily: 'monospace',
                    fontSize: '0.88rem'
                  }}
                >
                  <option value="gemma2:2b">gemma2:2b (Fastest, light 1.6GB footprint)</option>
                  <option value="gemma:2b">gemma:2b (Gemma v1 baseline)</option>
                  <option value="gemma2:9b">gemma2:9b (Maximum literary nuance, 5.4GB)</option>
                </select>
              </div>
            </div>
          )}

          {/* Quick Terminal Guide for Gemma */}
          <div 
            style={{
              padding: '14px 16px',
              background: '#0d0a14',
              borderRadius: 8,
              border: '1px solid rgba(255, 255, 255, 0.1)',
              fontFamily: 'monospace',
              fontSize: '0.82rem'
            }}
          >
            <div style={{ color: 'var(--text-muted)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Terminal size={14} />
              <span>To run Google Gemma locally on your laptop:</span>
            </div>
            <div style={{ color: '#80d8ff' }}>
              ollama run gemma2:2b
            </div>
          </div>

          {/* Footer */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 12,
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: 16
            }}
          >
            <button type="button" className="btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Sparkles size={16} /> Save AI Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
