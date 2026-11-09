import * as ex from "excalibur";
import { HUD } from "../config/constants";
import { getLives, getRoom, getScore } from "../state/gameState";

// Referências aos textos do HUD para atualizar sem recriar os atores.
export interface Hud {
    score: ex.Label;
    lives: ex.Label;
    room: ex.Label;
}

function makeFont(): ex.Font {
    return new ex.Font({
        size: HUD.fontSize,
        color: ex.Color.White,
        textAlign: ex.TextAlign.Left,
    });
}

function makeLabel(y: number): ex.Label {
    return new ex.Label({
        text: "",
        pos: ex.vec(HUD.x, y),
        font: makeFont(),
        coordPlane: ex.CoordPlane.Screen,
        anchor: ex.Vector.Zero,
        z: 100,
    });
}

export function createHud(scene: ex.Scene): Hud {
    const hud: Hud = {
        score: makeLabel(HUD.y),
        lives: makeLabel(HUD.y + HUD.lineHeight),
        room: makeLabel(HUD.y + HUD.lineHeight * 2),
    };

    scene.add(hud.score);
    scene.add(hud.lives);
    scene.add(hud.room);
    updateHud(hud);

    return hud;
}

export function updateHud(hud: Hud): void {
    hud.score.text = `Pontos: ${getScore()}`;
    hud.lives.text = `Vidas: ${getLives()}`;
    hud.room.text = `Sala: ${getRoom() + 1}`;
}
