import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import swal from 'sweetalert2';

import { HeroService } from '../../services/hero/hero.service';
import { WeaponService } from "../../services/weapon/weapon.service";
import { Hero } from '../../model/hero';
import { Weapon } from "../../model/weapon";
import {Observable} from "rxjs";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent {
  @Input() hero?: Hero;
  weapons?: Weapon[];
  readonly MAX_POINTS = 40;
  readonly MIN_POINTS = 1;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private weaponService: WeaponService,
    private location: Location
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id != 'add') {
      this.getHero();
    } else {
      this.hero = new Hero(NaN, '', '', NaN, NaN, NaN, NaN);
    }

    this.getWeapons().subscribe(weapons => this.weapons = weapons);
  }

  getHero(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  getWeapons(): Observable<Weapon[]> {
    return this.weaponService.getWeapons();
  }

  saveHero(): void {
    if (!this.hero?.name || this.hero?.name == '') {
      swal.fire({
icon: 'error',
        title: 'Oops...',
        text: 'You must set a name for your hero!',
      });
      return;
    }

    if (this.getAttack() < this.MIN_POINTS || this.getDodge() < this.MIN_POINTS || this.getDamages() < this.MIN_POINTS || this.getLife() < this.MIN_POINTS) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You must use at least 1 point in each attribute!',
      });
      return;
    }

    if (this.getAttack() > this.MAX_POINTS || this.getDodge() > this.MAX_POINTS || this.getDamages() > this.MAX_POINTS || this.getLife() > this.MAX_POINTS) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You have used more than 40 points!',
      });
      return;
    }

    if (this.getTotals() > this.MAX_POINTS) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You have used more than 40 points!',
      });
      return;
    }
    let id = this.route.snapshot.paramMap.get('id');
    if (this.hero && id != 'add') {
      this.heroService.updateHero(this.hero);
    } else if (this.hero) {
      this.heroService.addHero(this.hero);
    }
    this.location.back();
  }

  deleteHero(): void {
    swal.fire({
      title: 'Are you sure?',
      text: "You will lose this hero forever!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (!this.hero) {
          return;
        }

        this.heroService.deleteHero(this.hero);
        this.location.back();
      }
    });
  }

  getAttack(): number {
    if (!this.hero) {
      return 0;
    }
    return this.hero?.attack;
  }

  getDodge(): number {
    if (!this.hero) {
      return 0;
    }
    return this.hero?.dodge;
  }

  getDamages(): number {
    if (!this.hero) {
      return 0;
    }
    return this.hero?.damages;
  }

  getLife(): number {
    if (!this.hero) {
      return 0;
    }
    return this.hero?.life;
  }

  getTotals(): number {
    if (!this.hero) {
      return 0;
    }
    return this.hero?.attack + this.hero?.dodge + this.hero?.damages + this.hero?.life;
  }

  goBack(): void {
    swal.fire({
      title: 'Are you sure?',
      text: "You will lose all your changes!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, go back!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.location.back();
      }
    });
  }
}
