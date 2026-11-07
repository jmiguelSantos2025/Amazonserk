import * as ex from "excalibur";
import { ENEMY_GROUP } from "../config/collisionGroups"; // descomente quando criar o arquivo da #12

// TEMPORÁRIO: robô só para testar tiro e colisões. APAGAR no final.
export class TestRobot extends ex.Actor {
    private readonly target: ex.Actor;

    constructor(x: number, y: number, target: ex.Actor) {
        super({
            pos: ex.vec(x, y),
            width: 24,
            height: 24,
            color: ex.Color.Red,
            collisionType: ex.CollisionType.Active,
            collisionGroup: ENEMY_GROUP,
        });
        this.target = target;
    }
    
    override onPreUpdate(): void {
        console.log("alvo", this.target.pos.x, this.target.pos.y);
        const toTarget = this.target.pos.sub(this.pos);

        if (toTarget.size > 0) {
            this.vel = toTarget.normalize().scale(60);
        } else {
            this.vel = ex.Vector.Zero;
        }
    }
}