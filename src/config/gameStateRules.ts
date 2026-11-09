// Regras puras do estado do jogo.
// Fica separado de constants.ts porque gameState.ts precisa rodar em Node
// (sem importar Excalibur). constants.ts reexporta GAME_RULES.
export const GAME_RULES = {
    initialLives: 3,
    initialScore: 0,
    pointsPerEnemy: 100,
    respawnDelayMs: 1200,
} as const;
