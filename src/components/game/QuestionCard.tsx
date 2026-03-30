// ================================================================
// COMPONENTE: QuestionCard
//
// Exibe a pergunta atual com suas 4 alternativas.
// - Bloqueia clique após o jogador responder ou o tempo expirar
// - Mostra resposta correta/incorreta com feedback visual e texto
// - Integrado com o sistema de pontuação e sons
// ================================================================

'use client'

import { useState, useEffect } from 'react'
import { TimerBar } from '@/components/ui/TimerBar'
import { useTimer } from '@/hooks/useTimer'
import { calcScore } from '@/lib/scoring'
import { answerRef, update } from '@/lib/firebase'
import { playClick, playCorrect, playWrong, playCountdown } from '@/lib/sounds'
import { cn } from '@/lib/utils'
import type { QuizQuestion } from '@/lib/types'

interface QuestionCardProps {
  question:       QuizQuestion
  questionIndex:  number        // 0-based
  totalQuestions: number
  questionStart:  number        // timestamp ms
  pin:            string
  playerId:       string
  soundEnabled:   boolean
}

type AnswerState =
  | { status: 'idle' }
  | { status: 'answered'; optionId: string; correct: boolean; points: number }
  | { status: 'expired' }

export function QuestionCard({
  question,
  questionIndex,
  totalQuestions,
  questionStart,
  pin,
  playerId,
  soundEnabled,
}: QuestionCardProps) {
  const [answerState, setAnswerState] = useState<AnswerState>({ status: 'idle' })

  // Reset ao mudar de pergunta
  useEffect(() => {
    setAnswerState({ status: 'idle' })
  }, [question.id])

  const { remaining, percentage, expired } = useTimer({
    questionStart,
    timeLimit: question.timeLimit,
    onExpire: () => {
      if (answerState.status === 'idle') {
        setAnswerState({ status: 'expired' })
      }
    },
  })

  // Contagem regressiva final (últimos 3s)
  useEffect(() => {
    if (remaining <= 3 && remaining > 0 && answerState.status === 'idle' && soundEnabled) {
      playCountdown()
    }
  }, [remaining, answerState.status, soundEnabled])

  /** Processa a resposta do jogador */
  async function handleAnswer(optionId: string) {
    if (answerState.status !== 'idle') return
    if (expired) return

    const timeMs  = Date.now() - questionStart
    const correct = optionId === question.correctId
    const points  = correct ? calcScore(timeMs, question.timeLimit) : 0

    // Feedback sonoro
    if (soundEnabled) {
      correct ? playCorrect() : playWrong()
    }

    // Atualiza estado local imediatamente para feedback instantâneo
    setAnswerState({ status: 'answered', optionId, correct, points })

    // Persiste no Firebase
    try {
      await update(answerRef(pin, playerId, question.id), {
        optionId,
        timeMs,
        pointsEarned: points,
        correct,
      })

      // Incrementa score total do jogador
      if (points > 0) {
        const { ref, db } = await import('@/lib/firebase')
        const { runTransaction } = await import('firebase/database')
        const scoreRef = ref(db, `sessions/${pin}/players/${playerId}/score`)
        await runTransaction(scoreRef, (current) => (current || 0) + points)
      }
    } catch (err) {
      console.error('Erro ao salvar resposta:', err)
    }
  }

  const answered = answerState.status === 'answered'
  const isExpired = answerState.status === 'expired' || (expired && answerState.status === 'idle')

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
      {/* Header: progresso e timer */}
      <div className="glass rounded-2xl px-5 py-3 flex items-center gap-4">
        <span className="font-mono text-xs text-white/40 whitespace-nowrap">
          {questionIndex + 1} / {totalQuestions}
        </span>
        <div className="flex-1">
          <TimerBar percentage={percentage} remaining={remaining} timeLimit={question.timeLimit} />
        </div>
      </div>

      {/* Enunciado */}
      <div className="glass rounded-2xl px-6 py-5">
        <p className="font-display text-xl md:text-2xl font-bold text-white text-center leading-snug">
          {question.text}
        </p>
      </div>

      {/* Alternativas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.options.map((option) => {
          const isSelected  = answered && answerState.optionId === option.id
          const isCorrect   = option.id === question.correctId
          const showCorrect = (answered || isExpired) && isCorrect
          const showWrong   = answered && isSelected && !isCorrect

          return (
            <button
              key={option.id}
              onClick={() => {
                if (soundEnabled) playClick()
                handleAnswer(option.id)
              }}
              disabled={answered || isExpired}
              className={cn(
                'relative flex items-center gap-4 p-4 rounded-2xl text-left',
                'border-2 font-body font-semibold text-white text-sm md:text-base',
                'transition-all duration-300 active:scale-95',
                showCorrect ? 'border-gw-green bg-gw-green/20 glow-green scale-[1.02]' :
                showWrong   ? 'border-gw-red bg-gw-red/20 glow-red' :
                (answered || isExpired) ? 'border-white/10 bg-white/5 opacity-40 cursor-not-allowed' :
                'border-white/15 bg-gw-card hover:border-gw-sky/60 hover:bg-gw-sky/10 cursor-pointer hover:scale-[1.01]'
              )}
            >
              {/* Ícone da alternativa */}
              <span className="text-2xl flex-shrink-0">{option.icon}</span>

              {/* Texto */}
              <span className="flex-1 leading-snug">{option.text}</span>

              {/* Ícone de resultado */}
              {showCorrect && <span className="text-gw-green text-xl">✓</span>}
              {showWrong   && <span className="text-gw-red text-xl">✗</span>}
            </button>
          )
        })}
      </div>

      {/* Feedback pós-resposta */}
      {(answered || isExpired) && (
        <div
          className={cn(
            'glass rounded-2xl px-6 py-4 text-center transition-all duration-500',
            answered && answerState.correct
              ? 'border border-gw-green/40 bg-gw-green/10'
              : 'border border-gw-red/40 bg-gw-red/10'
          )}
        >
          <p className="font-display text-lg font-bold">
            {isExpired && answerState.status !== 'answered'
              ? '⏰ Tempo esgotado!'
              : answered && answerState.correct
              ? '✅ Commit realizado com sucesso'
              : '❌ Conflito detectado'}
          </p>
          {answered && (
            <p className="font-mono text-sm mt-1 text-white/60">
              +{answerState.points.toLocaleString('pt-BR')} pts
            </p>
          )}
          {question.explanation && (
            <p className="text-sm text-white/50 mt-2 leading-relaxed">
              💡 {question.explanation}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
