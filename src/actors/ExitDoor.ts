import * as ex from "excalibur";
import { TILE } from "../config/room";
import { WALL_GROUP } from "../config/collisionGroups";
import { Enemy } from "./Enemy";
import { Player } from "./Player";

export class ExitDoor extends ex.Actor {
  public isOpen = false;
  public onPlayerEnter: () => void = () => {};

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

  override onInitialize(): void {
    this.on("collisionstart", (evt) => {
      if (this.isOpen && evt.other.owner instanceof Player) {
        this.onPlayerEnter();
      }
    });
  }

  override onPreUpdate(engine: ex.Engine): void {
    if (this.isOpen) return;

    const hasEnemies = engine.currentScene.actors.some((a) => a instanceof Enemy);
    if (!hasEnemies) {
      this.open();
    }
  }

  private open(): void {
    this.isOpen = true;
    this.color = ex.Color.Green;
    this.body.collisionType = ex.CollisionType.Passive; // o jogador passa, mas ainda gera o evento
  }
}