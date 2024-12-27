import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'calculator',
    //En vez de usar paths relativos
    //loadComponent: () => import('./calculator/pages/calculator-page/calculator-page.component')
    //Uso un alias @/
    loadComponent: () => import('@/calculator/pages/calculator-page/calculator-page.component')
  },
  {
    path: '**',
    redirectTo: 'calculator'
  }
];
