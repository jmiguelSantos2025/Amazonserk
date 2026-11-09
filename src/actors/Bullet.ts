import * as ex from "excalibur";
import { BULLET, GAME } from "../config/constants";
import { PLAYER_BULLET_GROUP } from "../config/collisionGroups";
import { registerEnemyKill } from "../state/gameState";
import { Enemy } from "./Enemy";

export class Bullet extends ex.Actor {
    constructor(position: ex.Vector, direction: ex.Vector) {
        super({
            pos: position.clone(),
            width: BULLET.size,
            height: BULLET.size,
            color: BULLET.color,
            vel: direction.scale(BULLET.speed),
            collisionType: ex.CollisionType.Active,
            collisionGroup: PLAYER_BULLET_GROUP,
        });
    }

    override onInitialize(): void {
        this.on("collisionstart", (evt) => {
            const other = evt.other.owner;

            // Só pontua na primeira vez que o robô é atingido.
            if (other instanceof Enemy && !other.isDying) {
                other.die();
                registerEnemyKill();
            }

            this.kill();
        });
    }

    override onPostUpdate(): void {
        if (this.pos.x < 0 || this.pos.x > GAME.width || this.pos.y < 0 || this.pos.y > GAME.height) {
            this.kill();
        }
    }
}