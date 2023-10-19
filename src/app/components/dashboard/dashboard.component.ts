import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/hero/hero.service';
import { WeaponService } from '../../services/weapon/weapon.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {
  heroesNb = 0;
  weaponsNb = 0;
  pseudo = "STR"
  // TODO : modify and add a modal to modify pseudo

  constructor(private heroService: HeroService, private weaponService: WeaponService) { }

  ngOnInit(): void {
    this.getHeroesNb();
    this.getWeaponsNb();
  }

  getHeroesNb(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroesNb = heroes.length);
  }

  getWeaponsNb(): void {
    this.weaponService.getWeapons()
      .subscribe(weapons => this.weaponsNb = weapons.length);
  }
}
