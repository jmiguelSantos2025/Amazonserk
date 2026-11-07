import * as ex from "excalibur";
import { BULLET, GAME } from "../config/constants";
import { Enemy } from "./Enemy";
import { PLAYER_BULLET_GROUP } from "../config/collisionGroups";

export class Bullet extends ex.Actor {
    constructor(position: ex.Vector, direction: ex.Vector) {
        super({
            pos: position.clone(),
            width: BULLET.size,
            height: BULLET.size,
            color: BULLET.color,
            vel: direction.scale(BULLET.speed),
            collisionType: ex.CollisionType.Active, // Necessário para detectar colisões
            collisionGroup: PLAYER_BULLET_GROUP,
        });
    }

    override onInitialize(engine: ex.Engine): void {
        // Detecta quando a bala colide com outro ator
        this.on("collisionstart", (evt) => {
            if (evt.other instanceof Enemy) {
                evt.other.die(); // Ativa a piscada e morte do inimigo
                this.kill();      // Destrói a bala imediatamente
            }
        });
    }

    override onPostUpdate(): void {
        if (this.pos.x < 0 || this.pos.x > GAME.width || this.pos.y < 0 || this.pos.y > GAME.height) {
            this.kill();
        }
    }
}
