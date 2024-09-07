import { Injectable } from '@angular/core';
import { User } from './models/user';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(user: User) {
    return of(user);
  }
}
