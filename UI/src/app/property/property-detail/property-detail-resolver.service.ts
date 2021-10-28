import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { property } from 'src/app/model/property';
import { PropertyService } from 'src/app/services/property.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailResolverService implements Resolve<property>  {

  constructor(private propertyService : PropertyService,private router :Router) { }
  resolve(route: ActivatedRouteSnapshot,state:RouterStateSnapshot):
  Observable<property> | property
  {
      const propId= route.params['id'];
      return this.propertyService.getProperty(+propId).pipe(
        catchError(error =>{
          this.router.navigate(['/']);
          return of(null);
        })
      );
  }
}
