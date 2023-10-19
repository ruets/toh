import { Weapon } from "./weapon";

export interface Hero {
  id: number;
  name: string;
  weaponId?: string;

  // 40 points to distribute
  // between attack, dodge, damages and life
  // Each attribute must be at least 1
  attack: number;
  dodge: number;
  damages: number;
  life: number;
}
