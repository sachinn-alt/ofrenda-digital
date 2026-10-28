class SoundService {
  private ctx: AudioContext | null = null
  private ambientGain: GainNode | null = null
  private isMuted: boolean = false
  private ambientTimer: number | null = null
  private isAmbientPlaying: boolean = false

  private initCtx(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      this.ctx = new AudioCtx()
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
    return this.ctx
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(muted ? 0 : 0.15, this.ctx.currentTime)
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted
  }

  public getIsAmbientPlaying(): boolean {
    return this.isAmbientPlaying
  }

  // Plays a rich sacred chime when lighting a candle or placing an offering
  public playCandleLight() {
    if (this.isMuted) return
    try {
      const ctx = this.initCtx()
      const now = ctx.currentTime

      // Warm candle whoosh / soft match spark
      const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate)
      const output = noiseBuffer.getChannelData(0)
      for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1
      }
      const whiteNoise = ctx.createBufferSource()
      whiteNoise.buffer = noiseBuffer
      const filter = ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(800, now)
      filter.Q.setValueAtTime(3, now)

      const noiseGain = ctx.createGain()
      noiseGain.gain.setValueAtTime(0.08, now)
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14)

      whiteNoise.connect(filter)
      filter.connect(noiseGain)
      noiseGain.connect(ctx.destination)
      whiteNoise.start(now)

      // Celestial Tibetan / Altar Bell Chime (C#5, G#5 harmonic)
      const freqs = [554.37, 830.61, 1108.73]
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const oscGain = ctx.createGain()
        osc.type = idx === 0 ? 'sine' : 'triangle'
        osc.frequency.setValueAtTime(freq, now)

        const startGain = 0.09 / (idx + 1)
        oscGain.gain.setValueAtTime(startGain, now + 0.02)
        oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8 + idx * 0.4)

        osc.connect(oscGain)
        oscGain.connect(ctx.destination)

        osc.start(now + 0.02)
        osc.stop(now + 2.5)
      })
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Soft marigold offering sound
  public playOfferingPlaced() {
    if (this.isMuted) return
    try {
      const ctx = this.initCtx()
      const now = ctx.currentTime
      const notes = [440, 523.25, 659.25] // A, C, E arpeggio
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now + index * 0.08)

        gain.gain.setValueAtTime(0.05, now + index * 0.08)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + 0.9)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(now + index * 0.08)
        osc.stop(now + index * 0.08 + 1.0)
      })
    } catch {
      // Audio policy safe
    }
  }

  // Procedural contemplative Spanish acoustic guitar / harp chord arpeggios
  public toggleAmbientMusic(onState?: boolean): boolean {
    const next = onState !== undefined ? onState : !this.isAmbientPlaying
    if (next) {
      this.startAmbientMusic()
    } else {
      this.stopAmbientMusic()
    }
    return this.isAmbientPlaying
  }

  private startAmbientMusic() {
    if (this.isAmbientPlaying) return
    try {
      const ctx = this.initCtx()
      this.isAmbientPlaying = true

      if (!this.ambientGain) {
        this.ambientGain = ctx.createGain()
        this.ambientGain.gain.setValueAtTime(this.isMuted ? 0 : 0.12, ctx.currentTime)
        this.ambientGain.connect(ctx.destination)
      }

      // Traditional soulful chords: Dm9 -> Bbmaj7 -> Gm6 -> A7sus4/A7
      const chordProgressions = [
        [146.83, 220.00, 261.63, 293.66, 349.23, 440.00], // Dm9
        [116.54, 174.61, 233.08, 293.66, 349.23, 440.00], // Bbmaj7
        [98.00, 146.83, 196.00, 246.94, 293.66, 392.00],  // Gm6
        [110.00, 164.81, 220.00, 293.66, 329.63, 440.00]  // A7sus
      ]

      let chordIdx = 0

      const playChord = () => {
        if (!this.isAmbientPlaying || !this.ctx || !this.ambientGain) return
        const now = this.ctx.currentTime
        const notes = chordProgressions[chordIdx % chordProgressions.length]
        chordIdx++

        notes.forEach((freq, noteIdx) => {
          if (!this.ctx || !this.ambientGain) return
          const osc = this.ctx.createOscillator()
          const noteGain = this.ctx.createGain()
          const filter = this.ctx.createBiquadFilter()

          // Warm nylon guitar timbre
          osc.type = noteIdx % 2 === 0 ? 'triangle' : 'sine'
          osc.frequency.setValueAtTime(freq, now)

          filter.type = 'lowpass'
          filter.frequency.setValueAtTime(1400, now)

          const noteTime = now + noteIdx * 0.28
          noteGain.gain.setValueAtTime(0.0001, noteTime)
          noteGain.gain.linearRampToValueAtTime(0.045, noteTime + 0.04)
          noteGain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 3.2)

          osc.connect(filter)
          filter.connect(noteGain)
          noteGain.connect(this.ambientGain)

          osc.start(noteTime)
          osc.stop(noteTime + 3.3)
        })

        // Schedule next chord in 3.5s
        this.ambientTimer = window.setTimeout(playChord, 3600)
      }

      playChord()
    } catch {
      this.isAmbientPlaying = false
    }
  }

  private stopAmbientMusic() {
    this.isAmbientPlaying = false
    if (this.ambientTimer) {
      clearTimeout(this.ambientTimer)
      this.ambientTimer = null
    }
  }
}

export const soundService = new SoundService()
