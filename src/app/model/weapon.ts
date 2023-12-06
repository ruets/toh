export const WeaponType: {[key: string]: string} = {
  "Sword": "https://cdn-icons-png.flaticon.com/512/842/842184.png",
  "Bow": "https://cdn-icons-png.flaticon.com/512/812/812196.png",
  "Dagger": "https://cdn-icons-png.flaticon.com/512/3046/3046555.png",
  "Mace": "https://cdn-icons-png.flaticon.com/512/8520/8520910.png",
  "Shield": "https://cdn-icons-png.flaticon.com/512/7651/7651151.png",
}


export interface Weapon {
  id: number;
  name: string;
  type: string;

  // 0 points in total
  // between attack, dodge, damages and life
  // Each attribute must be in following range: [-5, 5]
  attack: number;
  dodge: number;
  damages: number;
  life: number;
}
