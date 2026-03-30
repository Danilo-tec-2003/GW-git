// ================================================================
// GERENCIADOR DE SONS
//
// Os sons são gerados via Web Audio API (sem arquivos externos).
// O jogador pode desabilitar sons nas configurações.
// ================================================================

let audioCtx: AudioContext | null = null

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
  }
  return audioCtx
}

/**
 * Toca um tom sintético com os parâmetros fornecidos.
 * @param frequency - Frequência em Hz
 * @param duration  - Duração em segundos
 * @param type      - Tipo de onda
 * @param gain      - Volume (0–1)
 */
function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = 'sine',
  gain = 0.3
): void {
  try {
    const ctx = getCtx()
    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()

    osc.connect(gainNode)
    gainNode.connect(ctx.destination)

    osc.type = type
    osc.frequency.setValueAtTime(frequency, ctx.currentTime)

    // Envelope suave para evitar cliques
    gainNode.gain.setValueAtTime(0, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(gain, ctx.currentTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + duration)
  } catch {
    // Som desabilitado ou API não suportada
  }
}

/** Som de clique ao selecionar alternativa */
export function playClick(): void {
  playTone(800, 0.08, 'square', 0.2)
}

/** Sequência de sons de acerto (fanfarra) */
export function playCorrect(): void {
  playTone(523, 0.1, 'sine', 0.3)  // C5
  setTimeout(() => playTone(659, 0.1, 'sine', 0.3), 100)  // E5
  setTimeout(() => playTone(784, 0.2, 'sine', 0.3), 200)  // G5
}

/** Som de erro (buzzer) */
export function playWrong(): void {
  playTone(220, 0.3, 'sawtooth', 0.25)
}

/** Bipe de contagem regressiva final */
export function playCountdown(): void {
  playTone(1000, 0.1, 'square', 0.15)
}

/** Som de início do quiz */
export function playStart(): void {
  playTone(440, 0.1, 'sine', 0.3)
  setTimeout(() => playTone(554, 0.1, 'sine', 0.3), 120)
  setTimeout(() => playTone(659, 0.2, 'sine', 0.3), 240)
  setTimeout(() => playTone(880, 0.3, 'sine', 0.35), 400)
}
