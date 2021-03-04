import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth: AngularFireAuth) { }

  async logIn(user: User) {
      const userData = await this.afsAuth.signInWithEmailAndPassword(user.email, user.password)
      return userData;
  }

  getAuth(): Observable<any> {
    return this.afsAuth.authState.pipe(map( auth => auth ));
  }

  logOut(): void {
    this.afsAuth.signOut();
  }
}
