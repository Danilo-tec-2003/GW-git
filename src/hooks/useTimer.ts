// ================================================================
// HOOK: useTimer
//
// Calcula o tempo restante com base em:
//   - questionStart: timestamp (ms) de quando a pergunta começou
//   - timeLimit: duração total em segundos
//
// Usa requestAnimationFrame para atualizações suaves.
// ================================================================

'use client'

import { useEffect, useState, useRef } from 'react'

interface UseTimerOptions {
  questionStart: number   // timestamp ms (do Firebase serverTimestamp)
  timeLimit:     number   // segundos
  onExpire?:     () => void
}

interface TimerState {
  remaining:  number   // segundos restantes (0–timeLimit)
  percentage: number   // 0–100 (para a barra de progresso)
  expired:    boolean
}

export function useTimer({
  questionStart,
  timeLimit,
  onExpire,
}: UseTimerOptions): TimerState {
  const [state, setState] = useState<TimerState>({
    remaining:  timeLimit,
    percentage: 100,
    expired:    false,
  })

  const onExpireRef = useRef(onExpire)
  onExpireRef.current = onExpire

  useEffect(() => {
    if (!questionStart || !timeLimit) return

    let animFrame: number
    let expiredFired = false

    const tick = () => {
      const now       = Date.now()
      const elapsed   = (now - questionStart) / 1000  // segundos
      const remaining = Math.max(0, timeLimit - elapsed)
      const percentage = (remaining / timeLimit) * 100
      const expired   = remaining <= 0

      setState({ remaining: Math.ceil(remaining), percentage, expired })

      if (expired && !expiredFired) {
        expiredFired = true
        onExpireRef.current?.()
      } else if (!expired) {
        animFrame = requestAnimationFrame(tick)
      }
    }

    animFrame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animFrame)
  }, [questionStart, timeLimit])

  return state
}
