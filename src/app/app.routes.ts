import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Login } from './login/login';
import { Creat } from './creat/creat';
import { Teszt } from './teszt/teszt';
import { Search } from './search/search';
import { authGuard } from './authGuard';

export const routes: Routes = [

  { path: '', component: Login },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'creat', component: Creat, canActivate: [authGuard] },
  { path: 'teszt', component: Teszt, canActivate: [authGuard] },
  { path: 'creat/:id', component: Creat, canActivate: [authGuard] },
  { path: 'search', component: Search, canActivate: [authGuard] },
  { path: '**', redirectTo: 'home' }
];
