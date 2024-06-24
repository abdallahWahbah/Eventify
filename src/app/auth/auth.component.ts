import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService, User } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  @ViewChild("form") formData: NgForm;
  isLoginMode = true;
  error: null;
  isLoading = false;
  initialName="Abdalla"

  constructor(private authService: AuthService,
              private router: Router
  ){}

  onSubmit()
  {
    if(!this.formData.valid) 
    {
      Object.values(this.formData.controls).forEach(control => control.markAsTouched());
      return;
    }
    this.isLoading = true;

    const name = this.formData.value.name
    const email = this.formData.value.email
    const password = this.formData.value.password
    if(!this.isLoginMode)
    {
      const newUser: User = {name, email, password,}
      this.authService.signup(newUser)
      .subscribe(
        response => {
          switch(response.status.messageModifier)
          {
            case "EMAIL_EXISTS":
            {
              this.error = response.status.message;
              this.isLoading = false;
              break;
            }
            case "CREATED_SUCCESSFULLY":
            {
              this.authService.currentUser.next(response.data);
              localStorage.setItem("currentUser", JSON.stringify(response.data))

              this.isLoading = false;
              this.router.navigate(["/home"])
              break;
            }
          }
        },
      )
    }
    else
    {
      this.authService.login(email, password)
      .subscribe(
        response => {
          switch(response.status.messageModifier)
          {
            case "WRONG_CREDENTIALS":
            {
              this.error = response.status.message;
              this.isLoading = false;
              break;
            }
            case "LOGGEDIN_SUCCESSFULLY":
            {
              this.authService.currentUser.next(response.data);
              localStorage.setItem("currentUser", JSON.stringify(response.data))

              this.isLoading = false;
              this.router.navigate(["/home"])
              break;
            }
          }
        }
      )
    }
  }

  changeStatus()
  {
    this.isLoginMode = !this.isLoginMode;
    this.error = null;
    Object.values(this.formData.controls).forEach(control => control.markAsUntouched());
  }
}
