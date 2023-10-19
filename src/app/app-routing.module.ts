import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './components/heroes/heroes.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { WeaponsComponent } from './components/weapons/weapons.component';
import { WeaponDetailComponent } from './components/weapon-detail/weapon-detail.component';
import { MessagesComponent } from "./components/messages/messages.component";


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'heroes/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'weapons/:id', component: WeaponDetailComponent },
  { path: 'weapons', component: WeaponsComponent },
  { path: 'messages', component: MessagesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
