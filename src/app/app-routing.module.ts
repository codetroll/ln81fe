import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrejComponent } from './grej/grej.component';
import { HomeComponent } from './home/home.component';
import { KarakterComponent } from './karakter/karakter.component';
import { ReglerComponent } from './regler/regler.component';
import { RollerComponent } from './roller/roller.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'karakter', component: KarakterComponent },
  { path: 'regler', component: ReglerComponent },
  { path: 'roller', component: RollerComponent },
  { path: 'grej', component: GrejComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
