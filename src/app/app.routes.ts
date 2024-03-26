import { Routes } from '@angular/router';
import { Step1Component } from './components/step-1/step-1.component';
import { Step2Component } from './components/step-2/step-2.component';
import { Step3Component } from './components/step-3/step-3.component';
import { routeGuard } from './route.guard';
export const routes: Routes = [
  {path:'', redirectTo:'/step1', pathMatch: 'full'},
  {path: 'step1',component: Step1Component},
  {path: 'step2',component: Step2Component, canActivate:[routeGuard]},
  {path: 'step3',component: Step3Component, canActivate:[routeGuard]}
];
