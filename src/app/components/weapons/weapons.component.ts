import { Component, OnInit } from '@angular/core';

import { Weapon } from "../../model/weapon";
import { WeaponService } from "../../services/weapon/weapon.service";
import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.scss']
})
export class WeaponsComponent implements OnInit {
  weapons: Weapon[] = [];

  constructor(private weaponService: WeaponService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getWeapons();
  }

  getWeapons(): void {
    this.weaponService.getWeapons()
      .subscribe(weapons => this.weapons = weapons);
  }
}
