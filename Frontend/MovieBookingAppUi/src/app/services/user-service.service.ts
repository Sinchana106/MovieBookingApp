import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  BASIC_URL = "http://localhost:9090/api/v1.0/moviebooking";
  requestHeader = new HttpHeaders({
    'No-Auth': 'True'
  });

  public login(loginData: any): Observable<any> {
    return this.http.post(this.BASIC_URL + "/login", loginData, { headers: this.requestHeader });
  }

  public register(registerData: NgForm) {
    return this.http.post(this.BASIC_URL + "/register", registerData.value, { headers: this.requestHeader });
  }

  public verifyUserName(username: string) {
    return this.http.get(this.BASIC_URL + "/verifyUserName/" + username, { headers: this.requestHeader });
  }

  public emailExist(email: string) {
    return this.http.get(this.BASIC_URL + "/email/" + email, { headers: this.requestHeader });
  }

  public changePassword(changePasswordForm: NgForm) {
    return this.http.post(this.BASIC_URL + "/change-password", changePasswordForm.value, { headers: this.requestHeader });
  }

}
