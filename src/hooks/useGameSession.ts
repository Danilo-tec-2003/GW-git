// ================================================================
// HOOK: useGameSession
//
// Sincroniza o estado do jogo em tempo real com o Firebase.
// Qualquer mudança no banco de dados é refletida instantaneamente
// em todos os clientes conectados.
// ================================================================

'use client'

import { useEffect, useState } from 'react'
import { onValue, sessionRef, playersRef } from '@/lib/firebase'
import type { GameSession, Player } from '@/lib/types'

interface GameState {
  session:  GameSession | null
  players:  Player[]
  loading:  boolean
  error:    string | null
}

export function useGameSession(pin: string): GameState {
  const [state, setState] = useState<GameState>({
    session: null,
    players: [],
    loading: true,
    error:   null,
  })

  useEffect(() => {
    if (!pin) return

    let sessionLoaded = false
    let playersLoaded = false

    // Listener para a sessão (fase, pergunta atual, etc.)
    const sessionUnsubscribe = onValue(
      sessionRef(pin),
      (snapshot) => {
        sessionLoaded = true
        if (snapshot.exists()) {
          setState((prev) => ({
            ...prev,
            session: snapshot.val() as GameSession,
            loading: !playersLoaded,
            error:   null,
          }))
        } else {
          setState((prev) => ({
            ...prev,
            session: null,
            loading: !playersLoaded,
            error:   'Sessão não encontrada. Verifique o PIN.',
          }))
        }
      },
      (error) => {
        setState((prev) => ({
          ...prev,
          error:   error.message,
          loading: false,
        }))
      }
    )

    // Listener para jogadores (ranking em tempo real)
    const playersUnsubscribe = onValue(
      playersRef(pin),
      (snapshot) => {
        playersLoaded = true
        const data = snapshot.val() ?? {}
        const playersList = Object.entries(data).map(([id, p]) => ({
          id,
          ...(p as Omit<Player, 'id'>),
        }))
        setState((prev) => ({
          ...prev,
          players: playersList,
          loading: !sessionLoaded,
        }))
      }
    )

    // Cleanup: remove listeners ao desmontar componente
    return () => {
      sessionUnsubscribe()
      playersUnsubscribe()
    }
  }, [pin])

  return state
}
