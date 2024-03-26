import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { CarDataService } from './services/car-data.service';
import { inject } from '@angular/core';

export const routeGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const carService = inject(CarDataService);
  const router = inject(Router);
  if(state.url === '/step2'){
    if(!carService.getStep1AuthStatus){
      router.navigate(['/step1']);
    }
    return carService.getStep1AuthStatus;
  }else if(state.url === '/step3'){
    if(!carService.getStep1AuthStatus){
      router.navigate(['/step1']);
    }
    return carService.getStep2AuthStatus;
  }
  return false;
};
