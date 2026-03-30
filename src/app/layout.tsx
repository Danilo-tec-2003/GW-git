import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title:       'Versionamento Inteligente – GW Sistemas',
  description: 'Quiz interativo sobre Git e versionamento de código para o workshop GW Sistemas',
  icons:       { icon: '/favicon.ico' },
  openGraph: {
    title:       'GW Quiz – Versionamento Inteligente',
    description: 'Quiz em tempo real – Workshop GW Sistemas',
    type:        'website',
  },
}

export const viewport: Viewport = {
  width:        'device-width',
  initialScale: 1,
  themeColor:   '#060D1F',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gw-dark text-white font-body antialiased">
        {children}
      </body>
    </html>
  )
}
