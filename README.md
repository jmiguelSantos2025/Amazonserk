# Amazonserk

Jogo estilo **Berzerk** feito com **Vite + TypeScript + Excalibur** para a
disciplina de Fundamentos de Sistemas de Informação (FSI) da UEA.

## Equipe

- João Miguel
- Thiago

**Universidade do Estado do Amazonas (UEA)**
Curso: Sistemas de Informação — 2º período

## História

Em uma expedição pela floresta amazônica, um explorador encontra ruínas
antigas guardadas por robôs. Para escapar, ele precisa atravessar as salas,
destruir os robôs e alcançar a saída de cada uma. Paredes matam — como no
clássico Berzerk.

## Controles

| Tecla | Ação |
|---|---|
| `W` `A` `S` `D` | Mover o jogador |
| `Espaço` | Atirar na direção em que o jogador está virado |
| `Enter` | Jogar de novo depois do Game Over |

## Objetivo

- Destruir todos os robôs de uma sala para abrir a porta de saída.
- Atravessar as 3 salas sem perder as 3 vidas.
- Cada robô destruído vale 100 pontos.
- Se as vidas acabarem, aparece o Game Over com a pontuação final.

## Como rodar localmente

Pré-requisito: Node.js instalado.

```bash
npm install
npm start
```

Abra o endereço mostrado pelo Vite (normalmente `http://localhost:5173`).

Para verificar os tipos e gerar o build de produção:

```bash
npx tsc
npm run build
npm run serve
```

## Jogar online

GitHub Pages: https://jmiguelSantos2025.github.io/Amazonserk/

> Se o endereço acima ainda não estiver no ar, ative o GitHub Pages nas
> configurações do repositório (branch `main`, pasta `/` gerenciada pelo
> workflow de deploy).

## Tecnologias

- TypeScript (modo `strict`)
- Vite
- Excalibur 0.32.0

## Estrutura do projeto

```
src/
├── main.ts                 # cria o Engine, carrega salas, HUD e morte do jogador
├── config/                 # constantes, regras puras e grupos de colisão
├── actors/                 # Player, Bullet, Enemy, EnemyBullet, Wall, ExitDoor
├── rooms/                  # buildRoom e os 3 layouts
├── state/gameState.ts      # pontos, vidas e sala (TypeScript puro)
└── ui/Hud.ts               # pontos, vidas e sala na tela
```

## Créditos

- Arte: feita com formas simples do próprio Excalibur (retângulos e cores),
  sem imagens externas.
- Som: o jogo não usa sons externos.
- Inspiração: Berzerk (1980), de Stern Electronics.
