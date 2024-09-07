import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, shareReplay, tap } from 'rxjs';
import { User } from './models/user';
import { DOCUMENT } from '@angular/common';
import { AuthService } from './auth.service';

const userInfo = "user";
@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private httpClient: HttpClient, @Inject(DOCUMENT) private document: Document, private authService: AuthService) {
    this.isLoggedIn$ = this.user$.pipe(map(user => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));
    const localStorage = document.defaultView?.localStorage;
    const user = localStorage?.getItem(userInfo);

    if (user) {
        this.userSubject.next(JSON.parse(user));
    }
  }

  login(email:string, password:string): Observable<User> {
    return this.authService.login({ email, password } )
      .pipe(tap(user => {
        this.userSubject.next(user);
        localStorage.setItem(userInfo, JSON.stringify(user));
      })
      , shareReplay()
      );
  }

  logout() {
   //todo add logout api
    this.userSubject.next(null);
    localStorage.removeItem(userInfo);
  }
}
