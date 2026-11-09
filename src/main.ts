import * as ex from "excalibur";
import { GAME } from "./config/constants";
import { buildRoom } from "./rooms/buildRoom";
import { layouts } from "./rooms/layout";
import { ExitDoor } from "./actors/ExitDoor";
import { createHud, updateHud, type Hud } from "./ui/Hud";

const game = new ex.Engine({
    width: GAME.width,
    height: GAME.height,
    backgroundColor: GAME.backgroundColor,
});

let currentRoom = 0;
let goNext = false;
let hud: Hud | null = null;

function loadRoom(index: number) {
    const scene = game.currentScene;
    scene.clear();
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

// a porta só marca que é hora de trocar; a troca acontece depois do frame
ExitDoor.onPlayerEnter = () => {
    goNext = true;
};

game.on("postupdate", () => {
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