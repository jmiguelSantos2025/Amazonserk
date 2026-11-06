import * as ex from "excalibur"
import { GAME } from "./config/constants"



const game = new ex.Engine({
    width:GAME.width,
    height:GAME.height,
    backgroundColor: GAME.backgroundColor
});


game.start();