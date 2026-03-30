// ================================================================
// COMPONENTE: TimerBar
//
// Barra de progresso animada para o tempo de cada pergunta.
// Muda de cor conforme o tempo diminui:
//   - Verde   → acima de 50%
//   - Amarelo → entre 20% e 50%
//   - Vermelho → abaixo de 20% (pulsa)
// ================================================================

'use client'

import { cn } from '@/lib/utils'

interface TimerBarProps {
  percentage: number    // 0–100
  remaining:  number    // segundos restantes
  timeLimit:  number    // total de segundos
}

export function TimerBar({ percentage, remaining, timeLimit }: TimerBarProps) {
  const isCritical = percentage < 20
  const isWarning  = percentage < 50

  const barColor = isCritical
    ? 'bg-gw-red'
    : isWarning
    ? 'bg-yellow-400'
    : 'bg-gw-green'

  return (
    <div className="w-full">
      {/* Número de segundos */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-white/40 font-mono uppercase tracking-wider">Tempo</span>
        <span
          className={cn(
            'text-lg font-display font-bold tabular-nums transition-colors duration-300',
            isCritical ? 'text-gw-red animate-pulse-fast' : isWarning ? 'text-yellow-400' : 'text-gw-green'
          )}
        >
          {remaining}s
        </span>
      </div>

      {/* Trilha da barra */}
      <div className="relative w-full h-3 bg-white/10 rounded-full overflow-hidden">
        {/* Barra preenchida */}
        <div
          className={cn(
            'absolute inset-y-0 left-0 rounded-full transition-all duration-200',
            barColor,
            isCritical && 'shadow-[0_0_12px_rgba(255,23,68,0.6)]'
          )}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={remaining}
          aria-valuemin={0}
          aria-valuemax={timeLimit}
        />

        {/* Reflexo interno */}
        <div
          className="absolute inset-y-0 left-0 rounded-full opacity-40 bg-gradient-to-r from-white/30 to-transparent"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
