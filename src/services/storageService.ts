import { MemorialProfile, AltarOffering, CandleState, MemoryCapsule, GemmaConfig } from '../types'

const MEMORIALS_KEY = 'ofrenda_memorials_v2'
const OFFERINGS_KEY = 'ofrenda_offerings_v2'
const CANDLES_KEY = 'ofrenda_candles_v2'
const GEMMA_CONFIG_KEY = 'ofrenda_gemma_config_v2'

const DEFAULT_MEMORIALS: MemorialProfile[] = [
  {
    id: 'mem-rosa-1',
    name: 'Rosa Martínez Delgado',
    relation: 'Grandmother (Abuela)',
    birthYear: '1934',
    passingYear: '2022',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    epitaph: 'Matriarch of the yellow kitchen, teller of folk legends, and protector of family recipes.',
    favoriteFoods: ['Mole Poblano', 'Sweet Pan Dulce', 'Hot Spiced Chocolate'],
    favoriteSongs: ['Amor Eterno', 'La Llorona', 'Cielito Lindo'],
    favoriteSaying: 'Where two can eat, three can eat — there is always a plate for whoever arrives hungry.',
    hobbies: ['Embroidering floral tablecloths', 'Tending to potted begonias', 'Singing boleros at dawn'],
    calaverita: `Death came walking through the door,\nlooking for Rosa and dishes of lore.\n"Sit down first and share our feast," Rosa smiled,\nand even Death danced, gentle and mild!`,
    remembranceLetter: `Dear Grandmother Rosa,\n\nTonight the warm light of candles and marigolds fills the quiet room, just as it did when you guided our little hands as children. We prepared your favorite dishes with love, letting the scent of toasted chiles and bittersweet chocolate drift into the evening.\n\nYour laughter still echoes in the courtyard whenever the wind stirs the chimes. You taught us that love never ends with a heartbeat; it transforms into the warm memories that guide our lives.\n\nForever in our hearts.`,
    oralMemories: [
      {
        id: 'oral-1',
        promptTopic: 'Her morning ritual & laughter',
        rawTranscript: 'Every morning at 5:30 AM before anyone woke up, you would hear the rhythmic clinking of the wooden molinillo frothing the hot chocolate in her copper pot. If you snuck downstairs, she would never scold you; she would smile with warm crinkles around her eyes, hand you a sweet piece of pan dulce, and say "He who wakes early is blessed, but he who shares is accompanied by grace."',
        synthesizedStory: 'At the tender break of dawn, Rosa was the quiet sun of the house. The rhythmic dance of her wooden molinillo in simmering chocolate was the heartbeat of waking mornings. Her kitchen was an open sanctuary where no early riser was turned away without warm bread, wisdom, and an embrace that smelled of cinnamon.',
        recordedAt: '2026-10-25'
      }
    ],
    tierPosition: 1,
    candlesLitCount: 3,
    createdAt: '2026-10-20'
  },
  {
    id: 'mem-mateo-2',
    name: 'Don Mateo Valenzuela',
    relation: 'Grandfather & Musician',
    birthYear: '1929',
    passingYear: '2019',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    epitaph: 'Master luthier, player of the six-string guitar, and keeper of twilight serenatas.',
    favoriteFoods: ['Clay Pot Spiced Coffee', 'Slow-Roasted Barbacoa', 'Caramelized Pumpkin'],
    favoriteSongs: ['El Jinete', 'Sabor a Mí', 'La Bikina'],
    favoriteSaying: 'The guitar does not weep from sadness, my child; it weeps because it feels the beauty of the world.',
    hobbies: ['Carving cedar guitars', 'Playing evening serenatas', 'Stargazing on the roof'],
    calaverita: `Don Mateo tuned his cedar guitar,\nsending sweet chords to the evening star.\nDeath paused to listen, enchanted and still,\njoining the song on the moonlit hill!`,
    remembranceLetter: `Dear Don Mateo,\n\nYour old cedar guitar stands tuned by the altar. We still remember your calloused fingers running over the frets, coaxing warmth from cold wood on the porch as the stars came out over the hills.\n\nYou taught us that music is the only language that can cross between the living and the departed without needing a translation. May your melody play on in peace.\n\nRest in melody and peace.`,
    oralMemories: [
      {
        id: 'oral-2',
        promptTopic: 'The music on the porch',
        rawTranscript: 'On summer evenings, neighbors would pull up wooden chairs outside his workshop. He would play without asking for anything, just watching the stars come out over the hills. When he finished, he would always tap the guitar body twice and whisper a thank you to the wood.',
        synthesizedStory: 'Don Mateo played as if conversing with unseen friends. Every twilight chord from his workshop was an invitation to pause and wonder. His music was not a performance, but an offering of peace to all who passed by.',
        recordedAt: '2026-10-26'
      }
    ],
    tierPosition: 2,
    candlesLitCount: 2,
    createdAt: '2026-10-21'
  }
]

