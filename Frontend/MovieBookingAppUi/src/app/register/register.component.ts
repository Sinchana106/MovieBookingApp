
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { ModalComponentComponent } from '../modal-component/modal-component.component';
import { ModalSuccessComponent } from '../modal-success/modal-success.component';
import { DataTransferService } from '../services/data-transfer.service';
import { UserServiceService } from '../services/user-service.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  password!: string;
  confirmPassword!: string;
  email!: string;

  ngOnInit(): void {
  }

  constructor(private router: Router, 
    private userService: UserServiceService,
     private dialog: MatDialog, 
     private dataService: DataTransferService) { }

  //To Save Registeration Data in The Database
  public register(registerData: any) {
    console.log(registerData.value);
    this.userService.register(registerData).subscribe((data) => {
      this.dataService.data = "Congratulations!, your account has been created successfully.";
      this.openModalSuccess();
      this.router.navigate(['/login']);
    },
      error => {
        //alert('Register unsuccesful');
        this.dataService.data = "Registeration Unsuccesful";
        this.openModalError();
      });
  }


  //To Check Password and Confirm Password matches
  validatePassword(form: NgForm) {
    if (form.controls['password'].value !== form.controls['confirmPassword'].value) {
      form.controls['confirmPassword'].setErrors({ passwordMismatch: true });

    } else {
      form.controls['confirmPassword'].setErrors(null);
    }
  }

  //To Check If Username Already Exist in DB
  checkUsernameExist(form: NgForm) {
    this.userService.verifyUserName(form.controls['username'].value).subscribe((data) => {
      if (data !== null) {
        console.log('username exist')
        this.dataService.data = 'Username already exist!';
        //alert("Username already exist!")
        this.openModalError();
        this.router.navigate(['/login'])
        form.controls['username'].setErrors({ usernameExist: true });
      }

    })
  }

  //To Check If Email Already Exist in DB
  checkEmailExist(form: NgForm) {
    this.userService.emailExist(form.controls['email'].value).subscribe((data) => {
      if (data) {
        this.dataService.data = 'Email already exist!';
        this.openModalError();
        console.log("Email exist");
        form.controls['email'].setErrors({ emailExist: true })

      }

    })
  }

  openModalError(): void {
    this.dialog.open(ModalComponentComponent, {
      width: '400px',
    });
  }

  openModalSuccess(): void {
    this.dialog.open(ModalSuccessComponent, {
      width: '400px',
    });
  }

}
