import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalComponentComponent } from '../modal-component/modal-component.component';
import { DataTransferService } from '../services/data-transfer.service';
import { UserAuthService } from '../services/user-auth.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private userService: UserServiceService,
    private userAuth: UserAuthService,
    private router: Router,
    private dataTransfer: DataTransferService,
    private dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  login(loginForm: any) {
    this.userService.login(loginForm.value).subscribe((response) => {
      this.userAuth.setRoles(response.user.userRoles[0].roleName);
      this.userAuth.setToken(response.jwtToken);
      localStorage.setItem('userName', loginForm.value.userName);
      if (response.user.userRoles[0].roleName === "Admin") {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/user']);
      }
    },
      (error) => {
        this.dataTransfer.data = "Invalid Credential";
        this.openModalError();

      }

    )
  }

  openModalError(): void {
    this.dialog.open(ModalComponentComponent, {
      width: '400px',
    });

  }
}
