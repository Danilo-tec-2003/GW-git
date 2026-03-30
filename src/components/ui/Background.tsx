// ================================================================
// COMPONENTE: Background
//
// Fundo animado com:
//   - Gradiente azul escuro (identidade GW)
//   - Grade sutil (tech)
//   - Caminhão em movimento (logística)
//   - Elementos Git (branch, commit, merge)
//   - Elementos de NF/documentos
// Tudo com baixa opacidade para não poluir o conteúdo principal.
// ================================================================

export function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {/* Gradiente base */}
      <div className="absolute inset-0 bg-gradient-to-br from-gw-dark via-gw-surface to-gw-navy" />

      {/* Grade tech sutil */}
      <div className="absolute inset-0 bg-grid opacity-60" />

      {/* Glows de canto */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gw-blue opacity-5 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-gw-sky opacity-5 blur-3xl" />

      {/* SVG com elementos visuais temáticos */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.07]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Linhas de rota logística */}
        <path
          d="M-100,450 Q360,200 720,450 Q1080,700 1540,450"
          stroke="#1A7FD4"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="8 6"
        />
        <path
          d="M-100,300 Q360,550 720,300 Q1080,50 1540,300"
          stroke="#1A7FD4"
          strokeWidth="1"
          fill="none"
          strokeDasharray="6 8"
        />

        {/* Grafo Git - branch / commits */}
        <g transform="translate(80, 80)">
          {/* Branch principal */}
          <line x1="0" y1="60" x2="300" y2="60" stroke="#1A7FD4" strokeWidth="2" />
          {/* Feature branch */}
          <path d="M80,60 Q80,20 130,20 L220,20 Q270,20 270,60" stroke="#00C853" strokeWidth="1.5" fill="none" />
          {/* Commits */}
          <circle cx="0"   cy="60" r="8" fill="#1A7FD4" />
          <circle cx="80"  cy="60" r="8" fill="#1A7FD4" />
          <circle cx="130" cy="20" r="7" fill="#00C853" />
          <circle cx="220" cy="20" r="7" fill="#00C853" />
          <circle cx="270" cy="60" r="8" fill="#1A7FD4" />
          <circle cx="300" cy="60" r="8" fill="#1A7FD4" />
          {/* Labels */}
          <text x="130" y="10" fill="#00C853" fontSize="8" textAnchor="middle">feature/login</text>
          <text x="0"   y="80" fill="#1A7FD4" fontSize="8" textAnchor="middle">main</text>
        </g>

        {/* Ícone de documento NF (canto superior direito) */}
        <g transform="translate(1300, 60)" opacity="0.7">
          <rect x="0" y="0" width="60" height="80" rx="4" stroke="#1A7FD4" strokeWidth="1.5" fill="none" />
          <line x1="10" y1="20" x2="50" y2="20" stroke="#1A7FD4" strokeWidth="1" />
          <line x1="10" y1="32" x2="50" y2="32" stroke="#1A7FD4" strokeWidth="1" />
          <line x1="10" y1="44" x2="35" y2="44" stroke="#1A7FD4" strokeWidth="1" />
          <text x="30" y="68" fill="#1A7FD4" fontSize="9" textAnchor="middle">NF-e</text>
        </g>

        {/* Pallet (centro-baixo) */}
        <g transform="translate(680, 780)" opacity="0.6">
          <rect x="0"  y="20" width="80" height="10" rx="2" stroke="#1A7FD4" strokeWidth="1" fill="none" />
          <rect x="0"  y="10" width="80" height="10" rx="2" stroke="#1A7FD4" strokeWidth="1" fill="none" />
          <rect x="5"  y="0"  width="70" height="10" rx="2" stroke="#1A7FD4" strokeWidth="1" fill="none" />
          <line x1="10" y1="0" x2="10" y2="20" stroke="#1A7FD4" strokeWidth="0.8" />
          <line x1="40" y1="0" x2="40" y2="20" stroke="#1A7FD4" strokeWidth="0.8" />
          <line x1="70" y1="0" x2="70" y2="20" stroke="#1A7FD4" strokeWidth="0.8" />
        </g>

        {/* Nós de rede/conexão (canto inferior esquerdo) */}
        <g transform="translate(50, 750)" opacity="0.5">
          <circle cx="0"  cy="0"   r="5" fill="#1A7FD4" />
          <circle cx="60" cy="-30" r="5" fill="#1A7FD4" />
          <circle cx="60" cy="30"  r="5" fill="#1A7FD4" />
          <circle cx="120" cy="0"  r="5" fill="#1A7FD4" />
          <line x1="0" y1="0" x2="60" y2="-30" stroke="#1A7FD4" strokeWidth="1" />
          <line x1="0" y1="0" x2="60" y2="30"  stroke="#1A7FD4" strokeWidth="1" />
          <line x1="60" y1="-30" x2="120" y2="0" stroke="#1A7FD4" strokeWidth="1" />
          <line x1="60" y1="30"  x2="120" y2="0" stroke="#1A7FD4" strokeWidth="1" />
        </g>
      </svg>

      {/* Caminhão animado (via CSS animation) */}
      <div className="absolute bottom-16 animate-truck">
        <svg
          width="120"
          height="50"
          viewBox="0 0 120 50"
          className="opacity-[0.08]"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cabine */}
          <rect x="70" y="10" width="45" height="30" rx="4" fill="#1A7FD4" />
          <rect x="95" y="15" width="18" height="14" rx="2" fill="#060D1F" opacity="0.6" />
          {/* Baú */}
          <rect x="5" y="10" width="68" height="30" rx="3" fill="#0055A4" />
          {/* Rodas */}
          <circle cx="25" cy="42" r="8"  fill="#1A7FD4" />
          <circle cx="95" cy="42" r="8"  fill="#1A7FD4" />
          <circle cx="25" cy="42" r="4"  fill="#060D1F" />
          <circle cx="95" cy="42" r="4"  fill="#060D1F" />
          {/* Logo GW no baú */}
          <text x="39" y="29" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle" opacity="0.8">GW</text>
        </svg>
      </div>
    </div>
  )
}
