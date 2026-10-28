import { GemmaConfig, MemorialProfile } from '../types'
import { storageService } from './storageService'

interface GenerateResponse {
  text: string
  source: 'ollama-gemma' | 'offline-sanctuary'
  latencyMs: number
}

class GemmaService {
  // Test if local Ollama daemon is reachable
  public async testOllamaConnection(endpoint?: string): Promise<{ ok: boolean; models: string[] }> {
    const config = storageService.getGemmaConfig()
    const targetUrl = endpoint || config.ollamaEndpoint
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 2000)
      const res = await fetch(`${targetUrl}/api/tags`, {
        signal: controller.signal
      })
      clearTimeout(timeoutId)
      if (res.ok) {
        const data = await res.json()
        const models = (data.models || []).map((m: { name: string }) => m.name)
        return { ok: true, models }
      }
      return { ok: false, models: [] }
    } catch {
      return { ok: false, models: [] }
    }
  }

  // Core generation router: attempts local Ollama first if selected, then gracefully falls back
  private async executePrompt(systemPrompt: string, userPrompt: string): Promise<GenerateResponse> {
    const config = storageService.getGemmaConfig()
    const startTime = performance.now()

    if (config.provider === 'ollama') {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 12000)

        const res = await fetch(`${config.ollamaEndpoint}/api/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: config.modelName,
            system: systemPrompt,
            prompt: userPrompt,
            stream: false,
            options: {
              temperature: config.temperature
            }
          }),
          signal: controller.signal
        })
        clearTimeout(timeoutId)

        if (res.ok) {
          const data = await res.json()
          return {
            text: (data.response || '').trim(),
            source: 'ollama-gemma',
            latencyMs: Math.round(performance.now() - startTime)
          }
        }
      } catch (err) {
        console.warn('Local Ollama call failed or timed out, activating Offline Sanctuary Gemma engine:', err)
      }
    }

    // Offline Sanctuary Gemma Engine: High-fidelity algorithmic synthesis based on Mexican folk traditions
    await new Promise(r => setTimeout(r, 650)) // Natural typing rhythm
    return {
      text: '', // Handled by specialized methods below
      source: 'offline-sanctuary',
      latencyMs: Math.round(performance.now() - startTime)
    }
  }

  // 1. Generate traditional Calaverita Literaria (satirical & affectionate verse in English)
  public async generateCalaverita(memorial: MemorialProfile): Promise<GenerateResponse> {
    const systemPrompt = `You are Gemma 2, an open-weight empathetic AI honoring Día de los Muertos traditions.
Write a traditional "Calaverita Literaria" (Day of the Dead memorial poem) in English.
Rules:
- 2 to 3 rhyming stanzas (quartets with AABB or ABAB rhyme scheme).
- Humorous, warm, respectful, celebrating the person's quirks, favorite foods, and hobbies.
- Feature "La Catrina" / "Death" visiting them in a gentle, celebratory dialogue.`

    const userPrompt = `Person to honor: ${memorial.name} (${memorial.relation})
Epitaph: ${memorial.epitaph}
Favorite Foods: ${memorial.favoriteFoods.join(', ')}
Hobbies/Passions: ${memorial.hobbies.join(', ')}
Favorite Saying: "${memorial.favoriteSaying}"`

    const response = await this.executePrompt(systemPrompt, userPrompt)
    if (response.text) return response

    // High quality offline sanctuary generator in English
    const food = memorial.favoriteFoods[0] || 'sweet spiced bread'
    const hobby = memorial.hobbies[0] || 'quiet morning walks'
    const song = memorial.favoriteSongs[0] || 'their favorite melody'

    const offlineVerses = [
      `Death came strolling through the door,\nsmelling ${food.toLowerCase()} and asking for more.\n"To visit ${memorial.name} I have arrived,\nwhose laughter and kindness kept spirits alive!"`,
      `"Sit down first, Catrina, and take a seat,\nshare our warm table and have something to eat!"\nThey shared a sweet plate and a bowl of warm tea,\nand even the skeleton laughed with glee.`,
      `To the sound of "${song}" they danced through the night,\nalong the marigold petals glowing bright.\nFor ${memorial.name.split(' ')[0]} never truly left our side:\ntheir love and their memory remain our guide!`
    ].join('\n\n')

    return {
      text: offlineVerses,
      source: 'offline-sanctuary',
      latencyMs: response.latencyMs
    }
  }

  // 2. Synthesize raw oral history recording into enduring biographical prose
  public async synthesizeOralMemory(
    topic: string,
    rawTranscript: string,
    memorialName: string
  ): Promise<GenerateResponse> {
    const systemPrompt = `You are Gemma, an open-source oral historian. 
Your task is to transform a spoken, conversational memory snippet into a timeless, literary biographical paragraph in English that captures the warmth, atmosphere, and essence of the person being remembered. Preserve their exact quotes and authentic details.`

    const userPrompt = `Deceased ancestor: ${memorialName}
Memory Topic: ${topic}
Raw Spoken Memory Transcript: "${rawTranscript}"`

    const response = await this.executePrompt(systemPrompt, userPrompt)
    if (response.text) return response

    // Offline sanctuary synthesis in English
    const trimmed = rawTranscript.trim()
    const cleanQuotes = trimmed.replace(/\s+/g, ' ')
    const synthesized = `There are moments in a lifetime that never fade, and for ${memorialName}, this memory of ${topic.toLowerCase()} remains etched in time. In the storyteller's own words: "${cleanQuotes}". Through this recollection, their genuine warmth, unique rhythm of life, and enduring spirit remain luminous and alive on this altar.`

    return {
      text: synthesized,
      source: 'offline-sanctuary',
      latencyMs: response.latencyMs
    }
  }

  // 3. Generate a solemn, heartfelt Remembrance Letter (Eulogy) for the altar in English
  public async generateRemembranceLetter(memorial: MemorialProfile): Promise<GenerateResponse> {
    const systemPrompt = `You are Gemma, crafting a solemn, heartfelt Día de los Muertos remembrance letter in English to be placed on a home ofrenda.
Reflect on their legacy, favorite tastes, and how their presence continues to shelter the living.`

    const userPrompt = `Name: ${memorial.name}
Relation: ${memorial.relation}
Years: ${memorial.birthYear} - ${memorial.passingYear}
Epitaph: ${memorial.epitaph}
Favorite Saying: "${memorial.favoriteSaying}"
Foods on Altar: ${memorial.favoriteFoods.join(', ')}`

    const response = await this.executePrompt(systemPrompt, userPrompt)
    if (response.text) return response

    const letter = `To our beloved ${memorial.name},\n\n` +
      `Tonight, as the boundary between time and remembrance softens, we light these golden candles in your honor. ` +
      `We have placed upon the altar the things you loved most: ${memorial.favoriteFoods.slice(0, 2).join(' and ')}, ` +
      `while vibrant marigold petals trace a glowing path from memory to our home.\n\n` +
      `We still carry your words in our hearts: "${memorial.favoriteSaying}". ` +
      `Though your footsteps no longer sound through our halls, your presence is the flame that never extinguishes in our lives. ` +
      `Thank you for the kindness you gave us, for your laughter, and for the wisdom we now share with pride.\n\n` +
      `Rest in peace on this night of celebration. You are, and always will be, remembered.`

    return {
      text: letter,
      source: 'offline-sanctuary',
      latencyMs: response.latencyMs
    }
  }

  // 4. Ghost in the Machine: Channel ancestral reflection & wisdom in English
  public async channelSpiritWisdom(
    memorial: MemorialProfile,
    userReflection: string
  ): Promise<GenerateResponse> {
    const systemPrompt = `You are the loving memory of ${memorial.name} (${memorial.relation}), communicating in the spirit of Día de los Muertos.
Speak with warmth, calm, gentle humor, and timeless wisdom in English. Ground your advice in everyday simplicity, family values, and their favorite phrase: "${memorial.favoriteSaying}". Keep the reply concise (2-3 paragraphs).`

    const userPrompt = `A family member standing at your ofrenda asks: "${userReflection}"`

    const response = await this.executePrompt(systemPrompt, userPrompt)
    if (response.text) return response

    const wisdom = `My dear one,\n\n` +
      `I hear your thoughts with the same warmth with which I always greeted you at the door. ` +
      `In this life, we often carry heavy worries that the wind of time will soon sweep away. ` +
      `Whenever you feel doubt, pause and remember what I always told you: "${memorial.favoriteSaying}".\n\n` +
      `Do not walk through this world in a rush. Take a quiet breath, savor the warm bread, and hold those you love close. ` +
      `I have not truly left you; so long as you remember me with a smile and a song, I will be right here beside you.`

    return {
      text: wisdom,
      source: 'offline-sanctuary',
      latencyMs: response.latencyMs
    }
  }
}

export const gemmaService = new GemmaService()
