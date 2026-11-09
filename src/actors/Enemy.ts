import * as ex from "excalibur";
import { ENEMY } from "../config/constants";
import { ENEMY_GROUP } from "../config/collisionGroups";
import { Player } from "./Player";
import { EnemyBullet } from "./EnemyBullet";

const SHOOT_COOLDOWN_MS = 3000;
const ALIGN_TOLERANCE = 10; // quão perto da mesma linha/coluna conta como alinhado

export class Enemy extends ex.Actor {
    // o João liga isso na #29 (perder vida do jogador)
    public static onHitPlayer: (enemy: Enemy, player: Player) => void = () => {};

    public isDying = false;
    private shootCooldown = 2500; // não atira assim que nasce

    constructor(x: number, y: number) {
        super({
            pos: ex.vec(x, y),
            width: ENEMY.size,
            height: ENEMY.size,
            color: ENEMY.color,
            collisionType: ex.CollisionType.Active,
            collisionGroup: ENEMY_GROUP,
        });
    }

    override onInitialize(): void {
        this.on("collisionstart", (evt) => {
            if (this.isDying) return;
            const other = evt.other.owner;

            if (other instanceof Player) {
                Enemy.onHitPlayer(this, other);
                this.die();
            }
        });
    }

    override onPreUpdate(engine: ex.Engine, elapsed: number): void {
        if (this.isDying) return;

        this.shootCooldown -= elapsed;

        const player = engine.currentScene.actors.find(a => a instanceof Player);

        if (player) {
            const direction = player.pos.sub(this.pos);
            if (direction.size > 0) {
                this.vel = direction.normalize().scale(ENEMY.speed);
            }

            this.tryShoot(engine, player);
        }
    }

    private tryShoot(engine: ex.Engine, player: Player): void {
        if (this.shootCooldown > 0) return;

        const dx = player.pos.x - this.pos.x;
        const dy = player.pos.y - this.pos.y;

        let dir: ex.Vector | null = null;
        if (Math.abs(dy) < ALIGN_TOLERANCE) {
            dir = ex.vec(Math.sign(dx), 0); // mesma linha: atira na horizontal
        } else if (Math.abs(dx) < ALIGN_TOLERANCE) {
            dir = ex.vec(0, Math.sign(dy)); // mesma coluna: atira na vertical
        }

        if (dir) {
            const start = this.pos.add(dir.scale(ENEMY.size / 2 + 8));
            engine.currentScene.add(new EnemyBullet(start, dir));
            this.shootCooldown = SHOOT_COOLDOWN_MS;
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