import * as ex from "excalibur";
import { GAME, GAME_RULES } from "./config/constants";
import { buildRoom } from "./rooms/buildRoom";
import { layouts } from "./rooms/layout";
import { ExitDoor } from "./actors/ExitDoor";
import { Enemy } from "./actors/Enemy";
import { EnemyBullet } from "./actors/EnemyBullet";
import type { Player } from "./actors/Player";
import { getScore, isGameOver, loseLife, resetGameState, setRoom } from "./state/gameState";
import { createHud, updateHud, type Hud } from "./ui/Hud";

const game = new ex.Engine({
    width: GAME.width,
    height: GAME.height,
    backgroundColor: GAME.backgroundColor,
});

let currentRoom = 0;
let goNext = false;
let respawning = false;
let gameOver = false;
let hud: Hud | null = null;

function loadRoom(index: number) {
    const scene = game.currentScene;
    scene.clear();
    setRoom(index);
    buildRoom(scene, layouts[index]);
    hud = createHud(scene);
}

function showVictory() {
    const scene = game.currentScene;
    scene.clear();
    hud = null;
    scene.add(
        new ex.Label({
            text: "VOCÊ VENCEU!",
            pos: ex.vec(GAME.width / 2, GAME.height / 2),
            font: new ex.Font({
                size: 48,
                color: ex.Color.White,
                textAlign: ex.TextAlign.Center,
            }),
        })
    );
}

// Tela final: mostra a pontuação e espera ENTER para recomeçar.
function showGameOver() {
    gameOver = true;
    hud = null;

    const scene = game.currentScene;
    scene.clear();

    const centerX = GAME.width / 2;
    const centerY = GAME.height / 2;

    scene.add(
        new ex.Label({
            text: "GAME OVER",
            pos: ex.vec(centerX, centerY - 60),
            font: new ex.Font({
                size: 48,
                color: ex.Color.Red,
                textAlign: ex.TextAlign.Center,
            }),
            coordPlane: ex.CoordPlane.Screen,
        })
    );

    scene.add(
        new ex.Label({
            text: `Pontuação final: ${getScore()}`,
            pos: ex.vec(centerX, centerY),
            font: new ex.Font({
                size: 28,
                color: ex.Color.White,
                textAlign: ex.TextAlign.Center,
            }),
            coordPlane: ex.CoordPlane.Screen,
        })
    );

    scene.add(
        new ex.Label({
            text: "Pressione ENTER para jogar de novo",
            pos: ex.vec(centerX, centerY + 60),
            font: new ex.Font({
                size: 22,
                color: ex.Color.White,
                textAlign: ex.TextAlign.Center,
            }),
            coordPlane: ex.CoordPlane.Screen,
        })
    );
}

// Ponto ÚNICO de entrada: o jogador morreu.
// Chamado pelos ganchos de Enemy e EnemyBullet.
function handlePlayerDeath(player?: Player) {
    // Evita perder duas vidas quando dois tiros/robôs acertam no mesmo frame.
    if (respawning || gameOver) return;

    loseLife();

    if (isGameOver()) {
        respawning = true;
        showGameOver();
        return;
    }

    respawning = true;

    if (player) {
        player.vel = ex.Vector.Zero;
        player.kill();
    }

    // Recarrega a mesma sala depois de uma pausa curta.
    window.setTimeout(() => {
        respawning = false;
        loadRoom(currentRoom);
    }, GAME_RULES.respawnDelayMs);
}

// a porta só marca que é hora de trocar; a troca acontece depois do frame
ExitDoor.onPlayerEnter = () => {
    goNext = true;
};

// Liga as colisões do Thiago (#23 e #26) ao ponto único acima.
Enemy.onHitPlayer = (_enemy, player) => handlePlayerDeath(player);
EnemyBullet.onHitPlayer = (player) => handlePlayerDeath(player);

game.on("postupdate", () => {
    if (gameOver) {
        if (game.input.keyboard.wasPressed(ex.Keys.Enter)) {
            resetGameState();
            gameOver = false;
            respawning = false;
            currentRoom = 0;
            loadRoom(0);
        }
        return;
    }

    if (hud) {
        updateHud(hud);
    }

    if (!goNext) return;
    goNext = false;
    currentRoom++;
    if (currentRoom < layouts.length) {
        loadRoom(currentRoom);
    } else {
        showVictory();
    }
});

loadRoom(0);
game.start();