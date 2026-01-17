import { CommonModule } from '@angular/common';
import { Component, inject, signal, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { User, UserLoginDTO } from '../../../../../models/auth/user';
import { AuthService } from '../../../../services/auth.service';
import { Router, RouterLink } from "@angular/router";
import { ApiError } from '../../../../../models/error/error';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  otherError = signal<boolean>(false);
  invalidLogin = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  loginForm: FormGroup;
  hidePassword = true;

  constructor(private userService: UserService, private router: Router, private authService: AuthService = inject(AuthService)) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.invalidLogin.set(false);
      this.isLoading.set(true);
      this.authService.login(this.loginForm.value as UserLoginDTO).pipe().subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (error : ApiError) => {
          if(error.status === 404){
            console.error(error);
            this.isLoading.set(false);
          }else{
            this.otherError.set(true);
            console.error(error);
            this.isLoading.set(false);
          }
        }
      })
    }
  }

  isControlValid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!control && control?.invalid && (control.dirty || control?.touched);
  }

  isControlBlank(controlName: string) : boolean{
    const control = this.loginForm.get(controlName);
    return !!control && control?.invalid && control.touched;
  }
}
