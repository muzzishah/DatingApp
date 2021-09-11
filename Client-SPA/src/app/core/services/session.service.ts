import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private currentUserSource = new ReplaySubject<any>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor() {}

  setCurrentUserFromToken (user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user)
  }

  setCurrentUserFromStorage (): void {
    this.currentUserSource.next(this.getCurrentUserFromStorage())
  }
  
  getCurrentUserFromStorage(): any {
    const user = localStorage.getItem('user')
    if(user){
      return JSON.parse(user);
    }
    return null;
  }

  removeCurrentUserFromStorage(): any {
    localStorage.removeItem('user');
    this.currentUserSource.next(null)
  }
}
