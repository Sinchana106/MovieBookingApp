import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(role: string[]) {
    localStorage.setItem('roles', JSON.stringify(role));
  }

  public getRoles(): string[] {
    return JSON.parse(localStorage.getItem('roles')!);
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string {
    return localStorage.getItem('jwtToken')!;
  }

  public isLoggedIn() {
    return this.getRoles() != null && this.getToken() != null;
  }

  public clear() {
    localStorage.clear();
  }

  public roleMatch(allowedRoles: any): any {
    let isMatch = false;
    const userRoles: any = this.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles === allowedRoles[j]) {
            //console.log("userRole[i].roleName= "+userRoles[i].roleName)
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
  }

}