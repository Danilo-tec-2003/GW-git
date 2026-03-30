// ================================================================
// COMPONENTE: RankingList
// Lista de ranking utilizada tanto no mid-game quanto no final.
// ================================================================

'use client'

import { EmblemBadge } from './EmblemPicker'
import { getMedal } from '@/lib/scoring'
import { cn } from '@/lib/utils'
import type { Player } from '@/lib/types'

interface RankingListProps {
  players:   Player[]
  maxItems?: number
  highlight?: string   // playerId para destacar
}

export function RankingList({ players, maxItems = 5, highlight }: RankingListProps) {
  const sorted = [...players]
    .sort((a, b) => b.score - a.score)
    .slice(0, maxItems)

  if (sorted.length === 0) {
    return (
      <p className="text-center text-white/40 font-mono text-sm py-8">
        Nenhum jogador ainda…
      </p>
    )
  }

  return (
    <ol className="space-y-2">
      {sorted.map((player, idx) => {
        const isFirst   = idx === 0
        const isSelf    = player.id === highlight
        const medal     = getMedal(idx)

        return (
          <li
            key={player.id}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300',
              isFirst  ? 'glass glow-gold border border-gw-gold/30 scale-[1.02]' : 'glass',
              isSelf   ? 'border border-gw-sky/50' : '',
            )}
          >
            {/* Posição */}
            <span
              className={cn(
                'w-8 text-center font-display font-bold text-lg leading-none',
                idx === 0 ? 'text-gw-gold'   :
                idx === 1 ? 'text-gw-silver' :
                idx === 2 ? 'text-gw-bronze' :
                'text-white/50'
              )}
            >
              {medal}
            </span>

            {/* Emblema */}
            <EmblemBadge emblemId={player.emblem} size="sm" />

            {/* Nickname */}
            <span className={cn(
              'flex-1 font-body font-semibold truncate',
              isSelf ? 'text-gw-sky' : 'text-white'
            )}>
              {player.nickname}
              {isSelf && <span className="ml-2 text-xs text-gw-sky/70">(você)</span>}
            </span>

            {/* Pontos */}
            <span className={cn(
              'font-mono font-bold tabular-nums',
              isFirst ? 'text-gw-gold text-lg' : 'text-white/80 text-base'
            )}>
              {player.score.toLocaleString('pt-BR')}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
