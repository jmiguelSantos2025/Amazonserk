import * as ex from "excalibur";

export const GAME = {
    width:800,
    height: 600,
    backgroundColor: ex.Color.Black,

}as const;

export const PLAYER = {
    size:24,
    color: ex.Color.Green,
    speed: 230,

}as const;

export const BULLET = {
    size: 6,
    color: ex.Color.Yellow,
    speed: 400,
    cooldownMs: 250,
} as const;


export const ENEMY = {
    size:48,
    color: ex.Color.Yellow,
    speed:70,

}as const;

// Reexporta as regras puras para manter constants.ts como fonte oficial.
export { GAME_RULES } from "./gameStateRules";

export const HUD = {
    x: 10,
    y: 8,
    lineHeight: 26,
    fontSize: 20,
} as const;

export const GAME_OVER = {
    titleSize: 48,
    scoreSize: 28,
    hintSize: 22,
    lineGap: 60,
} as const;