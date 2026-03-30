// ================================================================
// BANCO DE PERGUNTAS — GW QUIZ: VERSIONAMENTO INTELIGENTE
//
// Para editar as perguntas, modifique o array QUESTIONS abaixo.
// Cada pergunta tem:
//   - id:        identificador único (não repetir)
//   - text:      enunciado da pergunta
//   - options:   4 alternativas (a, b, c, d)
//   - correctId: id da opção correta
//   - timeLimit: segundos para responder
//   - explanation: texto exibido após a resposta (opcional)
// ================================================================

import type { QuizQuestion } from './types'

export const QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    text: 'O que é Git?',
    timeLimit: 20,
    options: [
      { id: 'a', text: 'Um sistema de versionamento de código distribuído', color: '#E53E3E', icon: '🔴' },
      { id: 'b', text: 'Um banco de dados relacional', color: '#38A169', icon: '🟢' },
      { id: 'c', text: 'Uma linguagem de programação', color: '#3182CE', icon: '🔵' },
      { id: 'd', text: 'Um servidor web', color: '#D69E2E', icon: '🟡' },
    ],
    correctId: 'a',
    explanation: 'Git é um sistema de controle de versão distribuído criado por Linus Torvalds em 2005.',
  },
  {
    id: 'q2',
    text: 'Qual comando inicializa um repositório Git local?',
    timeLimit: 15,
    options: [
      { id: 'a', text: 'git start', color: '#E53E3E', icon: '🔴' },
      { id: 'b', text: 'git create', color: '#38A169', icon: '🟢' },
      { id: 'c', text: 'git init', color: '#3182CE', icon: '🔵' },
      { id: 'd', text: 'git new', color: '#D69E2E', icon: '🟡' },
    ],
    correctId: 'c',
    explanation: '"git init" cria um novo repositório Git vazio no diretório atual.',
  },
  {
    id: 'q3',
    text: 'O que faz o comando "git commit -m"?',
    timeLimit: 20,
    options: [
      { id: 'a', text: 'Envia alterações para o servidor remoto', color: '#E53E3E', icon: '🔴' },
      { id: 'b', text: 'Salva as mudanças com uma mensagem descritiva', color: '#38A169', icon: '🟢' },
      { id: 'c', text: 'Cria uma nova branch', color: '#3182CE', icon: '🔵' },
      { id: 'd', text: 'Mescla duas branches', color: '#D69E2E', icon: '🟡' },
    ],
    correctId: 'b',
    explanation: 'O "commit" registra o estado atual do projeto no histórico com uma mensagem descritiva.',
  },
  {
    id: 'q4',
    text: 'Qual comando cria uma nova branch?',
    timeLimit: 15,
    options: [
      { id: 'a', text: 'git branch nova-branch', color: '#E53E3E', icon: '🔴' },
      { id: 'b', text: 'git switch nova-branch', color: '#38A169', icon: '🟢' },
      { id: 'c', text: 'git checkout -b nova-branch', color: '#3182CE', icon: '🔵' },
      { id: 'd', text: 'git new -b nova-branch', color: '#D69E2E', icon: '🟡' },
    ],
    correctId: 'a',
    explanation: '"git branch" é um atalho que cria a branch e NÃO  muda para ela.',
  },
  {
    id: 'q5',
    text: 'Qual é a diferença entre "git fetch" e "git pull"?',
    timeLimit: 25,
    options: [
      { id: 'a', text: 'Não há diferença, são sinônimos', color: '#E53E3E', icon: '🔴' },
      { id: 'b', text: 'fetch baixa e aplica, pull apenas baixa', color: '#38A169', icon: '🟢' },
      { id: 'c', text: 'fetch só baixa, pull baixa e aplica ao branch atual', color: '#3182CE', icon: '🔵' },
      { id: 'd', text: 'pull é mais lento que fetch', color: '#D69E2E', icon: '🟡' },
    ],
    correctId: 'c',
    explanation: '"git fetch" baixa as mudanças sem aplicar. "git pull" = fetch + merge no branch atual.',
  },
  {
    id: 'q6',
    text: 'O que é um "merge conflict" (conflito de merge)?',
    timeLimit: 20,
    options: [
      { id: 'a', text: 'Quando dois commits têm a mesma mensagem', color: '#E53E3E', icon: '🔴' },
      { id: 'b', text: 'Quando duas branches modificaram a mesma parte de um arquivo', color: '#38A169', icon: '🟢' },
      { id: 'c', text: 'Quando o repositório remoto está offline', color: '#3182CE', icon: '🔵' },
      { id: 'd', text: 'Quando há mais de 10 commits pendentes', color: '#D69E2E', icon: '🟡' },
    ],
    correctId: 'b',
    explanation: 'Conflito ocorre quando Git não consegue resolver automaticamente mudanças no mesmo trecho de código em duas branches diferentes.',
  },
  {
    id: 'q7',
    text: 'Para que serve o arquivo ".gitignore"?',
    timeLimit: 15,
    options: [
      { id: 'a', text: 'Para bloquear o acesso de outros usuários ao repo', color: '#E53E3E', icon: '🔴' },
      { id: 'b', text: 'Para listar arquivos que o Git deve ignorar/não rastrear', color: '#38A169', icon: '🟢' },
      { id: 'c', text: 'Para definir as mensagens de commit padrão', color: '#3182CE', icon: '🔵' },
      { id: 'd', text: 'Para configurar o servidor remoto', color: '#D69E2E', icon: '🟡' },
    ],
    correctId: 'b',
    explanation: '.gitignore lista padrões de arquivos e pastas que o Git não deve rastrear (ex: node_modules, .env).',
  },
  {
    id: 'q8',
    text: 'Qual comando cria E já muda para uma nova branch?',
    timeLimit: 15,
    options: [
      { id: 'a', text: 'git branch nova-branch', color: '#E53E3E', icon: '🔴' },
      { id: 'b', text: 'git switch nova-branch', color: '#38A169', icon: '🟢' },
      { id: 'c', text: 'git checkout -b nova-branch', color: '#3182CE', icon: '🔵' },
      { id: 'd', text: 'git new -b nova-branch', color: '#D69E2E', icon: '🟡' },
    ],
    correctId: 'c',
    explanation: '"git checkout -b" é um atalho que cria a branch e já muda para ela. Hoje também funciona "git switch -c nova-branch".',
  },
  {
    id: 'q9',
    text: 'O que é um "Pull Request" (PR)?',
    timeLimit: 20,
    options: [
      { id: 'a', text: 'Uma solicitação para baixar código do repositório', color: '#E53E3E', icon: '🔴' },
      { id: 'b', text: 'Uma proposta de integrar mudanças de uma branch em outra, com revisão', color: '#38A169', icon: '🟢' },
      { id: 'c', text: 'Um tipo especial de commit', color: '#3182CE', icon: '🔵' },
      { id: 'd', text: 'Um relatório de erros do repositório', color: '#D69E2E', icon: '🟡' },
    ],
    correctId: 'b',
    explanation: 'PR é o fluxo de propor mudanças de uma branch para outra no GitHub/GitLab, permitindo code review antes do merge.',
  },
  {
    id: 'q10',
    text: 'O que faz "git stash"?',
    timeLimit: 20,
    options: [
      { id: 'a', text: 'Deleta todas as mudanças não commitadas', color: '#E53E3E', icon: '🔴' },
      { id: 'b', text: 'Guarda mudanças temporariamente sem fazer commit', color: '#38A169', icon: '🟢' },
      { id: 'c', text: 'Envia o repositório para o servidor remoto', color: '#3182CE', icon: '🔵' },
      { id: 'd', text: 'Cria um backup completo do repositório', color: '#D69E2E', icon: '🟡' },
    ],
    correctId: 'b',
    explanation: '"git stash" guarda suas mudanças em uma pilha temporária, deixando o working directory limpo para trocar de branch.',
  },
  {
    id: 'q11',
    text: 'Qual é a boa prática para mensagens de commit?',
    timeLimit: 20,
    options: [
      { id: 'a', text: '"fix" ou "update" sem mais detalhes para ser rápido', color: '#E53E3E', icon: '🔴' },
      { id: 'b', text: 'Mensagem longa com todos os detalhes técnicos possíveis', color: '#38A169', icon: '🟢' },
      { id: 'c', text: 'Mensagem clara e concisa no imperativo: "feat: adiciona tela de login"', color: '#3182CE', icon: '🔵' },
      { id: 'd', text: 'Usar apenas números sequenciais: "commit 001", "commit 002"', color: '#D69E2E', icon: '🟡' },
    ],
    correctId: 'c',
    explanation: 'O padrão Conventional Commits usa prefixos como feat:, fix:, docs: e mensagens imperativas claras para facilitar o histórico.',
  },
  {
    id: 'q12',
    text: 'Você tentou dar git push e foi rejeitado. Qual a causa mais provável?',
    timeLimit: 20,
    options: [
      { id: 'a', text: 'Falta de commit', color: '#E53E3E', icon: '🔴' },
      { id: 'b', text: 'O repositório está vazio', color: '#38A169', icon: '🟢' },
      { id: 'c', text: 'O remoto tem mudanças que você não tem localmente', color: '#3182CE', icon: '🔵' },
      { id: 'd', text: 'Branch não existe', color: '#D69E2E', icon: '🟡' },
    ],
    correctId: 'c',
    explanation: 'O push foi rejeitado porque o repositório remoto possui commits que não existem no seu repositório local. Isso normalmente acontece quando outra pessoa (ou você em outro ambiente) fez alterações e enviou antes. Para resolver, é necessário fazer um git pull (ou git pull --rebase) para sincronizar as mudanças antes de tentar o push novamente.',
  },
  {
    id: 'q13',
    text: 'Por que commits pequenos são recomendados?',
    timeLimit: 20,
    options: [
      { id: 'a', text: 'Ocupam menos espaço', color: '#E53E3E', icon: '🔴' },
      { id: 'b', text: 'Facilitam entendimento e rollback', color: '#38A169', icon: '🟢' },
      { id: 'c', text: 'Melhoram performance do Git', color: '#3182CE', icon: '🔵' },
      { id: 'd', text: 'Evitam conflitos', color: '#D69E2E', icon: '🟡' },
    ],
    correctId: 'b',
    explanation: 'Commits pequenos facilitam o entendimento das mudanças e tornam mais simples desfazer alterações quando necessário',
  },
  {
    id: 'q14',
    text: 'Qual comando remove uma branch local após merge?',
    timeLimit: 20,
    options: [
      { id: 'a', text: 'git remove branch', color: '#E53E3E', icon: '🔴' },
      { id: 'b', text: 'git delete', color: '#38A169', icon: '🟢' },
      { id: 'c', text: 'git clean', color: '#3182CE', icon: '🔵' },
      { id: 'd', text: 'git branch -d', color: '#D69E2E', icon: '🟡' },
    ],
    correctId: 'd',
    explanation: 'O comando git branch -d é usado para deletar uma branch local que já foi mergeada com segurança. Ele impede a exclusão caso a branch ainda tenha alterações não incorporadas, evitando perda de trabalho.',
  },
  {
    id: 'q15',
    text: 'Você criou uma branch, fez alterações, mas ao voltar para main o arquivo sumiu. Por quê?',
    timeLimit: 20,
    options: [
      { id: 'a', text: 'O arquivo só existe na outra branch', color: '#E53E3E', icon: '🔴' },
      { id: 'b', text: 'O Git apagou o arquivo', color: '#38A169', icon: '🟢' },
      { id: 'c', text: 'O commit falhou', color: '#3182CE', icon: '🔵' },
      { id: 'd', text: 'O repositório corrompeu', color: '#D69E2E', icon: '🟡' },
    ],
    correctId: 'a',
    explanation: 'Cada branch no Git possui seu próprio histórico de arquivos. Como o arquivo foi criado em outra branch e não foi feito merge com a main, ele não aparece ao voltar para ela',
  },
]

/** Número total de perguntas */
export const TOTAL_QUESTIONS = QUESTIONS.length
