// ================================================================
// LÓGICA DE PONTUAÇÃO — estilo Kahoot
//
// Fórmula base:
//   pontos = 1000 - (tempo_resposta_em_segundos * 50)
//
// Exemplos:
//   Respondeu em 2s  → 1000 - (2 * 50)  = 900 pts
//   Respondeu em 10s → 1000 - (10 * 50) = 500 pts
//   Respondeu em 20s → 1000 - (20 * 50) = 0 pts (mínimo = 0)
//
// Errou: 0 pontos, independente do tempo.
// ================================================================

/**
 * Calcula os pontos ganhos por uma resposta correta.
 * @param timeMs     - Tempo que o jogador levou para responder (milissegundos)
 * @param timeLimitS - Limite de tempo configurado para a pergunta (segundos)
 * @returns          - Pontos ganhos (mínimo 0)
 */
export function calcScore(timeMs: number, timeLimitS: number): number {
  const timeSeconds = timeMs / 1000

  // Garante que não ultrapasse o limite (edge cases de rede)
  const clampedTime = Math.min(timeSeconds, timeLimitS)

  // Fórmula principal
  const points = Math.round(1000 - clampedTime * 50)

  // Mínimo de 0 pontos
  return Math.max(0, points)
}

/**
 * Calcula o ranking a partir da lista de jogadores.
 * Retorna array ordenado do maior para o menor score.
 */
export function calcRanking<T extends { score: number }>(players: T[]): T[] {
  return [...players].sort((a, b) => b.score - a.score)
}

/**
 * Retorna a medalha para a posição no ranking.
 */
export function getMedal(position: number): string {
  const medals = ['🥇', '🥈', '🥉']
  return medals[position] ?? `${position + 1}º`
}
