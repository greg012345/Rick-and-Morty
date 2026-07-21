import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Login } from './login/login';
import { Creat } from './creat/creat';
import { Teszt } from './teszt/teszt';
import { Search } from './search/search';


export const routes: Routes = [
  { path: '', component: Login },
  { path: 'home', component: HomeComponent },
  { path: 'creat', component: Creat },
  { path: 'teszt', component: Teszt },
  { path: 'creat/:id', component: Creat },
  { path: 'search', component: Search },
];