// ================================================================
// COMPONENTE: EmblemPicker
// Seletor visual dos emblemas (Gweb, Webtrans, GW-i)
// ================================================================

'use client'

import { EMBLEMS, type EmblemId } from '@/lib/types'
import { cn } from '@/lib/utils'

interface EmblemPickerProps {
  selected:  EmblemId | null
  onChange:  (id: EmblemId) => void
}

export function EmblemPicker({ selected, onChange }: EmblemPickerProps) {
  return (
    <div className="flex gap-3 justify-center flex-wrap">
      {EMBLEMS.map((emblem) => {
        const isSelected = selected === emblem.id
        return (
          <button
            key={emblem.id}
            type="button"
            onClick={() => onChange(emblem.id)}
            className={cn(
              'flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all duration-200',
              'border-2 cursor-pointer select-none min-w-[80px]',
              isSelected
                ? 'scale-110 bg-white/10'
                : 'border-white/10 bg-white/5 hover:bg-white/10 hover:scale-105'
            )}
            style={isSelected ? { borderColor: emblem.color, boxShadow: `0 0 16px ${emblem.color}60` } : {}}
            aria-label={`Emblema ${emblem.label}`}
            aria-pressed={isSelected}
          >
            <span className="text-3xl">{emblem.emoji}</span>
            <span className="text-xs font-mono text-white/70 whitespace-nowrap">{emblem.label}</span>
            {isSelected && (
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: emblem.color }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}

/** Exibe o emblema de um jogador (versão compacta) */
export function EmblemBadge({ emblemId, size = 'md' }: { emblemId: EmblemId; size?: 'sm' | 'md' | 'lg' }) {
  const emblem = EMBLEMS.find((e) => e.id === emblemId)
  if (!emblem) return null

  const sizes = { sm: 'text-base', md: 'text-xl', lg: 'text-3xl' }

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-xl border',
        size === 'sm' ? 'w-7 h-7' : size === 'md' ? 'w-9 h-9' : 'w-12 h-12',
        sizes[size]
      )}
      style={{ borderColor: `${emblem.color}60`, background: `${emblem.color}15` }}
      title={emblem.label}
    >
      {emblem.emoji}
    </span>
  )
}
