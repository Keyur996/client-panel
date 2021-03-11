import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate,Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private afsAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute ) { }

  canActivate(): Observable<boolean>{
      return this.afsAuth.authState.pipe(map( (auth) => {
          if(!auth) {
            this.router.navigate(['/login'], { relativeTo: this.route });
            return false;
          } else {
            return true;
          }
      }));
  }

}
