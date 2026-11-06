import * as ex from "excalibur";
import { GAME } from "./config/constants";
import { Player } from "./actors/Player";

const game = new ex.Engine({
    width: GAME.width,
    height: GAME.height,
    backgroundColor: GAME.backgroundColor,
});

const player = new Player(GAME.width / 2, GAME.height / 2);
game.add(player);

game.start();