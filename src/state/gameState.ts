import { GAME_RULES } from "../config/gameStateRules";

// Estado global do jogo: pontos, vidas e sala atual.
// Nenhuma cena ou ator deve guardar esses valores.
let score = GAME_RULES.initialScore;
let lives = GAME_RULES.initialLives;
let room = 0;

export function getScore(): number {
    return score;
}

export function getLives(): number {
    return lives;
}

export function getRoom(): number {
    return room;
}

export function addPoints(points: number): void {
    if (points > 0) {
        score += points;
    }
}

// Chamado quando um tiro do jogador mata um robô.
export function registerEnemyKill(): void {
    score += GAME_RULES.pointsPerEnemy;
}

// Perde uma vida, mas nunca deixa o contador ficar negativo.
export function loseLife(): void {
    if (lives > 0) {
        lives -= 1;
    }
}

export function isGameOver(): boolean {
    return lives <= 0;
}

export function setRoom(value: number): void {
    room = value < 0 ? 0 : value;
}

export function resetGameState(): void {
    score = GAME_RULES.initialScore;
    lives = GAME_RULES.initialLives;
    room = 0;
}
