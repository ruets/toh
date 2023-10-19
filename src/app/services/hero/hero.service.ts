import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MessageService } from '../message/message.service';
import { Hero } from '../../model/hero';
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
export class HeroService {
  private static url = 'heroes'

  constructor(private firestore: Firestore, private messageService: MessageService) { }
  getHeroes(): Observable<Hero[]> {
    const heroes = collection(this.firestore, HeroService.url);
    this.messageService.add('HeroService: fetched heroes');
    return collectionData(heroes, {idField: 'id'}) as Observable<Hero[]>;
  }

  getHero(id: string | null): Observable<Hero> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const hero = doc(this.firestore, HeroService.url + '/' + id);
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return docData(hero, {idField: 'id'}) as Observable<Hero>;
  }

  deleteHero(hero: Hero): Promise<void> {
    const heroDoc = doc(this.firestore, HeroService.url + '/' + hero.id);
    this.messageService.add(`HeroService: delete hero id=${hero.id}, with following data: ${JSON.stringify(hero)}`);
    return deleteDoc(heroDoc);
  }

  addHero(hero: Hero): void {
    const heroes = collection(this.firestore, HeroService.url);
    this.messageService.add(`HeroService: add hero id=${hero.id}`);
    let newHero = {name: hero.name, weaponId: hero.weaponId, attack: hero.attack, dodge: hero.dodge, damages: hero.damages, life: hero.life}
    addDoc(heroes, newHero);
  }

  updateHero(hero: Hero): void {
    const heroDoc = doc(this.firestore, HeroService.url + '/' + hero.id);
    this.messageService.add(`HeroService: update hero id=${hero.id}`);
    let newHero = {name: hero.name, weaponId: hero.weaponId, attack: hero.attack, dodge: hero.dodge, damages: hero.damages, life: hero.life}
    updateDoc(heroDoc, newHero);
  }
}
