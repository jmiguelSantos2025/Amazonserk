import * as ex from "excalibur";
import { ENEMY } from "../config/constants";
import { Player } from "./Player";

export class Enemy extends ex.Actor {
    public isDying = false;

    constructor(x: number, y: number) {
        super({
            pos: ex.vec(x, y),
            width: ENEMY.size,
            height: ENEMY.size,
            color: ENEMY.color,
            collisionType: ex.CollisionType.Active,
        });
    }

    override onPreUpdate(engine: ex.Engine, elapsed: number): void {
        if (this.isDying) return;

        const player = engine.currentScene.actors.find(a => a instanceof Player);

        if (player) {
            const direction = player.pos.sub(this.pos);
            if (direction.size > 0) {
                this.vel = direction.normalize().scale(ENEMY.speed);
            }
        }
    }

    public die(): void {
        if (this.isDying) return;
        this.isDying = true;

        // Para o movimento imediatamente
        this.vel = ex.Vector.Zero;
        
        // Altera a cor para Vermelho
        this.color = ex.Color.Red;

        // Efeito visual de piscar 3 vezes e desaparecer
        this.actions
            .blink(60, 60, 3)
            .callMethod(() => {
                this.kill();
            });
    }
}