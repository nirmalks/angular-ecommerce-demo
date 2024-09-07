import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users = [
    {
      id: 1,
      email: 'user1@example.com',
      password: 'Password123',
      username: 'userone'
    },
    {
      id: 2,
      email: 'user2@example.com',
      password: 'SecurePass456',
      username: 'usertwo'
    },
    {
      id: 3,
      email: 'user3@example.com',
      password: 'MyPass789',
      username: 'userthree'
    },
    {
      id: 4,
      email: 'user4@example.com',
      password: 'PasswordABC',
      username: 'userfour'
    }
  ];

  findAllUsers() {
    return of(this.users);
  }

  constructor() { }
}
