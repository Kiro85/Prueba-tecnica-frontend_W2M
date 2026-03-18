import { Routes } from '@angular/router';
import { PageHomeComponent } from './pages/page-home/page-home.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: PageHomeComponent}
];
