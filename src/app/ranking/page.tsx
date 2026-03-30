// ================================================================
// PÁGINA: Ranking Final (/ranking?final=1)
// Exibe o pódio final e a lista completa de classificados.
// ================================================================

'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Background } from '@/components/ui/Background'
import { Logo } from '@/components/ui/Logo'
import { Podium } from '@/components/game/Podium'
import { RankingList } from '@/components/ui/RankingList'
import { useGameSession } from '@/hooks/useGameSession'
import { calcRanking } from '@/lib/scoring'
import type { LocalPlayerState } from '@/lib/types'

export default function RankingPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pin = searchParams.get('pin') ?? ''

  const [localPlayer, setLocalPlayer] = useState<LocalPlayerState | null>(null)
  const { players, loading } = useGameSession(pin)

  const sorted = calcRanking(players)

  useEffect(() => {
    const raw = sessionStorage.getItem('gw_player')
    if (raw) setLocalPlayer(JSON.parse(raw))
  }, [])

  return (
    <main className="relative min-h-screen flex flex-col items-center p-4 pt-8 pb-16">
      <Background />

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center gap-8">
        <Logo size="sm" />

        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-gradient-gold">
            🏆 Resultado Final
          </h1>
          <p className="text-white/40 font-mono text-sm mt-1">
            Versionamento Inteligente – GW Sistemas
          </p>
        </div>

        {/* Pódio top 3 */}
        {!loading && sorted.length >= 1 && (
          <Podium players={sorted} />
        )}

        {/* Lista completa */}
        <div className="w-full glass rounded-3xl p-5">
          <h3 className="font-mono text-xs text-white/40 uppercase tracking-wider mb-4 text-center">
            Classificação geral
          </h3>
          <RankingList
            players={sorted}
            maxItems={20}
            highlight={localPlayer?.playerId}
          />
        </div>

        {/* Botão de nova partida (para o host) */}
        <button
          onClick={() => router.push('/')}
          className="mt-4 px-8 py-3 rounded-2xl glass border border-gw-sky/30
            font-display font-bold text-gw-sky hover:border-gw-sky/60
            hover:bg-gw-sky/10 transition-all duration-200"
        >
          ↩ Jogar novamente
        </button>
      </div>
    </main>
  )
}
