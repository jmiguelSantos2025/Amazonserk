import { CollisionGroup } from "excalibur";


export const PLAYER_GROUP = new CollisionGroup("player", 0b00001, 0b01100);
export const PLAYER_BULLET_GROUP = new CollisionGroup("playerBullet", 0b00010, 0b01100);
export const ENEMY_GROUP = new CollisionGroup("enemy", 0b00100, 0b01011);
export const WALL_GROUP = new CollisionGroup("wall", 0b01000, 0b00111);


