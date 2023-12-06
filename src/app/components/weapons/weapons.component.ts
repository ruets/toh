import { Component, OnInit } from '@angular/core';

import {Weapon, WeaponType} from "../../model/weapon";
import { WeaponService } from "../../services/weapon/weapon.service";
import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.scss']
})
export class WeaponsComponent implements OnInit {
  weapons: Weapon[] = [];
  weaponsSub: any;

  constructor(private weaponService: WeaponService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getWeapons();
  }

  getWeapons(): void {
    this.weaponsSub = this.weaponService.getWeapons()
      .subscribe(weapons => this.weapons = weapons);
  }

  ngOnDestroy(): void {
    if (this.weaponsSub) this.weaponsSub.unsubscribe();
  }

  protected readonly WeaponType = WeaponType;
}
