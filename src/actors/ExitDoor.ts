import * as ex from "excalibur";
import { TILE } from "../config/room";
import { WALL_GROUP } from "../config/collisionGroups";
import { Enemy } from "./Enemy";
import { Player } from "./Player";

export class ExitDoor extends ex.Actor {
  public static onPlayerEnter: () => void = () => {};
  public isOpen = false;
  private triggered = false;

  constructor(x: number, y: number) {
    super({
      pos: ex.vec(x, y),
      width: TILE,
      height: TILE,
      color: ex.Color.Red,
      collisionType: ex.CollisionType.Fixed,
      collisionGroup: WALL_GROUP,
    });
  }

  override onPreUpdate(engine: ex.Engine): void {
    const scene = engine.currentScene;

    if (!this.isOpen) {
      const hasEnemies = scene.actors.some((a) => a instanceof Enemy && !a.isDying);
      if (!hasEnemies) this.open();
      return;
    }

    if (this.triggered) return;

    const player = scene.actors.find((a) => a instanceof Player);
    if (player && player.pos.distance(this.pos) < TILE) {
      this.triggered = true;
      ExitDoor.onPlayerEnter();
    }
  }

  private open(): void {
    this.isOpen = true;
    this.color = ex.Color.Green;
    this.body.collisionType = ex.CollisionType.Passive;
  }
}