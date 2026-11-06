
import * as ex from "excalibur";

export const GAME = {
    width:800,
    height: 600,
    backgroundColor: ex.Color.Black,

}as const;

export const PLAYER = {
    size:24,
    color: ex.Color.Green,
    speed:180,

}as const;