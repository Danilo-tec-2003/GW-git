// ================================================================
// PÁGINA: Lobby (/lobby)
//
// Exibida para os jogadores enquanto aguardam o host iniciar.
// Sincroniza a lista de jogadores em tempo real via Firebase.
// Quando a fase muda para 'question', redireciona para /game.
// ================================================================

'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Background } from '@/components/ui/Background'
import { Logo } from '@/components/ui/Logo'
import { EmblemBadge } from '@/components/ui/EmblemPicker'
import { useGameSession } from '@/hooks/useGameSession'
import type { LocalPlayerState } from '@/lib/types'

export default function LobbyPage() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const pin          = searchParams.get('pin') ?? ''

  const [localPlayer, setLocalPlayer] = useState<LocalPlayerState | null>(null)
  const { session, players, loading, error } = useGameSession(pin)

  // Recupera estado local do jogador (salvo ao entrar)
  useEffect(() => {
    const raw = sessionStorage.getItem('gw_player')
    if (!raw) { router.push('/'); return }
    setLocalPlayer(JSON.parse(raw))
  }, [router])

  // Redireciona quando o host inicia o jogo
  useEffect(() => {
    if (!session) return
    if (session.phase === 'question' || session.phase === 'starting') {
      router.push(`/game?pin=${pin}`)
    }
    if (session.phase === 'finished') {
      router.push(`/ranking?pin=${pin}&final=1`)
    }
  }, [session, router, pin])

  if (!pin) return null

  return (
    <main className="relative min-h-screen flex flex-col items-center p-4 pt-10 gap-6">
      <Background />

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center gap-6">
        <Logo size="md" />

        {/* PIN de entrada */}
        <div className="glass rounded-2xl px-8 py-4 text-center">
          <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-1">PIN do Jogo</p>
          <p className="font-mono text-4xl font-bold tracking-[0.3em] text-gradient">{pin}</p>
          <p className="text-xs text-white/30 mt-1">Entre em <strong className="text-white/60">gw-quiz.vercel.app</strong></p>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 text-white/50 text-sm font-mono">
          <span className="w-2 h-2 rounded-full bg-gw-green animate-pulse-fast" />
          {loading ? 'Conectando…' : `${players.length} jogador${players.length !== 1 ? 'es' : ''} no lobby`}
        </div>

        {/* Mensagem de erro */}
        {error && (
          <p className="text-gw-red text-sm text-center bg-gw-red/10 rounded-xl py-2 px-4">
            ⚠️ {error}
          </p>
        )}

        {/* Lista de jogadores */}
        <div className="w-full glass rounded-3xl p-4">
          <h3 className="text-xs font-mono text-white/40 uppercase tracking-wider mb-4 text-center">
            Jogadores conectados
          </h3>

          {players.length === 0 ? (
            <div className="text-center py-8 text-white/30 text-sm">
              Aguardando jogadores…
            </div>
          ) : (
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {players.map((p) => {
                const isSelf = p.id === localPlayer?.playerId
                return (
                  <li
                    key={p.id}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-xl
                      ${isSelf
                        ? 'bg-gw-sky/20 border border-gw-sky/40'
                        : 'bg-white/5 border border-white/5'}
                    `}
                  >
                    <EmblemBadge emblemId={p.emblem} size="sm" />
                    <span className="text-sm font-body truncate text-white/80">
                      {p.nickname}
                      {isSelf && <span className="text-gw-sky"> ★</span>}
                    </span>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Animação de aguardar */}
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="flex gap-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-gw-sky animate-bounce"
                style={{ animationDelay: `${i * 0.12}s` }}
              />
            ))}
          </div>
          <p className="text-white/40 text-sm font-body">
            Aguardando o host iniciar o jogo…
          </p>
        </div>
      </div>
    </main>
  )
}
