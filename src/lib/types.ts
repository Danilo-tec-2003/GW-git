// ================================================================
// TIPOS CENTRALIZADOS DO SISTEMA GW QUIZ
// Todas as interfaces e tipos TypeScript do projeto
// ================================================================

/** Emblemas disponíveis (logos das empresas do grupo) */
export type EmblemId = 'gweb' | 'webtrans' | 'gw-i'

export interface Emblem {
  id:    EmblemId
  label: string
  emoji: string  // fallback visual enquanto não há imagem
  color: string  // cor de borda do avatar
}

export const EMBLEMS: Emblem[] = [
  { id: 'gweb',    label: 'Gweb',     emoji: '🌐', color: '#1A7FD4' },
  { id: 'webtrans',label: 'Webtrans', emoji: '🚛', color: '#00C853' },
  { id: 'gw-i',   label: 'GW-i',     emoji: '⚙️', color: '#FFD700' },
]

// ----------------------------------------------------------------
// PERGUNTA
// ----------------------------------------------------------------
export interface QuizOption {
  id:      string   // 'a' | 'b' | 'c' | 'd'
  text:    string
  color:   string   // cor do botão de alternativa
  icon:    string   // emoji/icon decorativo
}

export interface QuizQuestion {
  id:          string
  text:        string
  options:     QuizOption[]
  correctId:   string          // id da opção correta
  timeLimit:   number          // segundos
  explanation?: string         // explicação exibida após responder
}

// ----------------------------------------------------------------
// SESSÃO DE JOGO (no Firebase)
// ----------------------------------------------------------------
export type GamePhase =
  | 'waiting'       // Lobby: aguardando jogadores
  | 'starting'      // Contagem regressiva antes de iniciar
  | 'question'      // Pergunta ativa
  | 'answer'        // Mostrando resposta correta
  | 'ranking'       // Ranking parcial entre perguntas
  | 'finished'      // Jogo encerrado, pódio final

export interface GameSession {
  pin:             string
  phase:           GamePhase
  currentQuestion: number      // índice da pergunta atual
  questionStart:   number      // timestamp (ms) de quando a pergunta começou
  createdAt:       number
}

// ----------------------------------------------------------------
// JOGADOR (no Firebase)
// ----------------------------------------------------------------
export interface Player {
  id:        string            // gerado pelo Firebase push()
  nickname:  string
  emblem:    EmblemId
  score:     number
  joinedAt:  number
  answers:   Record<string, PlayerAnswer>  // chave = questionId
}

export interface PlayerAnswer {
  optionId:     string
  timeMs:       number         // ms que levou para responder
  pointsEarned: number
  correct:      boolean
}

// ----------------------------------------------------------------
// ESTADO LOCAL DO CLIENTE (não vai ao Firebase)
// ----------------------------------------------------------------
export interface LocalPlayerState {
  playerId:  string
  nickname:  string
  emblem:    EmblemId
  answered:  boolean           // já respondeu à pergunta atual?
}
