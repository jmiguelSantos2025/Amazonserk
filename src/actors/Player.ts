import * as ex from "excalibur";
import { PLAYER, BULLET } from "../config/constants";
import { Bullet } from "./Bullet";

export class Player extends ex.Actor {
    facing: ex.Vector = ex.vec(1, 0);
    cooldown = 0;

    constructor(x: number, y: number) {
        super({
            pos: ex.vec(x, y),
            width: PLAYER.size,
            height: PLAYER.size,
            color: PLAYER.color,
        });
    }

    override onPreUpdate(engine: ex.Engine, elapsed: number): void {
        this.cooldown -= elapsed;

        let dx = 0;
        let dy = 0;

        if (engine.input.keyboard.isHeld(ex.Keys.W)) { dy -= 1; }
        if (engine.input.keyboard.isHeld(ex.Keys.S)) { dy += 1; }
        if (engine.input.keyboard.isHeld(ex.Keys.A)) { dx -= 1; }
        if (engine.input.keyboard.isHeld(ex.Keys.D)) { dx += 1; }

        const direction = ex.vec(dx, dy);

        if (direction.size > 0) {
            const unit = direction.normalize();
            this.facing = unit;
            this.vel = unit.scale(PLAYER.speed);
        } else {
            this.vel = ex.Vector.Zero;
        }

        if (engine.input.keyboard.isHeld(ex.Keys.Space) && this.cooldown <= 0) {
            engine.add(new Bullet(this.pos, this.facing));
            this.cooldown = BULLET.cooldownMs;
        }
    }
}