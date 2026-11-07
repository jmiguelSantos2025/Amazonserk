
import * as ex from "excalibur";
import { GAME } from "./config/constants";
import { buildRoom } from "./rooms/buildRoom";
import { layouts } from "./rooms/layout";
import { TestRobot } from "./actors/TestRobot";
import { Player } from "./actors/Player";

const game = new ex.Engine({
    width: GAME.width,
    height: GAME.height,
    backgroundColor: GAME.backgroundColor,
});

const player = buildRoom(game.currentScene, layouts[0]);
if(player){
    game.add(new TestRobot(100,100,player));
}


game.start();
