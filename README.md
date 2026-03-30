# 🚛 Versionamento Inteligente – GW Sistemas

> Quiz interativo em tempo real sobre Git e versionamento de código.
> Estilo Kahoot, identidade visual GW Sistemas, deploy na Vercel.

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Funcionalidades](#funcionalidades)
3. [Stack Tecnológica](#stack-tecnológica)
4. [Estrutura de Pastas](#estrutura-de-pastas)
5. [Setup Local](#setup-local)
6. [Configurando o Firebase](#configurando-o-firebase)
7. [Deploy na Vercel](#deploy-na-vercel)
8. [Como Editar as Perguntas](#como-editar-as-perguntas)
9. [Como Alterar Tema e Cores](#como-alterar-tema-e-cores)
10. [Fluxo do Jogo](#fluxo-do-jogo)
11. [Problemas Comuns (FAQ)](#problemas-comuns)

---

## Visão Geral

Sistema de quiz em tempo real para uso em workshops corporativos.
Os jogadores entram via link ou QR Code, escolhem um emblema e competem
respondendo perguntas sobre Git com pontuação baseada na velocidade.

---

## Funcionalidades

- ✅ Entrada via link direto ou QR Code automático
- ✅ Escolha de emblema (Gweb / Webtrans / GW-i)
- ✅ Lobby em tempo real com lista de jogadores
- ✅ Timer visual por pergunta (configurável)
- ✅ Pontuação por velocidade (estilo Kahoot)
- ✅ Feedback: "Commit realizado" / "Conflito detectado"
- ✅ Ranking parcial após cada pergunta
- ✅ Pódio final animado (Top 3)
- ✅ Sons opcionais via Web Audio API
- ✅ Painel do host com controle total
- ✅ Identidade visual GW Sistemas

---

## Stack Tecnológica

| Tecnologia       | Uso                          |
|-----------------|------------------------------|
| Next.js 14      | Framework React (App Router) |
| TypeScript      | Tipagem estática             |
| TailwindCSS     | Estilização utilitária       |
| Firebase RTDB   | Realtime sync entre clientes |
| qrcode.react    | Geração de QR Code           |
| Vercel          | Deploy e hospedagem          |

---

## Estrutura de Pastas

```
gw-quiz/
├── src/
│   ├── app/                    # Rotas (Next.js App Router)
│   │   ├── page.tsx            # Tela de entrada do jogador (/)
│   │   ├── lobby/page.tsx      # Sala de espera (/lobby)
│   │   ├── game/page.tsx       # Jogo ativo (/game)
│   │   ├── ranking/page.tsx    # Resultado final (/ranking)
│   │   ├── host/page.tsx       # Painel do host (/host)
│   │   ├── layout.tsx          # Layout raiz (fonts, metadata)
│   │   └── globals.css         # Estilos globais + fontes
│   │
│   ├── components/
│   │   ├── ui/                 # Componentes reutilizáveis
│   │   │   ├── Background.tsx  # Fundo animado (caminhão, git, logística)
│   │   │   ├── Logo.tsx        # Logo GW Sistemas
│   │   │   ├── EmblemPicker.tsx # Seletor e badge de emblema
│   │   │   ├── TimerBar.tsx    # Barra de tempo animada
│   │   │   └── RankingList.tsx # Lista de ranking reutilizável
│   │   │
│   │   └── game/               # Componentes específicos do jogo
│   │       ├── QuestionCard.tsx # Card de pergunta + alternativas
│   │       └── Podium.tsx       # Pódio final (Top 3)
│   │
│   ├── hooks/
│   │   ├── useGameSession.ts   # Sincronização Firebase (session + players)
│   │   └── useTimer.ts         # Timer com requestAnimationFrame
│   │
│   └── lib/
│       ├── firebase.ts         # Config Firebase + refs do banco
│       ├── questions.ts        # ⭐ BANCO DE PERGUNTAS (edite aqui!)
│       ├── types.ts            # Todos os tipos TypeScript
│       ├── scoring.ts          # Lógica de pontuação
│       ├── sounds.ts           # Sons via Web Audio API
│       └── utils.ts            # Utilitários (cn, etc.)
│
├── public/                     # Assets estáticos
├── firebase-rules.json         # Regras de segurança do Firebase
├── .env.example                # Modelo de variáveis de ambiente
├── tailwind.config.ts          # Configuração do Tailwind
├── next.config.mjs             # Configuração do Next.js
└── README.md                   # Este arquivo
```

---

## Setup Local

### Pré-requisitos
- Node.js 18+ instalado → [nodejs.org](https://nodejs.org)
- Conta no Firebase → [firebase.google.com](https://firebase.google.com)
- Conta na Vercel → [vercel.com](https://vercel.com)

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/SEU_USUARIO/gw-quiz.git
cd gw-quiz

# 2. Instale as dependências
npm install

# 3. Crie o arquivo de variáveis de ambiente
cp .env.example .env.local

# 4. Preencha .env.local com suas credenciais Firebase (veja seção abaixo)

# 5. Rode o projeto localmente
npm run dev

# 6. Abra no navegador
# http://localhost:3000       → Entrada do jogador
# http://localhost:3000/host  → Painel do host
```

---

## Configurando o Firebase

### Passo 1 — Criar projeto

1. Acesse [console.firebase.google.com](https://console.firebase.google.com)
2. Clique em **"Adicionar projeto"**
3. Nome: `gw-quiz` (ou qualquer nome)
4. Desative o Google Analytics (opcional) → **Criar projeto**

### Passo 2 — Ativar o Realtime Database

1. No menu lateral, clique em **"Build" → "Realtime Database"**
2. Clique em **"Criar banco de dados"**
3. Selecione a localização mais próxima (ex: `us-central1`)
4. Modo inicial: **"Iniciar no modo de teste"** (permite leitura/escrita por 30 dias)
5. Clique em **"Ativar"**

### Passo 3 — Configurar as regras de segurança

1. Na aba **"Regras"** do Realtime Database
2. Substitua o conteúdo pelo conteúdo do arquivo `firebase-rules.json`
3. Clique em **"Publicar"**

### Passo 4 — Pegar as credenciais

1. Vá em **"Configurações do Projeto"** (ícone de engrenagem ⚙️ no topo do menu)
2. Role até **"Seus aplicativos"**
3. Clique em **"Adicionar aplicativo" → ícone Web (</>)**
4. Nome: `gw-quiz-web` → **Registrar aplicativo**
5. Copie o objeto `firebaseConfig` exibido

O objeto terá este formato:
```javascript
const firebaseConfig = {
  apiKey:            "AIzaSy...",
  authDomain:        "gw-quiz.firebaseapp.com",
  databaseURL:       "https://gw-quiz-default-rtdb.firebaseio.com",
  projectId:         "gw-quiz",
  storageBucket:     "gw-quiz.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123456789:web:abcdef"
}
```

### Passo 5 — Preencher o .env.local

Abra o arquivo `.env.local` e preencha com os valores acima:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=gw-quiz.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://gw-quiz-default-rtdb.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=gw-quiz
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=gw-quiz.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef

# PIN para o host acessar /host (mude para algo seguro!)
NEXT_PUBLIC_HOST_PIN=suaSenhaSegura2024

# PIN que os jogadores digitam para entrar
NEXT_PUBLIC_GAME_PIN=GW2024
```

### Estrutura dos dados no Firebase

```json
{
  "sessions": {
    "GW2024": {
      "pin": "GW2024",
      "phase": "waiting",
      "currentQuestion": 0,
      "questionStart": 1720000000000,
      "createdAt": 1720000000000,
      "players": {
        "-NxAbc123": {
          "nickname": "João",
          "emblem": "gweb",
          "score": 850,
          "joinedAt": 1720000001000,
          "answers": {
            "q1": {
              "optionId": "a",
              "timeMs": 4200,
              "pointsEarned": 790,
              "correct": true
            }
          }
        }
      }
    }
  }
}
```

---

## Deploy na Vercel

### Passo 1 — Criar conta na Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Clique em **"Sign Up"** e entre com sua conta GitHub

### Passo 2 — Subir o projeto para o GitHub
```bash
# No terminal, dentro da pasta gw-quiz:
git init
git add .
git commit -m "feat: projeto inicial GW Quiz"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/gw-quiz.git
git push -u origin main
```

### Passo 3 — Importar no Vercel
1. No dashboard da Vercel, clique em **"Add New → Project"**
2. Selecione o repositório `gw-quiz`
3. Clique em **"Import"**

### Passo 4 — Configurar variáveis de ambiente
1. Antes de fazer o deploy, clique em **"Environment Variables"**
2. Adicione CADA variável do seu `.env.local`:
   - `NEXT_PUBLIC_FIREBASE_API_KEY` → valor correspondente
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` → valor correspondente
   - *(repita para todas as 9 variáveis)*
3. Selecione os ambientes: **Production, Preview, Development**

### Passo 5 — Deploy
1. Clique em **"Deploy"**
2. Aguarde cerca de 2 minutos
3. Sua URL será algo como: `https://gw-quiz-xxxx.vercel.app`

### Passo 6 — Testar
1. Abra `/host` e entre com o PIN do host
2. Crie a sessão e copie o QR Code
3. Abra outro dispositivo, escaneie o QR ou acesse a URL raiz
4. Digite nickname, PIN e escolha o emblema
5. No host, clique em **"Iniciar Jogo"**

---

## Como Editar as Perguntas

Abra o arquivo `src/lib/questions.ts` e edite o array `QUESTIONS`.

Cada pergunta segue este formato:

```typescript
{
  id: 'q11',                       // ID único (não repita!)
  text: 'Qual comando faz X?',     // Texto da pergunta
  timeLimit: 20,                   // Segundos para responder

  options: [
    { id: 'a', text: 'Opção A', color: '#E53E3E', icon: '🔴' },
    { id: 'b', text: 'Opção B', color: '#38A169', icon: '🟢' },
    { id: 'c', text: 'Opção C', color: '#3182CE', icon: '🔵' },
    { id: 'd', text: 'Opção D', color: '#D69E2E', icon: '🟡' },
  ],

  correctId: 'b',                  // ID da opção correta
  explanation: 'Explicação aqui',  // Mostrada após responder (opcional)
}
```

**Dicas:**
- Mantenha sempre 4 alternativas (a, b, c, d)
- `timeLimit` entre 10 e 30 segundos funciona bem
- Use `explanation` para reforçar o aprendizado

---

## Como Alterar Tema e Cores

### Cores principais
Edite `tailwind.config.ts` → seção `colors.gw`:

```typescript
gw: {
  blue:    '#0055A4',  // Cor principal dos botões e gradientes
  navy:    '#002D6B',  // Fundo mais escuro
  sky:     '#1A7FD4',  // Destaques e links
  green:   '#00C853',  // Acerto / sucesso
  red:     '#FF1744',  // Erro / conflito
  gold:    '#FFD700',  // 1º lugar / dourado
  dark:    '#060D1F',  // Fundo principal
  surface: '#0D1B35',  // Superfície de cards
  card:    '#122040',  // Cards internos
}
```

### Fontes
Edite `src/app/globals.css` → linha `@import url(...)`:
```css
/* Troque as fontes do Google Fonts aqui */
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&...');
```

### Emblemas
Edite `src/lib/types.ts` → array `EMBLEMS`:
```typescript
export const EMBLEMS: Emblem[] = [
  { id: 'gweb',    label: 'Gweb',    emoji: '🌐', color: '#1A7FD4' },
  { id: 'webtrans',label: 'Webtrans',emoji: '🚛', color: '#00C853' },
  { id: 'gw-i',   label: 'GW-i',    emoji: '⚙️', color: '#FFD700' },
]
```

---

## Fluxo do Jogo

```
[Jogador]                    [Host]
   │                            │
   ▼                            ▼
Acessa /               Acessa /host
Insere nickname + PIN   Insere PIN do host
Escolhe emblema         Cria sessão
   │                    Exibe QR Code
   ▼                            │
  /lobby ◄──────────── fase: "waiting"
  (aguarda)                      │
   │                    Clica "Iniciar Jogo"
   │                             │
   ▼                             ▼
  /game ◄──────────── fase: "question"
 (responde)           (timer rodando)
   │                             │
   │              Clica "Revelar Resposta"
   │                             │
   ▼                             ▼
 (feedback) ◄────── fase: "answer"
                                 │
                    Clica "Ver Ranking"
                                 │
                                 ▼
 (ranking) ◄────── fase: "ranking"
                                 │
                    Clica "Próxima Pergunta"
                    (repete até última)
                                 │
                    Clica "Finalizar Jogo"
                                 │
                                 ▼
  /ranking ◄────── fase: "finished"
  (pódio final)
```

---

## Problemas Comuns

**Q: "Sessão não encontrada" ao entrar com o PIN**
→ Certifique-se que o host criou a sessão em `/host` antes dos jogadores entrarem.

**Q: Os jogadores não aparecem no lobby**
→ Verifique se o `NEXT_PUBLIC_FIREBASE_DATABASE_URL` está correto no `.env.local`.
→ Verifique as regras do Firebase (devem permitir leitura e escrita).

**Q: Erro "Firebase: No Firebase App" no console**
→ As variáveis de ambiente não estão sendo lidas. Reinicie o servidor com `npm run dev`.

**Q: Erro de build na Vercel**
→ Verifique se todas as 9 variáveis de ambiente foram adicionadas no painel da Vercel.

**Q: QR Code não aparece na tela do host**
→ Execute `npm install` e verifique se `qrcode.react` está nas dependências.

---

## Créditos

Desenvolvido para o Workshop de Versionamento — **GW Sistemas** 🚛

Stack: Next.js · Firebase · TailwindCSS · TypeScript
