import {Weapon} from "./weapon";

export class Hero {
  // Only theses data are stored in the database
  id: number;
  name: string;
  weaponId?: string;
  attack: number;
  dodge: number;
  damages: number;
  life: number;

  // The following data are not stored in the database and is initialized in the constructor
  imgURL?: string;
  weapon?: Weapon;
  weaponSub: any;

  constructor(id: number, name: string, weaponId: string, attack: number, dodge: number, damages: number, life: number) {
    this.id = id;
    this.name = name;
    this.weaponId = weaponId;
    this.attack = attack;
    this.dodge = dodge;
    this.damages = damages;
    this.life = life;

    this.imgURL = "https://api.dicebear.com/7.x/adventurer/svg?seed=" + this.name;

  }
}
