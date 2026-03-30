// ================================================================
// PÁGINA: Jogo (/game)
//
// Tela principal exibida para cada jogador durante o quiz.
// Lê o estado do Firebase e renderiza a fase correta:
//   - question → QuestionCard
//   - answer   → Feedback com resposta correta
//   - ranking  → Ranking parcial
//   - finished → Redireciona para ranking final
// ================================================================

'use client'

export const dynamic = 'force-dynamic'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Background } from '@/components/ui/Background'
import { QuestionCard } from '@/components/game/QuestionCard'
import { RankingList } from '@/components/ui/RankingList'
import { useGameSession } from '@/hooks/useGameSession'
import { QUESTIONS } from '@/lib/questions'
import type { LocalPlayerState } from '@/lib/types'

export default function GamePage() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const pin          = searchParams.get('pin') ?? ''

  const [localPlayer, setLocalPlayer] = useState<LocalPlayerState | null>(null)
  const [soundEnabled] = useState(true)

  const { session, players, loading } = useGameSession(pin)

  // Recupera estado local do jogador
  useEffect(() => {
    const raw = sessionStorage.getItem('gw_player')
    if (!raw) { router.push('/'); return }
    setLocalPlayer(JSON.parse(raw))
  }, [router])

  // Redireciona quando o jogo termina
  useEffect(() => {
    if (session?.phase === 'finished') {
      router.push(`/ranking?pin=${pin}&final=1`)
    }
  }, [session, router, pin])

  if (loading || !session || !localPlayer) {
    return (
      <main className="relative min-h-screen flex items-center justify-center">
        <Background />
        <div className="relative z-10 text-white/50 font-mono animate-pulse">Carregando…</div>
      </main>
    )
  }

  const { phase, currentQuestion, questionStart } = session
  const question = QUESTIONS[currentQuestion]

  return (
    <main className="relative min-h-screen flex flex-col items-center p-4 pt-6">
      <Background />

      <div className="relative z-10 w-full max-w-2xl">
        {/* Fase: Pergunta ativa */}
        {phase === 'question' && question && (
          <QuestionCard
            question={question}
            questionIndex={currentQuestion}
            totalQuestions={QUESTIONS.length}
            questionStart={questionStart}
            pin={pin}
            playerId={localPlayer.playerId}
            soundEnabled={soundEnabled}
          />
        )}

        {/* Fase: Mostrando resposta correta */}
        {phase === 'answer' && question && (
          <div className="glass rounded-3xl p-6 text-center flex flex-col gap-4">
            <p className="font-mono text-xs text-white/40 uppercase tracking-wider">Resposta correta</p>
            <p className="font-display text-xl font-bold text-white">{question.text}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {question.options.map((opt) => (
                <div
                  key={opt.id}
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all
                    ${opt.id === question.correctId
                      ? 'border-gw-green bg-gw-green/15 glow-green'
                      : 'border-white/10 bg-white/5 opacity-40'}`}
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <span className="text-sm font-body font-semibold text-white">{opt.text}</span>
                  {opt.id === question.correctId && <span className="ml-auto text-gw-green">✓</span>}
                </div>
              ))}
            </div>

            {question.explanation && (
              <p className="text-sm text-white/50 leading-relaxed">💡 {question.explanation}</p>
            )}

            <p className="text-white/30 text-sm animate-pulse">Aguardando próxima pergunta…</p>
          </div>
        )}

        {/* Fase: Ranking parcial */}
        {phase === 'ranking' && (
          <div className="glass rounded-3xl p-6 flex flex-col gap-4">
            <h2 className="font-display text-2xl font-bold text-center text-gradient">
              🏆 Ranking Parcial
            </h2>
            <RankingList
              players={players}
              maxItems={5}
              highlight={localPlayer.playerId}
            />
            <p className="text-white/30 text-sm text-center animate-pulse">
              Próxima pergunta em breve…
            </p>
          </div>
        )}

        {/* Fase: Aguardando início */}
        {(phase === 'waiting' || phase === 'starting') && (
          <div className="text-center flex flex-col items-center gap-4">
            <div className="flex gap-1.5">
              {[0,1,2,3,4].map((i) => (
                <div key={i}
                  className="w-2 h-2 rounded-full bg-gw-sky animate-bounce"
                  style={{ animationDelay: `${i * 0.12}s` }}
                />
              ))}
            </div>
            <p className="text-white/50 font-body">
              {phase === 'starting' ? '🚀 O jogo vai começar!' : 'Aguardando o host…'}
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