const DEFAULT_OFFERINGS: AltarOffering[] = [
  {
    id: 'off-1',
    type: 'cempasuchil',
    tier: 1,
    name: 'Marigold Flowers (Cempasúchil)',
    symbolicMeaning: 'The vibrant golden color and sweet scent guide departed souls back along the path.',
    customNote: 'Gathered fresh for the altar',
    xPosPercent: 20
  },
  {
    id: 'off-2',
    type: 'copal',
    tier: 1,
    name: 'Copal Incense Burner',
    symbolicMeaning: 'Purifies the sacred space and carries our prayers upward with fragrant resin smoke.',
    customNote: 'Aromatic copal resin',
    xPosPercent: 50
  },
  {
    id: 'off-3',
    type: 'water_salt',
    tier: 1,
    name: 'Vessel of Water & Sacred Salt',
    symbolicMeaning: 'Water quenches the soul’s thirst after the long journey; salt purifies and preserves the spirit.',
    customNote: 'Pure spring water and sea salt',
    xPosPercent: 80
  },
  {
    id: 'off-4',
    type: 'pan_de_muerto',
    tier: 2,
    name: 'Pan de Muerto (Sacred Bread)',
    symbolicMeaning: 'Traditional sweet bread with bone-shaped cross crusts, representing the cycle of life.',
    customNote: 'Freshly baked with orange blossom water',
    xPosPercent: 25
  },
  {
    id: 'off-5',
    type: 'guitar',
    tier: 2,
    name: 'Acoustic Guitar',
    symbolicMeaning: 'Personal token of favorite music, serenatas, and joy shared during life.',
    customNote: 'For Don Mateo’s favorite boleros',
    xPosPercent: 75
  },
  {
    id: 'off-6',
    type: 'calavera',
    tier: 3,
    name: 'Sugar Skulls (Calaveras)',
    symbolicMeaning: 'Decorated sugar skulls with bright icing, reminding us that death is sweet and natural.',
    customNote: 'With family names inscribed in icing',
    xPosPercent: 30
  },
  {
    id: 'off-7',
    type: 'coffee',
    tier: 3,
    name: 'Clay Pot Spiced Coffee',
    symbolicMeaning: 'Traditional coffee steeped with raw cane piloncillo and cinnamon.',
    customNote: 'Hot and steaming for visiting souls',
    xPosPercent: 70
  }
]

const DEFAULT_CANDLES: CandleState[] = [
  { id: 'c-top-1', tier: 1, isLit: true, dedication: 'Guiding Light of the Heavens', color: 'gold' },
  { id: 'c-top-2', tier: 1, isLit: true, dedication: 'For Rosa Martínez Delgado', color: 'amber' },
  { id: 'c-top-3', tier: 1, isLit: true, dedication: 'Light for all Ancestral Souls', color: 'gold' },
  { id: 'c-mid-1', tier: 2, isLit: true, dedication: 'For Don Mateo Valenzuela', color: 'amber' },
  { id: 'c-mid-2', tier: 2, isLit: true, dedication: 'Warmth of Earthly Remembrance', color: 'celestial' },
  { id: 'c-mid-3', tier: 2, isLit: true, dedication: 'Flame of Music and Memories', color: 'gold' },
  { id: 'c-mid-4', tier: 2, isLit: true, dedication: 'For the Quiet Thinkers', color: 'amber' },
  { id: 'c-bot-1', tier: 3, isLit: true, dedication: 'Root of Mictlán / The Foundation', color: 'gold' },
  { id: 'c-bot-2', tier: 3, isLit: true, dedication: 'Torch of Hope in the Dark', color: 'amber' },
  { id: 'c-bot-3', tier: 3, isLit: true, dedication: 'Flame for Forgotten Wanderers', color: 'celestial' },
  { id: 'c-bot-4', tier: 3, isLit: true, dedication: 'For Future Generations', color: 'gold' },
]

export const DEFAULT_GEMMA_CONFIG: GemmaConfig = {
  provider: 'offline-sanctuary',
  ollamaEndpoint: 'http://localhost:11434',
  modelName: 'gemma2:2b',
  temperature: 0.7
}

