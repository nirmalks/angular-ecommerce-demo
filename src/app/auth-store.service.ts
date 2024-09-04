import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, shareReplay, tap } from 'rxjs';
import { User } from './models/user';

const userInfo = "userInfo";
@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private httpClient: HttpClient) {
    this.isLoggedIn$ = this.user$.pipe(map(user => !!user));

    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));

    const user = localStorage.getItem(userInfo);

    if (user) {
        this.userSubject.next(JSON.parse(user));
    }
  }

  login(email:string, password:string): Observable<User> {
    return this.httpClient.post<User>('/api/login', { email, password } )
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
