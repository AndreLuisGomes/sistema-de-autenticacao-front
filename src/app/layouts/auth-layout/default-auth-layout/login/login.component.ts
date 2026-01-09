import { CommonModule } from '@angular/common';
import { Component, inject, signal, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { User, UserLoginDTO } from '../../../../../models/auth/user';
import { AuthService } from '../../../../services/auth.service';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {

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
    this.loginForm.markAllAsTouched()
    if (this.loginForm.valid) {
      this.invalidLogin.set(false);
      this.isLoading.set(true);
      this.authService.login(this.loginForm.value as UserLoginDTO).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.invalidLogin.set(true);
          this.isLoading.set(false);
          console.error(err);
        }
      })
    }
  }

  isControlValid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!control && control?.invalid && (control.dirty || control?.touched);
  }
}
