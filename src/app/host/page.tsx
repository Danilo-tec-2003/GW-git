// ================================================================
// PÁGINA: Host (/host)
//
// Painel exclusivo para o apresentador/administrador.
// Funções:
//   - Criar sessão com PIN
//   - Iniciar jogo
//   - Avançar perguntas
//   - Ver ranking em tempo real
//   - Exibir QR Code para entrada
//
// ATENÇÃO: Protegido por um PIN de host (env NEXT_PUBLIC_HOST_PIN)
// ================================================================

'use client'

export const dynamic = 'force-dynamic'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { QRCodeSVG } from 'qrcode.react'
import { Background } from '@/components/ui/Background'
import { Logo } from '@/components/ui/Logo'
import { RankingList } from '@/components/ui/RankingList'
import { useGameSession } from '@/hooks/useGameSession'
import { sessionRef, playersRef, set, remove, get } from '@/lib/firebase'
import { QUESTIONS } from '@/lib/questions'
import type { GamePhase } from '@/lib/types'

const HOST_PIN = process.env.NEXT_PUBLIC_HOST_PIN ?? 'gwhost2024'
const GAME_PIN = process.env.NEXT_PUBLIC_GAME_PIN ?? 'GW2024'

export default function HostPage() {
  const router = useRouter()

  const [authenticated, setAuthenticated] = useState(false)
  const [hostPinInput, setHostPinInput]   = useState('')
  const [authError, setAuthError]         = useState(false)

  const [gamePin] = useState(GAME_PIN)
  const [sessionCreated, setSessionCreated] = useState(false)
  const [transitioning, setTransitioning]   = useState(false)

  const { session, players, loading } = useGameSession(authenticated ? gamePin : '')

  // Cria (ou recria) a sessão no Firebase
  async function createSession() {
    await set(sessionRef(gamePin), {
      pin:             gamePin,
      phase:           'waiting' as GamePhase,
      currentQuestion: 0,
      questionStart:   0,
      createdAt:       Date.now(),
    })
    // Limpa jogadores anteriores
    await remove(playersRef(gamePin))
    setSessionCreated(true)
  }

  // Autenticação simples do host
  function handleAuth(e: React.FormEvent) {
    e.preventDefault()
    if (hostPinInput === HOST_PIN) {
      setAuthenticated(true)
      createSession()
    } else {
      setAuthError(true)
    }
  }

  /** Avança o jogo para a próxima fase */
  async function advance() {
    if (!session || transitioning) return
    setTransitioning(true)

    const { phase, currentQuestion } = session

    try {
      // Máquina de estados do jogo
      if (phase === 'waiting' || phase === 'starting') {
        // Começa com a primeira pergunta
        await set(sessionRef(gamePin), {
          ...session,
          phase:           'question',
          currentQuestion: 0,
          questionStart:   Date.now(),
        })
      }
      else if (phase === 'question') {
        // Revela a resposta correta
        await set(sessionRef(gamePin), { ...session, phase: 'answer' })
      }
      else if (phase === 'answer') {
        const isLast = currentQuestion >= QUESTIONS.length - 1
        if (isLast) {
          // Jogo acabou → ranking final
          await set(sessionRef(gamePin), { ...session, phase: 'finished' })
        } else {
          // Mostra ranking parcial
          await set(sessionRef(gamePin), { ...session, phase: 'ranking' })
        }
      }
      else if (phase === 'ranking') {
        // Avança para a próxima pergunta
        const next = currentQuestion + 1
        await set(sessionRef(gamePin), {
          ...session,
          phase:           'question',
          currentQuestion: next,
          questionStart:   Date.now(),
        })
      }
      else if (phase === 'finished') {
        // Reinicia completamente
        await createSession()
      }
    } catch (err) {
      console.error('Erro ao avançar fase:', err)
    } finally {
      setTransitioning(false)
    }
  }

  if (!authenticated) {
    return (
      <main className="relative min-h-screen flex items-center justify-center p-4">
        <Background />
        <form
          onSubmit={handleAuth}
          className="relative z-10 glass rounded-3xl p-8 w-full max-w-sm flex flex-col items-center gap-6"
        >
          <Logo size="sm" />
          <h2 className="font-display text-xl font-bold text-white">Acesso Host</h2>

          <input
            type="password"
            value={hostPinInput}
            onChange={(e) => { setHostPinInput(e.target.value); setAuthError(false) }}
            placeholder="PIN do host"
            className={`
              w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/30
              font-mono text-lg tracking-wider text-center
              focus:outline-none focus:ring-2 focus:ring-gw-sky/60
              ${authError ? 'border-gw-red/60' : 'border-white/10'}
            `}
            autoFocus
          />
          {authError && (
            <p className="text-gw-red text-sm">PIN inválido</p>
          )}
          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-gw-blue to-gw-sky
              font-display font-bold text-white glow-blue hover:opacity-90 transition"
          >
            Entrar como Host
          </button>
        </form>
      </main>
    )
  }

  const currentQ = QUESTIONS[session?.currentQuestion ?? 0]
  const joinUrl  = typeof window !== 'undefined'
    ? `${window.location.origin}/?pin=${gamePin}`
    : `https://gw-quiz.vercel.app/?pin=${gamePin}`

  // Rótulos de fase
  const phaseLabel: Record<string, string> = {
    waiting:  '⏳ Aguardando jogadores',
    starting: '🚀 Iniciando…',
    question: `❓ Pergunta ${(session?.currentQuestion ?? 0) + 1} de ${QUESTIONS.length}`,
    answer:   '✅ Mostrando resposta',
    ranking:  '🏆 Ranking parcial',
    finished: '🎉 Jogo encerrado!',
  }

  const nextActionLabel: Record<string, string> = {
    waiting:  '▶ Iniciar Jogo',
    starting: '▶ Iniciar Jogo',
    question: '⏭ Revelar Resposta',
    answer:   session?.currentQuestion === QUESTIONS.length - 1
                ? '🏁 Finalizar Jogo'
                : '📊 Ver Ranking',
    ranking:  '➡ Próxima Pergunta',
    finished: '🔄 Novo Jogo',
  }

  return (
    <main className="relative min-h-screen p-4 pt-6">
      <Background />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Logo size="sm" />
          <div className="glass rounded-2xl px-4 py-2 text-center">
            <p className="text-xs font-mono text-white/40">PIN</p>
            <p className="font-mono text-2xl font-bold tracking-widest text-gradient">{gamePin}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Coluna esquerda: QR Code + status */}
          <div className="flex flex-col gap-4">
            {/* QR Code */}
            <div className="glass rounded-3xl p-5 flex flex-col items-center gap-3">
              <p className="text-xs font-mono text-white/40 uppercase tracking-wider">
                Acesse para entrar
              </p>
              <div className="bg-white p-3 rounded-2xl">
                <QRCodeSVG value={joinUrl} size={160} level="H" />
              </div>
              <p className="font-mono text-xs text-white/40 text-center break-all">{joinUrl}</p>
            </div>

            {/* Status da fase */}
            <div className="glass rounded-2xl p-4 text-center">
              <p className="text-xs font-mono text-white/40 mb-1">Fase atual</p>
              <p className="font-display text-lg font-bold text-white">
                {phaseLabel[session?.phase ?? 'waiting']}
              </p>
            </div>

            {/* Pergunta atual (se houver) */}
            {(session?.phase === 'question' || session?.phase === 'answer') && currentQ && (
              <div className="glass rounded-2xl p-4">
                <p className="text-xs font-mono text-white/40 mb-2">Pergunta atual</p>
                <p className="text-sm text-white font-body leading-snug">{currentQ.text}</p>
                {session.phase === 'answer' && (
                  <p className="mt-2 text-xs text-gw-green">
                    ✓ Correta: {currentQ.options.find(o => o.id === currentQ.correctId)?.text}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Coluna central: Controle e botão */}
          <div className="flex flex-col gap-4">
            {/* Jogadores conectados */}
            <div className="glass rounded-3xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-mono text-xs text-white/40 uppercase tracking-wider">
                  Jogadores
                </h3>
                <span className="font-mono text-lg font-bold text-gw-sky">{players.length}</span>
              </div>

              {players.length === 0 ? (
                <p className="text-white/30 text-sm text-center py-4">Aguardando…</p>
              ) : (
                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                  {players.map((p) => (
                    <span key={p.id} className="text-xs glass rounded-lg px-2 py-1 text-white/70">
                      {p.nickname}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Botão de controle principal */}
            <button
              onClick={advance}
              disabled={transitioning || loading}
              className="
                w-full py-5 rounded-3xl
                bg-gradient-to-r from-gw-blue to-gw-sky
                font-display font-bold text-xl text-white
                glow-blue hover:opacity-90 active:scale-95
                transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {transitioning ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processando…
                </span>
              ) : (
                nextActionLabel[session?.phase ?? 'waiting']
              )}
            </button>

            {/* Progresso de perguntas */}
            {session && session.phase !== 'waiting' && session.phase !== 'finished' && (
              <div className="glass rounded-2xl px-4 py-3">
                <div className="flex justify-between text-xs font-mono text-white/40 mb-2">
                  <span>Progresso</span>
                  <span>{session.currentQuestion + 1} / {QUESTIONS.length}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gw-sky rounded-full transition-all duration-500"
                    style={{ width: `${((session.currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Coluna direita: Ranking em tempo real */}
          <div className="glass rounded-3xl p-5">
            <h3 className="font-mono text-xs text-white/40 uppercase tracking-wider mb-4 text-center">
              🏆 Ranking em tempo real
            </h3>
            <RankingList players={players} maxItems={10} />
          </div>
        </div>
      </div>
    </main>
  )
}
