import { Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { AboutComponent } from './main/about/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Rota para Home
  { path: 'about', component: AboutComponent }, // Rota para About
];