class StorageService {
  public getMemorials(): MemorialProfile[] {
    const data = localStorage.getItem(MEMORIALS_KEY)
    if (!data) {
      this.saveMemorials(DEFAULT_MEMORIALS)
      return DEFAULT_MEMORIALS
    }
    try {
      return JSON.parse(data)
    } catch {
      return DEFAULT_MEMORIALS
    }
  }

  public saveMemorials(memorials: MemorialProfile[]): void {
    localStorage.setItem(MEMORIALS_KEY, JSON.stringify(memorials))
  }

  public addMemorial(memorial: MemorialProfile): MemorialProfile[] {
    const list = this.getMemorials()
    const updated = [memorial, ...list]
    this.saveMemorials(updated)
    return updated
  }

  public updateMemorial(updated: MemorialProfile): MemorialProfile[] {
    const list = this.getMemorials()
    const mapped = list.map(m => m.id === updated.id ? updated : m)
    this.saveMemorials(mapped)
    return mapped
  }

  public deleteMemorial(id: string): MemorialProfile[] {
    const list = this.getMemorials()
    const filtered = list.filter(m => m.id !== id)
    this.saveMemorials(filtered)
    return filtered
  }

  public getOfferings(): AltarOffering[] {
    const data = localStorage.getItem(OFFERINGS_KEY)
    if (!data) {
      this.saveOfferings(DEFAULT_OFFERINGS)
      return DEFAULT_OFFERINGS
    }
    try {
      return JSON.parse(data)
    } catch {
      return DEFAULT_OFFERINGS
    }
  }

  public saveOfferings(offerings: AltarOffering[]): void {
    localStorage.setItem(OFFERINGS_KEY, JSON.stringify(offerings))
  }

  public addOffering(offering: AltarOffering): AltarOffering[] {
    const list = this.getOfferings()
    const updated = [...list, offering]
    this.saveOfferings(updated)
    return updated
  }

  public removeOffering(id: string): AltarOffering[] {
    const list = this.getOfferings()
    const filtered = list.filter(o => o.id !== id)
    this.saveOfferings(filtered)
    return filtered
  }

  public getCandles(): CandleState[] {
    const data = localStorage.getItem(CANDLES_KEY)
    if (!data) {
      this.saveCandles(DEFAULT_CANDLES)
      return DEFAULT_CANDLES
    }
    try {
      return JSON.parse(data)
    } catch {
      return DEFAULT_CANDLES
    }
  }

  public saveCandles(candles: CandleState[]): void {
    localStorage.setItem(CANDLES_KEY, JSON.stringify(candles))
  }

  public toggleCandle(id: string): CandleState[] {
    const candles = this.getCandles()
    const updated = candles.map(c => c.id === id ? { ...c, isLit: !c.isLit } : c)
    this.saveCandles(updated)
    return updated
  }

  public lightAllCandles(): CandleState[] {
    const candles = this.getCandles()
    const updated = candles.map(c => ({ ...c, isLit: true }))
    this.saveCandles(updated)
    return updated
  }

  public extinguishAllCandles(): CandleState[] {
    const candles = this.getCandles()
    const updated = candles.map(c => ({ ...c, isLit: false }))
    this.saveCandles(updated)
    return updated
  }

  public getGemmaConfig(): GemmaConfig {
    const data = localStorage.getItem(GEMMA_CONFIG_KEY)
    if (!data) return DEFAULT_GEMMA_CONFIG
    try {
      return { ...DEFAULT_GEMMA_CONFIG, ...JSON.parse(data) }
    } catch {
      return DEFAULT_GEMMA_CONFIG
    }
  }

  public saveGemmaConfig(config: GemmaConfig): void {
    localStorage.setItem(GEMMA_CONFIG_KEY, JSON.stringify(config))
  }

  public exportCapsule(): string {
    const capsule: MemoryCapsule = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      memorials: this.getMemorials(),
      offerings: this.getOfferings(),
      totalCandlesLit: this.getCandles().filter(c => c.isLit).length
    }
    return JSON.stringify(capsule, null, 2)
  }

  public importCapsule(jsonStr: string): boolean {
    try {
      const parsed: MemoryCapsule = JSON.parse(jsonStr)
      if (Array.isArray(parsed.memorials)) {
        this.saveMemorials(parsed.memorials)
      }
      if (Array.isArray(parsed.offerings)) {
        this.saveOfferings(parsed.offerings)
      }
      return true
    } catch {
      return false
    }
  }

  public resetToDefault(): void {
    this.saveMemorials(DEFAULT_MEMORIALS)
    this.saveOfferings(DEFAULT_OFFERINGS)
    this.saveCandles(DEFAULT_CANDLES)
  }
}

export const storageService = new StorageService()
