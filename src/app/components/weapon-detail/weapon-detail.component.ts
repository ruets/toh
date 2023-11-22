import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import swal from 'sweetalert2';

import { WeaponService } from '../../services/weapon/weapon.service';
import { Weapon} from "../../model/weapon";

@Component({
  selector: 'app-weapon-detail',
  templateUrl: './weapon-detail.component.html',
  styleUrls: ['./weapon-detail.component.scss']
})
export class WeaponDetailComponent {
  @Input() weapon?: Weapon;
  readonly MAX_POINTS = 5;
  readonly MIN_POINTS = -5;
  readonly TOTAL_POINTS = 0;
  weaponsSub: any;

  constructor(
    private route: ActivatedRoute,
    private weaponService: WeaponService,
    private location: Location
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id != 'add') {
      this.getWeapon();
    } else {
      this.weapon = {id: NaN, name: '', attack: NaN, dodge: NaN, damages: NaN, life: NaN};
    }
  }

  getWeapon(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.weaponsSub = this.weaponService.getWeapon(id)
      .subscribe(weapon => this.weapon = weapon);
  }

  saveWeapon(): void {
    if (!this.weapon?.name || this.weapon?.name == '') {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You must set a name for your weapon!',
      });
      return;
    }
    if (this.getAttack() < this.MIN_POINTS || this.getDodge() < this.MIN_POINTS || this.getDamages() < this.MIN_POINTS || this.getLife() < this.MIN_POINTS) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'The minimum value for each attribute is -5!',
      });
      return;
    }

    if (this.getAttack() > this.MAX_POINTS || this.getDodge() > this.MAX_POINTS || this.getDamages() > this.MAX_POINTS || this.getLife() > this.MAX_POINTS) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'The maximum value for each attribute is 5!',
      });
      return;
    }

    if (this.getTotals() > this.TOTAL_POINTS) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You need a total of 0 points!',
      });
      return;
    }
    let id = this.route.snapshot.paramMap.get('id');
    if (this.weapon && id != 'add') {
      this.weaponService.updateWeapon(this.weapon);
    } else if (this.weapon) {
      this.weaponService.addWeapon(this.weapon);
    }
    this.location.back();
  }

  deleteWeapon(): void {
    swal.fire({
      title: 'Are you sure?',
      text: "You will lose this weapon forever!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (!this.weapon) {
          return;
        }

        this.weaponService.deleteWeapon(this.weapon);
        this.location.back();
      }
    });
  }

  getAttack(): number {
    if (!this.weapon) {
      return 0;
    }
    return this.weapon?.attack;
  }

  getDodge(): number {
    if (!this.weapon) {
      return 0;
    }
    return this.weapon?.dodge;
  }

  getDamages(): number {
    if (!this.weapon) {
      return 0;
    }
    return this.weapon?.damages;
  }

  getLife(): number {
    if (!this.weapon) {
      return 0;
    }
    return this.weapon?.life;
  }

  getTotals(): number {
    if (!this.weapon) {
      return 0;
    }
    return this.weapon?.attack + this.weapon?.dodge + this.weapon?.damages + this.weapon?.life;
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

  ngOnDestroy(): void {
    if (this.weaponsSub) this.weaponsSub.unsubscribe();
  }
}
