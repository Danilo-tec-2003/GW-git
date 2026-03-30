// ================================================================
// PÁGINA: Entrada do Jogador (/)
//
// Fluxo:
//   1. Jogador insere nickname e PIN
//   2. Escolhe emblema (opcional)
//   3. Validação do PIN contra o Firebase
//   4. Cria registro do jogador no Firebase
//   5. Redireciona para /lobby
// ================================================================

'use client'

export const dynamic = 'force-dynamic'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Background } from '@/components/ui/Background'
import { Logo } from '@/components/ui/Logo'
import { EmblemPicker } from '@/components/ui/EmblemPicker'
import { sessionRef, playersRef, push, set, get } from '@/lib/firebase'
import { EMBLEMS, type EmblemId } from '@/lib/types'
import { cn } from '@/lib/utils'

export default function JoinPage() {
  const router       = useRouter()
  const searchParams = useSearchParams()

  const [nickname, setNickname]   = useState('')
  const [pin, setPin]             = useState(searchParams.get('pin') ?? '')
  const [emblem, setEmblem]       = useState<EmblemId | null>('gweb')
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState<string | null>(null)

  // Pré-preenche PIN vindo da URL
  useEffect(() => {
    const urlPin = searchParams.get('pin')
    if (urlPin) setPin(urlPin.toUpperCase())
  }, [searchParams])

  async function handleJoin(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const trimmedNick = nickname.trim()
    const upperPin    = pin.trim().toUpperCase()

    if (!trimmedNick) { setError('Digite seu nickname'); return }
    if (!upperPin)    { setError('Digite o PIN do jogo'); return }

    setLoading(true)
    try {
      // Verifica se a sessão existe e está esperando jogadores
      const snap = await get(sessionRef(upperPin))
      if (!snap.exists()) {
        setError('PIN inválido. Verifique com o host.')
        setLoading(false)
        return
      }

      const session = snap.val()
      if (session.phase !== 'waiting' && session.phase !== 'starting') {
        setError('Este jogo já começou ou foi encerrado.')
        setLoading(false)
        return
      }

      // Cria o jogador no Firebase
      const playerRef = push(playersRef(upperPin))
      await set(playerRef, {
        nickname:  trimmedNick,
        emblem:    emblem ?? EMBLEMS[0].id,
        score:     0,
        joinedAt:  Date.now(),
        answers:   {},
      })

      // Salva estado local e navega para o lobby
      sessionStorage.setItem('gw_player', JSON.stringify({
        playerId: playerRef.key,
        nickname: trimmedNick,
        emblem:   emblem ?? EMBLEMS[0].id,
        answered: false,
      }))

      router.push(`/lobby?pin=${upperPin}`)
    } catch (err) {
      console.error(err)
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-4">
      <Background />

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center gap-8">
        <Logo size="lg" />

        {/* Card de entrada */}
        <form
          onSubmit={handleJoin}
          className="w-full glass rounded-3xl p-6 flex flex-col gap-5"
          noValidate
        >
          <h2 className="font-display text-lg font-bold text-center text-white/80">
            Entrar no Quiz
          </h2>

          {/* Nickname */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono text-white/50 uppercase tracking-wider">
              Nickname *
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Seu nome ou apelido"
              maxLength={20}
              className={cn(
                'w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/30',
                'font-body text-base focus:outline-none focus:ring-2 focus:ring-gw-sky/60',
                'transition-all duration-200',
                error && !nickname.trim() ? 'border-gw-red/60' : 'border-white/10'
              )}
              autoFocus
              autoComplete="off"
            />
          </div>

          {/* PIN */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono text-white/50 uppercase tracking-wider">
              PIN do Jogo *
            </label>
            <input
              type="text"
              value={pin}
              onChange={(e) => setPin(e.target.value.toUpperCase())}
              placeholder="Ex: GW2024"
              maxLength={12}
              className={cn(
                'w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/30',
                'font-mono text-xl tracking-[0.3em] text-center uppercase',
                'focus:outline-none focus:ring-2 focus:ring-gw-sky/60',
                'transition-all duration-200',
                error && !pin.trim() ? 'border-gw-red/60' : 'border-white/10'
              )}
            />
          </div>

          {/* Emblema */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-white/50 uppercase tracking-wider text-center">
              Emblema
            </label>
            <EmblemPicker selected={emblem} onChange={setEmblem} />
          </div>

          {/* Erro */}
          {error && (
            <p className="text-gw-red text-sm font-body text-center bg-gw-red/10 rounded-xl py-2 px-4">
              ⚠️ {error}
            </p>
          )}

          {/* Botão */}
          <button
            type="submit"
            disabled={loading}
            className={cn(
              'w-full py-4 rounded-2xl font-display font-bold text-lg',
              'bg-gradient-to-r from-gw-blue to-gw-sky text-white',
              'transition-all duration-200 active:scale-95',
              loading
                ? 'opacity-60 cursor-not-allowed'
                : 'hover:opacity-90 glow-blue'
            )}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Conectando…
              </span>
            ) : (
              '🚀 Entrar no Jogo'
            )}
          </button>
        </form>

        {/* Dica para o host */}
        <p className="text-xs text-white/25 font-mono text-center">
          Host?{' '}
          <a href="/host" className="text-gw-sky/60 underline hover:text-gw-sky">
            Acesse /host
          </a>
        </p>
      </div>
    </main>
  )
}
