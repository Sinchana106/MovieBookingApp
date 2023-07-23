import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalComponentComponent } from '../modal-component/modal-component.component';
import { ModalSuccessComponent } from '../modal-success/modal-success.component';
import { DataTransferService } from '../services/data-transfer.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  mailNotVerifed = true;

  constructor(private router: Router,
    private userService: UserServiceService,
    private dialog: MatDialog,
    private dataTransfer: DataTransferService) { }


  ngOnInit(): void {
  }

  /*
  * verifyUsername(changePasswordForm: NgForm)=> This Function is used to check if the username exist in 
  * database or not, if it exists, it will allow us to change password otherwise
  * display error dialog box
  */
  verifyUsername(changePasswordForm: NgForm) {

    console.log(changePasswordForm.controls["username"].value);
    this.userService.verifyUserName(changePasswordForm.controls["username"].value).subscribe((response) => {
      console.log(response);
      this.dataTransfer.data = "Username: " + changePasswordForm.controls["username"].value + " is Verified!";
      this.openModalSuccess();
      this.mailNotVerifed = false;
    }, (error: HttpErrorResponse) => {
      console.log(error.error)
      this.dataTransfer.data = "Username: " + changePasswordForm.controls["username"].value + " Not Present!";
      this.openModalError();
    })

  }

  /*
  * validatePassword(form: NgForm)=> This Function is used to check if password and confirm password matches
  */
  validatePassword(form: NgForm) {
    if (form.controls['password'].value !== form.controls['confirmPassword'].value) {
      form.controls['confirmPassword'].setErrors({ passwordMismatch: true });
    } else {
      form.controls['confirmPassword'].setErrors(null);
    }

  }

  /*
  * changePassword(changePasswordForm: NgForm)=> This Function is change password
  */
  changePassword(changePasswordForm: NgForm) {
    this.userService.changePassword(changePasswordForm).subscribe((response) => {
      console.log(response);
      this.dataTransfer.data = "Password Changed Successfully!";
      this.openModalSuccess();
      this.router.navigate(['/login']);
    }, (error) => {
      console.log(error);
    })

  }

  //openModalSuccess()=> To Open Success Dialog Box
  openModalSuccess(): void {
    this.dialog.open(ModalSuccessComponent, {
      width: '400px',
    });
  }

  //openModalError()=> To Open Error Dialog Box
  openModalError(): void {
    this.dialog.open(ModalComponentComponent, {
      width: '400px',
    });

  }
}
