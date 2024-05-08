import { Injectable } from '@angular/core';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    {'userID': 1, 'name': 'Kevin'},
    {'userID': 2, 'name': 'Jeff'},
    {'userID': 3, 'name': 'Bryan'},
    {'userID': 4, 'name': 'Gabbey'},
  ];

  constructor() { }

  getUsers(): User[] {
    return this.users;
  }
}