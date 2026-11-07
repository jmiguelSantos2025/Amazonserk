
import * as ex from "excalibur";
import { Wall } from "../actors/wall";
import { Enemy } from "../actors/Enemy";
import { Player } from "../actors/Player";
import { TILE } from "../config/room";

export function buildRoom(scene: ex.Scene, layout: string[]): Player | null {
  let player: Player | null = null;

  layout.forEach((line, row) => {
    [...line].forEach((char, col) => {
     
      const x = col * TILE + TILE / 2;
      const y = row * TILE + TILE / 2;

      if (char === "#") {
        scene.add(new Wall(col, row));
      } else if (char === "R") {
        scene.add(new Enemy(x, y));
      } else if (char === "P") {
        player = new Player(x, y);
        scene.add(player);
      }
    });
  });

  return player;
}