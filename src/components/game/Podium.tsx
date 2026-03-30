// ================================================================
// COMPONENTE: Podium
// Pódio animado com Top 3 para a tela de resultado final.
// ================================================================

'use client'

import { EmblemBadge } from '@/components/ui/EmblemPicker'
import { cn } from '@/lib/utils'
import type { Player } from '@/lib/types'

interface PodiumProps {
  players: Player[]   // já ordenados por score (desc)
}

export function Podium({ players }: PodiumProps) {
  // Top 3
  const [first, second, third] = players

  const podiumOrder = [second, first, third]   // ordem visual: 2º, 1º, 3º
  const heights     = ['h-24', 'h-36', 'h-16'] // alturas das colunas
  const colors      = ['#C0C0C0', '#FFD700', '#CD7F32']
  const medals      = ['🥈', '🥇', '🥉']
  const positions   = [2, 1, 3]

  return (
    <div className="flex items-end justify-center gap-3 mt-8">
      {podiumOrder.map((player, visualIdx) => {
        if (!player) return <div key={visualIdx} className="w-28" />

        const isFirst = positions[visualIdx] === 1

        return (
          <div key={player.id} className="flex flex-col items-center gap-2">
            {/* Avatar */}
            <div className={cn(
              'flex flex-col items-center gap-1 transition-all duration-700',
              isFirst ? 'scale-110' : ''
            )}>
              <EmblemBadge emblemId={player.emblem} size={isFirst ? 'lg' : 'md'} />
              <span
                className={cn(
                  'font-display font-bold text-center max-w-[96px] truncate',
                  isFirst ? 'text-gw-gold text-sm' : 'text-white/80 text-xs'
                )}
              >
                {player.nickname}
              </span>
              <span className="font-mono text-xs text-white/50">
                {player.score.toLocaleString('pt-BR')} pts
              </span>
            </div>

            {/* Coluna do pódio */}
            <div
              className={cn(
                'w-28 rounded-t-2xl flex items-center justify-center',
                heights[visualIdx],
                isFirst ? 'glow-gold' : ''
              )}
              style={{ background: `${colors[visualIdx]}22`, border: `2px solid ${colors[visualIdx]}55` }}
            >
              <span className="text-3xl">{medals[visualIdx]}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
