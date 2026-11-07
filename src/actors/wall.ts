import * as ex from "excalibur";
import { TILE } from "../config/room";
import { WALL_GROUP } from "../config/collisionGroups";

export class Wall extends ex.Actor {
  constructor(col: number, row: number) {
    super({
      pos: ex.vec(col * TILE + TILE / 2, row * TILE + TILE / 2),
      width: TILE,
      height: TILE,
      color: ex.Color.Gray,
      collisionType: ex.CollisionType.Fixed,
      collisionGroup: WALL_GROUP,
    });
  }
}