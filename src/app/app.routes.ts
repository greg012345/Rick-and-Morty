import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Login } from './login/login';
import { Creat } from './creat/creat';


export const routes: Routes = [
  { path: '', component: Login },
  { path: 'home', component: HomeComponent },
  { path: 'creat', component: Creat },
];