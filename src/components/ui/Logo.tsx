// ================================================================
// COMPONENTE: Logo GW Sistemas
// Exibe o nome do sistema com identidade visual da empresa
// ================================================================

import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Logo({ size = 'md', className }: LogoProps) {
  const sizes = {
    sm: { title: 'text-xl',   sub: 'text-xs',  icon: 36 },
    md: { title: 'text-3xl',  sub: 'text-sm',  icon: 48 },
    lg: { title: 'text-5xl',  sub: 'text-base', icon: 64 },
  }

  const s = sizes[size]

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      {/* Ícone GW */}
      <div
        className="relative flex items-center justify-center rounded-2xl glow-blue"
        style={{
          width:      s.icon,
          height:     s.icon,
          background: 'linear-gradient(135deg, #0055A4, #1A7FD4)',
        }}
      >
        <span className="font-display text-white font-bold" style={{ fontSize: s.icon * 0.38 }}>
          GW
        </span>
        {/* Bolinha verde de "online" */}
        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-gw-green animate-pulse-fast" />
      </div>

      {/* Textos */}
      <div className="text-center">
        <p className={cn('font-display font-bold text-gradient leading-none', s.title)}>
          Versionamento
        </p>
        <p className={cn('font-display font-bold text-white leading-none', s.title)}>
          Inteligente
        </p>
        <p className={cn('text-blue-300 font-mono tracking-widest uppercase mt-1', s.sub)}>
          GW Sistemas
        </p>
      </div>
    </div>
  )
}
