export interface Weapon {
  id: number;
  name: string;

  // 0 points in total
  // between attack, dodge, damages and life
  // Each attribute must be in following range: [-5, 5]
  attack: number;
  dodge: number;
  damages: number;
  life: number;
}
