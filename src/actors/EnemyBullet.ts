import * as ex from "excalibur";
import { GAME } from "../config/constants";
import { ENEMY_GROUP } from "../config/collisionGroups";
import { Player } from "./Player";

export class EnemyBullet extends ex.Actor {
    // o João pode preencher isso na #29 (perder vida do jogador)
    public static onHitPlayer: (player: Player) => void = () => {};

    constructor(position: ex.Vector, direction: ex.Vector) {
        super({
            pos: position.clone(),
            width: 8,
            height: 8,
            color: ex.Color.Orange,
            vel: direction.scale(250),
            collisionType: ex.CollisionType.Active,
            // mesmo grupo dos inimigos: bate no jogador e na parede, mas não nos robôs
            collisionGroup: ENEMY_GROUP,
        });
    }

    override onInitialize(): void {
        this.on("collisionstart", (evt) => {
            const other = evt.other.owner;
            if (other instanceof Player) {
                EnemyBullet.onHitPlayer(other);
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