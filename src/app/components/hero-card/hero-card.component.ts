import {Component, Input} from '@angular/core';

import { Hero } from '../../model/hero';
import { WeaponService } from '../../services/weapon/weapon.service';
import { MessageService } from '../../services/message/message.service';
import {WeaponType} from "../../model/weapon";

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent {
  @Input({required: true}) hero: Hero | undefined;
  weaponSub: any;

  constructor(private weaponService: WeaponService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getWeapon();
  }

  getWeapon(): void {
    if (this.hero) {
      this.weaponSub = this.weaponService.getWeapon(this.hero.weaponId)
        .subscribe(weapon => {
          if (weapon !== undefined && this.hero !== undefined) {
            this.hero.weapon = weapon;
          }
        });
    }
  }

  ngOnDestroy(): void {
    if (this.weaponSub) this.weaponSub.unsubscribe();
  }

  protected readonly WeaponType = WeaponType;
}
