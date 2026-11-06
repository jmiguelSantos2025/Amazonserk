import * as ex from "excalibur";
import { Wall } from "../actors/wall";

export function buildRoom(scene: ex.Scene, layout: string[]) {
  layout.forEach((line, row) => {
    [...line].forEach((char, col) => {
      if (char === "#") {
        scene.add(new Wall(col, row));
      }
      // depois: 'R' vira Robot, 'E' vira ExitDoor, 'P' posição do Player
    });
  });
}