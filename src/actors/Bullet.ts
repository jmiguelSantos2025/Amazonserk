import * as ex from "excalibur";
import { BULLET, GAME } from "../config/constants";

export class Bullet extends ex.Actor {
    constructor(position: ex.Vector, direction: ex.Vector) {
        super({
            pos: position.clone(),
            width: BULLET.size,
            height: BULLET.size,
            color: BULLET.color,
            vel: direction.scale(BULLET.speed),
        });
    }

    override onPostUpdate(): void {
        if (this.pos.x < 0 || this.pos.x > GAME.width || this.pos.y < 0 || this.pos.y > GAME.height) {
            this.kill();
        }
    }
}