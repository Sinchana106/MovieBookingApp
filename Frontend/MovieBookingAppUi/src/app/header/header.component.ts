import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, public userAuth: UserAuthService) { }

  ngOnInit(): void {
  }

  register() {
    this.router.navigate(['/register']);
  }

  login() {
    console.log("Login pressed");
    this.router.navigate(['/login']);

  }

  logout() {
    this.router.navigate(['/login']);
    this.userAuth.clear();
  }

  public isLoggedIn() {
    return this.userAuth.isLoggedIn();
  }


}
