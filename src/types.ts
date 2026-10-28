export interface OralMemory {
  id: string
  promptTopic: string
  rawTranscript: string
  synthesizedStory: string
  recordedAt: string
}

export interface MemorialProfile {
  id: string
  name: string
  relation: string
  birthYear: string
  passingYear: string
  photoUrl: string
  epitaph: string
  favoriteFoods: string[]
  favoriteSongs: string[]
  favoriteSaying: string
  hobbies: string[]
  calaverita?: string
  remembranceLetter?: string
  oralMemories: OralMemory[]
  tierPosition: 1 | 2 | 3
  candlesLitCount: number
  createdAt: string
}

export type OfferingType = 
  | 'cempasuchil'
  | 'pan_de_muerto'
  | 'calavera'
  | 'copal'
  | 'water_salt'
  | 'guitar'
  | 'coffee'
  | 'book'
  | 'chocolate'
  | 'candle'

export interface AltarOffering {
  id: string
  type: OfferingType
  tier: 1 | 2 | 3
  name: string
  symbolicMeaning: string
  customNote?: string
  xPosPercent: number
}

export interface CandleState {
  id: string
  tier: 1 | 2 | 3
  isLit: boolean
  dedication?: string
  color: 'gold' | 'amber' | 'celestial'
}

export interface GemmaConfig {
  provider: 'ollama' | 'in-browser' | 'offline-sanctuary'
  ollamaEndpoint: string
  modelName: string
  temperature: number
}

export interface MemoryCapsule {
  version: string
  exportedAt: string
  memorials: MemorialProfile[]
  offerings: AltarOffering[]
  totalCandlesLit: number
}
