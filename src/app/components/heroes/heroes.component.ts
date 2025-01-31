import { Component, OnInit } from '@angular/core';

import { Hero } from '../../model/hero';
import { HeroService } from '../../services/hero/hero.service';
import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  heroesSub: any;

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroesSub = this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  ngOnDestroy(): void {
    if (this.heroesSub) this.heroesSub.unsubscribe();
  }
}
