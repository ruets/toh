import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MessageService } from '../message/message.service';
import { Weapon } from "../../model/weapon";
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  updateDoc,
} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class WeaponService {
  private static url = 'weapons'

  constructor(private firestore: Firestore, private messageService: MessageService) { }
  getWeapons(): Observable<Weapon[]> {
    const weapons = collection(this.firestore, WeaponService.url);
    this.messageService.add('WeaponService: fetched weapons');
    return collectionData(weapons, {idField: 'id'}) as Observable<Weapon[]>;
  }

    getWeapon(id: string | undefined | null): Observable<Weapon> {
    // For now, assume that a weapon with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const weapon = doc(this.firestore, WeaponService.url + '/' + id);
    this.messageService.add(`WeaponService: fetched weapon id=${id}`);
    return docData(weapon, {idField: 'id'}) as Observable<Weapon>;
  }

  deleteWeapon(weapon: Weapon): Promise<void> {
    const weaponDoc = doc(this.firestore, WeaponService.url + '/' + weapon.id);
    this.messageService.add(`WeaponService: delete weapon id=${weapon.id}, with following data: ${JSON.stringify(weapon)}`);
    return deleteDoc(weaponDoc);
  }

  addWeapon(weapon: Weapon): void {
    const weapons = collection(this.firestore, WeaponService.url);
    this.messageService.add(`WeaponService: add weapon id=${weapon.id}`);
    let newWeapon = {name: weapon.name, type:weapon.type, attack: weapon.attack, dodge: weapon.dodge, damages: weapon.damages, life: weapon.life}
    addDoc(weapons, newWeapon);
  }

  updateWeapon(weapon: Weapon): void {
    const weaponDoc = doc(this.firestore, WeaponService.url + '/' + weapon.id);
    this.messageService.add(`WeaponService: update weapon id=${weapon.id}`);
    let newWeapon = {name: weapon.name, type:weapon.type, attack: weapon.attack, dodge: weapon.dodge, damages: weapon.damages, life: weapon.life}
    updateDoc(weaponDoc, newWeapon);
  }
}
