// ================================================================
// CONFIGURAÇÃO DO FIREBASE
//
// Este arquivo inicializa o Firebase e exporta os serviços usados.
// As credenciais vêm das variáveis de ambiente (.env.local).
//
// Serviços usados:
//   - Firebase Realtime Database (tempo real entre clientes)
// ================================================================

import { initializeApp, getApps, getApp } from 'firebase/app'
import {
  getDatabase,
  ref,
  set,
  get,
  push,
  update,
  remove,
  onValue,
  off,
  serverTimestamp,
  type DatabaseReference,
} from 'firebase/database'

// ----------------------------------------------------------------
// Configuração (variáveis de ambiente)
// ----------------------------------------------------------------
const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL:       process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Evita inicializar múltiplas vezes no Next.js (hot-reload)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

export const db = getDatabase(app)

// ----------------------------------------------------------------
// Re-exporta utilitários do Firebase Database
// ----------------------------------------------------------------
export {
  ref,
  set,
  get,
  push,
  update,
  remove,
  onValue,
  off,
  serverTimestamp,
  type DatabaseReference,
}

// ----------------------------------------------------------------
// HELPERS DE REFERÊNCIAS — estrutura do banco de dados
//
// Estrutura no Firebase Realtime Database:
//
// sessions/
//   {pin}/
//     phase: 'waiting' | 'starting' | 'question' | 'answer' | 'ranking' | 'finished'
//     currentQuestion: 0
//     questionStart: 1720000000000  (timestamp ms)
//     createdAt: 1720000000000
//
//   players/
//     {playerId}/
//       nickname: 'João'
//       emblem: 'gweb'
//       score: 850
//       joinedAt: 1720000000000
//       answers/
//         {questionId}/
//           optionId: 'b'
//           timeMs: 4200
//           pointsEarned: 790
//           correct: true
// ----------------------------------------------------------------

/** Referência para a sessão (dados do jogo) */
export const sessionRef = (pin: string) =>
  ref(db, `sessions/${pin}`)

/** Referência para todos os jogadores de uma sessão */
export const playersRef = (pin: string) =>
  ref(db, `sessions/${pin}/players`)

/** Referência para um jogador específico */
export const playerRef = (pin: string, playerId: string) =>
  ref(db, `sessions/${pin}/players/${playerId}`)

/** Referência para a resposta de um jogador em uma pergunta */
export const answerRef = (pin: string, playerId: string, questionId: string) =>
  ref(db, `sessions/${pin}/players/${playerId}/answers/${questionId}`)
